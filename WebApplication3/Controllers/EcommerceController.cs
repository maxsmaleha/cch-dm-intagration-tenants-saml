using Aurigma.BackOffice;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebApplication3.Models;
using WebApplication3.ViewModels;

namespace WebApplication3.Controllers
{
    public class EcommerceController : Controller
    {
        private readonly ITemplatesApiClient _templatesClient;
        private readonly IEcommerceProductReferencesApiClient _productsReferencesClient;
        private readonly IProjectsApiClient _projectsClient;

        public EcommerceController(ITemplatesApiClient templatesClient,
            IEcommerceProductReferencesApiClient productsClient,
            IProjectsApiClient projectsClient)
        {
            _templatesClient = templatesClient;
            _productsReferencesClient = productsClient;
            _projectsClient = projectsClient;
        }

        // GET: Ecommerce collection page
        public async Task<ActionResult> Index()
        {
            // get templates from BackOffice
            var templates = await _templatesClient.GetAllAsync();
            // get product-template references
            var references = await _productsReferencesClient.GetAllAsync();

            return View("Collection", new ProductsViewModel
            {
                Products = TestProducts.Products,
                Templates = templates.Items.OrderBy(x => x.Id).ToList(),
                References = references.Items
            });
        }

        // GET: Ecommerce product page
        public ActionResult Product(int id)
        {
            return View(new ProductPageViewModel { Product = TestProducts.Products[id] });
        }

        public async Task<ActionResult> Cart()
        {
            var ecommercePreffix = ConfigurationManager.AppSettings["EcommerceUserIdPreffix"];
            var userId = ecommercePreffix + "_" + Request.Cookies["docket_manager_session_guid"].Value;
            var data = new List<EcommerceProjectModel>();
            using (var db = ApplicationDbContext.Create())
            {
                var projects = await db.Projects.AsNoTracking().Where(x => x.UserId == userId).ToListAsync();
                foreach (var project in projects)
                {
                    var currentProject = await _projectsClient.GetAsync(project.ProjectId);
                    var currentProduct = TestProducts.Products[project.ProductId];
                    data.Add(new EcommerceProjectModel()
                    {
                        Project = currentProject,
                        EcommerceProduct = currentProduct
                    });
                }
            }

            return View(data);
        }
    }
}