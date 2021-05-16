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
    public partial class WebForm10 : System.Web.UI.Page
    {
       
        InfoDataContext db = new InfoDataContext();
        
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                    Panel2.Visible = false;
                    Panel3.Visible = false;
                    Panel4.Visible = false;
            }
        }

        protected void btnTiepTuc1_Click(object sender, ImageClickEventArgs e)
        {
            Panel2.Visible = true;
            Panel1.Visible = false;
            Panel3.Visible = false;
            Panel4.Visible = false;
        }

        protected void CheckBox1_CheckedChanged(object sender, EventArgs e)
        {
                if (CheckBox1.Checked == true)
                {
                    txtHoTen1.Text = Session["hoten"].ToString();
                    if (Session["SDT"] != null)
                    {
                        txtSDT1.Text = Session["SDT"].ToString();
                    }
                    string diachi = (string)Session["diachi"];
                    string[] dc = new string[4];
                    int i = 0;
                    foreach (string con in diachi.Split('-'))
                    {
                        dc[i] = con;
                        i++;
                    }
                    txtDiaChi1.Text = dc[0];
                    txtQuanHuyen1.Text = dc[1];
                    txtTinh1.Text = dc[2];
                    txtQuocGia1.Text = dc[3];
                    //Download source code FREE tai Sharecode.vn
                }
        }

        protected void CheckBox2_CheckedChanged(object sender, EventArgs e)
        {
            if (CheckBox2.Checked == true)
            {
                txtHoTen2.Text = txtHoTen1.Text;
                txtDiaChi2.Text = txtDiaChi1.Text;
                txtQuanHuyen2.Text = txtQuanHuyen1.Text;
                txtTinh2.Text = txtTinh1.Text;
                txtQuocGia2.Text = txtQuocGia1.Text;
                txtSDT2.Text = txtSDT1.Text;
                //Download source code FREE tai Sharecode.vn
            }
        }

        protected void btnTiepTuc2_Click(object sender, ImageClickEventArgs e)
        {
            Panel1.Visible = false;
            Panel2.Visible = false;
            Panel3.Visible = true;
            Panel4.Visible = false;
            double phivanchuyen = 0;
            double tongtien = 0;
            double trongluong = 0;
            double goihang = 0;
            double tongtatca = 0;
            GioHang gh = (GioHang)Session["giohang"];
            DataTable tb = gh.GetDataTable();
           
            for (int i = 0; i < tb.Rows.Count; i++)
            {
                tongtien = tongtien + Convert.ToDouble(tb.Rows[i][8].ToString());
                trongluong = trongluong + (Convert.ToDouble(tb.Rows[i][6].ToString())*Convert.ToDouble(tb.Rows[i][1].ToString()));
            }
            string HTTT = "";
            string[] GH;
            string[] TT;
            string HTVC="";
            Panel3.Visible = true;
            TT = new string[3];
            TT[0] = txtHoTen1.Text;
            TT[1] = txtDiaChi1.Text + "-" + txtQuanHuyen1.Text + "-" + txtTinh1.Text + "-" + txtQuocGia1.Text;
            TT[2] = txtSDT2.Text;
            Session["HotenTT"] = TT[0];
            Session["DiachiTT"] = TT[1];
            Session["SodtTT"] = TT[2];
            GH = new string[3];
            GH[0] = txtHoTen2.Text;
            GH[1] = txtDiaChi2.Text + "-" + txtQuanHuyen2.Text + "-" + txtTinh2.Text + "-" + txtQuocGia2.Text;
            GH[2] = txtSDT2.Text;
            Session["HotenGH"] = GH[0];
            Session["DiachiGH"] = GH[1];
            Session["SodtGH"] = GH[2];
            if (RadioButtonList1.Items.Count > 0)
            {
                HTTT = RadioButtonList2.SelectedItem.Value.ToString();
            }
            if (RadioButtonList1.Items.Count>0)
            {
                HTVC = RadioButtonList1.SelectedItem.Value.ToString();
                if (RadioButtonList1.SelectedItem.Value == "Chuyển phát nhanh")
                {
                    phivanchuyen = 108 * trongluong;
                }
                if (RadioButtonList1.SelectedItem.Value == "Chuyển qua bưu điện")
                {
                    phivanchuyen = 40* trongluong;
                }
                if (RadioButtonList1.SelectedItem.Value == "Chuyển bằng ô tô")
                {
                    phivanchuyen = 25000;
                }
                if (RadioButtonList1.SelectedItem.Value == "Giao hàng trực tiếp")
                {
                    phivanchuyen = 0;
                }
                Session["pvc"] = phivanchuyen;
            }
            Session["HTTT"] = HTTT;
            Session["HTVC"] = HTVC;
            Panel2.Visible = false;
            Panel1.Visible = false;
            GridView1.DataSource = tb;
            GridView1.DataBind();
            lblPhiVanChuyen.Text = phivanchuyen.ToString("###,###").Replace(',', '.') + "Đ";
            if (CheckGoiQua.Checked == true)
            {
                goihang = 20000;
                lblgoiqua.Text= "Có";
                lblLoiNhan.Text = txtGoiQua.Text;
            }
            else
                lblgoiqua.Text = "Không";
            lbltienmuahang.Text = tongtien.ToString("###,###").Replace(',', '.');
            Session["ttl"] = trongluong;
            lbltongtrongluong.Text = trongluong.ToString();
            Session["pgh"] = goihang;
            lblPhiGoiHang.Text = goihang.ToString("###,###").Replace(',', '.');
            tongtatca = phivanchuyen + tongtien + goihang;
            Session["ttc"] = tongtatca;
            lblTongTien.Text = tongtatca.ToString("###,###").Replace(',', '.');
            lblHoTen.Text = (string)Session["HotenTT"];
            lblDiaChi.Text = (string)Session["DiachiTT"];
            lblSDT.Text = (string)Session["SodtTT"];
            lblHoTen0.Text = (string)Session["HotenGH"];
            lblDiaChi0.Text= (string)Session["DiachiGH"];
            lblSDT0.Text = (string)Session["SodtGH"];
            lblHTTT.Text = (string)Session["HTTT"];
            lblHTVC.Text = (string)Session["HTVC"];
            //Download source code FREE tai Sharecode.vn
        }

        protected void ImageButton2_Click(object sender, ImageClickEventArgs e)
        {
            GioHang gh = (GioHang)Session["giohang"];
            DataTable tb = gh.GetDataTable();
            DataTable dt;
            DataSet ds = new DataSet();
            dt = ds.Tables["Order"];
            DataRow dr;
            var tmp = from a in db.tbl_Orders
                      select new { a.Order_ID };
            foreach (var n in tmp)
            {
                dr = dt.NewRow();
                dr[0] = n.Order_ID;
                dt.Rows.Add(dr);
            }
            double mamax = macuoi(dt);
            string ma = (mamax + 1).ToString();
            DateTime ngay = System.DateTime.Now;
            tbl_Order od = new tbl_Order();
            od.Order_ID = ma;
            od.Date = Convert.ToDateTime(ngay);
            od.User = (string)Session["Username"];
            var tmp1 = from a in db.tbl_Transports
                      where a.Transport_Name==(string)Session["HTVC"]
                      select new { a.Transport_ID,a.Transport_Name };
            foreach (var sub1 in tmp1)
            {
                od.Transport_ID = sub1.Transport_ID;
            }
            var tmp2 = from a in db.tbl_Payments
                      where a.Pay_Name == (string)Session["HTTT"]
                      select new { a.Pay_ID,a.Pay_Name };
            foreach (var sub2 in tmp2)
            {
                od.Pay_ID=sub2.Pay_ID ;
            }
            od.Name_Received = (string)Session["HotenGH"];
            od.Address_Received = (string)Session["DiachiGH"];
            od.Phone_Received = Convert.ToInt32(Session["SodtGH"]);
            od.Name_Pay = (string)Session["HotenTT"];
            od.Address_Pay = (string)Session["DiachiTT"];
            od.Phone_Pay = Convert.ToInt32(Session["SodtTT"]);
            od.VAT_Gift = Convert.ToDouble(Session["pgh"]);
            od.Mesage = lblLoiNhan.Text;
            od.SumWeight = Convert.ToDouble(Session["ttl"]);
            od.VAT_Transport = Convert.ToDouble(Session["pvc"]);
            od.SumMoney = Convert.ToDouble(Session["ttc"]);
            var query = from a in this.db.tbl_Orders
                        select a;
            db.tbl_Orders.InsertOnSubmit(od);
            db.SubmitChanges();
            //Download source code FREE tai Sharecode.vn
            for (int i = 0; i <tb.Rows.Count;i++ )
                {
                    tbl_OrderDetial odd = new tbl_OrderDetial();   
                    odd.Order_ID = ma;
                    odd.Product_ID = Convert.ToInt32(tb.Rows[i][7].ToString());
                    odd.Price_Export = Convert.ToDouble(tb.Rows[i][2].ToString());
                    odd.Amount = Convert.ToInt32(tb.Rows[i][1].ToString());
                    odd.Money = Convert.ToDouble(tb.Rows[i][8].ToString());
                    db.tbl_OrderDetials.InsertOnSubmit(odd);
                    db.SubmitChanges();
                }
            Panel1.Visible = false;
            Panel2.Visible = false;
            Panel3.Visible = false;
            Panel4.Visible = true;
            Session["GioHang"] = null;
        }
        public double macuoi(DataTable dt)
        {
            double max = 0;
            foreach (DataRow dr in dt.Rows)
            {
                double pt = double.Parse(dr[0].ToString());
                if (pt > max) max = pt;
            }
            return max;
        }

        protected void LinkThayDoiDCTT_Click(object sender, EventArgs e)
        {
            Panel1.Visible = true;
            Panel2.Visible = false;
            Panel3.Visible = false;
            Panel4.Visible = false;
        }

        protected void LinkThayDoiDCGH_Click(object sender, EventArgs e)
        {
            Panel1.Visible = true;
            Panel2.Visible = false;
            Panel3.Visible = false;
            Panel4.Visible = false;
        }

        protected void LinkThayDoiHTVC_Click(object sender, EventArgs e)
        {
            Panel2.Visible = true;
            Panel1.Visible = false;
            Panel3.Visible = false;
            Panel4.Visible = false;
        }

        protected void LinkThayDoiHTTT_Click(object sender, EventArgs e)
        {
            Panel2.Visible = true;
            Panel1.Visible = false;
            Panel3.Visible = false;
            Panel4.Visible = false;
        }

        protected void btnQuayLai2_Click(object sender, ImageClickEventArgs e)
        {
            Panel2.Visible = false;
            Panel3.Visible = false;
            Panel4.Visible = false;
            Panel1.Visible = true;
        }

        protected void ImageButton1_Click(object sender, ImageClickEventArgs e)
        {
            Panel2.Visible = true;
            Panel1.Visible = false;
            Panel3.Visible = false;
            Panel4.Visible = false;
        }
    }
}
