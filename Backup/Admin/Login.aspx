<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="DoAn4.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Đăng nhập</title>
    <style type="text/css">
        .khung
        {
            width: 254px;
            height: 200px;
            margin-top:40px;
        }
        .daukhung
        {
            height: 25px;
            color: White;
            text-align: center;
            padding-top: auto;
        }
        .style1
        {
            width: 100%;
        }
        .style2
        {
            height: 25px;
            color: #0066FF;
            text-align: center;
            padding-top: auto;
            font-family: Arial;
            font-size: medium;
            line-height:1.5em;
            font-weight: bold;
        }
        .style3
        {
            font-family: Arial;
            font-size: small;
        }
        .style4
        {
            text-align: left;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <center>
        <div class="khung">
            <div class="style2">
                <div class="style4">
                ĐĂNG NHẬP</div>
                <hr style="text-align: left" width="100%" />
                <br />
                <br />
            </div>
                <br />
            <table cellpadding="2" class="style1">
                <tr>
                    <td align="right" width="30%" class="style3">
                        &nbsp;
                        Username:</td>
                    <td align="left">
                        <asp:TextBox ID="txtuser" runat="server" Width="132px"></asp:TextBox>
                        &nbsp;
                    </td>
                </tr>
                <tr>
                    <td align="right" width="30%" class="style3">
                        Password:&nbsp;
                    </td>
                    <td align="left" width="50%">
                        <asp:TextBox ID="txtpass" runat="server" Width="132px" TextMode="Password"></asp:TextBox>
                        &nbsp;
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" class="style3">
                        &nbsp;</td>
                </tr>
            </table>
            <div align="center">
                <asp:Button ID="Button1" runat="server" Text="Đăng nhập" onclick="Button1_Click" 
                    />
                <br />
                <br />
                <asp:LinkButton ID="LinkButton1" runat="server" onclick="LinkButton1_Click">Đăng 
                kí tài khoản</asp:LinkButton>
                <br />
            </div>
        </div>
    </center>
    </form>
</body>
</html>
