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
    public partial class WebForm4 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            load();
            //txtNhanvien.Text = Session["Username"].ToString();
            var a = from s in db.tbl_Employees
                    from d in db.tbl_Accounts
                    where s.EmployeeID == d.EmployeeID && d.Account == Session["Username"].ToString()
                    select new { s.EmployeeID, s.EmployeeName };
            drNhanvien.DataSource = a;
            drNhanvien.DataValueField = "EmployeeID";
            drNhanvien.DataTextField = "EmployeeName";
            drNhanvien.DataBind();

            if (Session["Username"] != null)
            { }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        InfoDataContext db = new InfoDataContext();
        private void load()
        {
            var query = from a in db.tbl_Imports
                        select a;
            GridView1.DataSource = query;
            GridView1.DataBind();
        }

        void rong()
        {
            txtMa.Text = "";
            txtNgay.Text = "";
            //txtNhanvien.Text = "";
            //DropDownList1.Text = "";
        }

        protected void btnNhap_Click(object sender, EventArgs e)
        {
            tbl_Import i = new tbl_Import();
            i.EmployeeID = int.Parse(drNhanvien.Text);
            i.Date = DateTime.Parse( txtNgay.Text);
            i.Supplier_ID = int.Parse(DropDownList1.Text);
            db.tbl_Imports.InsertOnSubmit(i);
            db.SubmitChanges();
            load();
            Response.Write("<script language='javascript'>alert('" + "Nhập thành công." + "')</script>");
            rong();
            txtNgay.Focus();
        }

        protected void btnSua_Click1(object sender, EventArgs e)
        {
            tbl_Import i = db.tbl_Imports.SingleOrDefault(c => c.Import_ID == int.Parse(txtMa.Text));
            i.Import_ID = int.Parse(txtMa.Text);
            i.EmployeeID = int.Parse(drNhanvien.Text);
            i.Date = DateTime.Parse(txtNgay.Text);
            i.Supplier_ID = int.Parse(DropDownList1.Text);
            db.SubmitChanges();
            load();
            Response.Write("<script language='javascript'>alert('" + "Sửa thành công." + "')</script>");
            rong();
            txtNgay.Focus();
        }
    
        bool Kiemtrama(string ma)
        {
            var a = from s in db.tbl_ImportDetails
                   // where s.Import_ID == int.Parse(txtMa.Text)
                    select new { s.Import_ID};
            foreach (var item in a)
            {
                if (item.Import_ID == int.Parse(ma))
                    return false;
            }
            return true;
        }

        protected void btnXoa_Click1(object sender, EventArgs e)
        {
            if (Kiemtrama(txtMa.Text))
            {
                tbl_Import i = db.tbl_Imports.SingleOrDefault(c => c.Import_ID == int.Parse(txtMa.Text));
                db.tbl_Imports.DeleteOnSubmit(i);
                db.SubmitChanges();
                load();
                Response.Write("<script language='javascript'>alert('" + "Xoá thành công." + "')</script>");
                rong();
                txtNgay.Focus();
            }
            else
                Response.Write("<script language='javascript'>alert('" + "Không xoá được." + "')</script>");
        }

        protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            load();
        }

        protected void txtNgay_TextChanged(object sender, EventArgs e)
        {

        }

        protected void LKChitiet_Click(object sender, EventArgs e)
        {
            Response.Redirect("Chitietnhap.aspx");
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Response.Redirect("Nhaphang.aspx");
            txtNgay.Focus();
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            Label lbMa = (Label)GridView1.Rows[e.NewEditIndex].FindControl("lbMa");
            tbl_Import i = db.tbl_Imports.SingleOrDefault(c => c.Import_ID == int.Parse(lbMa.Text));
            txtMa.Text = i.Import_ID.ToString();
            drNhanvien.Text = i.EmployeeID.ToString();
            //txtNhanvien.Text = txtNhanvien.Text;
            txtNgay.Text = i.Date.ToString();
            DropDownList1.Text = i.Supplier_ID.ToString();
            GridView1.EditIndex = e.NewEditIndex;
            load();
            Label1.Text = "";
        }
    }
}
