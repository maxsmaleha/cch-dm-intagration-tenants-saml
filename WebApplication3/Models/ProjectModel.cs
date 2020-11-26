using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class ProjectModel
    {
        public long Id { get; set; }

        public string UserId { get; set; }
        public List<LineItem> LineItems { get; set; }
    }

    public class ProjectDbModel
    {
        public long Id { get; set; }

        public string UserId { get; set; }
        public string LineItems { get; set; }
    }

    public class LineItem
    {
        public string Key { get; set; }

        public int Quantity { get; set; }

        public string UserId { get; set; }

        public List<string> StateId { get; set; }

        public HiddenData Hidden { get; set; }
    }

    public class HiddenData
    {
        public string Snapshot { get; set; }

        public List<string> Images { get; set; }

        public List<string> DownloadUrls { get; set; }
    }
}