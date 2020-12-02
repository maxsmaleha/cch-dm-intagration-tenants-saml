using IdentityModel.Client;
using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace WebApplication3.Services
{
    public class TokenService
    {
        private class TokenInfo
        {
            public string AccessToken { get; set; }
            public DateTime ExpiryTime { get; set; }
        }

        private readonly object _lockObject = new object();

        private readonly HttpClient _client;
        private TokenInfo _tokenInfo;

        public TokenService(HttpClient client)
        {
            _client = client;
        }

        public async Task<string> GetTokenAsync()
        {
            lock (_lockObject)
            {
                if (_tokenInfo != null && _tokenInfo.ExpiryTime >= DateTime.UtcNow)
                {
                    return _tokenInfo.AccessToken;
                }

                _tokenInfo = null;
            }

            var tokenResponse =
                await _client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
                {
                    Address = ConfigurationManager.AppSettings["BackOfficeBackendUrl"] + "connect/token",               // IdentityProvider token url (BackOffice token url)

                    ClientId = ConfigurationManager.AppSettings["BackOfficeClientId"],                                           // Client Id
                    ClientSecret = ConfigurationManager.AppSettings["BackOfficeClientSecret"],           // Client Secret
                });

            if (tokenResponse.IsError)
            {
                throw new HttpException((int)HttpStatusCode.InternalServerError, "Could not retrieve token.");
            }

            lock (_lockObject)
            {
                if (_tokenInfo == null)
                {
                    _tokenInfo = new TokenInfo()
                    {
                        AccessToken = tokenResponse.AccessToken,
                        ExpiryTime = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn),
                    };
                }
            }

            return tokenResponse.AccessToken;
        }
    }
}