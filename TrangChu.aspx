<%@ Page Language="C#" MasterPageFile="~/TrangChu.Master" AutoEventWireup="true"  CodeBehind="TrangChu.aspx.cs" Inherits="DoAn4.WebForm1" Title="Chè Online" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Con1" runat="server">
    <center style="z-index: auto; left: auto; bottom: auto; right: auto; top: auto;">
    <div>
        <br />
        <br />
        <div class="khungthanhtoan">
            <asp:Label ID="Label2" runat="server" Text="chè mới về" Font-Bold="True" Font-Size="13"></asp:Label>
        <hr style="height: -15px" />

        <asp:DataList ID="sanpham" runat="server" HorizontalAlign="Center" 
        RepeatColumns="4" Width="100%" DataKeyField="Product_ID"  RepeatDirection="Horizontal">
        <ItemTemplate>
        <div class="khungsanpham">
        <div class="khunganh">
        <asp:ImageButton ID="ImageButton2" runat="server" Height="170px" Width="150px"
                        ImageUrl='<%# "~/AnhChe/AnhSanPham/"+Eval("Image") %>' 
                PostBackUrl='<%# "Chitiet.aspx?Product_ID="+Eval("Product_ID") %>'/>
         </div>
            <div class="dong">
                <asp:HyperLink ID="HyperLink3" runat="server" Font-Size="10pt" 
                    ForeColor="#333333" Text='<%# Eval("Product_Name") %>' 
                    NavigateUrl='<%# "Chitiet.aspx?Product_ID="+Eval("Product_ID") %>' Font-Underline="False"
                   ></asp:HyperLink>
             </div>
             <div class="dong">
                &nbsp;<asp:Label ID="Label1" runat="server" ForeColor="#CC0000" 
                    Text='<%# Eval("Price_Export") %>' Font-Size="10pt"></asp:Label>
                <asp:Label ID="Label3" runat="server" ForeColor="#CC0000" Text="VNĐ" 
                     Font-Size="10pt"></asp:Label>
                </div>
                </div>
                </ItemTemplate>
        </asp:DataList>

        <div style=" text-align:right; margin-right:3px"><asp:LinkButton ID="LinkButton1" runat="server" PostBackUrl="HangMoiVe.aspx">Xem thêm&gt;&gt;</asp:LinkButton></div>
        </div>
        </div>
        </center>
</asp:Content>
