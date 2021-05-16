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
    public partial class WebForm18 : System.Web.UI.Page
    {
        InfoDataContext db = new InfoDataContext();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //var a = from s in db.tbl_Employees
                //        where s.EmployeeID == int.Parse((Session["Username"].ToString()))
                //        select s;
                //foreach (var item in a)
                //{
                //    txtMa.Text = item.EmployeeID.ToString();
                //    txtTen.Text = item.EmployeeName.ToString();
                //    txtNgaysinh.Text = item.Date.ToString();
                //    DropDownList1.Text = item.Gender.ToString();
                //    txtDiachi.Text = item.Address.ToString();
                //    txtEmail.Text = item.Email.ToString();
                //    txtSDT.Text = item.Phone.ToString();
                //}
            }
        }

        protected void btnSua_Click(object sender, EventArgs e)
        {
            //tbl_Employee em = db.tbl_Employees.SingleOrDefault(c => c.EmployeeID ==int.Parse( Session["Username"].ToString()));
            //em.EmployeeName = txtTen.Text;
            //em.Date = txtNgaysinh.Text;
            //em.Gender = DropDownList1.Text;
            //em.Address = txtDiachi.Text;
            //em.Email = txtEmail.Text;
            //em.Phone = int.Parse(txtSDT.Text).ToString();
            //db.SubmitChanges();
            //txtMa.Text = "";
            //txtTen.Text = "";
            //txtNgaysinh.Text = "";
            //txtDiachi.Text = "";
            //txtEmail.Text = "";
            //txtSDT.Text = "";
            //Response.Write("<script language='javascript'>alert('" + "Thay đổi thông tin thành công." + "')</script>");
        }
    }
}
