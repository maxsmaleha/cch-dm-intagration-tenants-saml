using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aurigma.BackOffice;

namespace WebApplication3.Models
{
    public class ProductsViewModel
    {
        public List<ProductModel> Products { get; set; } = new List<ProductModel>();
        public ICollection<TemplateDto> Templates { get; set; }
        public ICollection<EcommerceProductReferenceExtendedDto> References { get; set; }
    }
}