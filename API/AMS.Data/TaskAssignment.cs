using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AMS.Data
{
    public class TaskAssignment : EntityBase
    {
        public Guid PortfolioId { get; set; }
        public Guid TaskId { get; set; }
        public Guid UserId { get; set; }
    }
}
