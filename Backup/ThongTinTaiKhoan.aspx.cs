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
    public partial class WebForm16 : System.Web.UI.Page
    {
        InfoDataContext db = new InfoDataContext();
        protected void Page_Load(object sender, EventArgs e)
        {
            string user = Convert.ToString(Session["UserName"]);
            tbl_Customer cus = db.tbl_Customers.SingleOrDefault(t => t.User == user);
            lblTenDN.Text = cus.User.ToString();
            lblMatKhau.Text = "******";
            if (cus.FullName != "")
                lblTen.Text = cus.FullName;
            else
                lblTen.Text = "(Chưa có thông tin)";
            if (cus.Address != "" )
                lblDiaChi.Text = cus.Address;
            else
                lblDiaChi.Text = "(Chưa có thông tin)";
            if (cus.Email != "")
                lblEmail.Text = cus.Email;
            else
                lblEmail.Text = "(Chưa có thông tin)";
            if (cus.Phone != null)
                lblSDT.Text = cus.Phone.ToString();
            else
                lblSDT.Text = "(Chưa có thông tin)";
            Panel2.Visible = false;
            Panel3.Visible = false;
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            Panel1.Visible = false;
            Panel2.Visible = false;
            Panel3.Visible = true;
            Label1.Text = "";
        }

        protected void LinkButton2_Click(object sender, EventArgs e)
        {
            Panel2.Visible = true;
            Panel3.Visible = false;
            Panel1.Visible = false;
            txtTendaydu.Text = Session["hoten"].ToString();
            if (Session["SDT"] != null)
            {
                txtSDT.Text = Session["SDT"].ToString();
            }
            string diachi = (string)Session["diachi"];
            string[] dc = new string[4];
            int i = 0;
            foreach (string con in diachi.Split('-'))
            {
                dc[i] = con;
                i++;
            }
            txtDiachi.Text = dc[0];
            txtQuanHuyen.Text = dc[1];
            txtTinhThanh.Text = dc[2];
            txtQuocGia.Text = dc[3];
        }

        protected void btnTiepTuc1_Click(object sender, ImageClickEventArgs e)
        {
           
            string user = Convert.ToString(Session["UserName"]);
            tbl_Customer cus = db.tbl_Customers.SingleOrDefault(t => t.User == user);
            if (cus != null)
            {
                cus.FullName = txtTendaydu.Text;
                cus.Address = txtDiachi.Text + "-" + txtQuanHuyen.Text + "-" + txtTinhThanh.Text + "-" + txtQuocGia.Text;
                cus.Email = txtEmail.Text;
                if (txtSDT.Text != "")
                {
                    cus.Phone = Convert.ToInt32(txtSDT.Text);
                }
                db.SubmitChanges();
                Response.Write("<script language='javascript'>alert('" + "Cập nhật thành công!" + "')</script>");            
            }
            Panel1.Visible = true;
            Panel2.Visible = false;
            Panel3.Visible = false;
        }

        protected void ImageButton1_Click(object sender, ImageClickEventArgs e)
        {
            Panel1.Visible = true;
            Panel2.Visible = false;
            Panel3.Visible = false;
        }
        protected void ImageButton2_Click(object sender, ImageClickEventArgs e)
        {
            Panel3.Visible = true;
            if(txtNewPass.Text==""||RePass.Text=="")
            {
                Label1.Text = "Bạn chưa nhập đủ thông tin";
            }
            else
            {
                if (txtPass.Text != Convert.ToString(Session["pass"]))
                {
                    Label1.Text = "Mật khẩu không đúng";
                }
                else
                {
                    string user = Convert.ToString(Session["UserName"]);
                    tbl_Customer cus = db.tbl_Customers.SingleOrDefault(t => t.User == user);
                    if(cus != null)
                    {
                        cus.Password = txtNewPass.Text;
                        db.SubmitChanges();
                    }
                    Response.Write("<script language='javascript'>alert('" + "Đổi mật khẩu thành công" + "')</script>");
                    Panel1.Visible = true;
                    Panel2.Visible = false;
                    Panel3.Visible = false;
                }
            }
        }
    }
}
