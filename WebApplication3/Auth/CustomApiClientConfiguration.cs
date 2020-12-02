using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace WebApplication3.Auth
{
    public class CustomApiClientConfiguration : Aurigma.BackOffice.ApiClientConfiguration
    {
        public Func<Task<string>> TokenProvider;

        public override Task<string> GetAuthorizationTokenAsync()
        {
            return TokenProvider();
        }
    }
}