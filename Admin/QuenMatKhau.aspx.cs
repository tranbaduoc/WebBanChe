using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DoAn4.Admin
{
    public partial class QuenMatKhau : System.Web.UI.Page
    {
        bool KTrong(string tk, string mk)
        {
            if (tk == "" || mk == "")
            { return false; }
            return true;
        }
        InfoDataContext db = new InfoDataContext();
        bool KTTK(string tk, string email)
        {
            var a = from s in db.tbl_Accounts
                    where s.Account == txtuser.Text
                    select new { s.Account, s.Email };
            foreach (var item in a)
            {
                if (item.Account == tk && item.Email == email)
                    return true;
            }
            return false;
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            txtuser.Focus();
        }

        public void Email(string htmlString = "Mật khẩu đặng nhập: http://webbanche/Admin/Login.aspx là: abcdef", string mailnhan = "k165520214003@tnut.edu.vn")
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient("smtp.gmail.com");
                message.From = new MailAddress("tranbaduoc1998@gmail.com");
                message.To.Add(new MailAddress(mailnhan));
                message.Subject = "WEB BAN CHE ONLINE THAY ĐỔI MẬT KHẨU";
                message.IsBodyHtml = true; //to make message body as html  
                message.Body = htmlString;
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("tranbaduoc1998@gmail.com", "#duoc01101998");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
        protected void btnFoger_Click(object sender, EventArgs e)
        {
            if (KTrong(txtuser.Text, txtMail.Text))
            {
                if (KTTK(txtuser.Text, txtMail.Text))
                {
                    IQueryable<tbl_Account> a = from s in db.tbl_Accounts
                            where s.Account == txtuser.Text
                            select s;
                    foreach (tbl_Account item in a)
                    {
                        if (txtuser.Text == item.Account && txtMail.Text == item.Email )
                        {
                            tbl_Account p = item;
                            p.Password = "abcdef";
                            db.SubmitChanges();
                            Email();
                            Response.Write("<script language='javascript'>alert('" + "Đã đổi mật khẩu thành công. Vui lòng kiếm tra email" + "')</script>");
                            Response.Redirect("Login.aspx");
                        }
                    }
                }
                else
                {
                    Response.Write("<script language='javascript'>alert('" + "Tài khoản hoặc Email đăng ký không đúng." + "')</script>");
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
            Page.Response.Redirect(Page.Request.Url.ToString(), true);
        }
    }
}