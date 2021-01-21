using System.Collections.Generic;

namespace WebApplication3.Models
{
    public class ProjectModel
    {
        public long Id { get; set; }
        // ProjectId from BackOffice
        public int ProductId { get; set; }
        public int? ProjectId { get; set; }
        public string UserId { get; set; }
        public List<LineItem> LineItems { get; set; }
    }

    public class ProjectDbModel
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public int ProjectId { get; set; }
        public int ProductId { get; set; }
    }

    public class EcommerceProjectModel
    {
        public Aurigma.BackOffice.ProjectDetailedDto Project { get; set; }

        public ProductModel EcommerceProduct { get; set; }
    }

    /// <summary>
    /// Line item is 1 item from cart. In real ecommerce system order contains from 1 or more line items.
    /// </summary>
    public class LineItem
    {
        public string Key { get; set; }

        public int Quantity { get; set; }

        public string _UserId { get; set; }

        public List<string> _StateId { get; set; }

        public HiddenData _Hidden { get; set; }
        public Dictionary<string, object> _Fields { get; set; }
    }

    public class HiddenData
    {
        public string Snapshot { get; set; }

        public List<string> Images { get; set; }

        public List<string> DownloadUrls { get; set; }

        public string PdfUrl { get; set; }
    }
}