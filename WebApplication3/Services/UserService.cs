using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class UserService
    {
        private readonly HttpClient _client;

        public UserService()
        {
            _client = new HttpClient();
        }

        public async Task MergeUsers(OnLoginModel model)
        {
            var url = $"{ConfigurationManager.AppSettings["BackOfficeBackendUrl"]}/api/v1/tenants/{ConfigurationManager.AppSettings["TenantId"]}/integrations/onlogin";
            var content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync(url, content);
            var c = await response.Content.ReadAsStringAsync();
        }
    }
}