<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Dangky.aspx.cs" Inherits="DoAn4.Admin.Dangky" %>

<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Đăng ký thành viên</title>
    <style type="text/css">
        .khung
        {
            width: 641px;
            height: 360px;
            text-align: center;
            margin-left: 320px;
            border:tin 2px gray;
        }
        .style1
        {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 700;
            color: #0066FF;
        }
        .style2
        {
            width: 97%;
            height: 73px;
        }
        .style3
        {
            font-family: Arial, Helvetica, sans-serif;
            font-size: small;
            text-align: right;
            width: 104px;
        }
        .style5
        {
            text-align: left;
            font-family: Arial, Helvetica, sans-serif;
            color: #0066FF;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class=" khung">
        <div class="style5">
            <asp:ScriptManager ID="ScriptManager1" runat="server">
            </asp:ScriptManager>
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ĐĂNG KÝ THÀNH VIÊN
        </div>
        <center class="style1">
            <hr style="text-align: left; width: 83%; height: -12px;" />
            <br />
            <div>
                <table align="center" cellpadding="2" class="style2">
                    <tr>
                        <td class="style3">
                            Tên đầy đủ:
                        </td>
                        <td style="text-align: left">
                            &nbsp;
                            <asp:TextBox ID="txtTen" runat="server" Width="250px" Height="22px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="style3">
                            Ngày sinh:
                        </td>
                        <td style="text-align: left">
                            &nbsp;
                            <asp:TextBox ID="txtNgay" runat="server" Width="250px" Height="22px" 
                                Font-Bold="False"></asp:TextBox>
                            <cc1:CalendarExtender ID="txtNgay_CalendarExtender" runat="server" 
                                Enabled="True" TargetControlID="txtNgay">
                            </cc1:CalendarExtender>
                        </td>
                    </tr>
                    <tr>
                        <td class="style3">
                            Giới tính:
                        </td>
                        <td style="text-align: left">
                            &nbsp;
                            <asp:DropDownList ID="DropDownList1" runat="server" Height="20px" Width="94px">
                                <asp:ListItem>Nam</asp:ListItem>
                                <asp:ListItem>Nữ</asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td class="style3">
                            Địa chỉ:&nbsp;
                        <td style="text-align: left">
                            &nbsp;
                            <asp:TextBox ID="txtDiachi" runat="server" Width="250px" Height="22px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="style3">
                            Email:&nbsp;
                        <td style="text-align: left">
                            &nbsp;
                            <asp:TextBox ID="txtEmail" runat="server" Width="250px" Height="22px"></asp:TextBox>
                            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txtEmail"
                                ErrorMessage="Email không đúng định dạng" 
                                ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" 
                                style="font-size: small"></asp:RegularExpressionValidator>
                        </td>
                    </tr>
                    <tr>
                        <td class="style3">
                            Số điện thoại:&nbsp;
                        <td style="text-align: left">
                            &nbsp;
                            <asp:TextBox ID="txtSDT" runat="server" Width="250px" Height="22px"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </div>
            <br />
            <div>
                <center>
                    <asp:Button ID="btnDangki" runat="server" Text="Đăng kí" OnClick="btnDangki_Click" />
                </center>
            </div>
        </center>
    </div>
    </form>
</body>
</html>
