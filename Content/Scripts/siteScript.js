
var popupNotification;
var cktoolFull = [
    { name: 'document', groups: ['mode', 'document', 'doctools'], items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'] },
    { name: 'clipboard', groups: ['clipboard', 'undo'], items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker'], items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
    { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
    '/',
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'], items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
    { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
    { name: 'insert', items: ['Image', 'Video', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
    '/',
    { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
    { name: 'colors', items: ['TextColor', 'BGColor'] },
    { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
    { name: 'others', items: ['-'] },
    { name: 'cusform', items: ['Abbr'] },
    //{ name: 'about', items: ['About'] },
];
jQuery(document).ready(function ($) {
    var heightwindow = $(window).height();
    $("#slider").height(heightwindow);
    $("#slider").kendoSplitter({
        orientation: "vertical",
        panes: [
            { collapsible: false, resizable: false, size: "75px", scrollable: false },
            { collapsible: false, scrollable: false },
            { collapsible: false, resizable: false, size: "30px", scrollable: false }
        ]
    });
    $("#navbar #menu").kendoMenu();
    $("#container-slider").kendoSplitter({
        orientation: "horizontal",
        panes: [
            { collapsible: true, resizable: true, max: "33%", size: "18%", scrollable: false },
            { collapsible: true, scrollable: false },
            { collapsible: true, resizable: true, size: "18%", scrollable: false },
        ]
    });

    popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
    
    resizeSplitter();
    $(window).resize(function () {
        resizeSplitter()
    });
    var splitter = $("#container-slider").data("kendoSplitter");
    splitter.collapse("#panel-right");

    //auto update element ckeditor
    CKEDITOR.on('instanceReady', function () {
        $.each(CKEDITOR.instances, function (instance) {
            CKEDITOR.instances[instance].document.on("focusout", CK_jQ);
            CKEDITOR.instances[instance].document.on("keyup", CK_jQ);
            CKEDITOR.instances[instance].document.on("paste", CK_jQ);
            CKEDITOR.instances[instance].document.on("keypress", CK_jQ);
            CKEDITOR.instances[instance].document.on("blur", CK_jQ);
            CKEDITOR.instances[instance].document.on("change", CK_jQ);
            CKEDITOR.instances[instance].document.on("focus", CK_jQ);
        });
    });

});
//Fckfinder
function Openfckfinder(title, btnupload, Urlweb) {

    var container = btnupload.replace('btn', '');
    $("#" + btnupload + "").off('click');
    $("#" + btnupload + "").click(function () {
        $("#" + btnupload + "").attr("disabled", true);
        var winopen = window.open("/UserControls/AnhDaiDien/fckFinder.aspx?type=Images&UrlWeb=" + Urlweb + "&option=0&container=" + container + "", "Upload", "width=900,height=420,toolbar=no,location=yes,status=no");
    });
}
function CK_jQ() {

    for (instance in CKEDITOR.instances) {
        CKEDITOR.instances[instance].updateElement();
    }
}
function DeleteImage(btnXoaAnh, imgAnhdaiDien, hdfUrlImages) {
    $("#" + btnXoaAnh + "").click(function () {
        $("#" + imgAnhdaiDien + "").empty();
        $("#" + hdfUrlImages + "").val("");
    });
}
function resizeSplitter() {
    var height = $(this).height();
    $("#slider").height(height);
    var topHeight = 80;
    var bottomHeight = 30;
    var centerHeight = $(window).height() - (topHeight + bottomHeight);
    var splitter = $("#slider").data("kendoSplitter");
    //splitter.size("#container-slider", centerHeight + "px");
    splitter.trigger("resize");

    var splitter = $("#container-slider").data("kendoSplitter");
    if (splitter != undefined) {
        splitter.trigger("resize");
        //console.log($("#container-slider").height());
    }
};
$(function (event) {
    //btnsearch
    $(document).on("click", ".btnsearch", function (e) {
        var $zone_search = $(this).closest(".smgrid");
        var $grid = $zone_search.attr("data-grid");
        refeshGrid($grid);
        return false;    //<---- Add this line
    });
    $(document).on("click", ".zone_search", function (e) {
        var $zone_search = $(this).closest(".smgrid");
        var $grid = $zone_search.attr("data-grid");
        var TuNgay = $zone_search.find("#SearchTuNgay").val();
        if (TuNgay != "" && TuNgay != undefined && TuNgay != null) {
            var DenNgay = $zone_search.find("#SearchDenNgay").val();
            if (DenNgay == "" || DenNgay == undefined || DenNgay == null) {
                var date = new Date();
                var month = date.getMonth() + 1;
                var day = date.getDate();

                var output = (('' + day).length < 2 ? '0' : '') + day + '/' +
                    (('' + month).length < 2 ? '0' : '') + month + '/' +
                    date.getFullYear();
                $("#SearchDenNgay").val(output)
            }
        }
        //refeshGrid($grid);
        return false;    //<---- Add this line
    });
    //k-i-collapse
    $(document).on("click", ".k-i-collapse", function () {
        //set laij class cho nos.
        //k-icon k-i-expand
        $(this).removeClass("k-i-collapse").addClass('k-i-expand').attr('aria-label', 'Expand');
        var $trgroup = $(this).closest("tr.si-group-tr");
        console.log($trgroup.text());
        var tritem = $trgroup.next();
        while (tritem.is("tr") && !tritem.hasClass("si-group-tr")) {
            //target.css("background-color", "red");
            tritem.addClass("trhiden");
            tritem = tritem.next();
        }
    });

    $(document).on("click", ".k-i-expand", function () {
        //set laij class cho nos.
        //k-icon k-i-expand
        $(this).removeClass("k-i-expand").addClass('k-i-collapse').attr('aria-label', 'Collapse');
        var $trgroup = $(this).closest("tr.si-group-tr");
        console.log($trgroup.text());
        var tritem = $trgroup.next();
        while (tritem.is("tr") && !tritem.hasClass("si-group-tr")) {
            //target.css("background-color", "red");
            tritem.removeClass("trhiden");
            tritem = tritem.next();
        }
    });

    $(document).on("keypress", ".zone_search input", function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var $zone_search = $(this).closest(".smgrid");
            var $grid = $zone_search.attr("data-grid");
            refeshGrid($grid);
            return false;    //<---- Add this line
        }
    });
    // thêm mới
    $(document).on("click", ".btnadd", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlform = $zone_search.attr("data-form");
        var widthform = $zone_search.attr("data-formwidth");
        var $title = $zone_search.attr("title");
        if ($title === undefined)
            $title = "Thêm mới";
        else $title = "Thêm mới " + $title;
        AddFormDialog(urlform, widthform, $title, $(this).data());
    });
    // thêm nhiều
    $(document).on("click", ".btnAdds", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlform = $zone_search.attr("data-form");
        var widthform = $zone_search.attr("data-formwidth");
        var $title = $zone_search.attr("title");
        if ($title === undefined)
            $title = "Thêm nhiều";
        else $title = "Thêm nhiều " + $title;
        AddFormDialog("/DanhMuc/ChucVu/FormThemNhieuChucVu", widthform, $title, $(this).data());
    });
    //
   
    $(document).on("click", ".sibtn", function () {
        var urlform = $(this).attr("data-url");
        var widthform = $(this).attr("data-width");
        var $title = $(this).attr("title");
        if ($title === undefined)
            $title = "Form";
        if (widthform == undefined)
            widthform = 1024;
        var $odata = $(this).data();
        console.log($odata);
        AddFormDialog(urlform, widthform, $title, $odata);
    });
    $(document).on("click", ".sibtnselected", function () {
        var $zone_search = $(this).closest(".smgrid");
        var grid = $zone_search.attr("data-grid");
        var $grid = $("#" + grid).data("kendoGrid");
        var $id = $grid.select("").find(".view").attr("data-id");
        if ($id === undefined) {
            createMessage("Thông báo", "Bạn hãy chọn một bản ghi");
            return false;
        }
        var urlform = $(this).attr("data-url");
        var widthform = $(this).attr("data-width");
        var $title = $(this).attr("title");
        if ($title === undefined)
            $title = "Form";
        if (widthform == undefined)
            widthform = 1024;
        var $odata = $(this).data();
        $odata.ItemID = $id;
        AddFormDialog(urlform, widthform, $title, $odata);
    });
    $(document).on("click", ".btn-change-tt", function () {
        var itemid = $(this).attr("data-id");
        var urlform = $(this).attr("data-url");
        var action = $(this).attr("data-act");
        var title = $(this).attr("title");
        AddFormDialog(urlform, 500, title, { ItemID: itemid, do: action });
    });
    $(document).on("click", ".btn-thietlapdv,.btn-thietlaplv", function () {
        var itemid = $(this).attr("data-id");
        var urlform = $(this).attr("data-url");
        var action = $(this).attr("data-act");
        var title = $(this).attr("title");
        var type = $(this).attr("data-type");
        AddFormDialog(urlform, 1100, title, { ItemID: itemid, do: action, type:type });
    });
    $(document).on("click", ".sibtnpost", function () {
        loading();
        var $zone_search = $(this).closest(".smgrid");
        var $title = $(this).attr("title").toLowerCase();
        var urlAction = $zone_search.attr("data-action");
        var $odata = $(this).data();
        var funcName = $odata["callback"];
        var $grid = $(this).closest("[data-role=grid]");
        var gridName = $zone_search.attr("data-grid");
        if ($odata.do == "KICHHOAT")
            DeleteFromDialog("kích hoạt trạng thái hoạt động", urlAction, $odata, gridName, "", function endload() {
                endLoading(); if (funcName != undefined) {
                    window[funcName]();
                }
            });
        else if ($odata.do == "ADDUSER")
            DeleteFromDialog($title, urlAction, $odata, gridName, "", function endload() {
                endLoading();
                if (funcName != undefined) {
                    window[funcName]();
                }
            });
        else if ($odata.do == "HUYKICHHOAT")
            DeleteFromDialog("hủy kích hoạt trạng thái hoạt động", urlAction, $odata, gridName, "", function endload() {
                endLoading(); if (funcName != undefined) {
                    window[funcName]();
                }
            });
        else {
            $.post(urlAction, $odata, function (data) {
                if (data.Erros) {
                    endLoading();
                    createMessage("Đã có lỗi xảy ra", data.Message);
                }
                else {
                    endLoading();
                    popupNotification.show(data.Message, "success");
                    //refresh lại grid hiện tại.
                    $grid.data("kendoGrid").dataSource.read();
                    //check có close form hay không.
                    if (funcName != undefined) {
                        window[funcName]();
                    }
                }
            });
        }
    });
    $(document).on("click", ".sibtnconfirm", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlAction = $zone_search.attr("data-action");
        var $odata = $(this).data();
        var $Title = $(this).attr("title");
        var funcName = $odata["callback"];
        var $grid = $(this).closest("[data-role=grid]");
        //loading();
        DeleteFromDialog($Title, urlAction, $odata, $grid.attr("id"));
    });
    // sửa
    $(document).on("click", ".btn-edit", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlform = $zone_search.attr("data-form");
        var widthform = $zone_search.attr("data-formwidth");
        var $title = $zone_search.attr("title");
        if ($title === undefined)
            $title = "Sửa";
        else $title = "Sửa " + $title;
        var itemid = $(this).attr("data-edit");
        var $odata = $(this).data();
        $odata.ItemID = itemid;
        $odata.do = "UPDATE";
        var upfile = $(this).attr("data-upfile");
        AddFormDialog(urlform, widthform, $title, $odata);
    });
    // xóa
    $(document).on("click", ".btn-delete", function () {
        var $do = $(this).data("do");
        if ($do == undefined || $do == "")
            $do = "DELETE";
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-delete");
        DeleteFromDialog("xóa", urlaction, { ItemID: itemid, do: $do }, gridName);
    });
    $(document).on("click", ".btn-canbaodt", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-delete");
        var url = $(this).attr("data-url");
        var title = $(this).attr("data-title");

        DeleteFromDialog2(title, urlaction, { ItemID: itemid, do: "DELETE" }, gridName, url);
    });
    $(document).on("click", ".btnDeleteMulti", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $("#" + gridName).data("kendoGrid").selectedKeyNames().join(","); // $(this).attr("data-delete");
        if (itemid == "" || itemid == undefined)
            createMessage("Thông báo", "Bạn chưa chọn bản ghi nào.");
        else {
            DeleteFromDialog("xóa", urlaction, { ItemID: itemid, do: "DELETE" }, gridName);
        }
    });
    $(document).on("click", ".btnDeleteMultiYesNo", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $("#" + gridName).data("kendoGrid").selectedKeyNames().join(","); // $(this).attr("data-delete");
        var isXoa = $(this).attr("data-isxoa");
        if (itemid == "" || itemid == undefined)
            createMessage("Thông báo", "Bạn chưa chọn bản ghi nào.");
        else {
            $.post(urlaction, { ItemID: itemid, do: "CHECKDELETE", isXoa: isXoa }, function (data) {
                if (data.Erros) {
                    if (isXoa != "" && isXoa != null && isXoa != undefined)
                        DeleteFromDialog("xóa", urlaction, { ItemID: itemid, do: "DELETE", Ids: Ids }, gridName, data.Message);
                    else
                        createMessage("Cảnh báo", data.Message);
                }
                else {
                    var Ids = "";
                    if (data.Ids != null && data.Ids.length > 0)
                        Ids = data.Ids.join(",");
                    DeleteFromDialog("xóa", urlaction, { ItemID: itemid, do: "DELETE", Ids: Ids }, gridName, data.Message);
                }

            });
        }
    });
    $(document).on("click", ".btnXuatBanMulti", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $("#" + gridName).data("kendoGrid").selectedKeyNames().join(","); // $(this).attr("data-delete");
        if (itemid == "" || itemid == undefined)
            createMessage("Thông báo", "Bạn chưa chọn bản ghi nào.");
        else
            ApprovedPendding(urlaction, { ItemID: itemid, do: "XUATBAN" }, gridName);
    });
    $(document).on("click", ".btnHuyXuatBanMulti", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $("#" + gridName).data("kendoGrid").selectedKeyNames().join(","); // $(this).attr("data-delete");
        if (itemid == "" || itemid == undefined)
            createMessage("Thông báo", "Bạn chưa chọn bản ghi nào.");
        else
            ApprovedPendding(urlaction, { ItemID: itemid, do: "HUYXUATBAN" }, gridName);
    });
    $(document).on("click", ".btnAddMulti", function () {
        loading();
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var urlsite = $zone_search.attr("data-urlsite");
        var itemid = $("#" + gridName).data("kendoGrid").selectedKeyNames().join(","); // $(this).attr("data-delete");
        if (itemid != "") {
            $.post(urlaction, { ItemID: itemid, UrlSite: urlsite, do: "ADDUSER", datadvc: true, callback: "RefreshGrid" }, function (data) {
                endLoading();
                if (data.Erros) {
                    createMessage("Đã có lỗi xảy ra", data.Message);
                }
                else {
                    //createMessage("Thông báo", data.Message);
                    popupNotification.show(data.Message, "success");
                    //refresh lại grid hiện tại.
                    $("#" + gridName).data("kendoGrid").dataSource.read();
                    //check có close form hay không.
                    window["RefreshGrid"]();
                }
            });
        } else
            createMessage("Thông báo", "Bạn chưa chọn bản ghi");
        // DeleteFromDialog("Thêm", urlaction, { ItemID: itemid, UrlSite:urlsite, do: "ADDUSER" }, gridName);
    });
    // duyệt
    $(document).on("click", ".btn-pendding", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        var btname = $(this).attr("title");
        var Title = btname.toLowerCase() + " " + $zone_search.attr("title").toLowerCase();
        if ($(this).attr("data-btName") != undefined && $(this).attr("data-btName") != "") {
            Title = $(this).attr("data-btName").toLowerCase();
            btname = $(this).attr("data-btName");
        }

        var name = "";
        var view = $(this).parent().parent().find(".view");
        if (view != undefined)
            name = view.not(".notthis").text();
        if ($(this).attr("data-isMenu") != null && $(this).attr("data-isMenu") != undefined)
            DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "PENDDING", isMenu: 1 }, gridName, "", name, btname);
        else
            DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "PENDDING" }, gridName, "", name, btname);
        //ApprovedPendding(urlaction, { ItemID: itemid, do: "PENDDING" }, gridName);
    });
    //hủy duyệt
    $(document).on("click", ".btn-approved", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        var btname = $(this).attr("title");
        var Title = btname.toLowerCase() + " " + $zone_search.attr("title").toLowerCase();
        if ($(this).attr("data-btName") != undefined && $(this).attr("data-btName") != "") {
            Title = $(this).attr("data-btName").toLowerCase();
            btname = $(this).attr("data-btName");
        }
        var name = "";
        var view = $(this).parent().parent().find(".view");
        if (view != undefined)
            name = view.not(".notthis").text();
        //DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "APPROVED" }, gridName, "", name, btname);
        if ($(this).attr("data-isMenu") != null && $(this).attr("data-isMenu") != undefined)
            DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "APPROVED", isMenu: 1 }, gridName, "", name, btname);
        else
            DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "PHEDUYET" }, gridName, "", name, btname);
    });
    // xuất bản
    $(document).on("click", ".btn-xuatban", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        DeleteFromDialog("xuất bản", urlaction, { ItemID: itemid, do: "XUATBAN" }, gridName);
        //ApprovedPendding(urlaction, { ItemID: itemid, do: "XUATBAN" }, gridName);
    });
    $(document).on("click", ".btn-notxuatban", function () {
        createMessageV("Thông báo", "Bạn không thể xuất bản khi chưa duyệt");
    });
    $(document).on("click", ".btn-notpendding", function () {
        createMessageV("Thông báo", "Bạn không thể hủy duyệt khi đã xuất bản");
    });
    $(document).on("click", ".btn-notedit", function () {
        createMessageV("Thông báo", "Bạn không thể sửa khi đã duyệt");
    });
    $(document).on("click", ".btn-notdelete", function () {
        createMessageV("Thông báo", "Bạn không thể xóa khi duyệt");
    });
    // hủy xuất bản
    $(document).on("click", ".btn-huyxuatbanyesno", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        $.post(urlaction, { ItemID: itemid, do: "CHECKHUYXUATBAN" }, function (data) {
            if (data.Erros) {
                createMessage("Đã có lỗi xảy ra", data.Message);
            }
            else {
                var Ids = "";
                if (data.Ids != null && data.Ids.length > 0)
                    Ids = data.Ids.join(",");
                DeleteFromDialog("hủy xuất bản", urlaction, { ItemID: itemid, do: "HUYXUATBAN", Ids: Ids }, gridName, data.Message);
            }
        });
    });
    $(document).on("click", ".btn-huyxuatban", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        DeleteFromDialog("hủy xuất bản", urlaction, { ItemID: itemid, do: "HUYXUATBAN" }, gridName);
        //ApprovedPendding(urlaction, { ItemID: itemid, do: "HUYXUATBAN" }, gridName);
    });
    //thiet lap
    $(document).on("click", ".btn-thietlap", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        var btname = $(this).attr("title");
        var Title = btname.toLowerCase() + " " + $zone_search.attr("title").toLowerCase();
        var name = $(this).parent().parent().find(".view").text();
        DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "THIETLAP" }, gridName, "", name, btname);
        //ApprovedPendding(urlaction, { ItemID: itemid, do: "THIETLAP" }, gridName);
    });
    //huy thiet lap
    $(document).on("click", ".btn-huythietlap", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        var btname = $(this).attr("title");
        var Title = btname.toLowerCase() + " " + $zone_search.attr("title").toLowerCase();
        var name = $(this).parent().parent().find(".view").text();
        DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "HUYTHIETLAP" }, gridName, "", name, btname);
    });
    //ket noi
    $(document).on("click", ".btn-ketnoi", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        var btname = $(this).attr("title");
        var Title = btname.toLowerCase() + " " + $zone_search.attr("title").toLowerCase();
        var name = $(this).parent().parent().find(".view").text();
        DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "KETNOI" }, gridName, "", name, btname);
        //ApprovedPendding(urlaction, { ItemID: itemid, do: "KETNOI" }, gridName);
    });
    //huy ket noi
    $(document).on("click", ".btn-huyketnoi", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        var btname = $(this).attr("title");
        var Title = btname.toLowerCase() + " " + $zone_search.attr("title").toLowerCase();
        var name = $(this).parent().parent().find(".view").text();
        DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "NGATKETNOI" }, gridName, "", name, btname);
        //ApprovedPendding(urlaction, { ItemID: itemid, do: "NGATKETNOI" }, gridName);
    });
    // view
    $(document).on("click", ".view", function () {
        var odata = $(this).data();
        var $zone_search = $(this).closest(".smgrid");
        var urlform = $(this).data("urlview");
        var $title = $(this).attr("title");
        if (urlform == undefined)
            urlform = $zone_search.attr("data-view");
        if ($title == undefined)
            $title = $zone_search.attr("title");
        var widthform = $zone_search.attr("data-formwidth");
        var itemid = $(this).attr("data-id");

        var isDaXem = $(this).attr("data-isxem");
        var gridName = $zone_search.attr("data-grid");
        odata["ItemID"] = itemid;
        console.log(odata);
        if ($title === undefined)
            $title = "Xem chi tiết";
        else $title = "Xem chi tiết " + $title;
        AddFormDialog(urlform, widthform, $title, odata);
        if (isDaXem != "" && isDaXem != null || isDaXem != undefined || isDaXem == 0) {
            refeshGrid(gridName);
        }
    });
    $(document).on("click", ".viewList", function () {
        var odata = $(this).data();
        var urlform = $(this).attr("data-view");
        var $zone_search = $(this).closest(".smgrid");
        var widthform = $zone_search.attr("data-formwidth");
        var itemid = $(this).attr("data-id");
        var nameList = $(this).attr("data-title");
        var FieldQuery = $(this).attr("data-FieldQuery");
        var $title = $(this).attr("title");
        console.log(odata);
        if ($title === undefined)
            $title = "Danh sách";
        if (nameList != undefined && nameList != "")
            $title += " - " + nameList;
        AddFormDialog(urlform, widthform, $title, odata);
    });

    $(document).on("click", ".btn-reset", function () {
        $(this).closest(".cus_dialog").data("kendoWindow").refresh();
    });
    $(document).on("click", ".btn-deleteyesno", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var datatitle = $(this).attr("data-title");
        var itemid = $(this).attr("data-delete");
        var isXoa = $(this).attr("data-isxoa");
        $.post(urlaction, { ItemID: itemid, do: "CHECKDELETE", title: datatitle, isXoa: isXoa }, function (data) {
            if (data.Erros) {
                if (isXoa != "" && isXoa != null && isXoa != undefined)
                    DeleteFromDialog("xóa", urlaction, { ItemID: itemid, do: "DELETE", Ids: Ids }, gridName, data.Message);
                else
                    createMessage("Cảnh báo", data.Message);
            }
            else {
                var Ids = "";
                if (data.Ids != null && data.Ids.length > 0)
                    Ids = data.Ids.join(",");
                DeleteFromDialog("xóa", urlaction, { ItemID: itemid, do: "DELETE", Ids: Ids }, gridName, data.Message);
            }

        });
    });
    $(document).on("click", ".btn-unlock", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        var Title = $(this).attr("data-title");
        var name = $(this).attr("data-name");
        var btname = $(this).attr("data-btname");
        DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "MOTK" }, gridName, "", name, btname);
        //ApprovedPendding(urlaction, { ItemID: itemid, do: "APPROVED" }, gridName);
    });
    $(document).on("click", ".btn-lock", function () {
        var $zone_search = $(this).closest(".smgrid");
        var urlaction = $zone_search.attr("data-action");
        var gridName = $zone_search.attr("data-grid");
        var itemid = $(this).attr("data-id");
        var Title = $(this).attr("data-title");
        var name = $(this).attr("data-name");
        var btname = $(this).attr("data-btname");
        DeleteFromDialogNew(Title, urlaction, { ItemID: itemid, do: "KHOATK" }, gridName, "", name, btname);
        //ApprovedPendding(urlaction, { ItemID: itemid, do: "APPROVED" }, gridName);
    });
    $(document).on("click", ".btnCauHinhIn", function () {
        var tieudebc = $(".mainContentBaoCao .zonehead p").first().text();
        AddFormDialog("/Ossi/CongThongTin/LConfig/frmConFigBaoCao.aspx?", 1000, "Cấu hình in báo cáo", { tieudebc: tieudebc });

    });
});

///join array object by field
function joinObj(a, attr) {
    var out = [];
    for (var i = 0; i < a.length; i++) {
        out.push(a[i][attr]);
    }
    return out.join(", ");
}
///
function EncodeHtml(str) {
    if (str == null || str == "") return "";
    var buf = [];
    for (var i = str.length - 1; i >= 0; i--) {
        buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('');
}
function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
};
function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
}
