<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="quenmatkhau.aspx.cs"  Inherits="DoAn4.quenmatkhau" %>

<head>
    <title>Quên mật khẩu</title> 
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
                <div style="padding-left: 84px;" class="style4">
                QUÊN MẬT KHẨU</div>
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
                        Mail đăng ký:&nbsp;
                    </td>
                    <td align="left" width="50%">
                        <asp:TextBox ID="txtMail" runat="server" Width="132px" TextMode="Email"></asp:TextBox>
                        &nbsp;
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" class="style3">
                        &nbsp;</td>
                </tr>
            </table>
            <div align="center">
                <asp:Button ID="btnFoger" runat="server" Text="Quên" OnClick="btnFoger_Click"  
                    />
                <br />
                <br />
                <asp:LinkButton ID="LinkButton1" runat="server">Đăng 
                kí tài khoản</asp:LinkButton>
                <asp:LinkButton ID="LinkButton2" runat="server" >Quay lại</asp:LinkButton>
                <br />
            </div>
        </div>
    </center>
    </form>>

</body>
