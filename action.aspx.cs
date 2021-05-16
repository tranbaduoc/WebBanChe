using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DoAn4
{
    public partial class action : System.Web.UI.Page
    {
        public InfoDataContext db  { get; set; }
        public DataSet ds { get; set; }
        public tbl_Comment cmt { get; set; }
        public List<tbl_Comment> lstcmt { get; set; }
        public tbl_Product pro { get; set; }
        public DataTable dt { get; set; }
        public BaseData goitin { get; set; }
        protected void Page_Load(object sender, EventArgs e)
        {
            lstcmt = new List<tbl_Comment>();
            goitin = new BaseData();
            ResultAction data = new ResultAction();
            string actions = Request["do"];
            db = new InfoDataContext();
            actions = actions.Trim().ToLower();
            switch (actions)
            {
                case "addcmt":
                    cmt = new tbl_Comment();
                    cmt.Cmt_Content = Request["Cmt_Content"];
                    cmt.NameUser = Request["Username"];
                    cmt.Product_ID = Convert.ToInt32(Request["Product_ID"]);
                    cmt.User = Request["User"];
                    cmt.Create = DateTime.Now;
                    if (cmt.Product_ID > 0 && !string.IsNullOrEmpty(cmt.User) && !string.IsNullOrEmpty(cmt.Cmt_Content) && !string.IsNullOrEmpty(cmt.NameUser))
                    {
                        db.tbl_Comment.InsertOnSubmit(cmt);
                        db.SubmitChanges();

                    }
                    break;
                case "test":
                    cmt = new tbl_Comment();
                    cmt.Cmt_Content = Request["Cmt_Content"];
                    cmt.NameUser = Request["Username"];
                    cmt.Product_ID = Convert.ToInt32(Request["Product_ID"]);
                    cmt.User = Request["User"];
                    cmt.Create = DateTime.Now;
                    lstcmt.Add(cmt);
                    lstcmt.Add(cmt);
                    data.OData = lstcmt;

                    data.ObjMessage = lstcmt;
                    data.Message = "Thao tác thành công";
                    data.State = ActionState.Succeed;
                    goitin.ResponseData(data);
                    break;
                default:
                    break;
            }
           

        }
    }
}