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
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var curUserId = !filterContext.HttpContext.User.Identity.IsAuthenticated
                ? Guid.NewGuid().ToString()
                : filterContext.HttpContext.User.Identity.GetUserId();
            if (string.IsNullOrEmpty(filterContext.HttpContext.Request.Cookies.Get("docket_manager_session_guid")?.Value))
            {
                filterContext.HttpContext.Response.Cookies.Add(new HttpCookie("docket_manager_session_guid", curUserId));
            }
            else
            {
                if (filterContext.HttpContext.User.Identity.IsAuthenticated 
                    && filterContext.HttpContext.Request.Cookies.Get("docket_manager_session_guid").Value != filterContext.HttpContext.User.Identity.GetUserId())
                {
                    filterContext.HttpContext.Response.Cookies.Set(new HttpCookie("docket_manager_session_guid", filterContext.HttpContext.User.Identity.GetUserId()));
                }
            }
        }
    }
}