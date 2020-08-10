using System;
using System.Collections.Generic;
using System.Text;

namespace AMS.Data
{
    public class Portfolio : EntityBase
    {
        public string ClientCode { get; set; }
        public string ClientName { get; set; }
        public string PortfolioName { get; set; }
        public string PortfolioDescription { get; set; }
    }
}
