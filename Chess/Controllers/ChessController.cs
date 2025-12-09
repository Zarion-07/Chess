using AspNetCoreGeneratedDocument;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Chess.Controllers
{
    public class ChessController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}

        
        