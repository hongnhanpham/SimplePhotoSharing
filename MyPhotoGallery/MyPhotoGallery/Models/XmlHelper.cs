using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace MyPhotoGallery.Models
{
    public static class XmlHelper
    {
        public static bool NewLineOnAttributes { get; set; }

        /// <summary>
        /// Serializes an object to an XML string, using the specified namespaces.
        /// </summary>
        public static string ToXml(object obj, XmlSerializerNamespaces ns)
        {
            Type T = obj.GetType();

            var xs = new XmlSerializer(T);
            var ws = new XmlWriterSettings { Indent = true, NewLineOnAttributes = NewLineOnAttributes, OmitXmlDeclaration = true };

            var sb = new StringBuilder();
            using (XmlWriter writer = XmlWriter.Create(sb, ws))
            {
                xs.Serialize(writer, obj, ns);
            }
            return sb.ToString();
        }

        /// <summary>
        /// Serializes an object to an XML string.
        /// </summary>
        public static string ToXml(object obj)
        {
            var ns = new XmlSerializerNamespaces();
            ns.Add("", "");
            return ToXml(obj, ns);
        }

        /// <summary>
        /// Deserializes an object from an XML string.
        /// </summary>
        public static T FromXml<T>(string xml)
        {
            XmlSerializer xs = new XmlSerializer(typeof(T));
            using (StringReader sr = new StringReader(xml))
            {
                return (T)xs.Deserialize(sr);
            }
        }
        
        public static int Save(string filePath, ImageModel obj, Guid attr)
        {
            if (!File.Exists(filePath))
            {
                var ws = new XmlWriterSettings { Indent = true, NewLineOnAttributes = NewLineOnAttributes, OmitXmlDeclaration = true };
                using (XmlWriter writer = XmlWriter.Create(filePath, ws))
                {
                    writer.Close();
                }
            }
            
            var xmlDoc = new XmlDocument();
            xmlDoc.Load(filePath);
            if (xmlDoc.DocumentElement == null)
                return -1;
            var node = xmlDoc.DocumentElement.SelectSingleNode(string.Format("/Photos/Img[@id='{0}']", attr));
            if (node != null)
            {
                if (obj.Timeline.HasValue)
                    node.Attributes["Time"].Value = obj.Timeline.Value.ToString("yyyyMMdd");
                else
                    node.Attributes["Time"].Value = string.Empty;

                node.InnerXml = ToXml(obj);
                xmlDoc.Save(filePath);
                return 1;
            }

            var xelement = xmlDoc.CreateElement("Img");
            if (obj.Timeline.HasValue)
                xelement.SetAttribute("Time", obj.Timeline.Value.ToString("yyyyMMdd"));
            else
                xelement.SetAttribute("Time", string.Empty);

            xelement.InnerXml = ToXml(obj);
            xelement.SetAttribute("id", attr.ToString());
            if (xmlDoc.DocumentElement != null)
                xmlDoc.DocumentElement.AppendChild(xelement);

            xmlDoc.Save(filePath);
            return 1;
        }

        public static ImageModel GetById(string filePath, Guid id)
        {
            var xmlDoc = new XmlDocument();
            xmlDoc.Load(filePath);
            if (xmlDoc.DocumentElement == null)
                return new ImageModel() { Id = id };

            var node = xmlDoc.DocumentElement.SelectSingleNode(string.Format("/Photos/Img[@id='{0}']", id));
            if (node != null)
                return FromXml<ImageModel>(node.InnerXml);
            return new ImageModel() { Id = id };
        }

        public static List<ImageModel> GetList(string filePath)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(filePath);

            if (doc.DocumentElement == null)
                return null;

            var data = new List<ImageModel>();
            var xmlElements = doc.DocumentElement.SelectNodes("/Photos/Img");
            if (xmlElements != null)
            {
                data = (from XmlNode xmlElement in xmlElements
                              select FromXml<ImageModel>(xmlElement.InnerXml)).ToList();
            }
            return data;
        }

        public static Paging GetList(int page, int pagesize, bool isSort, string filePath)
        {
            XDocument doc = XDocument.Load(filePath);

            var xmlElements = doc.Descendants("Img");
            if (isSort)
                xmlElements = xmlElements.OrderByDescending(x => x.Attributes("Time"));

            var model = new Paging {Total = xmlElements.Count(), Page = page, PageSize = pagesize};
            xmlElements = xmlElements.Skip(pagesize*(page - 1)).Take(pagesize).ToList();
            model.Images = (from XElement xmlElement in xmlElements
                        select FromXml<ImageModel>(xmlElement.Descendants("Image").First().ToString())).ToList();
            return model;
        }
    }
}