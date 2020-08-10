using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AMS.API.Persistence;
using AMS.Data;
using Task = AMS.Data.Task;
using AMS.API.Models;

namespace AMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AuditingSystemContext _context;

        public TasksController(AuditingSystemContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTask()
        {
            return await _context.Task.ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("GetTasksByPortfolioId/{id}")]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasksByPortfolioId(Guid id)
        {
            var task = await _context.Task.Where(task => task.PortfolioId == id)
                .OrderByDescending(task => task.ModifyDate != null ? task.ModifyDate : task.CreateDate)
                .ToListAsync();

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // GET: api/Tasks/5
        [HttpGet("GetTasksByUserId/{id}")]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasksByUserId(Guid id)
        {
            var tasks = await (from task in _context.Task
                               join taskAssignment in _context.TaskAssignment
                               on task.Id equals taskAssignment.TaskId
                               where taskAssignment.UserId == id
                               select task).ToListAsync();

            if (tasks.Count == 0)
            {
                return NotFound();
            }

            return tasks;
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> GetTask(Guid id)
        {
            var dbtask = await _context.Task.FindAsync(id);

            var task = this.MapTaskToModel(dbtask);
            task.UserIds = await _context.TaskAssignment.Where(ta => ta.TaskId == id).Select(ta => ta.UserId).ToListAsync();

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(Guid id, TaskModel model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            var task = this.MapModelToTask(model);
            task.ModifyDate = DateTime.UtcNow;
            _context.Entry(task).State = EntityState.Modified;

            var assignmentsToDelete = _context.TaskAssignment.Where(ta => ta.TaskId == model.Id);

            _context.TaskAssignment.RemoveRange(assignmentsToDelete);

            var assignments = new List<TaskAssignment>();

            foreach (var userid in model.UserIds)
            {
                assignments.Add(new TaskAssignment
                {
                    TaskId = task.Id,
                    PortfolioId = task.PortfolioId,
                    UserId = userid,
                    CreatedBy = model.CreatedBy,
                    CreateDate = DateTime.UtcNow,
                });
            }

            await _context.TaskAssignment.AddRangeAsync(assignments);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("Complete/{id}/{userId}")]
        public async Task<IActionResult> CompleteTask(Guid id, Guid userId)
        {
            if (id == null || userId == null)
            {
                return BadRequest();
            }

            var task = await _context.Task.FindAsync(id);
            task.TaskStatusId = 3;
            task.ModifiedBy = Convert.ToString(userId);
            task.ModifyDate = DateTime.UtcNow;
            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tasks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Task>> PostTask(TaskModel model)
        {
            var task = this.MapModelToTask(model);
            task.CreateDate = DateTime.UtcNow;
            _context.Task.Add(task);
            await _context.SaveChangesAsync();

            var assignments = new List<TaskAssignment>();

            foreach (var userid in model.UserIds)
            {
                assignments.Add(new TaskAssignment
                {
                    TaskId = task.Id,
                    PortfolioId = task.PortfolioId,
                    UserId = userid,
                    CreatedBy = model.CreatedBy,
                    CreateDate = DateTime.UtcNow,
                });
            }

            await _context.TaskAssignment.AddRangeAsync(assignments);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Task>> DeleteTask(Guid id)
        {
            var task = await _context.Task.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Task.Remove(task);
            await _context.SaveChangesAsync();

            return task;
        }

        private bool TaskExists(Guid id)
        {
            return _context.Task.Any(e => e.Id == id);
        }

        private Task MapModelToTask(TaskModel model)
        {
            return new Task
            {
                Id = model.Id,
                CompleteDate = model.CompleteDate,
                CreateDate = model.CreateDate,
                CreatedBy = model.CreatedBy,
                ModifiedBy = model.ModifiedBy,
                ModifyDate = model.ModifyDate,
                PortfolioId = model.PortfolioId,
                StartDate = model.StartDate,
                TaskDescription = model.TaskDescription,
                TaskStatusId = model.TaskStatusId,
                TaskTitle = model.TaskTitle,
            };
        }

        private TaskModel MapTaskToModel(Task task)
        {
            return new TaskModel
            {
                Id = task.Id,
                CompleteDate = task.CompleteDate,
                CreateDate = task.CreateDate,
                CreatedBy = task.CreatedBy,
                ModifiedBy = task.ModifiedBy,
                ModifyDate = task.ModifyDate,
                PortfolioId = task.PortfolioId,
                StartDate = task.StartDate,
                TaskDescription = task.TaskDescription,
                TaskStatusId = task.TaskStatusId,
                TaskTitle = task.TaskTitle,
            };
        }
    }
}
