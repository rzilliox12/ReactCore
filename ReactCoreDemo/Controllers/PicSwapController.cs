using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ReactCoreDemo.Controllers
{
    public class PicSwapController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}