using AMS.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskStatus = AMS.Data.TaskStatus;

namespace AMS.API.Persistence
{
    public class AuditingSystemContext : DbContext
    {
        public AuditingSystemContext(DbContextOptions<AuditingSystemContext> options)
        : base(options)
        { }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite("Data Source=auditingsystem.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskStatus>().HasData(
                new TaskStatus
                {
                    Id = 1,
                    Name = "Sent",
                    Description = "Task Created and sent"
                },
                 new TaskStatus
                 {
                     Id = 2,
                     Name = "Recieved",
                     Description = "Task responded by client"
                 },
                  new TaskStatus
                  {
                      Id = 3,
                      Name = "Completed",
                      Description = "Task Completed by auditor"
                  }
            );
        }

        public DbSet<Comment> Comment { get; set; }
        public DbSet<Document> Document { get; set; }
        public DbSet<DocumentTransaction> DocumentTransaction { get; set; }
        public DbSet<Portfolio> Portfolio { get; set; }
        public DbSet<TaskStatus> TaskStatus { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<TaskAssignment> TaskAssignment { get; set; }
        public DbSet<Data.Task> Task { get; set; }
    }
}
