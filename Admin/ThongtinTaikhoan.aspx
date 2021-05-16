<%@ Page Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="ThongtinTaikhoan.aspx.cs" Inherits="DoAn4.Admin.WebForm18" Title="Thông tin tài khoản" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
       
        .style2
        {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
        }
       
        .style3
        {
            width: 100%;
        }
       
        .style4
        {
            width: 347px;
            font-weight: normal;
            font-size: small;
        }
       
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div>
    <center class="style2">
       THÔNG TIN TÀI KHOẢN
       <hr width="60%" />
       <br />
       <div>
       
           <table cellpadding="2" class="style3">
               <tr>
                   <td style="text-align: right" class="style4">
                       Mã nhân viên:</td>
                   <td style="text-align: left">
                       <asp:TextBox ID="txtMa" runat="server" Enabled="False"></asp:TextBox>
                   </td>
               </tr>
               <tr>
                   <td style="text-align: right" class="style4">
                       Tên nhân viên:</td>
                   <td style="text-align: left">
                       <asp:TextBox ID="txtTen" runat="server" Width="251px"></asp:TextBox>
                   </td>
               </tr>
               <tr>
                   <td style="text-align: right" class="style4">
                       Ngày sinh:</td>
                   <td style="text-align: left">
                       <asp:TextBox ID="txtNgaysinh" runat="server" Width="190px"></asp:TextBox>
                       <cc1:CalendarExtender ID="txtNgaysinh_CalendarExtender" runat="server" 
                           Enabled="True" TargetControlID="txtNgaysinh">
                       </cc1:CalendarExtender>
                   </td>
               </tr>
               <tr>
                   <td style="text-align: right" class="style4">
                       Giới tính:</td>
                   <td style="text-align: left">
                       <asp:DropDownList ID="DropDownList1" runat="server" Height="22px" Width="86px">
                           <asp:ListItem>Nam</asp:ListItem>
                           <asp:ListItem>Nữ</asp:ListItem>
                       </asp:DropDownList>
                   </td>
               </tr>
               <tr>
                   <td style="text-align: right" class="style4">
                       Địa chỉ:</td>
                   <td style="text-align: left">
                       <asp:TextBox ID="txtDiachi" runat="server" Height="22px" Width="250px"></asp:TextBox>
                   </td>
               </tr>
               <tr>
                   <td style="text-align: right" class="style4">
                       Email:</td>
                   <td style="text-align: left">
                       <asp:TextBox ID="txtEmail" runat="server" Height="22px" Width="250px"></asp:TextBox>
                   </td>
               </tr>
               <tr>
                   <td style="text-align: right" class="style4">
                       Số điện thoại:</td>
                   <td style="text-align: left">
                       <asp:TextBox ID="txtSDT" runat="server" Height="22px" Width="250px"></asp:TextBox>
                   </td>
               </tr>
           </table>
       
       </div>
       <br />
       <div>
       <center>
           <asp:Button ID="btnSua" runat="server" Text="Sửa thông tin" 
               onclick="btnSua_Click" />
       </center>
       </div>
    </center>
    </div>
 
</asp:Content>
