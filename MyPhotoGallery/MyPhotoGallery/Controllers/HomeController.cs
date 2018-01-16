using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MyPhotoGallery.Models;

namespace MyPhotoGallery.Controllers
{
    public class HomeController : Controller
    {
        private readonly string _filePath = System.Web.HttpContext.Current.Server.MapPath("/App_Data/data_image.xml");
        private readonly string _imageFolder = System.Web.HttpContext.Current.Server.MapPath("/images/");

        public ActionResult Index()
        {
            var model = XmlHelper.GetList(_filePath);
            return View(model);
        }

        public ActionResult List()
        {
            var model = XmlHelper.GetList(_filePath);
            return View(model);
        }

        public ActionResult Create()
        {
            return View("Edit", new ImageModel());
        }

        public ActionResult Edit(Guid id)
        {
            var model = XmlHelper.GetById(_filePath, id);
            return View(model);
        }

        [HttpPost]
        public ActionResult Edit(ImageModel model, HttpPostedFileBase imgFile)
        {
            if (imgFile != null)
            {
                var info = new System.IO.FileInfo(imgFile.FileName);
                var fileName = model.Title.MakeFriendlyFileName();
                var i = 1;
                while (System.IO.File.Exists(Path.Combine(_imageFolder, fileName + info.Extension)))
                {
                    fileName = fileName + "-" + i;
                    i++;
                }
                model.ImageUrl = "/images/" + fileName + info.Extension;
                imgFile.SaveAs(Path.Combine(_imageFolder, fileName + info.Extension));
            }

            if (model.Id == Guid.Empty)
            {
                model.Id = Guid.NewGuid();
                model.CreatedDate = DateTime.Now;
            }

            model.UpdatedDate = DateTime.Now;

            XmlHelper.Save(_filePath, model, model.Id);
            return RedirectToAction("List");

        }

    }
}