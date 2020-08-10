using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AMS.Data
{
    public class Task : EntityBase
    {
        [Required]
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public string StartDate { get; set; }
        public string CompleteDate { get; set; }
        public int TaskStatusId { get; set; }
        public Guid PortfolioId { get; set; }

    }
}
