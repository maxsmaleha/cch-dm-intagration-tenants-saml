using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication3.Filters
{
    public class CookiesFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var curUserId = !filterContext.HttpContext.User.Identity.IsAuthenticated
                ? Guid.NewGuid().ToString()
                : filterContext.HttpContext.User.Identity.GetUserId();
            var currentCookie = filterContext.HttpContext.Request.Cookies.Get("docket_manager_session_guid");
            if (currentCookie == null || string.IsNullOrEmpty(currentCookie.Value))
            {
                var cookie = new HttpCookie("docket_manager_session_guid", curUserId) { Expires = DateTime.Now.AddDays(14) };
                //filterContext.HttpContext.Response.Cookies.Add(cookie);
                filterContext.HttpContext.Request.Cookies.Set(cookie);
                filterContext.HttpContext.Response.Cookies.Set(cookie);
            }
            else
            {
                if (filterContext.HttpContext.User.Identity.IsAuthenticated
                    && currentCookie.Value != filterContext.HttpContext.User.Identity.GetUserId())
                {
                    var cookie = new HttpCookie("docket_manager_session_guid", curUserId) { Expires = DateTime.Now.AddDays(14) };
                    //filterContext.HttpContext.Response.Cookies.Set(cookie);
                    //filterContext.HttpContext.Request.Cookies.Set(cookie);
                    filterContext.HttpContext.Response.Cookies.Set(cookie);
                }
            }
        }

        /*public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var curUserId = !filterContext.HttpContext.User.Identity.IsAuthenticated
                ? Guid.NewGuid().ToString()
                : filterContext.HttpContext.User.Identity.GetUserId();
            var cookie = new HttpCookie("docket_manager_session_guid", curUserId) { Expires = DateTime.Now.AddDays(14) };
            var currentCookie = filterContext.HttpContext.Request.Cookies.Get("docket_manager_session_guid");
            if (currentCookie == null || string.IsNullOrEmpty(currentCookie.Value))
            {
                filterContext.HttpContext.Response.Cookies.Add(cookie);
            }
            else
            {
                if (filterContext.HttpContext.User.Identity.IsAuthenticated
                    && currentCookie.Value != filterContext.HttpContext.User.Identity.GetUserId())
                {
                    filterContext.HttpContext.Response.Cookies.Set(cookie);
                }
            }
        }*/
    }
}