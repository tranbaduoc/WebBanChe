using System;
using System.Collections;
using System.Collections.Generic;
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
    public partial class WebForm12 : System.Web.UI.Page
    {

        InfoDataContext db = new InfoDataContext();
        protected void Page_Load(object sender, EventArgs e)
        {
           
            if (!IsPostBack)
                load();
            if (Session["Username"] != null)
            { }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        private void load()
        {

            var a = from p in db.tbl_Products
                    from t in db.tbl_Types
                    from s in db.tbl_Suppliers
                    from pr in db.tbl_Producers
                    from st in db.tbl_Styles

                    where p.Type_ID == t.Type_ID && p.Supplier_ID == s.Supplier_ID && p.Style_ID == st.Style_ID && p.Producer_ID == pr.Producer_ID

                    select new { p.Product_ID, p.Product_Name, t.Type_Name, st.Style_Name, s.Supplier_Name, pr.Producer_Name, p.Price_Import, p.Price_Export, p.Amount };



            var ad = (from p in db.tbl_Products
                     select p).ToList();

            gview22.DataSource = a;
            gview22.DataBind();
        }

        protected void btnTimkiem_Click(object sender, EventArgs e)
        {
            if (RadioButtonList1.Items[0].Selected)
            {
                var a = from p in db.tbl_Products
                        from t in db.tbl_Types
                        from s in db.tbl_Suppliers
                        from pro in db.tbl_Producers
                        from st in db.tbl_Styles
                        where p.Type_ID == t.Type_ID && p.Supplier_ID == s.Supplier_ID && p.Style_ID == st.Style_ID && p.Producer_ID == pro.Producer_ID
                        && p.Product_ID == int.Parse(txtMaSP.Text)
                        select new { p.Product_ID, p.Product_Name, t.Type_Name, st.Style_Name, s.Supplier_Name, pro.Producer_Name, p.Price_Import, p.Price_Export, p.Amount };
                gview22.DataSource = a;
                gview22.DataBind();
                //int sobanghi = GridView2.Rows.Count;
                //Label1.Text = "Có " + sobanghi.ToString() + "kết quả được tìm thấy.";
            }

            if (RadioButtonList1.Items[1].Selected)
            {
                var a = from p in db.tbl_Products
                        from t in db.tbl_Types
                        from s in db.tbl_Suppliers
                        from pro in db.tbl_Producers
                        from st in db.tbl_Styles
                        where p.Type_ID == t.Type_ID && p.Supplier_ID == s.Supplier_ID && p.Style_ID == st.Style_ID && p.Producer_ID == pro.Producer_ID
                        && p.Product_Name.Contains(txtTenSP.Text)
                        select new { p.Product_ID, p.Product_Name, t.Type_Name, st.Style_Name, s.Supplier_Name, pro.Producer_Name, p.Price_Import, p.Price_Export, p.Amount };
                gview22.DataSource = a;
                gview22.DataBind();
            }

            if (RadioButtonList1.Items[2].Selected)
            {
                var a = from p in db.tbl_Products
                        from t in db.tbl_Types
                        from s in db.tbl_Suppliers
                        from pro in db.tbl_Producers
                        from st in db.tbl_Styles
                        where p.Type_ID == t.Type_ID && p.Supplier_ID == s.Supplier_ID && p.Style_ID == st.Style_ID && p.Producer_ID == pro.Producer_ID
                        && t.Type_Name.Contains(txtLoaiSP.Text)
                        select new { p.Product_ID, p.Product_Name, t.Type_Name, st.Style_Name, s.Supplier_Name, pro.Producer_Name, p.Price_Import, p.Price_Export, p.Amount };
                gview22.DataSource = a;
                gview22.DataBind();
            }
            if (RadioButtonList1.Items[3].Selected)
            {
                var a = from p in db.tbl_Products
                        from t in db.tbl_Types
                        from s in db.tbl_Suppliers
                        from pro in db.tbl_Producers
                        from st in db.tbl_Styles
                        where p.Type_ID == t.Type_ID && p.Supplier_ID == s.Supplier_ID && p.Style_ID == st.Style_ID && p.Producer_ID == pro.Producer_ID
                        && st.Style_Name.Contains(txtPhongcach.Text)
                        select new { p.Product_ID, p.Product_Name, t.Type_Name, st.Style_Name, s.Supplier_Name, pro.Producer_Name, p.Price_Import, p.Price_Export, p.Amount };
                gview22.DataSource = a;
                gview22.DataBind();
            }
            if (RadioButtonList1.Items[4].Selected)
            {
                var a = from p in db.tbl_Products
                        from t in db.tbl_Types
                        from s in db.tbl_Suppliers
                        from pro in db.tbl_Producers
                        from st in db.tbl_Styles
                        where p.Type_ID == t.Type_ID && p.Supplier_ID == s.Supplier_ID && p.Style_ID == st.Style_ID && p.Producer_ID == pro.Producer_ID
                        && pro.Producer_Name.Contains(txtHangsanxuat.Text)
                        select new { p.Product_ID, p.Product_Name, t.Type_Name, st.Style_Name, s.Supplier_Name, pro.Producer_Name, p.Price_Import, p.Price_Export, p.Amount };
                gview22.DataSource = a;
                gview22.DataBind();
            }
            if (RadioButtonList1.Items[5].Selected)
            {
                var a = from p in db.tbl_Products
                        from t in db.tbl_Types
                        from s in db.tbl_Suppliers
                        from pro in db.tbl_Producers
                        from st in db.tbl_Styles
                        where p.Type_ID == t.Type_ID && p.Supplier_ID == s.Supplier_ID && p.Style_ID == st.Style_ID && p.Producer_ID == pro.Producer_ID
                        && s.Supplier_Name.Contains(txtNhacungcap.Text)
                        select new { p.Product_ID, p.Product_Name, t.Type_Name, st.Style_Name, s.Supplier_Name, pro.Producer_Name, p.Price_Import, p.Price_Export, p.Amount };
                gview22.DataSource = a;
                gview22.DataBind();
            }
        }

        private void loadTheoHSX()
        {
            var a = from p in db.tbl_Products
                    from t in db.tbl_Types
                    from s in db.tbl_Suppliers
                    from pr in db.tbl_Producers
                    from st in db.tbl_Styles
                    where p.Type_ID == t.Type_ID && p.Supplier_ID == s.Supplier_ID && p.Style_ID == st.Style_ID && p.Producer_ID == pr.Producer_ID && pr.Producer_Name == txtHangsanxuat.Text
                    select new { p.Product_ID, p.Product_Name, t.Type_Name, st.Style_Name, s.Supplier_Name, pr.Producer_Name, p.Price_Import, p.Price_Export, p.Amount };
            gview22.DataSource = a;
            gview22.DataBind();
        }

        protected void GridView2_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            gview22.PageIndex = e.NewPageIndex;
            load();
        }

        protected void btnMoi_Click(object sender, EventArgs e)
        {
            Response.Redirect("TimkiemSP.aspx");
        }

        protected void RadioButtonList1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (RadioButtonList1.Items[4].Selected)
            {
                loadTheoHSX();
            }
        }
    }
}
