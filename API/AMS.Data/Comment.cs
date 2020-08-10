using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AMS.Data
{
    public class Comment : EntityBase
    {
        public string CommentText { get; set; }
        public Guid TaskId { get; set; }
        public Guid PortfolioId { get; set; }
    }
}
