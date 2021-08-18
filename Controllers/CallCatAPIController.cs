using Microsoft.AspNetCore.Mvc;
using RestSharp;


namespace ClearBankTest.Controllers
{
    [Route("api/[controller]")]
    public class CallCatAPIController : Controller
    {
        
        [HttpGet("[action]")]
        public string getCatBreeds()
        {
            var client = new RestClient("https://api.thecatapi.com/v1/breeds?attach_breed=0");
            var request = new RestRequest(Method.GET);
            request.AddHeader("e3fcee6a-af56-45f6-8f14-2ec722b852b1", "DEMO-API-KEY");
            IRestResponse response = client.Execute(request);
            return response.Content;
        }
    }
}
