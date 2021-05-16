using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;

namespace DoAn4
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        DataTable dt;
        protected void Page_Load(object sender, EventArgs e)
        {
            this.Title = "CHÈ ONLINE";
            if (!IsPostBack)
            {
                string productID = Request.QueryString["Product_ID"];
                InfoDataContext db = new InfoDataContext();
                DataSet ds = new DataSet();
                dt = ds.Tables["tbl_Product"];
                DataRow dr;
                var tmp = (from a in db.tbl_Products
                           from b in db.tbl_Imports
                           from c in db.tbl_ImportDetails
                           orderby b.Date descending
                           where b.Import_ID == c.Import_ID && a.Product_ID == c.Product_ID
                           select new { a.Product_ID, a.Product_Name, a.Image, a.Price_Export }).Distinct().Take(3);
                foreach (var n in tmp)
                {
                    dr = dt.NewRow();
                    dr[0] = n.Product_ID;
                    dr[1] = n.Product_Name;
                    dr[2] = n.Image;
                    dr[3] = n.Price_Export.ToString("###,###").Replace(',', '.');
                    dt.Rows.Add(dr);
                }
                //Download source code FREE tai Sharecode.vn
                sanpham.DataSource = dt;
                sanpham.DataBind();
            }
        }
    }
}
