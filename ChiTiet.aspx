<%@ Page Language="C#" MasterPageFile="~/TrangChu.Master" EnableEventValidation="false" AutoEventWireup="true"
    CodeBehind="ChiTiet.aspx.cs" Inherits="DoAn4.WebForm3" Title="Chi tiết sản phẩm" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .style1 {
            width: 99%;
        }

        .style2 {
            width: 127px;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.min.js">
    </script>
    <script type="text/javascript" src="/Content/Scripts/Common.js">
    </script>
    <%--<script type="text/javascript" src="/Content/Scripts/siteScript.js">
    </script>--%>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript">
        function capnhat() {
            //loading();
            $.post("/action.aspx", $("#vungbinhluan").find("input,textarea,select,hidden").not("#__VIEWSTATE,#__EVENTVALIDATION").serialize(), function (data) {
                if (data.Erros) {
                    //endLoading();
                    createMessage("Đã có lỗi xảy ra", data.Message); // Tạo thông báo lỗi
                }
                else {

                    createMessage("Thông báo", "Thao tác thành công");
                }
            });
            return false;
        }
        function test() {
            //loading();
            $.post("/action.aspx", $("#vungbinhluan").find("input,textarea,select,hidden").not("#__VIEWSTATE,#__EVENTVALIDATION").serialize(), function (data) {
                if (data.Erros) {
                    //endLoading();
                    createMessage("Đã có lỗi xảy ra", data.Message); // Tạo thông báo lỗi
                }
                else {

                    //endLoading();
                    createMessage("Thông báo", "Thao tác thành công");
                }
            });
            return false;
        }

        $(document).ready(function () {
            debugger;
            loading();
            $("#submit").click(function () {
                capnhat();
            });
            $("#test").click(function () {
                test();
            });

        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Con1" runat="server">
    <div class="daukhungmain">
        <asp:Label ID="lblTieuDe" runat="server" Font-Bold="False" Font-Names="Arial"
            Font-Size="Large" ForeColor="#333333"></asp:Label>
    </div>
    <div style="width: 100%; height: 314px">
        <div style="width: 225px; height: 300px; float: left; margin-left: 10px; border: thin solid green">
            <asp:Image ID="lblImage" runat="server" Height="300px" Width="225px" />
        </div>
        <div style="width: 356px; height: 300px; margin: 5px; float: right">
            <div style="font-family: Arial, Helvetica, sans-serif; width: 340px; margin-top: 10px;">
                <table class="style1">
                    <tr>
                        <td class="style2">
                            <asp:Label ID="Label1" runat="server" Text="Chủng loại:" Font-Bold="True"
                                Font-Size="11pt"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblType_Name" runat="server" ForeColor="Black" Font-Size="11pt"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style2">
                            <asp:Label ID="Label2" runat="server" Text="Phong cách:" Font-Bold="True"
                                Font-Size="11pt"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblStyle_Name" runat="server" ForeColor="Black" Font-Size="11pt"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style2">
                            <asp:Label ID="Label3" runat="server" Text="Màu:" Font-Bold="True"
                                Font-Size="11pt"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblColor" runat="server" ForeColor="Black" Font-Bold="False"
                                Font-Size="11pt"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style2">
                            <asp:Label ID="Label5" runat="server" Text="Chất liệu:" Font-Bold="True"
                                Font-Size="11pt"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblMaterial" runat="server" ForeColor="Black" Font-Size="11pt"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style2">
                            <asp:Label ID="Label6" runat="server" Text="Size:" Font-Bold="True"
                                Font-Size="11pt"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblSize" runat="server" ForeColor="Black" Font-Size="11pt"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style2">
                            <asp:Label ID="Label7" runat="server" Text="Giá:" Font-Bold="True"
                                Font-Size="11pt"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblPrice" runat="server" ForeColor="Red" Font-Size="11pt"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style2" align="justify" valign="top">
                            <asp:Label ID="Label8" runat="server" Text="Số lượng:" Font-Bold="True"
                                Font-Size="11pt"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtTotal" runat="server" Height="19px" Width="35px"></asp:TextBox>
                            /&nbsp;
                            <asp:Label ID="lblSL" runat="server" ForeColor="Black" Font-Size="11pt"></asp:Label>&nbsp;
                            <asp:Label ID="Label9" runat="server" Text="Sản phẩm" Font-Size="11pt"></asp:Label>&nbsp;
                        
                        </td>

                    </tr>
                    <tfoot>
                        <td colspan="2">
                            <asp:CustomValidator ID="CtvThongBao" runat="server"
                                ErrorMessage="Số lượng phải là số nguyên dương và nhỏ hơn số lượng sản phẩm hiện có!" ControlToValidate="txtTotal"
                                ValidateEmptyText="True" Font-Size="10pt"
                                OnServerValidate="CtvThongBao_ServerValidate" Width="294px"></asp:CustomValidator>
                        </td>
                    </tfoot>
                </table>
                <asp:ImageButton ID="ImageButton1" runat="server" ImageUrl="Anh/muahang.jpg" Width="98"
                    Height="25" ImageAlign="Right" OnClick="ImageButton1_Click" />
                <asp:HiddenField ID="hdf" runat="server" />
            </div>
        </div>
    </div>

    <div id="vungbinhluan">
        <input type="hidden" name="do" id="do" value="test" />
        <input type="hidden" name="Product_ID" id="Product_ID" value="<%=pro.Product_ID%>" />
        <input type="hidden" name="User" id="User" value="<%=Session["Username"]%>" />
        <input type="hidden" name="Username" id="Username" value="<%=Session["hoten"]%>" />
        <div class="card">
            <div class="card-body">
                <%foreach (var cmt in lstcmt)
                    { %>
                <div class="row">
                    <div class="col-md-4">
                        <img width="40%" src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                        <p><%=cmt.NameUser%></p>
                        <p class="text-secondary text-center"><%=cmt.Create.ToString("HH:mm  dd-MM-yyyy")%></p>
                    </div>
                    <div class="col-md-8">
                        <div class="clearfix"></div>
                        <p><%=cmt.Cmt_Content%>
                                    <a title="Trả lời" class="float-right btn btn-outline-primary ml-2"><i class="fa fa-reply"></i></a>
                                    <a title="Thích" class="float-right btn text-white btn-danger"><i class="fa fa-heart"></i></a>
                        </p>
                    </div>
                </div>
                <%} %>
                <div class="card card-inner">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-10">
                                <textarea  rows="2" cols="65"  id="Cmt_Content" name="Cmt_Content">  </textarea>
                            </div>
                            <div class="col-md-2">
                                 <button type="button" id="submit">Thêm</button>
                                 <button type="button" id="test">test</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br />
    <div class="khungthanhtoan">
        <asp:Label ID="Label4" runat="server" Text="Sản phẩm cùng loại"
            Font-Bold="True" Font-Size="13pt"></asp:Label>
        <hr />
        <asp:DataList ID="sanpham" runat="server" HorizontalAlign="Center"
            RepeatColumns="4" Width="100%" DataKeyField="Product_ID" RepeatDirection="Horizontal">
            <ItemTemplate>
                <div style="width: 121px; min-height: 205px">
                    <a href='<%# "Chitiet.aspx?Product_ID="+Eval("Product_ID") %>'>
                        <img id="img" height="136px" width="120px" src='<%# "AnhChe/AnhSanPham/"+Eval("Image") %>' alt=' ' />
                    </a>
                    <div class="dong">
                        <asp:HyperLink ID="HyperLink3" runat="server" Font-Size="10.5pt"
                            ForeColor="#333333" Text='<%# Eval("Product_Name") %>'
                            NavigateUrl='<%# "Chitiet.aspx?Product_ID="+Eval("Product_ID") %>' Font-Underline="False"></asp:HyperLink>
                    </div>
                    <div class="dong">
                        &nbsp;<asp:Label ID="Label1" runat="server" ForeColor="#CC0000"
                            Text='<%# Eval("Price_Export") %>' Font-Size="10.5pt"></asp:Label>
                        <asp:Label ID="Label3" runat="server" ForeColor="#CC0000" Text="VNĐ"
                            Font-Size="10pt"></asp:Label>

                    </div>
                </div>
            </ItemTemplate>
        </asp:DataList>
    </div>
</asp:Content>
