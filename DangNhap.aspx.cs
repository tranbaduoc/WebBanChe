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
using System.Text;
using System.Security.Cryptography;

namespace DoAn4
{
    public partial class WebForm4 : System.Web.UI.Page
    {
        InfoDataContext db = new InfoDataContext();
        protected void Page_Load(object sender, EventArgs e)
        {
            Panel2.Visible = false;
            Panel3.Visible = false;
            this.txtUser.Focus();
            if(Request["thongbao"] == "doimkthanhcong")
                Response.Write("<script language='javascript'>alert('" + "Đã đổi mật khẩu thành công. Vui lòng kiếm tra email" + "')</script>");
        }
        private bool KiemTra()
        {
            var tmp = from a in db.tbl_Customers
                    select new { a.User,a.Password};
            foreach (var sub in tmp)
            {
                if (sub.User == txtUser.Text && sub.Password == MD5Hash(txtPass.Text))
                    return true;
            }
            return false;
        }
        public static string MD5Hash(string input)
        {
            StringBuilder hash = new StringBuilder();
            MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
            byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(input));

            for (int i = 0; i < bytes.Length; i++)
            {
                hash.Append(bytes[i].ToString("x2"));
            }
            return hash.ToString();
        }
        protected void ImageButton1_Click(object sender, ImageClickEventArgs e)
        {
            if (txtUser.Text == "" || txtPass.Text == "")
            {
                Label1.Text = "Bạn chưa nhập đầy đủ thông tin.";
            }
            else
            {
                Session["Username"] = txtUser.Text;
                if (KiemTra())
                {
                    GioHang gh = (GioHang)Session["giohang"];
                    DataTable tb = gh.GetDataTable();
                    int dem = 0;
                    if (tb.Rows.Count > 0)
                    {
                        Panel1.Visible = false;
                        Panel2.Visible = false;
                        Panel3.Visible = true;
                        dem = tb.Rows.Count;
                        lblGioHang.Text = dem.ToString();
                    }
                    else
                    {
                        Panel2.Visible = true;
                        Panel1.Visible = false;
                        Panel3.Visible = false;
                    }
                    
                    string user = Convert.ToString(Session["User"]);
                    tbl_Customer cus = db.tbl_Customers.SingleOrDefault(t =>t.User == txtUser.Text);
                    if (cus != null)
                    {
                        Session["pass"] = cus.Password;
                        Session["hoten"] = cus.FullName.ToString();
                        Session["email"] = cus.Email;
                        Session["diachi"] = cus.Address;
                        Session["SDT"] = cus.Phone;
                    }
                }
                else
                    Label1.Text = "Sai Tài khoản hoặc Mật khẩu";
            }
        }
    }
}
