using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Globalization;
using System.Web.Script.Serialization;
using Newtonsoft.Json;

namespace DoAn4
{
    public class Class1
    {

    }
    [Serializable]
    public class ResultAction
    {
        public ActionState State { set; get; }
        public string Source { get; set; }
        public string Message { get; set; }
        public int TotalCount { set; get; }
        public int EffectCount { set; get; }
        public int SucceedCount { set; get; }
        public List<int> Ids { set; get; }
        private object odata;
        public object OData { get { return odata; } set { odata = value; IsQuery = true; } }
        public object ObjMessage { get; set; }
        public bool IsQuery { get; set; }
        public int ID { get; set; }
        public double phantram { get; set; }
        public bool Erros
        {
            get
            {
                if (State == ActionState.Succeed)
                    return false;
                else return true;
            }
        }
        public ResultAction()
        {
            Ids = new List<int>();
            State = ActionState.Succeed;
        }
        public ResultAction(ActionState _actionState, string _Message)
        {
            State = _actionState;
            Message = _Message;
        }
    }
    [Serializable]
    public enum ActionState
    {
        /// <summary>
        /// 0
        /// </summary>
        Succeed,
        /// <summary>
        /// 1
        /// </summary>
        Warning,
        /// <summary>
        /// 2
        /// </summary>
        Error
    }
    [Serializable]
    public class JsonGrid
    {
        public Object Data { get; set; }
        public int Total { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public int draw { get; set; }
        public string qq { get; set; }
        public GridRequest Request { get; set; }
        public JsonGrid(object oData, int oRecordsTotal = 0, int _take = 0, int _page = 0, int _draw = 0, string _qq = "")
        {
            recordsTotal = recordsFiltered = Total = oRecordsTotal;
            Data = oData;
            draw = _draw;

            Request = new GridRequest()
            {
                page = _page,
                take = _take,
                start = (_page - 1) * _take
            };
            if (_take * _page > 0 && oRecordsTotal <= (_page - 1) * _take)
                Request.page = 1;
            qq = _qq;
        }
    }
    [Serializable]
    public struct GridSort
    {
        public string field { get; set; }
        public bool dir { get; set; }
    }
    [Serializable]
    public struct Sort
    {
        public string field { get; set; }
        public string dir { get; set; }
    }
    [Serializable]
    public class Filter
    {
        public string field { get; set; }
        public string phuongthuc { get; set; }
        public string value { get; set; }
        public List<Filter> filters { get; set; }
        public string logic { get; set; }
    }

    public class GridRequest
    {
        public int take { get; set; }
        public int skip { get; set; }
        public int page { get; set; }
        public int pageSize { get; set; }
        public int start { get; set; }
        public int ItemID { get; set; }
        public List<Sort> sort { get; set; }
        public string Field { get; set; }
        public bool FieldOption { get; set; }
        public List<Sort> group { get; set; }
        public Filter filter { get; set; }
        public GridRequest()
        {
            sort = new List<Sort>();
        }

    }

    [Serializable()]
    public class LookupData
    {
        int intID;
        public int ID
        {
            get { return intID; }
            set { intID = value; }
        }

        string strTitle;
        public string Title
        {
            get { return strTitle; }
            set { strTitle = value; }
        }

        public LookupData(int id, string title)
        {
            this.Title = title;
            this.ID = id;
        }
        public LookupData()
        {
            ID = 0;
            Title = string.Empty;
        }
    }

    public class UpdateException : Exception
    {
        public UpdateException()
        {
        }

        public UpdateException(string message)
            : base(message)
        {
        }

        public UpdateException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
    public class DateTimeExcep : Exception
    {
        public override string ToString()
        {
            return base.ToString();
        }
        public override string Message
        {
            get
            {
                return "Sai định dạng dd/mm/yyyy hoặc ngày không tồn tại";
            }
        }
    }

    public class FileAttach
    {
        private string strName;
        public string Name
        {
            get { return strName; }
            set { strName = value; }
        }

        private string strUrl;
        public string ExtenFile
        {
            get
            {
                if (!string.IsNullOrEmpty(this.Name))
                    return System.IO.Path.GetExtension(this.Name).ToLower().Substring(1);
                else return "file";
            }
        }
        public string Url
        {
            get { return strUrl; }
            set { strUrl = value; }
        }

        private byte[] byteDataFile;

        public byte[] DataFile
        {
            get { return byteDataFile; }
            set { byteDataFile = value; }
        }
        public FileAttach(string name, string url)
        {
            Name = name;
            Url = url;
        }

        public FileAttach(string name, byte[] data)
        {
            this.Name = name;
            this.DataFile = data;
        }

        public FileAttach()
        {
            Name = string.Empty;
            Url = string.Empty;
        }
    }
    [Serializable()]
    public class BaseFileAttach
    {

        public string Name
        {
            get;
            set;
        }


        public string Url
        {
            get;
            set;
        }
    }
    [Serializable]
    public class FileAttachForm
    {
        private string fileName;
        public string FileName
        {
            get { return fileName; }
            set { fileName = value; }
        }
        private string fileServer;

        public string FileServer
        {
            get { return fileServer; }
            set { fileServer = value; }
        }

        public FileAttachForm()
        {

        }

        public FileAttachForm(string _filename, string _fileserver)
        {
            fileName = _filename;
            fileServer = _fileserver;
        }
    }
}
