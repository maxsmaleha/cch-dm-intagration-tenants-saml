using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using Aurigma.BackOffice;
using WebApplication3.Models;
using WebApplication3.ViewModels;

namespace WebApplication3.Controllers
{
    public class ProductsController : Controller
    {
        private readonly ITemplatesApiClient _templatesClient;
        private readonly IEcommerceProductReferencesApiClient _productsReferencesClient;

        public ProductsController(ITemplatesApiClient templatesClient, IEcommerceProductReferencesApiClient productsClient)
        {
            _templatesClient = templatesClient;
            _productsReferencesClient = productsClient;
        }

        public async Task<ActionResult> Index()
        {
            var templates = await _templatesClient.GetAllAsync();
            var references = await _productsReferencesClient.GetAllAsync();

            return View("Products", new ProductsViewModel
            {
                Products = TestProducts.Products,
                Templates = templates.Items.OrderBy(x => x.Id).ToList(),
                References = references.Items
            });
        }

        public ActionResult Product(int id)
        {
            return View(new ProductPageViewModel { Product = TestProducts.Products[id] });
        }

        public async Task<ActionResult> Connect(ProductConnectTemplateViewModel model)
        {
            var result = await _productsReferencesClient.CreateAsync(
                model.ProductId.ToString(),
                ecommerceSystemId: int.Parse(ConfigurationManager.AppSettings["BackOfficeEcommerceSystemId"]),
                templateId: model.TemplateId);

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        public async Task<ActionResult> Disconnect(ProductConnectTemplateViewModel model)
        {
            var result = await _productsReferencesClient.DeleteAsync(
                model.ProductId.ToString(),
                ecommerceSystemId: int.Parse(ConfigurationManager.AppSettings["BackOfficeEcommerceSystemId"]),
                templateId: model.TemplateId);

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }
}