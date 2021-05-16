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
using System.Data.SqlClient;
using System.Text;
using System.Security.Cryptography;

namespace DoAn4
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            txtuser.Focus();
        }
        InfoDataContext db = new InfoDataContext();

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
        bool KTTK(string tk,string mk)
        {
            var a = from s in db.tbl_Accounts
                    where s.Account == txtuser.Text
                    select new { s.Account,s.Password };
            foreach (var item in a)
            {
                if (item.Account == tk && item.Password == MD5Hash(mk))
                    return true;
            }
            return false;
        }
        bool KTrong(string tk,string mk)
        {
            if (tk == "" || mk == "")
            { return false; } return true;
        }
        protected void Button1_Click(object sender, EventArgs e)
        {
            if (KTrong(txtuser.Text, txtpass.Text))
            {
                if (KTTK(txtuser.Text, txtpass.Text))
                {
                    var a = from s in db.tbl_Accounts
                            where s.Account == txtuser.Text
                            select s;
                    foreach (var item in a)
                    {
                        if (txtuser.Text == item.Account && MD5Hash(txtpass.Text) == item.Password && item.Power == "Nhân viên")
                        {
                            Session["UserName"] = txtuser.Text.ToString();
                            Response.Redirect("Nhaphang.aspx");
                        }
                        if (txtuser.Text == item.Account && MD5Hash(txtpass.Text) == item.Password && item.Power == "Quản lý")
                        {
                            Session["UserName"] = txtuser.Text.ToString();
                            Response.Redirect("Nhaphang.aspx");
                        }
                    }
                }
                else
                {
                    Response.Write("<script language='javascript'>alert('" + "Tài khoản hoặc mật khẩu không đúng." + "')</script>");
                }
            }
            else
            {
                Response.Write("<script language='javascript'>alert('" + "Bạn nhập thiếu thông tin." + "')</script>");
            }
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            Response.Redirect("Dangky.aspx");
        }
        protected void LinkButton2_Click(object sender, EventArgs e)
        {
            Response.Redirect("QuenMatKhau.aspx");
        }
    }
}
