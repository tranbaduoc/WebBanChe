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

namespace DoAn4.Admin
{
    public partial class WebForm20 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {}
            string maHD = Request.QueryString.Get("Order_ID");
            Label1.Text = maHD;
            load();
        }
        InfoDataContext db = new InfoDataContext();
        public void load()
        {
            
            var a = from s in db.tbl_OrderDetials
                    where s.Order_ID == Label1.Text
                    select s;
            GridView1.DataSource = a;
            GridView1.DataBind();
        }

        bool KTxuly()
        {
            var a = from s in db.tbl_Orders
                    where s.Order_ID == Label1.Text
                    select new { s.State};
            foreach (var item in a)
            {
                if (item.State == "Đã xử lý")
                    return false;
            }
            return true;
        }

        protected void btnXuly_Click(object sender, EventArgs e)
        {
            if (KTxuly())
            {
                DataTable dt;
                DataSet ds = new DataSet();
                dt = ds.Tables["OrderDetail"];
                var a = from s in db.tbl_OrderDetials
                        where s.Order_ID == Label1.Text
                        select s;
                foreach (var item in a)
                {
                    DataRow dr = dt.NewRow();
                    dr[0] = item.Order_ID;
                    dr[1] = item.Product_ID;
                    dr[2] = item.Price_Export;
                    dr[3] = item.Amount;
                    dr[4] = item.Money;
                    dt.Rows.Add(dr);
                }
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    tbl_Product p = db.tbl_Products.SingleOrDefault(c => c.Product_ID == int.Parse(dt.Rows[i][1].ToString()));
                    p.Amount = p.Amount - Convert.ToInt32(dt.Rows[i][3].ToString());
                    db.SubmitChanges();
                    tbl_Order o = db.tbl_Orders.SingleOrDefault(c => c.Order_ID == Label1.Text);
                    o.State = "Đã xử lý";
                    db.SubmitChanges();
                    Response.Write("<script language='javascript'>alert('" + "Xử lý thành công." + "')</script>");
                }
            }
            else
            {
                Response.Write("<script language='javascript'>alert('" + "Hoá đơn này đã xử lý." + "')</script>");
            }
        }

        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

        }
    }
}
