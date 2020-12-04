using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Aurigma.BackOffice;
using Newtonsoft.Json;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    public class ProjectsController : Controller
    {
        private readonly IProjectsApiClient _projectsClient;

        public ProjectsController(IProjectsApiClient projectsClient)
        {
            _projectsClient = projectsClient;
        }

        /// <summary>
        /// Get detailed model of all projects
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> Index()
        {
            var projects = await _projectsClient.GetAllAsync();
            var data = new List<ProjectDetailedDto>();
            foreach (var project in projects.Items)
            {
                data.Add(await _projectsClient.GetAsync(project.Id));
            }

            return View(data);
        }

        /// <summary>
        /// Get project preview url
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task<string> GetPreviewUrl(int projectId)
        {
            var project = await _projectsClient.GetAsync(projectId);
            var product = project.Products.First();
            var imageUrl = JsonConvert.DeserializeObject<HiddenData>(product.Hidden.ToString()).Images[0];
            return imageUrl;
        }

        /// <summary>
        /// Get project pdf url.
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task<string> GetPdfUrl(int projectId)
        {
            var project = await _projectsClient.GetAsync(projectId);
            var product = project.Products.First();
            var result = await _projectsClient.GetProjectPdfUrlAsync(projectId, product.UserId,
                JsonConvert.DeserializeObject<List<string>>(product.StateId.ToString()).First());
            return result.Url;
        }

        /// <summary>
        /// Create project
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ActionResult> Create([FromBody] ProjectModel model)
        {
            var products = model.LineItems.Select(x =>
                new ProjectProductParametersDto
                {
                    UserId = x.UserId,
                    StateId = x.StateId,
                    Quantity = x.Quantity,
                    Hidden = x.Hidden,
                    Key = x.Key,
                    Fields = new Dictionary<string, object>()
                }).ToList();

            await _projectsClient.CreateAsync(body: new CreateProjectDto
            {
                CustomerId = model.UserId,
                CustomerName = model.UserId,
                OrderId = Guid.NewGuid().ToString(),
                GroupId = Guid.NewGuid().ToString(),
                EcommerceProductId = model.ProductId.ToString(),
                Products = products
            });

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }
}