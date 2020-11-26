using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    public class ProjectsApiController : ApiController
    {
        // GET api/<controller>
        [Route("api/users/{userId}/projects")]
        public async Task<IEnumerable<ProjectDbModel>> GetAll(string userId)
        {
            //return new List<string>();
            return await ApplicationDbContext.Create().Projects.AsNoTracking().Where(x => x.UserId == userId).ToListAsync();
        }

        // GET api/<controller>/5
        [Route("api/projects/{id}")]
        public async Task<ProjectDbModel> Get(int id)
        {
            return await ApplicationDbContext.Create().Projects.AsNoTracking().Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        // POST api/<controller>
        [Route("api/projects/create")]
        public async Task<IHttpActionResult> Create([FromBody]ProjectModel value)
        {
            var projectForDb = new ProjectDbModel()
            {
                UserId = value.UserId,
                LineItems = Newtonsoft.Json.JsonConvert.SerializeObject(value.LineItems)
            };
            var db = ApplicationDbContext.Create();
            db.Projects.Add(projectForDb);
            await db.SaveChangesAsync();
            return Ok();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}