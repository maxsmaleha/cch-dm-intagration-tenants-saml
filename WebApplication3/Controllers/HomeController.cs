﻿using System.Configuration;
using System.Threading.Tasks;
using System.Web.Mvc;
using Aurigma.BackOffice;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult BackOffice()
        {
            var model = new BackOfficeViewModel
            {
                LoginUrl = $"{ConfigurationManager.AppSettings["BackOfficeFrontendUrl"]}account/login/saml/" + ConfigurationManager.AppSettings["TenancyName"]
            };

            return View("BackOffice", model);
        }

    }
}