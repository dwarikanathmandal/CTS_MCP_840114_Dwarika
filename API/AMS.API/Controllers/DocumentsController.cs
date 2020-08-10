using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AMS.API.Persistence;
using AMS.Data;
using System.IO;
using AMS.API.Models;
using Microsoft.AspNetCore.Hosting;

namespace AMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {

        private IHostingEnvironment _hostingEnvironment;

        private readonly AuditingSystemContext _context;

        public DocumentsController(AuditingSystemContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: api/Documents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocument()
        {
            return await _context.Document.ToListAsync();
        }

        // GET: api/Documents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Document>> GetDocument(Guid id)
        {
            var document = await _context.Document.FindAsync(id);

            if (document == null)
            {
                return NotFound();
            }

            return document;
        }

        // GET: api/Tasks/GetDocumentsByTaskId/5
        [HttpGet("GetDocumentsByTaskId/{id}")]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocumentsByTaskId(Guid id)
        {
            var docuemnts = await _context.Document.Where(doc => doc.TaskId == id).ToListAsync();

            if (docuemnts == null && docuemnts.Count <= 0)
            {
                return NotFound();
            }

            return docuemnts;
        }

        [HttpGet("Download/{id}")]
        public async Task<IActionResult> Download(Guid id)
        {
            var document = await _context.Document.FindAsync(id);
            if (document == null)
            {
                return NotFound();
            }

            string webRootPath = _hostingEnvironment.ContentRootPath;
            string path = Path.Combine(webRootPath, "Documents");
            string fullPath = Path.Combine(path, document.SystemDocumentName);
            Stream stream = null;
            try
            {
                stream = System.IO.File.OpenRead(fullPath);
            }
            catch (Exception ex)
            {

            }

            if (stream == null)
                return NotFound();

            return File(stream, "application/octet-stream");
        }

        // PUT: api/Documents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocument(Guid id, Document document)
        {
            if (id != document.Id)
            {
                return BadRequest();
            }

            _context.Entry(document).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentExists(id))
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

        // POST: api/Documents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Document>> PostDocument(Document document)
        {
            _context.Document.Add(document);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDocument", new { id = document.Id }, document);
        }

        // DELETE: api/Documents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Document>> DeleteDocument(Guid id)
        {
            var document = await _context.Document.FindAsync(id);
            if (document == null)
            {
                return NotFound();
            }

            string webRootPath = _hostingEnvironment.ContentRootPath;
            string path = Path.Combine(webRootPath, "Documents");
            string pathWithFile = Path.Combine(path, document.SystemDocumentName);
            if (System.IO.File.Exists(pathWithFile))
            {
                System.IO.File.Delete(pathWithFile);
            }
            _context.Document.Remove(document);
            await _context.SaveChangesAsync();

            return document;
        }

        private bool DocumentExists(Guid id)
        {
            return _context.Document.Any(e => e.Id == id);
        }

        [HttpPost]
        [Route("Upload/{taskId:Guid}")]
        public async Task<IActionResult> Upload([FromRoute]Guid taskId)
        {
            var userId = Request.Headers["userid"];
            var portfolioId = Guid.Parse(Convert.ToString(Request.Headers["portfolioId"]));
            var file = Request.Form.Files[0];
            if (file.Length > 0)
            {
                string webRootPath = _hostingEnvironment.ContentRootPath;
                string path = Path.Combine(webRootPath, "Documents");
                string fileName = DateTime.Now.ToString("yyyyMMddHHmmssffff") + "_" + Convert.ToString(taskId) + "_" + file.FileName;
                using (var fs = new FileStream(Path.Combine(path, fileName), FileMode.Create))
                {
                    await file.CopyToAsync(fs);
                    Document document = new Document
                    {
                        TaskId = taskId,
                        PortfolioId = portfolioId,
                        DocumentName = file.FileName,
                        SystemDocumentName = fileName,
                        DocumentType = Path.GetExtension(file.FileName),
                        CreatedBy = userId,
                    };
                    _context.Document.Add(document);
                    await _context.SaveChangesAsync();
                    return Ok();
                }

            }
            return BadRequest();
        }
    }
}
