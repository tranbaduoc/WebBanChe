<%@ Page Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true"
    CodeBehind="TimkiemSP.aspx.cs" Inherits="DoAn4.Admin.WebForm12" Title="Tìm kiếm sản phẩm" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .style1
        {
            font-size: large;
            font-family: Arial;
        }
        .style2
        {
            width: 53%;
            height: 203px;
        }
        .style7
        {
            height: 29px;
            font-family: Arial;
            font-size: small;
            width: 27%;
        }
        .style8
        {
            height: 29px;
        }
        .style9
        {
            width: 100%;
            height: 172px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div>
        <center class="style1">
            TÌM KIẾM SẢN PHẨM</center>
        <hr width="50%" />
        <div>
            <table cellpadding="0" cellspacing="0" class="style2" align="center">
                <tr>
                    <td align="right" class="style7">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:RadioButtonList ID="RadioButtonList1" runat="server" Style="text-align: left"
                            Width="121px" Height="182px" 
                            onselectedindexchanged="RadioButtonList1_SelectedIndexChanged">
                            <asp:ListItem>Mã chè</asp:ListItem>
                            <asp:ListItem>Tên chè</asp:ListItem>
                            <asp:ListItem>Lĩnh Vực</asp:ListItem>
                            <asp:ListItem>Thể Loại</asp:ListItem>
                            <asp:ListItem>Hãng sản xuất</asp:ListItem>
                            <asp:ListItem>Nhà cung cấp</asp:ListItem>
                        </asp:RadioButtonList>
                        <br />
                    </td>
                    <td class="style8">
                        <table cellpadding="0" cellspacing="0" class="style9">
                            <tr>
                                <td>
&nbsp;&nbsp;
                                    <asp:TextBox ID="txtMaSP" runat="server"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
&nbsp;&nbsp;
                                    <asp:TextBox ID="txtTenSP" runat="server" Width="230px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    &nbsp;&nbsp;
                                    <asp:TextBox ID="txtLoaiSP" runat="server" Width="230px"></asp:TextBox>
&nbsp; &nbsp;</td>
                            </tr>
                            <tr>
                                <td>
&nbsp;&nbsp;
                                    <asp:TextBox ID="txtPhongcach" runat="server" Width="230px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
&nbsp;&nbsp;
                                    <asp:TextBox ID="txtHangsanxuat" runat="server" Width="230px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    &nbsp;&nbsp;
                                    <asp:TextBox ID="txtNhacungcap" runat="server" Width="230px"></asp:TextBox>
&nbsp;&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div style="text-align: center; height: 36px;">
            <asp:Button ID="btnMoi" runat="server" OnClick="btnMoi_Click" Text="Mới" Width="80px" />
            &nbsp;&nbsp;
            <asp:Button ID="btnTimkiem" runat="server" Text="Tìm kiếm" Width="80px" OnClick="btnTimkiem_Click" />
            <br />
            <asp:Label ID="Label1" runat="server" Enabled="False" Style="color: #0000FF"></asp:Label>
        </div>
        &nbsp;<div>
            <asp:GridView ID="gview22" runat="server" AllowPaging="true" BackColor="White"
                BorderColor="#CCCCCC" BorderStyle="None" BorderWidth="1px" CellPadding="3" 
                Style="text-align: center" Width="100%" AutoGenerateColumns="False" 
                PageSize="10" >
                <RowStyle ForeColor="#000066" />
                <Columns>
                    <asp:TemplateField HeaderText="Mã chè" SortExpression="Product_ID">
                        <ItemTemplate>
                            <asp:Label ID="Label2" runat="server" Text='<%# Bind("Product_ID") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Tên chè" SortExpression="Product_Name">
                        <ItemTemplate>
                            <asp:Label ID="Label3" runat="server" Text='<%# Bind("Product_Name") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Lĩnh Vực" SortExpression="Type_Name">
                        <ItemTemplate>
                            <asp:Label ID="Label4" runat="server" Text='<%# Bind("Type_Name") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Thể Loại" SortExpression="Style_Name">
                        <ItemTemplate>
                            <asp:Label ID="Label5" runat="server" Text='<%# Bind("Style_Name") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Nhà cung cấp" SortExpression="Supplier_Name">
                        <ItemTemplate>
                            <asp:Label ID="Label6" runat="server" Text='<%# Bind("Supplier_Name") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Hãng sản xuất" SortExpression="Producer_Name">
                        <ItemTemplate>
                            <asp:Label ID="Label7" runat="server" Text='<%# Bind("Producer_Name") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Giá nhập" SortExpression="Price_Import">
                        <ItemTemplate>
                            <asp:Label ID="Label8" runat="server" Text='<%# Bind("Price_Import") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Giá xuất" SortExpression="Price_Export">
                        <ItemTemplate>
                            <asp:Label ID="Label9" runat="server" Text='<%# Bind("Price_Export") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Số lượng" SortExpression="Amount">
                        <ItemTemplate>
                            <asp:Label ID="Label10" runat="server" Text='<%# Bind("Amount") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
                <FooterStyle BackColor="White" ForeColor="#000066" />
                <PagerStyle BackColor="White" ForeColor="#000066" HorizontalAlign="Left" />
                <SelectedRowStyle BackColor="#669999" Font-Bold="True" ForeColor="White" />
                <HeaderStyle BackColor="#FF3399" Font-Bold="True" ForeColor="White" />
            </asp:GridView>
        </div>
        <br />
    </div>
</asp:Content>
