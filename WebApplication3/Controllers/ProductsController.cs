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

        public ProductsController(ITemplatesApiClient templatesClient,
            IEcommerceProductReferencesApiClient productsClient)
        {
            _templatesClient = templatesClient;
            _productsReferencesClient = productsClient;
        }

        /// <summary>
        /// Create reference between product in this app with template in BackOffice
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ActionResult> Connect(ProductConnectTemplateViewModel model)
        {
            try
            {
                var result = await _productsReferencesClient.CreateAsync(
                    model.ProductId.ToString(),
                    ecommerceSystemId: int.Parse(ConfigurationManager.AppSettings["BackOfficeEcommerceSystemId"]),
                    templateId: model.TemplateId);
            }
            catch (System.Exception e)
            {
                var e1 = e;
            }

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        /// <summary>
        /// Delete reference between product in this app with template in BackOffice
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
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