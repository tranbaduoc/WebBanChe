using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DoAn4
{
    public partial class quenmatkhau : System.Web.UI.Page
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
            var a = from s in db.tbl_Customers
                    where s.User == txtuser.Text
                    select new { s.User, s.Email };
            foreach (var item in a)
            {
                if (item.User  == tk && item.Email == email)
                    return true;
            }
            return false;
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            txtuser.Focus();
        }

        public void Email(string htmlString = "Mật khẩu đặng nhập: http://webbanche/DangNhap.aspx là: abcdef", string mailnhan = "k165520214003@tnut.edu.vn")
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
        protected void btnFoger_Click(object sender, EventArgs e)
        {
            if (KTrong(txtuser.Text, txtMail.Text))
            {
                if (KTTK(txtuser.Text, txtMail.Text))
                {
                    IQueryable<tbl_Customer> a = from s in db.tbl_Customers
                                                where s.User == txtuser.Text
                                                select s;
                    foreach (tbl_Customer item in a)
                    {
                        if (txtuser.Text == item.User && txtMail.Text == item.Email)
                        {
                            tbl_Customer p = item;
                            p.Password = MD5Hash("abcdef");
                            db.SubmitChanges();
                            Email();
                            Response.Redirect("DangNhap.aspx?thongbao=doimkthanhcong");
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
            Response.Redirect("DangNhap.aspx");
        }
    }
}