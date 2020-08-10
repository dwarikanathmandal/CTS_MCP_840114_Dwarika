using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AMS.Data
{
    public class User : EntityBase
    {  
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string Initial { get; set; }
        public string Email { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserId { get; set; } // firebase user id.
        public string UserType { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
