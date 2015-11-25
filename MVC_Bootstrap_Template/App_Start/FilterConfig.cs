using System.Web;
using System.Web.Mvc;

namespace MVC_Bootstrap_Template
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
