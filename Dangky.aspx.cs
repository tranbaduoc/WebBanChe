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
    public partial class WebForm6 : System.Web.UI.Page
    {
        InfoDataContext db = new InfoDataContext();
        protected void Page_Load(object sender, EventArgs e)
        {
            txtTendaydu.Focus();
            Label1.Text = "";
        }

        protected void TextBox4_TextChanged(object sender, EventArgs e)
        {

        }
        private bool KiemTra()
        {
            var tmp = from a in db.tbl_Customers
                      select new { a.User};
            foreach (var sub in tmp)
            {
                if (sub.User == txtUser.Text)
                    return true;
            }
            return false;
        }
        protected void ImageButton1_Click(object sender, ImageClickEventArgs e)
        {
            if (txtUser.Text == "" || txtPass.Text == "" || RePass.Text == "")
            {
                Label1.Text = "Bạn chưa nhập đầy đủ thông tin";
            }
            else
            {
                if (KiemTra())
                {
                    Label1.Text = "Tên đăng nhập đã được sử dụng";
                }
                else
                {
                    string diachi="";
                    tbl_Customer cu = new tbl_Customer();
                    cu.User = txtUser.Text;
                    cu.Password = txtPass.Text;
                    cu.FullName = txtTendaydu.Text;
                    if (txtDiachi.Text != "")
                    {
                        diachi = diachi + txtDiachi.Text;
                    }
                    if (txtQuanHuyen.Text != "")
                    {
                        diachi = diachi + "-"+txtQuanHuyen.Text;
                    }
                    if (txtTinhThanh.Text != "")
                    {
                        diachi = diachi + "-" + txtTinhThanh.Text;
                    }
                    if (txtQuocGia.Text != "")
                    {
                        diachi = diachi + "-" + txtQuocGia.Text;
                    }
                    cu.Address = diachi;
                    cu.Email = txtEmail.Text;
                    if (txtSDT.Text != "")
                    {
                        cu.Phone = Convert.ToInt32(txtSDT.Text);
                    }
                    db.tbl_Customers.InsertOnSubmit(cu);
                    db.SubmitChanges();
                    Response.Redirect("DangNhap.aspx?");
                }
            }
        }
    }
}
