using System.Configuration;
using System.Data.Entity;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Aurigma.BackOffice;
using Autofac;
using Autofac.Integration.Mvc;
using WebApplication3.Auth;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // automatic migrations
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, WebApplication3.Migrations.Configuration>());

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            SettingManager.Init();

            var builder = new ContainerBuilder();

            builder.RegisterControllers(Assembly.GetExecutingAssembly());

            ConfigureBackOfficeApiClient(builder);

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }

        private void ConfigureBackOfficeApiClient(ContainerBuilder builder)
        {
            builder.RegisterType<HttpClient>()                                               // Use single http client for all clients
                .AsSelf()
                .SingleInstance();

            builder.RegisterType<TokenService>()                                             // Add TokenService to handle token aquiring
                .AsSelf()
                .SingleInstance();

            builder.RegisterType<CustomApiClientConfiguration>()                            // Registering custom configuration for API clients
                .As<Aurigma.BackOffice.IApiClientConfiguration>()
                .InstancePerRequest()
                .OnActivating(e =>                                                           // Setup clients configuration in DI callback
                {
                    var tokenService = e.Context.Resolve<TokenService>();

                    e.Instance.ApiUrl = ConfigurationManager.AppSettings["BackOfficeBackendUrl"]; // BackOffice service API url
                    e.Instance.TokenProvider = () => tokenService.GetTokenAsync();           // Setup TokenProvider function using TokenService
                });

            builder.RegisterType<TemplatesApiClient>()                                         // Registering API clients
                .As<ITemplatesApiClient>();
            builder.RegisterType<EcommerceProductReferencesApiClient>()
                .As<IEcommerceProductReferencesApiClient>();

            builder.RegisterType<ProjectsApiClient>()
                .As<IProjectsApiClient>();
        }

    }
}
