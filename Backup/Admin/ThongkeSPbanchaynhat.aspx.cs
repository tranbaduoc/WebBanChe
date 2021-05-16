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
using System.Data.SqlClient;

namespace DoAn4.Admin
{
    public partial class WebForm14 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //load();
            if(Session["Username"]!=null)
            {
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        InfoDataContext db = new InfoDataContext();
        void load()
        {
            //var a = from s in db.tbl_Orders
            //        from d in db.tbl_OrderDetials
            //        where o.Order_ID = od.Order_ID &&  convert (datetime, substring(convert (nvarchar(50),o.date),0,len (o.date)-6))=@ngay
            //            group by od.Product_ID,od.Price_Export,od.Amount

            //select od.Product_ID as [Mã sản phẩm],od.Price_Export as [Giá bán],sum(od.Amount) as [Số lượng],sum(od.Money) as[Tổng tiền];

            ////var a = db.TKSPbanchaytheongay(DateTime.Parse(txtTheongay.Text));
            //var a = from s in db.tbl_Orders
            //        from d in db.tbl_OrderDetials
            //        where s.Order_ID == d.Order_ID
            //        //orderby s.Date ascending
            //        select new { Ngày_bán = s.Date, Mã_sản_phẩm = d.Product_ID, Số_lượng = d.Amount, Giá_bán = d.Price_Export, Thành_tiền = d.Money };
            //GridView1.DataSource = a;
            //GridView1.DataBind();
        }

        protected void btnThongke_Click(object sender, EventArgs e)
        {
            if (RadioButtonList1.Items[0].Selected)
            {
                txtTungay.Text = "";
                txtDenngay.Text = "";
                txtTheonam.Text = "";
                var a = db.TKSPbanchaytheongay(txtTheongay.Text);
                GridView1.DataSource =a;
                GridView1.DataBind();
                if (GridView1.Rows.Count > 0)
                { }
                else
                {
                    Response.Write("<script language='javascript'>alert('" + "Không có sản phẩm nào" + "')</script>");
                    
                }
                //Response.Redirect("ThongkeSPbanchaynhat.aspx");
            }
            if (RadioButtonList1.Items[1].Selected)
            {
                txtTheongay.Text = "";
                txtTheonam.Text = "";
                var b = db.TKSPbanchaytheoTG(txtTungay.Text, txtDenngay.Text);
                GridView1.DataSource = b;
                GridView1.DataBind();
                if (GridView1.Rows.Count > 0)
                { }
                else
                {
                    Response.Write("<script language='javascript'>alert('" + "Không có sản phẩm nào" + "')</script>");
                    //Response.Redirect("ThongkeSPbanchaynhat.aspx");
                }
            }
            if (RadioButtonList1.Items[2].Selected)
            {
                txtTungay.Text = "";
                txtDenngay.Text = "";
                txtTheongay.Text = "";
                var b = db.TKSPbanchaytheonam(int.Parse(txtTheonam.Text));
                GridView1.DataSource = b;
                GridView1.DataBind();
                if (GridView1.Rows.Count > 0)
                { }
                else
                {
                    Response.Write("<script language='javascript'>alert('" + "Không có sản phẩm nào" + "')</script>");
                    //Response.Redirect("ThongkeSPbanchaynhat.aspx");
                }
            }
        }

        protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;

        }
    }
}
