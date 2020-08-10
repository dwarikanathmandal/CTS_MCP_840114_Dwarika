using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AMS.Data
{
    public class Document : EntityBase
    {
        public string DocumentName { get; set; }
        public string SystemDocumentName { get; set; }
        public string DocumentType { get; set; }
        public Guid TaskId { get; set; }
        public Guid PortfolioId { get; set; }
    }
}
