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
            var data = new List<EcommerceProjectModel>();
            using (var db = ApplicationDbContext.Create())
            {
                foreach (var project in projects.Items)
                {
                    var currentProject = await _projectsClient.GetAsync(project.Id);
                    var currentProduct = currentProject.Products.First();
                    var ecommerceProject = await db.Projects.FirstOrDefaultAsync(x => x.ProjectId == project.Id && x.UserId == currentProduct.UserId);
                    if (ecommerceProject != null)
                    {
                        var product = TestProducts.Products[ecommerceProject.ProductId];
                        data.Add(new EcommerceProjectModel()
                        {
                            Project = currentProject,
                            EcommerceProduct = product
                        });
                    }
                }
            }

            return View(data);
        }

        /// <summary>
        /// Get detailed model of all projects
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> Edit(int id)
        {
            var project = await _projectsClient.GetAsync(id);
            var model = new EcommerceProjectModel();
            using (var db = ApplicationDbContext.Create())
            {
                var currentProduct = project.Products.First();
                var ecommerceProject = await db.Projects.FirstOrDefaultAsync(x => x.ProjectId == project.Id && x.UserId == currentProduct.UserId);
                var product = TestProducts.Products[ecommerceProject.ProductId];
                model.EcommerceProduct = product;
                model.Project = project;
            }

            return View(model);
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

            var result = await _projectsClient.CreateAsync(body: new CreateProjectDto
            {
                CustomerId = model.UserId,
                CustomerName = model.UserId,
                OrderId = Guid.NewGuid().ToString(),
                GroupId = Guid.NewGuid().ToString(),
                EcommerceProductId = model.ProductId.ToString(),
                Products = products
            });

            using (var db = ApplicationDbContext.Create()) 
            {
                db.Projects.Add(new ProjectDbModel()
                 {
                     ProductId = model.ProductId,
                     ProjectId = result.Id,
                     UserId = model.UserId
                 });
                await db.SaveChangesAsync();
            }

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        /// <summary>
        /// Update project
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ActionResult> Update([FromBody] ProjectModel model)
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

            var result = model.ProjectId == null
                ? await _projectsClient.CreateAsync(body: new CreateProjectDto
                {
                    CustomerId = model.UserId,
                    CustomerName = model.UserId,
                    OrderId = Guid.NewGuid().ToString(),
                    GroupId = Guid.NewGuid().ToString(),
                    EcommerceProductId = model.ProductId.ToString(),
                    Products = products
                })
                : await _projectsClient.UpdateAsync(projectId: (int)model.ProjectId, body: new UpdateProjectDto
                {
                    CustomerId = model.UserId,
                    CustomerName = model.UserId,
                    Products = products
                });
            if (model.ProjectId == null)
            {
                using (var db = ApplicationDbContext.Create())
                {
                    db.Projects.Add(new ProjectDbModel()
                    {
                        ProductId = model.ProductId,
                        ProjectId = result.Id,
                        UserId = model.UserId
                    });
                    await db.SaveChangesAsync();
                }
            }

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }
}