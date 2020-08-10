using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMS.API.Models
{
    public class TaskModel
    {       
        public Guid Id { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public string StartDate { get; set; }
        public string CompleteDate { get; set; }
        public int TaskStatusId { get; set; }
        public Guid PortfolioId { get; set; }
        public List<Guid> UserIds { get; set; }
    }
}
