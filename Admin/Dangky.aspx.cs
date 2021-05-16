using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

namespace DoAn4.Admin
{
    public partial class Dangky : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            txtTen.Focus();
            if (!IsPostBack)
            {
               // Load();
            }
        }
        InfoDataContext db = new InfoDataContext();
        //void Load()
        //{
        //    var a = from s in db.tbl_Quyens
        //            select new { s.MaNV, s.TenNV, s.Diachi, s.Email, s.Phone };
        //    GridView1.DataSource = a;
        //    GridView1.DataBind();
        //}

        bool KTrong(string ten,string dc,string sdt)
        {
            if (ten == "" || dc == "" || sdt == "")
            {
                return false;
            }
            return true;
        }

        bool KTEmail( string email)
        {
            var a = from s in db.tbl_Employees
                    select new { s.Email };
            foreach (var item in a)
            {
                if (item.Email == email)
                    return false;
            }
            return true;
        }

        protected void btnDangki_Click(object sender, EventArgs e)
        {
            if (KTrong(txtTen.Text, txtDiachi.Text, txtSDT.Text))
            {
                if (KTEmail(txtEmail.Text))
                {
                    tbl_Employee q = new tbl_Employee();
                    q.EmployeeName = txtTen.Text;
                    q.Date = txtNgay.Text;
                    q.Gender = DropDownList1.Text;
                    q.Address = txtDiachi.Text;
                    q.Email = txtEmail.Text;
                    q.Phone = int.Parse(txtSDT.Text).ToString();
                    db.tbl_Employees.InsertOnSubmit(q);
                    db.SubmitChanges();
                    Response.Write("<script language='javascript'>alert('" + "Đăng kí thành công" + "')</script>");
                    txtTen.Text = "";
                    txtNgay.Text = "";
                    txtDiachi.Text = "";
                    txtEmail.Text = "";
                    txtSDT.Text = "";
                }
                else
                {
                    Response.Write("<script language='javascript'>alert('" + "Email này đã tồn tại" + "')</script>");
                }
            }
            else
                Response.Write("<script language='javascript'>alert('" + "Bạn nhập thiếu thông tin." + "')</script>");
        }
        protected void btnLogin_Click(object sender, EventArgs e)
        {
            Response.Redirect("Login.aspx");
        }
    }
}
