using System;
using System.Collections.Generic;
using System.Text;

namespace AMS.Data
{
    public class DocumentTransaction : EntityBase
    {
        public Guid TaskId {get;set;}
        public Guid DocumentId { get; set; }        
        public string TransactionType { get; set; } //Request/Response
        public DateTime TransactionDate { get; set; }
    }
}
