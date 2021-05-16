using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;

namespace DoAn4
{
    [Serializable]
    public class BaseData : JsonException
    {
        public  void RenderJson(object jsonObject)
        {
            System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            //string strJsonMessage = JsonConvert.SerializeObject(jsonObject);
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = "application/json";
            HttpContext.Current.Response.Write(jsonObject);
            HttpContext.Current.Response.End();
        }

        public  void RenderMessage(ResultAction message)
        {
            System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            //string strJsonMessage = JsonConvert.SerializeObject(message);
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = "application/json";
            HttpContext.Current.Response.Write(message);
            HttpContext.Current.Response.End();
        }
        public  void ResponseData(object oTT)
        {
            System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            //string strJsonMessage = oSerializer.(oTT);
            
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = "application/json; charset=utf-8";
            HttpContext.Current.Response.Write(JsonConvert.SerializeObject(oTT));
            HttpContext.Current.Response.End();
        }
    }
}