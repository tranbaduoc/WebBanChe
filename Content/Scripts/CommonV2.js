

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function (a) { (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);


var vidatalocale = {
    "format": "DD/MM/YYYY",
    "separator": "/",
    "applyLabel": "Apply",
    "cancelLabel": "Cancel",
    "fromLabel": "From",
    "toLabel": "To",
    "customRangeLabel": "Custom",
    "weekLabel": "W",
    "daysOfWeek": [
        "CN",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7"
    ],
    "monthNames": [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
    ],
    "firstDay": 1
};


function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}
function findValueArrayByKey(array, key, value) {
    var new_arr = $.grep(array, function (n, i) { // just use arr
        return n[key] === value;
    });
    var ids = new_arr.map(function (v) {
        return v.value;
    });

    return ids.join(",");
}
function GetKieuDuLieuText(intKieuDuLieu) {
    var status = '';

    return status;
}
function STTCoLumn(STT) {
    return '<div style="text-align:center">' + STT + '</div>';
}
function EncodeHtml(str) {
    if (str == null || str == "") return "";
    var buf = [];
    for (var i = str.length - 1; i >= 0; i--) {
        buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('');
}
function GetNameFormMaTinh(MaTinh) {
    var name = "";
    switch (MaTinh) {
        case 10: name = "TP Hà Nội"; break;
        case 16: name = "Tỉnh Hưng Yên"; break;
        case 17: name = "Tỉnh Hải Dương"; break;
        case 18: name = "TP Hải Phòng"; break;
        case 20: name = "Tỉnh Quảng Ninh    "; break;
        case 22: name = "Tỉnh Bắc Ninh      "; break;
        case 23: name = "Tỉnh Bắc Giang     "; break;
        case 24: name = "Tỉnh Lạng Sơn      "; break;
        case 25: name = "Tỉnh Thái Nguyên   "; break;
        case 26: name = "Tỉnh Bắc Kạn       "; break;
        case 27: name = "Tỉnh Cao Bằng      "; break;
        case 28: name = "Tỉnh Vĩnh Phúc     "; break;
        case 29: name = "Tỉnh Phú Thọ       "; break;
        case 30: name = "Tỉnh Tuyên Quang   "; break;
        case 31: name = "Tỉnh Hà Giang      "; break;
        case 32: name = "Tỉnh Yên Bái       "; break;
        case 33: name = "Tỉnh Lào Cai       "; break;
        case 35: name = "Tỉnh Hoà Bình      "; break;
        case 36: name = "Tỉnh Sơn La        "; break;
        case 38: name = "Tỉnh Điện Biên     "; break;
        case 39: name = "Tỉnh Lai Châu      "; break;
        case 40: name = "Tỉnh Hà Nam        "; break;
        case 41: name = "Tỉnh Thái Bình     "; break;
        case 42: name = "Tỉnh Nam Định      "; break;
        case 43: name = "Tỉnh Ninh Bình     "; break;
        case 44: name = "Tỉnh Thanh Hoá     "; break;
        case 46: name = "Tỉnh Nghệ An       "; break;
        case 48: name = "Tỉnh Hà Tĩnh       "; break;
        case 51: name = "Tỉnh Quảng Bình    "; break;
        case 52: name = "Tỉnh Quảng Trị     "; break;
        case 53: name = "Tỉnh Thừa Thiên Huế"; break;
        case 55: name = "TP Đà Nẵng         "; break;
        case 56: name = "Tỉnh Quảng Nam     "; break;
        case 57: name = "Tỉnh Quảng Ngãi    "; break;
        case 58: name = "Tỉnh Kon Tum       "; break;
        case 59: name = "Tỉnh Bình Định     "; break;
        case 60: name = "Tỉnh Gia Lai       "; break;
        case 62: name = "Tỉnh Phú Yên       "; break;
        case 63: name = "Tỉnh Đắk Lăk       "; break;
        case 64: name = "Tỉnh Đắk Nông      "; break;
        case 65: name = "Tỉnh Khánh Hoà     "; break;
        case 66: name = "Tỉnh Ninh Thuận    "; break;
        case 67: name = "Tỉnh Lâm Đồng      "; break;
        case 70: name = "TP Hồ Chí Minh     "; break;
        case 79: name = "Tỉnh Bà Rịa Vũng Tàu"; break;
        case 80: name = "Tỉnh Bình Thuận    "; break;
        case 81: name = "Tỉnh Đồng Nai      "; break;
        case 82: name = "Tỉnh Bình Dương    "; break;
        case 83: name = "Tỉnh Bình Phước    "; break;
        case 84: name = "Tỉnh Tây Ninh      "; break;
        case 85: name = "Tỉnh Long An       "; break;
        case 86: name = "Tỉnh Tiền Giang    "; break;
        case 87: name = "Tỉnh Đồng Tháp     "; break;
        case 88: name = "Tỉnh An Giang      "; break;
        case 89: name = "Tỉnh Vĩnh Long     "; break;
        case 90: name = "TP Cần Thơ         "; break;
        case 91: name = "Tỉnh Hậu Giang     "; break;
        case 92: name = "Tỉnh Kiên Giang    "; break;
        case 93: name = "Tỉnh Bến Tre       "; break;
        case 94: name = "Tỉnh Trà Vinh      "; break;
        case 95: name = "Tỉnh Sóc Trăng     "; break;
        case 96: name = "Tỉnh Bạc Liêu      "; break;
        case 97: name = "Tỉnh Cà Mau        "; break;
    }
    return name;
}
function endLoading($element) {
    if ($element != undefined) {
        //k-pane
        var $splitter = $("#" + $element).closest(".k-splitter");
        //var splitter = $splitter.data("kendoSplitter");
        if ($splitter != undefined) {
            kendo.ui.progress($splitter, false);
        } else {
        }
    } else {
        var myWindowloading = $(".cus_dialog").last();
        var windowWidget = myWindowloading.data("kendoWindow");
        if (windowWidget != undefined)
            kendo.ui.progress(windowWidget.element, false);
        else {
            var $splitter = $('div[role="group"]').first();
            //var splitter = $("#" + $splitter).data("kendoSplitter");
            console.log($splitter.attr("id"));
            if ($splitter != undefined) {
                kendo.ui.progress($splitter, false);
            } else {
            }
        }
    }
}

function checkQuyen(lstQuyen) {
    //console.log(lstQuyen);
    $("[data-permiss]").each(function () {
        var that = this;
        var per = $(this).data("permiss");
        if (lstQuyen.indexOf(per) == -1 && lstQuyen.indexOf("isQuanTriHeThong") == -1 && lstQuyen.indexOf("userQuanTriOnHCC") == -1 && lstQuyen.indexOf("userIsAdmin") == -1) {//9999 isQuanTriHeThong
            if (lstQuyen.indexOf(per) == -1) {

                //if (!$(this).hasClass("btn")) {
                //    var $zone_search = $(this).closest(".smgrid");

                //    var grid = $zone_search.attr("data-grid");
                //    if (grid != undefined) {
                //        var $grid = $("#" + grid).data("kendoGrid");
                //        console.log(grid);
                //        //$grid.hideColumn($("#" + grid).find('th').eq($(this).closest("td").index()).data("index"));
                //    }
                //}
                //var myclass = false;
                //if ($(this).hasClass("notChangeHover") == true)
                //    myclass = true;
                $(this).removeClass();
                $(this).attr("onclick", "").unbind("click");
                $(this).addClass("not-active");
                $(this).addClass("btn-action");
                //if (myclass == true)
                //    $(this).addClass("notChangeHover");
                $(this).attr("title", "Bạn không có quyền " + $(this).attr("title"));
                //$(this).remove();

            }
        }
        else {
            $(this).css("display", "inline-block");
            if ($(this).hasClass("notChangeHover") == false) {
                if ($(this).hasClass("not-active") == true && $(this).attr("title") == "Xuất bản") {
                    $(this).parent().attr("title", "Chưa duyệt không thể  " + $(this).attr("title"));
                } else if ($(this).hasClass("not-active") == true && $(this).attr("title") == "Hủy duyệt") {
                    $(this).parent().attr("title", "Chưa hủy xuất bản không thể  " + $(this).attr("title"));
                } else if ($(this).hasClass("not-active") == true && $(this).attr("title") != "Hủy duyệt" && $(this).attr("title") != "Xuất bản") {
                    $(this).parent().attr("title", "Chưa hủy duyệt không thể  " + $(this).attr("title"));
                }
            }
            else {
                $(this).parent().attr("title", $(this).attr("title"));
            }
        }
    });
    //perrmission cột 
    //$("td").css({ "white-space": "nowrap", "overflow": "hidden" });
}

function AddFormDialog(urlLoad, width, title, odata) {
    var hideTitle = title;
    var maxHeight = $(document).height();
    var maxwidth = $(document).width();
    if (odata == undefined)
        odata = {};
    if (title.length > 100) {
        hideTitle = hideTitle.substr(0, 100);
        hideTitle = hideTitle + "...";
    }
    $("#wd_dialog").append("<div class='cus_dialog'></div>");
    var myWindow = $("#wd_dialog .cus_dialog").last();
    //myWindow.data(odata);
    var $width = "1000px";
    if ($.isNumeric(width)) {
        $width = width + "px";
    } else
        $width = width;
    var sidialog = myWindow.kendoWindow({
        width: $width,
        title: hideTitle,
        content: {
            url: urlLoad,
            type: "POST",
            data: odata
        },
        maxHeight: maxHeight - 100,
        modal: true,
        visible: false,
        activate: function () {
            //debugger;
            //var modal = $(".cus_dialog").last().find(".modal-body");
            $(".cus_dialog").last().find(".modal-body").data(odata);
            $(".k-header span.k-window-title").attr("title", title);
        },
        position: {
            top: 50,
            left: (maxwidth - width) / 2
        },
        actions: [
            "Maximize",
            "Close"
        ],
        close: function (e) {
            this.destroy();
        }
    }).data("kendoWindow").open();
    //$("label[for=DMSTT]").text("Thứ tự hiển thị");
}
/// approved or penđing
function ApprovedPendding(urlLoad, odata, gridName) {
    $.post(urlLoad, odata, function (data) {
        if (data.Erros) {
            createMessage("Thông báo", data.Message); // Tạo thông báo lỗi
        }
        else {
            showMsg(data.Message);
            refeshGrid(gridName);
        }
    });
}
/// deletePage
/// deletePage
function DeleteFromDialog(Title, urlLoad, odata, gridName, NoiDung, funCall) {
    if (NoiDung == undefined || NoiDung == "") {
        if (Title == undefined || Title == "") {
            NoiDung = "Bạn có chắc chắn muốn xóa bản ghi đã chọn?";
            Title = "xóa"
        }
        else {
            NoiDung = "Bạn có chắc chắn muốn " + Title + " bản ghi đã chọn?";
        }
    }
    $("#wd_dialog").append("<div class='cus_dialog'>" +
        "<div class='htmlcontentmess'><p>" + NoiDung + "</p></div>" +
        "<div class=\"buttons-wrap-messager\"><button type=\"button\" class=\"btn-warning btn confirm_yes\" style=\"margin-right:5px;\">Tiếp tục</button><button type=\"button\" class=\"btn confirm_no\">Hủy</button></div></div>");
    var myWindow = $("#wd_dialog .cus_dialog").last();
    var dialogwindow = myWindow.kendoWindow({
        width: "350px",
        title: "Xác nhận",
        height: "150px",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: function (e) {
            this.destroy();
        }
    }).data("kendoWindow").center().open();
    myWindow.find(".confirm_no").click(function () {
        dialogwindow.close();
    });
    myWindow.find(".confirm_yes").click(function () {
        $.post(urlLoad, odata, function (data) {
            if (data.Erros) {
                if (funCall != undefined && jQuery.isFunction(funCall)) {
                    funCall();
                }
                createMessage("Thông báo", data.Message); // Tạo thông báo lỗi
            }
            else {
                if (funCall != undefined && jQuery.isFunction(funCall)) {
                    funCall();
                }

                showMsg(Title + " thành công");
                if (gridName != "")
                    refeshGrid(gridName);
            }
        });
        dialogwindow.close();
    });
}
function DeleteFromDialogNew(Title, urlLoad, odata, gridName, NoiDung, name, btname) {
    if (NoiDung == undefined || NoiDung == "")
        NoiDung = "Bạn có chắc chắn muốn " + Title + " <span style='font-weight: bold;'>" + name + "</span>";
    $("#wd_dialog").append("<div class='cus_dialog'>" +
        "<div class='htmlcontentmess'><p>" + NoiDung + "</p></div>" +
        "<div class=\"buttons-wrap-messager\"><button type=\"button\" class=\"btn-warning btn confirm_yes\" style=\"margin-right:5px;\">Tiếp tục</button><button type=\"button\" class=\"btn confirm_no\">Hủy</button></div></div>");
    var myWindow = $("#wd_dialog .cus_dialog").last();
    var dialogwindow = myWindow.kendoWindow({
        width: "350px",
        title: "Xác nhận",
        height: "150px",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: function (e) {
            this.destroy();
        }
    }).data("kendoWindow").center().open();
    myWindow.find(".confirm_no").click(function () {
        dialogwindow.close();
    });
    if (btname != undefined && btname != "")
        myWindow.find(".confirm_yes").text(btname);
    myWindow.find(".confirm_yes").click(function () {
        loading();
        $.post(urlLoad, odata, function (data) {
            endLoading();
            if (data.Erros) {
                createMessage("Thông báo", data.Message); // Tạo thông báo lỗi
            }
            else {
                showMsg(data.Message);
                refeshGrid(gridName);
            }
            dialogwindow.close();
            if (odata.isMenu != null && odata.isMenu != undefined)
                loadAjaxContentPostData("/Ossi/CongThongTin/MenuTrangChu/pViewTreeMenu.aspx", "#contain-menu", {});
        });

    });
}
function DeleteFromDialog2(Title, urlLoad, odata, gridName, urlMau, funCall) {

    if (urlMau == null || urlMau == "" || urlMau == "undefined" || urlMau == "null" || urlMau == undefined) {
        $("#wd_dialog").append("<div class='cus_dialog'>" +
            "<div class='htmlcontentmess'><p>Bạn có chắc chắn muốn xóa bản ghi đã chọn?</p></div>" +
            "<div class=\"buttons-wrap-messager\"><button type=\"button\" class=\"btn-warning btn confirm_yes\" style=\"margin-right:5px;\">Tiếp tục</button><button type=\"button\" class=\"btn confirm_no\">Hủy</button></div></div>");
    } else {
        $("#wd_dialog").append("<div class='cus_dialog'>" +
            "<div class='htmlcontentmess'><p>" + Title + ", bạn có chắc chắn muốn xóa?</p></div>" +
            "<div class=\"buttons-wrap-messager\"><button type=\"button\" class=\"btn-warning btn confirm_yes\" style=\"margin-right:5px;\">Tiếp tục</button><button type=\"button\" class=\"btn confirm_no\">Hủy</button></div></div>");
    }
    var myWindow = $("#wd_dialog .cus_dialog").last();
    var dialogwindow = myWindow.kendoWindow({
        width: "350px",
        title: "Xác nhận",
        height: "150px",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: function (e) {
            this.destroy();
        }
    }).data("kendoWindow").center().open();
    myWindow.find(".confirm_no").click(function () {
        dialogwindow.close();
    });
    myWindow.find(".confirm_yes").click(function () {
        $.post(urlLoad, odata, function (data) {
            if (data.Erros) {
                if (funCall != undefined && jQuery.isFunction(funCall))
                    createMessage("Thông báo", data.Message, funCall);
                else
                    createMessage("Thông báo", data.Message); // Tạo thông báo lỗi
            }
            else {
                showMsg("Xóa thành công");
                refeshGrid(gridName);
            }
        });
        dialogwindow.close();
    });
}
function showMsg(msg) {
    var $boxMsg = $("#msg");
    var $boxContent = $boxMsg.find("> span");
    $boxContent.html(msg);
    $boxMsg.fadeIn();
    setTimeout(function () {
        $boxMsg.fadeOut(1800);
    }, 3 * 1500);
}
function loadAjaxContentPostData(urlContent, container, data) {
    if ($(container).length) {
        $(container).html("<img src='/Content/Kendo/styles/Silver/loading.gif' />");
        $.ajax({
            url: urlContent,
            data: data,
            cache: false,
            type: "POST",
            success: function (data) {
                $(container).html(data);
            }
        });
    }
}
function CheckDate(txtdate) {
    var text = txtdate;
    if (text.indexOf('/') != -1) {
        var comp = text.split('/');
        if (comp.length == 3) {
            if ($.isNumeric(comp[0]) && $.isNumeric(comp[1]) && $.isNumeric(comp[2])) {
                var m = parseInt(comp[1], 10);
                var d = parseInt(comp[0], 10);
                var y = parseInt(comp[2], 10);
                var date = new Date(y, m - 1, d);
                if (y < 9999 && date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
                    return true;
                } else {
                    return false;
                }
            } else return false;
        } else return false;
    }
    else
        return false

}
function CheckDateTime(txtdate) {
    var text = txtdate;
    var comp = text.split(' ');
    if (comp.length == 2) {
        var comp1 = comp[0];
        var comp2 = comp[1];
        var sp1 = comp1.split(':');
        var sp2 = comp2.split('/');
        if (sp1.length == 2 && sp2.length == 3) {
            if ($.isNumeric(sp1[0]) && $.isNumeric(sp1[1]) && $.isNumeric(sp2[0]) && $.isNumeric(sp2[1]) && $.isNumeric(sp2[2])) {
                var h = parseInt(sp1[0], 10);
                var mm = parseInt(sp1[1], 10);
                var m = parseInt(sp2[1], 10);
                var d = parseInt(sp2[0], 10);
                var y = parseInt(sp2[2], 10);
                var date = new Date(y, m - 1, d);
                if (-1 < h && h < 24 && -1 < mm && mm < 60 && y < 9999 && date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
                    return true;
                } else {
                    return false;
                }
            } else return false
        } else return false;
    } else return false;
}
function Chuanhoa(userInput) {
    userInput = userInput.toLowerCase();
    var words = userInput.split(" ");
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].split("");
    }

    for (var i = 0; i < words.length; i++) {
        words[i][0] = words[i][0].toUpperCase();
    }

    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].join("");
    }

    words = words.join(" ");

    return words;
}
/// aff aasfadgagaeg
(function ($) {
    ///Nâng tầm plugin simax.
    var smSelect2018V2 = function () {
        return {
            options: {
                Url: "",
                FieldValue: "ID",
                FieldText: "Title",
                ItemID: 0,
                IDSelected: "",
                lookup: false,
                phay: true,
                Ajax: false,
                placeholder: "Chọn",
                dropdownParent: ".k-window",
                Remove: true,
                width: 0,
                async: true,
                data: {},
                dataBound: function () {
                    //Hàm sau khi load xong
                },
                parameterPlus: function (para) {
                    // Hàm post dữ liệu.
                },
                attribute: [] // ["ID","Title"]
            },
            // --------------------------------------------------------------------
            init: function (options, element) {
                console.log("init");
                this.options = $.extend(this.options, options);

                // Khởi tạo thông tin để lấy dữ liệu.
                // Post de lay du lieu ve hien thi.
                var max_width = "100%"; //$this.width() + 12;
                this.elem = element;
                this.attachEvents();
                var thisID = $(this.elem).attr("id");
                console.log(thisID);
                //set value cho option nếu có khi set trên att
                var $select = $("#" + thisID);
                var $place = $(this.elem).attr("data-place");
                var $selected = $(this.elem).attr("data-selected");
                var $url = $(this.elem).attr("data-url");

                if ($url != undefined && $url != "") {
                    this.options.Url = $url;
                }
                if ($place != undefined && $place != "") {
                    this.options.placeholder = $place;
                }
                if ($selected != undefined && $selected != "") {
                    this.options.IDSelected = $selected;
                }

                if (!this.options.Ajax) {
                    if (this.options.IDSelected == undefined && config.ItemID != 0) {
                        this.options.IDSelected = this.options.ItemID;
                    }
                    if ((this.options.Url == "" || this.options.Url == undefined) && this.options.IDSelected != undefined && this.options.IDSelected != "") {

                        $("#" + thisID + " option[value=" + this.options.IDSelected + "]").prop("selected", true);

                    }
                    $select.select2({
                        dropdownParent: $select.closest(this.options.dropdownParent),
                        width: max_width,
                        placeholder: this.options.placeholder,
                        allowClear: true
                    });
                    if (this.options.Url != "" && this.options.Url != undefined) {
                        this.getData();
                        $select.trigger('change');
                        //triger select2.
                    } else {

                    }

                } else {
                    //

                    $select.select2({
                        ajax: {
                            url: this.options.Url,
                            dataType: 'json',
                            delay: 200,
                            data: function (params) {
                                return {
                                    Keyword: params.term, // search term,
                                    SearchInSimple: "Title",
                                    page: params.page
                                };
                            },
                            processResults: function (data, params) {
                                // parse the results into the format expected by Select2
                                // since we are using custom formatting functions we do not need to
                                // alter the remote JSON data, except to indicate that infinite
                                // scrolling can be used
                                params.page = params.page || 1;

                                return {
                                    results: $.map(data, function (item) {
                                        return {
                                            text: item[config.FieldText],
                                            id: item[config.FieldValue]
                                        }
                                    }),
                                    pagination: {
                                        more: (params.page * 30) < data.total_count
                                    }
                                };
                            },
                            cache: false
                        },
                        dropdownParent: $this.closest(this.options.dropdownParent),
                        placeholder: this.options.placeholder,
                        tags: false,
                        width: max_width,
                        minimumInputLength: 0,
                    });
                }
            },
            getData: function () {
                var thisID = $(this.elem).attr("id");
                var config = this.options;
                //set value cho option nếu có khi set trên att
                var $select = $(this.elem);
                // Hàm set add html cho thẻ select.
                if (config.Remove) {
                    $select.html("");
                }
                if (jQuery.isFunction(config.parameterPlus)) {
                    config.parameterPlus(config.data); //
                }
                $select.append($('<option>', { value: '', text: config.placeholder }));
                $.ajax({
                    url: config.Url,
                    async: false,
                    data: config.data,
                    success: function (odata) {
                        var data = odata.Data;
                        var $option = null;
                        $.each(data, function (key, val) {
                            var $noi = ' - ';
                            var $noi2 = '-';
                            if (config.lookup) {
                                $noi = ';#';
                                $noi2 = ';#';
                            }
                            if (config.FieldText.indexOf(",") > 0 || config.FieldValue.indexOf(",") > 0) {
                                var res = config.FieldText.split(',');
                                var $text = '';
                                $.each(res, function (key1, val1) {
                                    if ($text == '') {
                                        $text = val[val1];
                                    } else {
                                        $text += $noi + val[val1];
                                    }
                                });
                                var resValue = config.FieldValue.split(',');
                                var $val = '';
                                $.each(resValue, function (key1, val1) {
                                    if ($val == '') {
                                        $val = val[val1];
                                    } else {
                                        $val += $noi2 + val[val1];
                                    }
                                });
                                $option = $('<option>', { value: $val, text: $text });
                                //$select.append($('<option>', { value: $val, text: $text }));
                            } else {
                                $option = $('<option>', { value: val[config.FieldValue], text: val[config.FieldText] });
                            }
                            //set các att cho các option nếu có.
                            if (config.attribute.length > 0) {
                                $.each(config.attribute, function (index, value) {
                                    $option.attr('data-' + value, val[value]);
                                });
                            }
                            $select.append($option);
                        })
                        if (config.IDSelected != undefined && config.IDSelected != "") {
                            if ((config.IDSelected.indexOf(",") > -1) && config.phay) {
                                var res = config.IDSelected.split(",");
                                res = res.filter(function (v) { return v !== '' });
                                $.each(res, function (index, value) {
                                    $("#" + thisID + " option[value=" + value + "]").prop("selected", true);
                                });
                            } else {
                                $("#" + thisID + " option[value=" + config.IDSelected + "]").attr('selected', 'selected');
                            }
                        }
                    }
                });
                console.log(this.options);
                return $(this.elem); // for chaining
            },
            refreshData: function () {
                var config = this.options;
                var $select = $(this.elem);
                if (config.Remove) {
                    $select.html("");
                }
                if (config.Url != "" && config.Url != undefined) {
                    this.getData();
                    $select.trigger('change');
                    //triger select2.
                }
            },
            // --------------------------------------------------------------------
            someMethod: function () {
                alert('someMethod called');
                return $(this.elem); // for chaining
            },
            // --------------------------------------------------------------------
            attachEvents: function () {
                var self = this;
                $(self.elem).on("hover", function (e) {
                    console.log("hover");
                });
                $(self.elem).on("click", function (e) {
                    //console.log("click");
                });
            }
        };
    };
    $.fn.smSelect2018V2 = function (options) {
        // create an instance for each element in the set
        return this.each(function () {
            var mysmSelect2018V2 = new smSelect2018V2();
            mysmSelect2018V2.init(options, this);
            // this lets us call methods on the selector
            $(this).data("smSelect2018V2", mysmSelect2018V2);
        });
    };
    $.fn.siSerializeDivFrm = function () {
        var values = {};
        var $input = $('input, select');
        var $inputs = $(this).find($input);
        $inputs.each(function () {
            if ($(this).val() != "" && $(this).val() != undefined) {
                if ($(this).hasClass('input-datetime')) {
                    if (CheckDate($(this).val())) {
                        values[this.name] = $(this).val();
                    } else {
                        //$(this).addClass('error').focus();
                        //$(this).parent().append('<label id="' + this.name + '-error" class="error" for="' + this.name + '">Định dạng ngày tháng không đúng dd/mm/yyyy</label>');
                        //<label id="Title-error" class="error" for="Title">Bạn chưa nhập tiêu đề góp ý</label>
                        //return false;
                    }
                } else {
                    values[this.name] = $(this).val();
                }
            }
        });
        console.log(values);
        //returning += $(this).serialize();
        return values;
    };
    //closefrm
    $.fn.closefrm = function (settings) {
        if ($(this).closest("[data-role=window]").data("kendoWindow") != undefined)
            $(this).closest("[data-role=window]").data("kendoWindow").close();
    };
    $.fn.closefrmbs = function (settings) {
        $(this).closest("[role=dialog]").modal('hide');
    };
    //$('#myModal').modal('hide');
    //config các thông tin trên form
    $.fn.smForm = function (settings) {
        var config = {
            Auto: false,
            search: false
        }
        if (settings) $.extend(config, settings);
        var thisID = $(this).attr("id");
        setTimeout(function () {
            $('#' + thisID + ' #Title').focus();

        }, 500);

        $('#' + thisID + ' label.required').each(function () {

            var htmllabel = $(this).html();
            if (!htmllabel.includes('<span class="clslable">(<span class="clsred">*</span>)</span>'))
                $(this).append("<span class='clslable'>(<span class='clsred'>*</span>)</span>");
        });
        //fix gia tri default cho date tiem neu co.
        //$("[data-test]")
        $(".input-datetime[data-defalut]").each(function (index) {
            //console.log(index + ": " + $(this).text());
            //if value = null thi set gia tri defalut cho no.
            var $defalut = $(this).attr('data-defalut');
            //[TODAY-30]
            $defalut = $defalut.replace('[TODAY', '').replace(']', '');
            $defalut = parseInt($defalut);
            var newdate = new Date();
            newdate.setDate(newdate.getDate() + $defalut); // minus the date
            $(this).val(formatDate(newdate));
        });

        $(".input-dateandtime[data-defalut]").each(function (index) {
            //console.log(index + ": " + $(this).text());
            //if value = null thi set gia tri defalut cho no.
            var $defalut = $(this).attr('data-defalut');
            //[TODAY-30]
            $defalut = $defalut.replace('[TODAY', '').replace(']', '');
            $defalut = parseInt($defalut);
            var newdate = new Date();
            newdate.setDate(newdate.getDate() + $defalut); // minus the date
            $(this).attr('value', formatDateTime(newdate));
        });
        $('.input-datetime').daterangepicker({
            autoUpdateInput: false,
            singleDatePicker: true,
            locale: vidatalocale
        });
        $('.input-datetime').on("click", function () {
            $(".daterangepicker").css("z-index", "99999");
        });
        $('.input-datetime').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
            var attr = $(this).attr('data-min');

            // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
            if (typeof attr !== typeof undefined && attr !== false) {
                //$('#' + attr).data("daterangepicker").setOptions({ minDate: $(this).val() });
                $('#' + attr).data("daterangepicker").minDate = picker.startDate;
                //$('#datetimepicker').data("DateTimePicker")
            }
            attr = $(this).attr('data-max');

            // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
            if (typeof attr !== typeof undefined && attr !== false) {
                //$('#' + attr).data("daterangepicker").setOptions({ maxDate: $(this).val() });
                $('#' + attr).data("daterangepicker").maxDate = picker.startDate;
            }
            $(this).removeClass('error');
            if ($("#" + this.name + '-error').length)
                $("#" + this.name + '-error').remove();
        });

        $('.input-datetime').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });

        if (config.search) {
            $(".input-datetime").keyup(function () {
                var temp = $(this).val();
                if (!CheckDate(temp) && temp != "") {
                    var html = $(this).parent().html();
                    if (!html.includes('<label id="' + this.name + '-error" class="error" for="' + this.name + '">Nhập đúng định dạng DD/MM/YYYY</label>')) {
                        $(this).addClass('error').focus();
                        $(this).parent().append('<label id="' + this.name + '-error" class="error" for="' + this.name + '">Nhập đúng định dạng DD/MM/YYYY</label>');
                    }
                } else {
                    $(this).removeClass('error');
                    if ($("#" + this.name + '-error').length)
                        $("#" + this.name + '-error').remove();
                }
            });
            $(".input-dateandtime").keyup(function () {
                var temp = $(this).val();
                if (!CheckDateTime(temp) && temp != "") {
                    var html = $(this).parent().html();
                    if (!html.includes('<label id="' + this.name + '-error" class="error" for="' + this.name + '">Nhập đúng định dạng HH:mm DD/MM/YYYY</label>')) {
                        $(this).addClass('error').focus();
                        $(this).parent().append('<label id="' + this.name + '-error" class="error" for="' + this.name + '">Nhập đúng định dạng HH:mm DD/MM/YYYY</label>');
                    }
                } else {
                    $(this).removeClass('error');
                    if ($("#" + this.name + '-error').length)
                        $("#" + this.name + '-error').remove();
                }
            });
            $(".input-datetime").on('apply.daterangepicker', function () {
                var toDate = $(".input-datetime[data-defalut='[TODAY-30]']").val();
                var formDate = $(".input-datetime[data-defalut='[TODAY+1]']").val();
                if (toDate != null && toDate != "" && toDate != undefined && formDate != null && formDate != "" && formDate != undefined
                    && (new strToDate(formDate) < new strToDate(toDate))) {
                    var html = $(this).parent().html();
                    if (!html.includes('<label id="' + this.name + '-error" class="error" for="' + this.name + '">Từ ngày phải nhỏ hơn hoặc bằng đến ngày</label>')) {
                        $(this).addClass('error').focus();
                        $(this).parent().append('<label id="' + this.name + '-error" class="error" for="' + this.name + '">Từ ngày phải nhỏ hơn hoặc bằng đến ngày</label>');
                    }
                } else {
                    $(this).removeClass('error');
                    if ($("#" + this.name + '-error').length)
                        $("#" + this.name + '-error').remove();
                }
            });
            $(".input-dateandtime").on('apply.daterangepicker', function (ev, picker) {
                var time = $(".drp-selected").text();
                var value = time.split("-")[0];
                var toDate = "";
                var formDate = "";
                if (picker.element[0].dataset.defalut == "[TODAY-30]") {
                    toDate = value;
                    formDate = $(".input-dateandtime[data-defalut='[TODAY+1]']").val();
                } else if (picker.element[0].dataset.defalut == "[TODAY+1]") {
                    toDate = $(".input-dateandtime[data-defalut='[TODAY-30]']").val();
                    formDate = value;
                }
                if (toDate != null && toDate != "" && toDate != undefined && formDate != null && formDate != "" && formDate != undefined
                    && (new strDateTime(formDate) < new strDateTime(toDate))) {
                    var html = $(this).parent().html();
                    if (!html.includes('<label id="' + this.name + '-error" class="error" for="' + this.name + '">Từ ngày phải nhỏ hơn hoặc bằng đến ngày</label>')) {
                        $(this).addClass('error').focus();
                        $(this).parent().append('<label id="' + this.name + '-error" class="error" for="' + this.name + '">Từ ngày phải nhỏ hơn hoặc bằng đến ngày</label>');
                    }
                } else {
                    $(this).removeClass('error');
                    if ($("#" + this.name + '-error').length)
                        $("#" + this.name + '-error').remove();
                }
            });
        }

        $('.input-dateandtime').daterangepicker({
            autoUpdateInput: false,
            singleDatePicker: true,
            //locale: vidatalocale,
            timePicker: true,
            timePicker24Hour: true,
            //startDate: moment().startOf('hour'),
            //endDate: moment().startOf('hour').add(32, 'hour'),
            locale: {
                format: 'H:mm DD/MM/YYYY'
            }
        });
        $('.input-dateandtime').on("click", function () {
            $(".daterangepicker").css("z-index", "99999");
        });
        $('.input-dateandtime').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('H:mm DD/MM/YYYY'));
            var attr = $(this).attr('data-min');

            // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
            if (typeof attr !== typeof undefined && attr !== false) {
                //$('#' + attr).data("daterangepicker").setOptions({ minDate: $(this).val() });
                $('#' + attr).data("daterangepicker").minDate = picker.startDate;
                //$('#datetimepicker').data("DateTimePicker")
            }
            attr = $(this).attr('data-max');

            // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
            if (typeof attr !== typeof undefined && attr !== false) {
                //$('#' + attr).data("daterangepicker").setOptions({ maxDate: $(this).val() });
                $('#' + attr).data("daterangepicker").maxDate = picker.startDate;
            }
        });

        $('.input-dateandtime').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });
        $('#' + thisID + ' .upercase').each(function () {
            $(this).keyup(function () {
                if (this.value != undefined)
                    this.value = this.value.toLocaleUpperCase();
            });
            $(this).change(function () {
                if (this.value != undefined)
                    this.value = this.value.toLocaleUpperCase();
            });
        });

        $('#' + thisID + ' .in_hoa').each(function () {
            $(this).keyup(function () {
                if (this.value != undefined)
                    this.value = this.value.toLocaleUpperCase();
            });
        });
        $('#' + thisID + ' .inhoahten').each(function () {
            $(this).keyup(function () {
                var str = $(this).val();
                str = str.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function (letter) {
                    return letter.toUpperCase();
                });
                $(this).val(str);
            }).change(function () {

            });
        });



        // disable sự kiện default của sự kiện enter.
        $('#' + thisID + ' input[type=text]').not($(".eventer")).on('keyup keypress', function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                e.preventDefault();
                return false;
            }
        });
    };
    $.fn.smSerialize = function () {
        $(this).find('input[type=text]').each(function () {
            $(this).val($.trim($(this).val()));
        });
        var odata = $(this).serializeArray();
        $('input[type=checkbox]:not(:checked)', this).each(function () {

            if (this != undefined) {
                if (this.name !== undefined && this.value === 'true') {
                    //this.value = 'false';
                    //odata[this.name] = false;
                    odata.push({ name: this.name, value: false });
                }
            }
        });


        //$(this).find('select').each(function () {
        //    var name_select = this.name;
        //    if ($(this).val() != "" && $(this).val() != undefined) {
        //        var attr = $(this).attr('multiple');
        //        if (typeof attr !== typeof undefined && attr !== false) {
        //            var $mangvalue = $(this).val();
        //            //xóa cái cũ đi.
        //            $.each(odata, function (key, value) {
        //                if (value.name == name_select) {
        //                    delete odata[key];
        //                }
        //            });
        //            if ($mangvalue != "" && $mangvalue != undefined)
        //                odata.push({ name: name_select, value: $mangvalue.join(",") });
        //        }
        //    }
        //});
        return odata;
    };
    $.fn.fSelect2018 = function (settings) {
        var config = {
            Text: "Lựa chọn",
            Url: "",
            FieldValue: "ID",
            FieldText: "Title",
            ItemID: 0,
            //numDisplayed: 0,
            lookup: false,
            phay: true,
            Ajax: false,
            placeholder: "Chọn",
            dropdownParent: ".k-window",
            Remove: false,
            width: 0,
            showSearch: true,
            async: true,
            data: {},
            dataBound: function () {
                //Hàm sau khi load xong
            },
            parameterPlus: function (para) {
                // Hàm post dữ liệu.
            },
            attribute: [] // ["ID","Title"]
        }
        if (settings) $.extend(config, settings);
        return this.each(function () {

            var thisID = $(this).attr("id");
            //$("#" + thisID).fSelect("destroy");
            if (thisID != undefined) {
                var max_width = "0"; //$this.width() + 12;
                if (config.width > 0)
                    max_width = config.width;
                var $select = $("#" + thisID);
                var $place = $(this).attr("data-place");
                var $selected = $(this).attr("data-selected");
                var $url = $(this).attr("data-url");
                if ($url == undefined && config.Url != "") {
                    $url = config.Url;
                }
                //if ($place == undefined && config.placeholder != "") {
                //    $place = config.placeholder;
                //}
                if (!config.Ajax) {
                    if ($selected == undefined && config.ItemID != 0) {
                        $selected = config.ItemID;
                    }
                    // Thêm các data post nếu có.
                    if (jQuery.isFunction(config.parameterPlus)) {
                        config.parameterPlus(config.data); //
                    }
                    if ($url != "" && $url != undefined) {
                        if (config.Remove) {
                            $select.html("");
                        }
                        //$select.append($('<option>', { value: '', text: $place }));
                        $.ajax({
                            url: $url,
                            async: config.async,
                            data: config.data,
                            success: function (odata) {
                                var data = odata.Data;
                                var $option = null;
                                $.each(data, function (key, val) {
                                    var $noi = ' - ';
                                    var $noi2 = '-';
                                    if (config.lookup) {
                                        $noi = ';#';
                                        $noi2 = ';#';
                                    }

                                    if (config.FieldText.indexOf(",") > 0 || config.FieldValue.indexOf(",") > 0) {
                                        var res = config.FieldText.split(',');
                                        var $text = '';
                                        $.each(res, function (key1, val1) {
                                            if ($text == '') {
                                                $text = val[val1];
                                            } else {
                                                $text += $noi + val[val1];
                                            }
                                        });
                                        var resValue = config.FieldValue.split(',');
                                        var $val = '';
                                        $.each(resValue, function (key1, val1) {
                                            if ($val == '') {
                                                $val = val[val1];
                                            } else {
                                                $val += $noi2 + val[val1];
                                            }
                                        });
                                        $option = $('<option>', { value: $val, text: $text });
                                        //$select.append($('<option>', { value: $val, text: $text }));
                                    } else {
                                        $option = $('<option>', { value: val[config.FieldValue], text: val[config.FieldText] });
                                    }
                                    //set các att cho các option nếu có.
                                    if (config.attribute.length > 0) {
                                        $.each(config.attribute, function (index, value) {
                                            $option.attr('data-' + value, val[value]);
                                        });
                                    }
                                    $select.append($option);
                                })

                                if ($selected != undefined && $selected != "") {

                                    if (($selected.indexOf(",") > -1) && config.phay) {
                                        var res = $selected.split(",");
                                        res = res.filter(function (v) { return v !== '' });
                                        $.each(res, function (index, value) {
                                            $("#" + thisID + " option[value=" + value + "]").attr("selected", 'selected');
                                        });
                                    } else {
                                        $("#" + thisID + " option[value=" + $selected + "]").attr('selected', 'selected');
                                    }
                                }
                                // get thẻ  modal-body gần nhất.

                                $("#" + thisID).fSelect({
                                    placeholder: config.placeholder,
                                    width: max_width,
                                    numDisplayed: odata.Total
                                });
                                if (jQuery.isFunction(config.dataBound)) {
                                    config.dataBound(odata); //                                    
                                }
                            }
                        });
                    }
                    else {
                        $("#" + thisID).fSelect({
                            width: max_width
                        });
                    }

                }
                else {
                    $select.fSelect({
                        placeholder: 'Chọn',
                        numDisplayed: config.numDisplayed,
                        Text: config.Text,
                        overflowText: '{n}' + config.Text,
                        searchText: 'Tìm kiếm',
                        showSearch: config.showSearch,
                        width: max_width
                    });
                }
            }
        });
    }
    //

    // select2
    $.fn.viSelect2018 = function (settings) {
        var config = {
            Url: "",
            FieldValue: "ID",
            FieldText: "Title",
            ItemID: 0,
            lookup: false,
            phay: true,
            Ajax: false,
            placeholder: "Chọn",
            placeholdervalue: "",
            dropdownParent: ".k-window",
            Remove: false,
            width: 0,
            async: true,
            data: {},
            dataBound: function () {
                //Hàm sau khi load xong

            },
            parameterPlus: function (para) {
                // Hàm post dữ liệu.
            },
            attribute: [] // ["ID","Title"]
        }
        if (settings) $.extend(config, settings);
        return this.each(function () {
            var thisID = $(this).attr("id");
            if ($(this).hasClass("select2-hidden-accessible")) {
                // Select2 has been initialized
                $(this).select2('destroy');
            }
            //console.log(thisID);
            if (thisID != undefined) {
                var $this = $(this);
                var max_width = "100%"; //$this.width() + 12;
                if (config.width > 0)
                    max_width = config.width;
                console.log(max_width);
                var attrmultiple = $(this).attr('multiple');

                var $select = $("#" + thisID);
                var $place = $this.attr("data-place");
                var $selected = $this.attr("data-selected");
                var $url = $this.attr("data-url");

                if ($url == undefined && config.Url != "") {
                    $url = config.Url;
                }
                if ($place == undefined && config.placeholder != "") {
                    $place = config.placeholder;
                }
                if (!config.Ajax) {
                    if ($selected == undefined && config.ItemID != 0) {
                        $selected = config.ItemID;
                    }

                    // Thêm các data post nếu có.
                    if (jQuery.isFunction(config.parameterPlus)) {
                        config.parameterPlus(config.data); //
                    }
                    if ($url != "" && $url != undefined) {
                        if (config.Remove) {
                            $select.html("");
                        }
                        //var $optiondefault = $('<option>', { value: '', text: $place });
                        //$optiondefault.addClass("nghieng");
                        //$select.append($optiondefault);
                        $select.append($('<option>', { value: '', text: $place }));
                        $.ajax({
                            url: $url,
                            async: config.async,
                            data: config.data,
                            success: function (odata) {
                                var data = odata.Data;
                                var $option = null;
                                $.each(data, function (key, val) {
                                    var $noi = ' - ';
                                    var $noi2 = '-';
                                    if (config.lookup) {
                                        $noi = ';#';
                                        $noi2 = ';#';
                                    }
                                    if (config.FieldText.indexOf(",") > 0 || config.FieldValue.indexOf(",") > 0) {
                                        var res = config.FieldText.split(',');
                                        var $text = '';
                                        $.each(res, function (key1, val1) {
                                            if ($text == '') {
                                                $text = val[val1];
                                            } else {
                                                $text += $noi + val[val1];
                                            }
                                        });
                                        var resValue = config.FieldValue.split(',');
                                        var $val = '';
                                        $.each(resValue, function (key1, val1) {
                                            if ($val == '') {
                                                $val = val[val1];
                                            } else {
                                                $val += $noi2 + val[val1];
                                            }
                                        });
                                        $option = $('<option>', { value: $val, text: $text });
                                        //$select.append($('<option>', { value: $val, text: $text }));
                                    } else {
                                        $option = $('<option>', { value: val[config.FieldValue], text: val[config.FieldText] });
                                    }
                                    //set các att cho các option nếu có.
                                    if (config.attribute.length > 0) {
                                        $.each(config.attribute, function (index, value) {
                                            $option.attr('data-' + value, val[value]);
                                        });
                                    }
                                    $select.append($option);
                                })
                                if ($selected != undefined && $selected != "") {
                                    if (($selected.indexOf(",") > -1) && config.phay) {
                                        var res = $selected.split(",");
                                        res = res.filter(function (v) { return v !== '' });
                                        $.each(res, function (index, value) {
                                            $("#" + thisID + " option[value=" + value + "]").prop("selected", true);
                                        });
                                    } else {
                                        $("#" + thisID + " option[value=" + $selected + "]").attr('selected', 'selected');
                                    }
                                }

                                // get thẻ  modal-body gần nhất.
                                $select.select2({
                                    dropdownParent: $this.closest(config.dropdownParent),
                                    width: max_width,
                                    placeholder: $place,
                                    allowClear: true,
                                });
                                if (jQuery.isFunction(config.dataBound)) {
                                    config.dataBound(odata); //

                                }
                            }
                        });
                    } else {

                        //   $select.prepend($('<option>', { value: '', text: $place }));
                        if ($selected != undefined && $selected != "") {
                            $("#" + thisID + " option[value=" + $selected + "]").attr('selected', 'selected');
                        }
                        //else {
                        //    $("#" + thisID + " option[value='']").attr('selected', 'selected');
                        //}
                        $select.select2({
                            dropdownParent: $this.closest(config.dropdownParent),
                            width: max_width,
                            placeholder: $place,
                            allowClear: true,
                        });

                    }

                } else {
                    //set option.
                    //data-selected

                    $select.select2({
                        ajax: {
                            url: $url,
                            dataType: 'json',
                            delay: 200,
                            data: function (params) {
                                return {
                                    Keyword: params.term, // search term,
                                    SearchInSimple: "Title",
                                    page: params.page
                                };
                            },
                            processResults: function (data, params) {
                                // parse the results into the format expected by Select2
                                // since we are using custom formatting functions we do not need to
                                // alter the remote JSON data, except to indicate that infinite
                                // scrolling can be used
                                params.page = params.page || 1;
                                var odata1 = data;
                                if (!$.isArray(odata1))
                                    odata1 = data.Data;

                                return {
                                    results: $.map(odata1, function (item) {
                                        return {
                                            text: item[config.FieldText],
                                            id: item[config.FieldValue]
                                        }
                                    }),
                                    pagination: {
                                        more: (params.page * 30) < data.Total
                                    }
                                };
                            },
                            cache: false
                        },
                        dropdownParent: $this.closest(config.dropdownParent),
                        width: max_width,
                        allowClear: true,
                        placeholder: $place,
                        tags: false,
                        minimumInputLength: 0,
                    });
                }
            }
        });
    }
    $.fn.viCustomFck = function (settings) {
        var $this = $(this);
        var thisID = $this.attr("id");

        var config = {
            height: 150,
            toolbar: [
                {
                    name: 'basicstyles', groups: ['basicstyles', 'cleanup'],
                    items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
                },
                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'], items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
            ],
            filebrowserImageBrowseUrl: '/Usercontrols/AnhDaiDien/fckFinder.aspx?type=Images&option=1&UrlWeb=/dvc/Lists/LTinTuc',
        }
        if (settings) $.extend(config, settings);
        CKEDITOR.replace(thisID, {
            // Define the toolbar groups as it is a more accessible solution.
            //toolbarGroups: [
            //	{ "name": "basicstyles", "groups": ["basicstyles"] },
            //	{ "name": "links", "groups": ["links"] },
            //	{ "name": "about", "groups": ["about"] }
            //],
            toolbar: config.toolbar,
            height: config.height,
            filebrowserImageBrowseUrl: config.filebrowserImageBrowseUrl,
            extraPlugins: 'abbr,video',
            allowedContent: true,


            // Remove the redundant buttons from toolbar groups defined above.
            //removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar'
            //height: config.height
            // Remove the redundant buttons from toolbar groups defined above.
            //removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar'
        });
    }
    // đây anh định để ở đây.
    $.fn.siKendoGrid = function (settings) {
        var config = {
            UrlPost: "",
            persistSelection: false,
            selectable: true,
            pageSize: 20,
            height: 0,
            editable: false,
            modelID: "ID",
            odata: { "do": "QUERYDATA" },
            group: null,
            isColumSTT: false,
            STTposition: 0,
            Sort: [{ field: "ID", dir: "desc" }],
            // Các cấu hình mặc định
            columns: [{
                field: "ID",
                title: "ID",
                width: "100px"
            }, {
                field: "Title",
                title: "Tiêu đề"
            }, ],
            parameterPlus: function (para) {

            },
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            change: function () {

            },
            dataBound: function () {

            }
        };
        $.fn.setupKendoGrid = function (settings) {
            var config = {
                UrlPost: "",
                persistSelection: false,
                selectable: true,
                pageSize: 20,
                height: 0,
                editable: false,
                modelID: "ID",
                odata: { "do": "QUERYDATA" },
                group: null,
                isColumSTT: false,
                STTposition: 0,
                Sort: [{ field: "ID", dir: "desc" }],
                // Các cấu hình mặc định
                columns: [{
                    field: "ID",
                    title: "ID",
                    width: "100px"
                }, {
                    field: "Title",
                    title: "Tiêu đề"
                }, ],
                parameterPlus: function (para) {

                },
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                change: function () {

                },
                dataBound: function () {

                }
            };
            config = $.extend(config, settings);
            return this.each(function () {
                var $idelement = $(this).attr("id");
                var $gridparent = $(this).closest(".smgrid");
                // Plugin code would go here...
                var $stt = 0;

                var $dataSource = new kendo.data.DataSource({
                    type: "json",
                    transport: {
                        read: {
                            type: "POST",
                            dataType: "json",
                            url: config.UrlPost,
                            data: config.odata
                        },
                        parameterMap: function (options) {
                            if (jQuery.isFunction(config.parameterPlus)) {
                                config.parameterPlus(options); //
                            }
                            var $zonesearch = $gridparent.find(".zone_search form").first();//$("#" + $idelement + " zone_search:first");
                            if ($zonesearch != undefined) {
                                var $arraysearch = $zonesearch.smSerialize();
                                for (i = 0; i < $arraysearch.length; ++i) {
                                    try {
                                        //var abc123 = findValueArrayByKey($arraysearch, "name", $arraysearch[i].name);
                                        options[$arraysearch[i].name] = findValueArrayByKey($arraysearch, "name", $arraysearch[i].name);  //$arraysearch[i].value;
                                    }
                                    catch (err) { }
                                }
                            }
                            return options;
                        }
                    },
                    pageSize: config.pageSize,
                    schema: {
                        data: function (data) {
                            $stt = data.Request.start;
                            return data.Data;
                        },
                        total: function (data) {
                            if (data.Total == 0) {
                            }
                            return data.Total;
                        },
                        page: function (data) {
                            return data.Request.page;
                        },
                        model: {
                            id: config.modelID,
                        }
                    },
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true,
                    sort: config.Sort
                });
                if (config.group != null) {
                    $dataSource.group(config.group);
                }
                if (config.isColumSTT) {
                    var itemTemp = {
                        title: "<div style='text-align:center;' title='Số thứ tự'>STT</div>",
                        width: "50px",
                        template: function (o) {
                            return "<div style='text-align:center;'>" + ++$stt + "</div>";
                        }
                    };
                    config.columns.splice(config.STTposition, 0, itemTemp);
                }
                $(this).kendoGrid({
                    dataSource: $dataSource,
                    pageable: config.pageable,
                    persistSelection: config.persistSelection,
                    sortable: true,
                    selectable: config.selectable,
                    height: config.height,
                    maxheight: 0,
                    editable: config.editable,
                    columns: config.columns,
                    change: function (data) {
                        config.change();
                        $(".k-grid-content table tbody tr").each(function () {
                            var ariaSelected = $(this).attr("aria-selected");
                            if (ariaSelected == "true")
                                $(this).find("a").css("color", "#fff");
                            else
                                $(this).find("a").css("color", "");
                        });
                    },
                    dataBound: function (data) {
                        config.dataBound(data);
                        if ($(".btn-action").length > 0) $(".btn-action").parent().css("text-align", "center");
                        if ($(".not-active").length > 0) $(".not-active").parent().css("text-align", "center");
                        $("input[name=keyword]").attr("placeholder", "Nhập từ khóa");
                        if ($(".btn-approved i").length > 0 && $(".btn-approved i").hasClass("fa-share"))
                            $(".btn-approved i").removeClass("fa-share").addClass("fa-share-square-o");
                        if ($(".btn-pendding i").length > 0 && $(".btn-pendding i").hasClass("fa-share"))
                            $(".btn-pendding i").removeClass("fa-share").addClass("fa-share-square");
                        if ($(".btn-notcheck i").length > 0 && $(".btn-notcheck i").hasClass("fa-ban"))
                            $(".btn-notcheck i").removeClass("fa-ban").addClass("fa-share-square");
                        if ($(".btn-check i").length > 0 && $(".btn-check i").hasClass("fa-check"))
                            $(".btn-check i").removeClass("fa-check").addClass("fa-share-square-o");
                        if ($(".btn-thietlap i").length > 0 && $(".btn-thietlap i").hasClass("fa-share"))
                            $(".btn-thietlap i").removeClass("fa-share").addClass("fa-share-square-o");
                        if ($(".btn-huythietlap i").length > 0 && $(".btn-huythietlap i").hasClass("fa-share"))
                            $(".btn-huythietlap i").removeClass("fa-share").addClass("fa-share-square");
                        if ($(".btn-ketnoi i").length > 0 && $(".btn-ketnoi i").hasClass("fa-send"))
                            $(".btn-ketnoi i").removeClass("fa-send").addClass("fa-toggle-off");
                        if ($(".btn-huyketnoi i").length > 0 && $(".btn-huyketnoi i").hasClass("fa-send"))
                            $(".btn-huyketnoi i").removeClass("fa-send").addClass("fa-toggle-on");
                        if ($(".btn-xuatban i").length > 0 && $(".btn-xuatban i").hasClass("fa-send"))
                            $(".btn-xuatban i").removeClass("fa-send").addClass("fa-toggle-off");
                        if ($(".btn-huyxuatban i").length > 0 && $(".btn-huyxuatban i").hasClass("fa-send"))
                            $(".btn-huyxuatban i").removeClass("fa-send").addClass("fa-toggle-on");


                        //var $inputselect = $('.zone_search form select');
                        //var $inputtext = $('.zone_search form input[type=text]');
                        //var $inputtextboxs = $gridparent.find($inputtext);
                        //$($inputtextboxs).keypress(function (event) {
                        //    if (event.keyCode === 13) {
                        //        event.preventDefault();
                        //        refeshGrid($idelement);
                        //        return false;
                        //    }
                        //});
                        //
                        //var $inputselectcl = $gridparent.find($inputselect);
                        //$inputselectcl.change(function () {
                        //    refeshGrid($idelement);
                        //});

                    }

                });
            });
        };
        //Grid boostrap.
        $.fn.siGridboostrap = function (settings) {
            var config = {
                UrlPost: "",
                aaSorting: [1, 'desc'],
                STT: 1,

                domsort: false,
                visible: true,
                length: '20',
                isColumSTT: false,
                lockSTT: false,
                parameterPlus: function (para) {

                },
                drawCallback: function (settings) {


                },
                dom: 't<"col-xs-12 col-sm-3 col-md-2 nopadding"l><"col-xs-12 col-sm-5 col-md-6 nopadding infortotal"i><"col-xs-12 col-sm-4 col-md-4 nopadding"p><"clear">',
                // Các cấu hình mặc định
                columns: [
                    {
                        "mData": function (o) {
                            return '<a target="_blank" data-id="' + o.ID + '" href="?ItemID=' + o.ID + '">' + o.Title + '</a>';
                        },
                        "name": "Title",
                        "sTitle": "Tiêu đề",
                    }
                ],
                //messageInfo: 'Hiển thị _START_ đến _END_ trên _TOTAL_ bản ghi',
                language: {
                    "info": "Hiển thị _START_ đến _END_ trên _TOTAL_ bản ghi",
                    "lengthMenu": "Hiển thị _MENU_ bản ghi",
                },
            };
            config = $.extend(config, settings);
            var $oder = [];
            if (config.isColumSTT) {
                if (config.lockSTT) {
                    var itemTemp = {
                        "sTitle": "STT",
                        "width": 5,
                        locked: true,
                        "render": function (rowData, type, row, meta) {
                            return "<div style='text-align: center;'>" + ++meta.settings.json.Request.start + "</div>";
                        }
                    };
                } else {
                    var itemTemp = {
                        "sTitle": "STT",
                        "width": 5,
                        "render": function (rowData, type, row, meta) {
                            return "<div style='text-align: center;'>" + ++meta.settings.json.Request.start + "</div>";
                        }
                    };
                }
                config.columns.splice(0, 0, itemTemp);
                $oder = [
                    { "orderable": false, "targets": 0 }
                ];
            }
            return this.each(function () {
                var $idelement = $(this).attr("id");
                var $gridparent = $(this).closest(".smgrid");
                var tblBSDataTable = $(this).DataTable(
                    {
                        "language": config.language,
                        "lengthMenu": [[config.length, 30, 50, 100], [config.length, 30, 50, 100]],
                        "dom": config.domsort ? 't<"col-xs-12 col-sm-4 col-md-4 nopadding"l><"col-xs-12 col-sm-8 col-md-8 nopadding infortotal"i><"col-xs-12 col-sm-12 col-md-12 nopadding"p><"clear">' : config.dom,
                        "searching": false,
                        "lengthChange": true,
                        "visible": config.visible,
                        "length": config.length,
                        "responsive": true,
                        //"scrollX": 300,
                        //"pagingType": "full",
                        "columnDefs": $oder,
                        "processing": true, //show processing text while request data
                        "serverSide": true,// request data from server side
                        "aaSorting": config.aaSorting,
                        "ajax":
                        {
                            type: "POST",
                            url: config.UrlPost,
                            dataSrc: 'Data',
                            data: function (options) {
                                if (jQuery.isFunction(config.parameterPlus)) {
                                    config.parameterPlus(options); //
                                }
                                var $zonesearch = $gridparent.find(".zone_search").first();//$("#" + $idelement + " zone_search:first");
                                if ($zonesearch != undefined) {
                                    options = $.extend({}, options, $zonesearch.siSerializeDivFrm());
                                }
                                return options;
                            }
                        },
                        "aoColumns": config.columns,
                        "drawCallback": function () {
                            config.drawCallback();
                            $(this).find("a .glyphicon").parent().parent().css("text-align", "center");
                            $(this).find("a .glyphicon").parent().parent().css("vertical-align", "middle");
                            $(this).find("a .fa").parent().parent().css("text-align", "center");
                        },
                    });
            })
        };
        $.fn.DangKyFrmSearchPL = function (settings) {
            var config = {
                isSearch: true
            };
            var thisID = $(this).attr("id");
            if (settings) $.extend(config, settings);
            var values = {};
            var $input = $('input, select');
            var $inputtext = $('input[type=text]');
            var $inputtextboxs = $(this).find($inputtext);
            $($inputtextboxs).keypress(function (event) {
                if (event.keyCode == 13) {
                    if (config.isSearch) {
                        event.preventDefault();
                        var $tagData = $(this).closest("div[role='body-data']");
                        var $idtable = $tagData.find("table.smdataTable").first().dataTable().fnDraw(false);
                    }
                    return false;
                }
            });
            var $inputs = $(this).find($input);
            $inputs.change(function () {
                if (config.isSearch) {
                    //alert("Handler for .change() called.");
                    var $tagData = $(this).closest("div[role='body-data']");
                    var $idtable = $tagData.find("table.smdataTable").first().dataTable().fnDraw(false);
                }
            });
            $(this).find(".btnsearch").click(function () {
                if (config.isSearch) {
                    var $tagData = $(this).closest("div[role='body-data']");
                    console.log($tagData.find("table.smdataTable").first());
                    var $idtable = $tagData.find("table.smdataTable").first().dataTable().fnDraw(false);
                }
            });
            $("#" + thisID + ' .input-datetime').daterangepicker({
                autoUpdateInput: false,
                singleDatePicker: true,
                locale: vidatalocale
            });
            $("#" + thisID + ' .input-datetime').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('DD/MM/YYYY'));
                $(this).removeClass('error');
                if ($("#" + this.name + '-error').length)
                    $("#" + this.name + '-error').remove();
                // Sau khi chọn nếu thấy ok thì
            });
            $("#" + thisID + " .input-datetime").change(function () {
                //alert("Handler for .change() called.");
                var html = $(this).parent().html();
                var temp = $(this).val();
                if (!CheckDate(temp) && temp != "") {
                    var thongbao = "Định dạng ngày tháng không đúng dd/mm/yyyy";

                    if (!html.includes('<label id="' + this.name + '-error" class="error" for="' + this.name + '">' + thongbao + '</label>')) {
                        $(this).addClass('error').focus();
                        $(this).parent().append('<label id="' + this.name + '-error" class="error" for="' + this.name + '">' + thongbao + '</label>');
                    }
                } else {
                    $(this).removeClass('error');
                    if ($("#" + this.name + '-error').length)
                        $("#" + this.name + '-error').remove();
                }
            });
            $("#" + thisID + ' .input-datetime').on('cancel.daterangepicker', function (ev, picker) {
                $(this).val('');
            });
            $('.input-dateandtime').daterangepicker({
                autoUpdateInput: false,
                singleDatePicker: true,
                locale: vidatalocale,
                timePicker: true,
                timePicker24Hour: true,
                startDate: moment().startOf('hour'),
                endDate: moment().startOf('hour').add(32, 'hour'),
                locale: {
                    format: 'H:mm DD/MM/YYYY'
                }
            });
            $('.input-dateandtime').on("click", function () {
                $(".daterangepicker").css("z-index", "99999");
            });
            $('.input-dateandtime').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('H:mm DD/MM/YYYY'));
                var attr = $(this).attr('data-min');

                // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
                if (typeof attr !== typeof undefined && attr !== false) {
                    //$('#' + attr).data("daterangepicker").setOptions({ minDate: $(this).val() });
                    $('#' + attr).data("daterangepicker").minDate = picker.startDate;
                    //$('#datetimepicker').data("DateTimePicker")
                }
                attr = $(this).attr('data-max');

                // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
                if (typeof attr !== typeof undefined && attr !== false) {
                    //$('#' + attr).data("daterangepicker").setOptions({ maxDate: $(this).val() });
                    $('#' + attr).data("daterangepicker").maxDate = picker.startDate;
                }
            });
            $("#" + thisID + ' .input-dateandtime').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('H:mm DD/MM/YYYY'));
                $(this).removeClass('error');
                if ($("#" + this.name + '-error').length)
                    $("#" + this.name + '-error').remove();
                // Sau khi chọn nếu thấy ok thì
            });
            $("#" + thisID + " .input-dateandtime").change(function () {
                //alert("Handler for .change() called.");
                var html = $(this).parent().html();
                var temp = $(this).val();
                if (!CheckDateTime(temp) && temp != "") {
                    var thongbao = "Định dạng thời gian không đúng H:mm dd/mm/yyyy";

                    if (!html.includes('<label id="' + this.name + '-error" class="error" for="' + this.name + '">' + thongbao + '</label>')) {
                        $(this).addClass('error').focus();
                        $(this).parent().append('<label id="' + this.name + '-error" class="error" for="' + this.name + '">' + thongbao + '</label>');
                    }
                } else {
                    $(this).removeClass('error');
                    if ($("#" + this.name + '-error').length)
                        $("#" + this.name + '-error').remove();
                }
            });
            $('.input-dateandtime').on('cancel.daterangepicker', function (ev, picker) {
                $(this).val('');
            });
            $('#' + thisID + ' .upercase').each(function () {
                $(this).keyup(function () {
                    if (this.value != undefined)
                        this.value = this.value.toLocaleUpperCase();
                });
            });
            $("#" + thisID + ' label.required').each(function () {

                $(this).append("<span class='clslable'>(<span class='clsred'>*</span>)</span>");
            });
        };
        $.fn.DangKyFrmThongKe = function () {
            var values = {};
            var thisID = $(this).attr("id");
            var $input = $('input, select');
            var $inputtext = $('input[type=text]');
            var $inputtextboxs = $(this).find($inputtext);
            $($inputtextboxs).keypress(function (event) {
                if (event.keyCode == 13) {

                    return false;
                }
            });
            var $inputs = $(this).find($input);
            $inputs.change(function () {

            });
            $(this).find(".btnsearch").click(function () {

            });
            $("#" + thisID + ' .input-datetime').daterangepicker({
                autoUpdateInput: false,
                singleDatePicker: true,
                locale: vidatalocale
            });
            $("#" + thisID + ' .input-datetime').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('DD/MM/YYYY'));
            });

            $("#" + thisID + ' .input-datetime').on('cancel.daterangepicker', function (ev, picker) {
                $(this).val('');
            });
            $("#" + thisID + ' label.required').each(function () {
                var htmllabel = $(this).html();
                if (!htmllabel.includes('<span class="clslable">(<span class="clsred">*</span>)</span>'))
                    $(this).append("<span class='clslable'>(<span class='clsred'>*</span>)</span>");
            });
        };
        $.fn.openDialogBS = function (settings) {
            var config = {
                urlLoad: "",
                title: "",
                type: 'type-default',
                size: BootstrapDialog.SIZE_WIDE,
                data: {},
                cssClass: "smdialog"
            }
            if (settings) $.extend(config, settings);
            BootstrapDialog.show({
                size: config.size,
                type: 'type-default',
                title: config.title,
                message: function (dialog) {
                    var $message = dialog.getModalBody();
                    $message.load(config.urlLoad, config.data, function (response, status, xhr) { });
                    return "";
                },
                cssClass: config.cssClass + ' smdialog',
                data: config.data,
                closable: true,
                closeByBackdrop: true,
                draggable: true,
            });
        };
        $.fn.siGridThongKeOld = function (settings) {
            var config = {
                UrlAction: "",
                oData: {},
                object: false,
                siGroup: null,
                cols: 0,
                isGroupClient: false,
                _HtmlTempTitle: '#=smField#: #=Value#',
                templatehtmltr: "#javascriptTemplate",
                objTitle: [],
                Finish: function (settings) {

                },
                onLoaded: function (oDataGrid) {

                },
                Sort: [] //[{ field: "ID", dir: "desc" }],
            }
            if (settings) $.extend(config, settings);

            //Dang ky su kien sort.


        }
        var siGridThongKe = function () {

            return {
                options: {
                    UrlAction: "",
                    oData: {},
                    objectarr: false,
                    object: false,
                    oText: false,
                    siGroup: null,
                    cols: 0,
                    isGroupClient: false,
                    _HtmlTempTitle: '#=smField#: #=Value#',
                    templatehtmltr: "#javascriptTemplate",
                    objTitle: [],
                    Finish: function (settings) {

                    },
                    onLoaded: function (oDataGrid) {

                    }//,
                    //Sort: [] //[{ field: "ID", dir: "desc" }],
                },
                // --------------------------------------------------------------------
                init: function (options, element) {
                    console.log("init");
                    this.options = $.extend(this.options, options);

                    // Khởi tạo thông tin để lấy dữ liệu.
                    // Post de lay du lieu ve hien thi.
                    this.elem = element;
                    this.attachEvents();
                    this.initializerGrid();
                    var idzone = element.id;
                    $("#" + idzone + " th a.k-link").unbind();
                    $("#" + idzone + " th a.k-link").click(function () {
                        var _field = $(this).attr('data-field');
                        var _asc = $(this).attr('data-sort');
                        if (_asc == undefined || _asc == null)
                            _asc = "asc";
                        if (_asc == "asc") {
                            $(this).attr("data-sort", "desc");
                            $("#" + idzone + " th a.k-link span").html("");
                            this.children[0].innerHTML = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
                        }
                        else {
                            $(this).attr('data-sort', 'asc');
                            $("#" + idzone + " th a.k-link span").html("");
                            this.children[0].innerHTML = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
                        }
                        //this.options.Sort = ;
                        //asc
                        //refesh laij grid.
                        _asc = $(this).attr('data-sort');
                        $("#" + idzone).data("siGridThongKe").RenderGrid([{ _field: _field, dir: _asc }]);
                        //this.RenderGrid([{ _field: _field, dir: _asc }]);
                    });
                },
                RenderGrid: function (Sort) {
                    var config = this.options;
                    var idzone = this.elem.id;

                    var _cols = 0;
                    if (_cols == 0) {
                        _cols = $('#' + idzone + " .smtable thead tr th").length + 1;
                    }
                    if (Sort != null && Sort.length > 0) {
                        config.oData["GridSort"] = Sort;
                    }
                    loading(idzone);
                    $.post(config.UrlAction, config.oData, function (data) {
                        var htmlTEmp = '';
                        var templatehtmltr = kendo.template($(config.templatehtmltr).html());
                        var templateGroup = kendo.template(config._HtmlTempTitle);
                        var stt = 0;
                        var _GroupGoc = '_1';
                        var $STTGroup = -1;
                        var OTitle = [];

                        if (data.Data.length > 0) {
                            for (var i = 0; i < data.Data.length; i++) {
                                if (config.siGroup != null && config.siGroup.length > 0) {
                                    var FieldGroup = config.siGroup[0].Field;
                                    var FieldGrouptitle = config.siGroup[0].Title;
                                    //Gộp nhóm
                                    if (config.oText) {
                                        if (_GroupGoc != data.Data[i][FieldGroup]) {
                                            $STTGroup++;
                                            _GroupGoc = data.Data[i][FieldGroup];
                                            if (_GroupGoc != "" && _GroupGoc != undefined && _GroupGoc != null)
                                                var _GroupGoc1 = _GroupGoc.split("#")[1];
                                            htmlTEmp += '<tr class="si-group-tr"><td colspan="' + _cols + '">' +
                                                '<p class="si-reset" style="text-align:left"><a class="k-icon k-i-collapse" href="javascript:;" tabindex="-1" aria-label="Collapse"></a><span class="siTitleGroup">' + FieldGroup + ': ' + _GroupGoc + '</span></p>' +
                                                '</td></tr>';
                                            OTitle.push({ STT: $STTGroup, smField: FieldGroup, Value: _GroupGoc1 });

                                        }
                                    } else if (config.object) {
                                        if (jQuery.type(data.Data[i][FieldGroup]) == "array") {
                                            if (data.Data[i][FieldGroup].length > 0) {
                                                //fix lại phần title join string.
                                                //14/12
                                                var Titles = data.Data[i][FieldGroup].map(function (v) {
                                                    return v.Title;
                                                });
                                                var _newtitle = Titles.join(",");
                                                if (_GroupGoc != _newtitle) {
                                                    $STTGroup++;
                                                    _GroupGoc = _newtitle;
                                                    htmlTEmp += '<tr class="si-group-tr"><td colspan="' + _cols + '">' +
                                                        '<p class="si-reset" style="text-align:left"><a class="k-icon k-i-collapse" href="javascript:;" tabindex="-1" aria-label="Collapse"></a><span class="siTitleGroup">' + FieldGroup + ': ' + _GroupGoc + '</span></p>' +
                                                        '</td></tr>';
                                                    OTitle.push({ STT: $STTGroup, smField: FieldGroup, Value: _GroupGoc });
                                                }
                                            } else {
                                                if (_GroupGoc != "Khác") {
                                                    $STTGroup++;
                                                    _GroupGoc = "Khác";
                                                    htmlTEmp += '<tr class="si-group-tr"><td colspan="' + _cols + '">' +
                                                        '<p class="si-reset" style="text-align:left"><a class="k-icon k-i-collapse" href="javascript:;" tabindex="-1" aria-label="Collapse"></a><span class="siTitleGroup">' + FieldGroup + ': ' + _GroupGoc + '</span></p>' +
                                                        '</td></tr>';
                                                    OTitle.push({ STT: $STTGroup, smField: FieldGroup, Value: _GroupGoc });
                                                }
                                            }
                                        }

                                        else if (_GroupGoc != data.Data[i][FieldGroup].Title) {
                                            $STTGroup++;
                                            _GroupGoc = data.Data[i][FieldGroup].Title;
                                            htmlTEmp += '<tr class="si-group-tr"><td colspan="' + _cols + '">' +
                                                '<p class="si-reset" style="text-align:left"><a class="k-icon k-i-collapse" href="javascript:;" tabindex="-1" aria-label="Collapse"></a><span class="siTitleGroup">' + FieldGroup + ': ' + _GroupGoc + '</span></p>' +
                                                '</td></tr>';
                                            OTitle.push({ STT: $STTGroup, smField: FieldGroup, Value: _GroupGoc });

                                        }
                                    } else if (config.objectarr) {
                                        if ((data.Data[i][FieldGroup].length > 0 && _GroupGoc != data.Data[i][FieldGroup][0].Title)) {
                                            $STTGroup++;
                                            _GroupGoc = data.Data[i][FieldGroup][0].Title;
                                            htmlTEmp += '<tr class="si-group-tr"><td colspan="' + _cols + '">' +
                                                '<p class="si-reset" style="text-align:left"><a class="k-icon k-i-collapse" href="javascript:;" tabindex="-1" aria-label="Collapse"></a><span class="siTitleGroup">' + FieldGroup + ': ' + _GroupGoc + '</span></p>' +
                                                '</td></tr>';
                                            OTitle.push({ STT: $STTGroup, smField: FieldGroup, Value: _GroupGoc });
                                        } else if ((_GroupGoc != "Khác" && data.Data[i][FieldGroup].length == 0)) {

                                            $STTGroup++;
                                            _GroupGoc = "Khác";
                                            htmlTEmp += '<tr class="si-group-tr"><td colspan="' + _cols + '">' +
                                                '<p class="si-reset" style="text-align:left"><a class="k-icon k-i-collapse" href="javascript:;" tabindex="-1" aria-label="Collapse"></a><span class="siTitleGroup">' + FieldGroup + ': ' + _GroupGoc + '</span></p>' +
                                                '</td></tr>';
                                            OTitle.push({ STT: $STTGroup, smField: FieldGroup, Value: _GroupGoc });
                                        }

                                    } else {

                                        if (_GroupGoc != data.Data[i][FieldGroup]) {
                                            $STTGroup++;
                                            _GroupGoc = data.Data[i][FieldGroup];
                                            htmlTEmp += '<tr class="si-group-tr"><td colspan="' + _cols + '">' +
                                                '<p class="si-reset" style="text-align:left"><a class="k-icon k-i-collapse" href="javascript:;" tabindex="-1" aria-label="Collapse"></a><span class="siTitleGroup">' + FieldGroup + ': ' + _GroupGoc + '</span></p>' +
                                                '</td></tr>';
                                            OTitle.push({ STT: $STTGroup, smField: FieldGroup, Value: _GroupGoc });

                                        }
                                    }
                                }
                                data.Data[i]["STT"] = ++stt;
                                htmlTEmp += templatehtmltr(data.Data[i]);
                                //if ($STTGroup > 19) {
                                //    debugger;
                                //}
                                for (var j = 0; j < config.objTitle.length; j++) {
                                    var objPro = config.objTitle[j];
                                    if (objPro.Type == 1) {
                                        if (OTitle[$STTGroup][objPro.Field] == undefined) { //Kiểu số
                                            OTitle[$STTGroup][objPro.Field] = 0;
                                        }
                                        if (objPro["CongThuc"] == "SUM") {
                                            OTitle[$STTGroup][objPro.Field] += data.Data[i][objPro.Value];
                                        } else if (objPro["CongThuc"] == "Auto") {
                                            OTitle[$STTGroup][objPro.Field]++;
                                        }
                                    }
                                    if (objPro.Type == 0) {
                                        OTitle[$STTGroup][objPro.Field] = eval("data.Data[i]." + objPro.Value);// data.Data[i][objPro.Value];
                                    }
                                }

                            }

                            endLoading(idzone);
                            $(".mainContentBaoCao .clsContent").html(htmlTEmp);
                            //hiển thị tổng số bản ghi
                            var tongso = $(".mainContentBaoCao").find("#tongbanghi");
                            if (tongso.length > 0)
                                $("#tongbanghi").html("Tổng số <b>" + data.Data.length + "</b> bản ghi");
                            //$(".mainContentBaoCao .clsContent").append(htmlTEmp);
                            if (config.siGroup != null && config.siGroup.length > 0) {
                                var temp = $(".smtable thead tr th").length;
                                if ($(".smtable thead tr th").length < _cols) {
                                    $(".smtable thead tr").not(".group-cell").prepend("<th class='si-group-cell'></th>");
                                    $(".smtable tbody tr").not(".group-cell").prepend("<td class='si-group-cell'></td>");
                                    $(".smtable thead tr").addClass("group-cell");
                                }
                                //if ($(".smtable tbody tr td").length < _cols)
                                //for các thẻ tr group set text cho nó.
                                $(".smtable_content .si-group-tr span.siTitleGroup").each(function (index) {
                                    $(this).html(templateGroup(OTitle[index]));
                                });
                            }
                            config.onLoaded(data);
                            config.Finish();
                        }
                        else {
                            endLoading(idzone);
                        }
                    });
                },
                // --------------------------------------------------------------------
                initializerGrid: function () {
                    this.RenderGrid(null);

                },
                someMethod: function () {
                    alert('someMethod called');
                    return $(this.elem); // for chaining
                },
                // --------------------------------------------------------------------
                attachEvents: function () {
                    var self = this;
                    $(self.elem).on("hover", function (e) {
                        console.log("hover");
                    });
                    $(self.elem).on("click", function (e) {
                        //console.log("click");
                    });

                }
            };
        };
        $.fn.siGridThongKe = function (options) {
            // create an instance for each element in the set

            return this.each(function () {
                var mysiGridThongKe = new siGridThongKe();
                mysiGridThongKe.init(options, this);
                // this lets us call methods on the selector
                $(this).data("siGridThongKe", mysiGridThongKe);

            });


        };
        $.fn.ChuanHoaVietHoaHoTen = function () {
            $(this).keyup(function () {
                var str = $(this).val();
                str = str.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function (letter) {
                    return letter.toUpperCase();
                });
                $(this).val(str);
            }).change(function () {

            });
        };
        //
        $.fn.ChuanHoaVietHoaDiaChi = function () {
            $(this).keyup(function () {
                var capdonvi = ["Ðường", "Ấp", "Xã", "Phường", "Thị Trấn", "Huyện", "Thị Xã", "Quận", "Tỉnh", "Thành Phố"];
                var _capdonvi = ["đường", "ấp", "xã", "phường", "thị trấn", "huyện", "thị xã", "quận", "tỉnh", "thành phố"];
                var chuoi = $(this).val();
                var value = Chuanhoa(chuoi);
                for (var i = 0; i < capdonvi.length; i++) {
                    if (value.indexOf(capdonvi[i]) > -1) {
                        value = value.replace(capdonvi[i], _capdonvi[i]);
                    }
                }
                this.value = value;
            });
        };

        // Đăng ký grid báo cáo.    
    }
})(jQuery);
//aa aa bb aaa
// các function xử lý checkall
$(document).on("change", ".checked-all", function () {

    var $checkitems = getRoleTable($(this)).find("input.check-item");
    var $tagData = getRoleData($(this));
    if ($(this).is(":checked")) {
        $.each($checkitems, function () {
            if (!$(this).attr('disabled')) {
                $(this).prop("checked", true);
            }
        });
    }
    else {
        $.each($checkitems, function () {
            if (!$(this).attr('disabled')) {
                $(this).prop("checked", false);
            }
        });
    }
});
function formatDateTime(strValue) {
    if (strValue == null) return "";
    //var date = new Date(strValue);
    var d = new Date(strValue);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    var output = (('' + hour).length < 2 ? '0' : '') + hour + ':' +
        (('' + minute).length < 2 ? '0' : '') + minute + ' ' +
        (('' + day).length < 2 ? '0' : '') + day + '/' +
        (('' + month).length < 2 ? '0' : '') + month + '/' +
        d.getFullYear();
    //return date.format('HH:mm') + ' ngày ' +  date.format('dd/MM/yyyy');
    return output;
    //return date.format('HH:mm') + ' ngày ' +  date.format('dd/MM/yyyy');
}

function formatDate(strValue) {
    if (strValue == null) return "";

    var d = new Date(strValue);
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = //(('' + hour).length < 2 ? '0' : '') + hour + ':' +
        //(('' + minute).length < 2 ? '0' : '') + minute + " ngày " +
        (('' + day).length < 2 ? '0' : '') + day + '/' +
        (('' + month).length < 2 ? '0' : '') + month + '/' +
        d.getFullYear();
    //return date.format('HH:mm') + ' ngày ' +  date.format('dd/MM/yyyy');
    return output;
    //return date.format('HH:mm') + ' ngày ' +  date.format('dd/MM/yyyy');
}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}
function LookupSplit(nStr, number) {
    var lstString = nStr.split(";#");
    return lstString[number];
}
function updateEditor() {
    for (var name in CKEDITOR.instances)
        CKEDITOR.instances[name].updateElement();
}
function getCurrentSelectedTreeView(treeName) {
    // lay thong tin tu tree donvi
    var treeview_donvi = $("#" + treeName).data("kendoTreeView");
    // lay current select node
    var currentNode = treeview_donvi.select();
    // lay id cua don vi
    var id = currentNode.attr("id");
    return id;
}
function openDialogView(stitle, urlpageLoad, data, size, funcCallBack) {
    BootstrapDialog.show({
        type: 'type-default',
        title: stitle,
        message: function (dialog) {
            var $message = dialog.getModalBody();
            //var $processBar = $(processHtml);
            //$message.html($processBar);
            //$processBar.progressbar();
            if (data != undefined)
                $message.load(urlpageLoad, data, function (response, status, xhr) { });
            else
                $message.load(urlpageLoad, data);
            if (size == "NORMAL")
                dialog.setSize(BootstrapDialog.SIZE_NORMAL);
            else if (size == "SMALL")
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
            else if (size == "LARGE")
                dialog.setSize(BootstrapDialog.SIZE_LARGE);
            else if (size == "FULL")
                dialog.setSize(BootstrapDialog.SIZE_FULL);
            else
                dialog.setSize(BootstrapDialog.SIZE_WIDE);
            return "";
        },
        closable: true,
        closeByBackdrop: true,
        draggable: true,
        onshown: function (dialogRef) {
            if (funcCallBack != undefined && jQuery.isFunction(funcCallBack)) {
                funcCallBack(); //
            }
        },
    });
}
function openDialogViewV2(stitle, urlpageLoad, data, size, funcCallBack) {
    BootstrapDialog.show({
        type: 'type-default',
        title: stitle,
        message: function (dialog) {
            var $message = dialog.getModalBody();
            $.ajax({
                url: urlpageLoad,
                type: 'post',
                data: data,
                success: function (response) {
                    $('.modal-content > .modal-body').html(response);
                }
            });

            if (size == "NORMAL")
                dialog.setSize(BootstrapDialog.SIZE_NORMAL);
            else if (size == "SMALL")
                dialog.setSize(BootstrapDialog.SIZE_SMALL);
            else if (size == "LARGE")
                dialog.setSize(BootstrapDialog.SIZE_LARGE);
            else if (size == "FULL")
                dialog.setSize(BootstrapDialog.SIZE_FULL);
            else
                dialog.setSize(BootstrapDialog.SIZE_WIDE);
            return "";
        },
        closable: true,
        closeByBackdrop: true,
        draggable: true,
        onshown: function (dialogRef) {
            if (funcCallBack != undefined && jQuery.isFunction(funcCallBack)) {
                funcCallBack(); //
            }
        },
    });
}
function openDialogMsg(stitle, sMsg, funcCall, close) {

    BootstrapDialog.show({
        title: stitle,
        cssClass: 'bootstrap-dialog-message',
        message: function () {
            var $content = '<div>' + sMsg + '</div>';
            return $content;
        },
        closable: (close == false) ? false : true,
        draggable: true,
        buttons: [
            {
                id: 'btn-1',
                label: "Đóng",
                action: function (dialogRef) {
                    retu = 1;
                    dialogRef.close();
                    if (funcCall != undefined && jQuery.isFunction(funcCall)) {
                        funcCall();

                    }
                }
            }],

    });
}
function GetTitleTrangThaiByMa(maTT) {
    var status = "";
    switch (maTT) {
        case "10":
            status = "Hoàn thành soạn thảo";
            break;
        case "20":
            status = "Đang trình duyệt";
            break;
        case "2011":
            status = "Đang trình duyệt";
            break;
        case "30":
            status = "Đã phê duyệt";
            break;
        case "40":
            status = "Đã xuất bản";
            break;
        case "50":
            status = "Đang xin ý kiến";
            break;
        case "501":
            status = "Đang trình xin ý kiến";
            break;
        case "502":
            status = "Đã duyệt xin ý kiến";
            break;
        case "503":
            status = "Đang chờ cho ý kiến";
            break;
        case "504":
            status = "Đã cho ý kiến";
            break;
        case "505":
            status = "Hoàn thành cho ý kiến";
            break;
        case "5051":
            status = "Hoàn thành cho ý kiến";
            break;
        case "603":
            status = "Chờ tiếp nhận";
            break;
        case "604":
            status = "Đã tiếp nhận";
            break;
        case "605":
            status = "Bị trả về";
            break;
        case "606":
            status = "Bị trả về đã bổ sung";
            break;
        case "607":
            status = "Chờ phê duyệt";
            break;
        case "608":
            status = "Đã phê duyệt";
            break;
        case "609":
            status = "Bị trả về chờ bổ sung";
            break;
        case "700":
            status = "Đang trình ký";
            break;
        case "701":
            status = "Đã ký duyệt";
            break;
        case "702":
            status = "Đã xác nhận hoàn thành xin ý kiến";
            break;
        case "703":
            status = "Đã chuyển";
            break;
        case "704":
            status = "Từ chối";
            break;
        case "705":
            status = "Đã gửi trả kết quả";
            break;
        case "706":
            status = "Công dân đã nhận kết quả";
            break;
        case "1000":
            status = "đã thao tác";
            break;
        default:
            status = "";
            break;
    }

    return status;
}

function openWaitBox(text) {
    var $loading = $(".sm-loader:first");
    if (text == null)
        text = "Đang tải dữ liệu";
    $loading.css("opacity", "0.9").find(".text:first").css("color", "#0072c6").html("<span id='textloading'>" + text.split('').join("</span><span>") + "</span>");
    $loading.find(".text span").css("animation", "unset");
    $loading.show();
}
function closeWaitBox() {
    $(".sm-loader:first").fadeOut(500);
}
function closeWaitBoxV2() {
    $(".sm-loader:first").fadeOut(5000);
}

function getRoleTable($tag) {
    return $tag.closest("table");
}
function getRoleData($tag) {
    return $tag.closest("div[role='body-data']");
}

function SetValueBang() {
    $("table.tblEform").each(function () {
        var idpa = $(this).attr("data-id");
        var value = "";
        $("." + idpa).each(function () {
            if ($(this).val() != "" && $(this).val() != null && $(this).val() != undefined)
                value += $(this).val() + ";#";
            else
                value += "null;#";
        });
        $("#" + idpa).val(value.substring(0, value.length - 2));
    });
}
// refresh dataTableGrid
function RefreshGridDT(id) {
    var $tagData = $("#" + id).closest("div[role='body-data']");
    var $idtable = $tagData.find("table.smdataTable").first().dataTable().fnDraw(false);
}
$(function (event) {
    $(document).on("click", ".btnAddRow", function () {


        var idpa = $(this).attr("data-idpa");
        var html = "<tr>" + $(this).parent().parent().html() + "</tr>";
        var colcount = parseInt($(this).parent().attr("colspan"));

        $(".tblEform").each(function () {

            if ($(this).attr("data-id") == idpa) {
                var htmlnew = "";
                var rowCount = $(this).find("tbody tr").length - 1;
                for (var t = 0; t <= rowCount; t++) {
                    htmlnew += '<tr>';
                    var indexstart = t * (colcount - 1) + 1;
                    var indexfinish = indexstart + colcount - 2;
                    for (var i = indexstart; i <= indexfinish; i++) {
                        htmlnew += "<td>";
                        //  alert("#" + idpa + i);
                        if (t < rowCount)
                            htmlnew += '<input type="text" id="' + idpa + i + '" class="form-control ' + idpa + '" value=\"' + $("#" + idpa + i).val() + '\" style="width:100%; color: black;" placeholder=" Nhập thông tin"/>';
                        else
                            htmlnew += '<input type="text" id="' + idpa + i + '" class="form-control ' + idpa + '" style="width:100%; color: black;" placeholder=" Nhập thông tin"/>';
                        htmlnew += "</td>";
                    }
                    htmlnew += "<td style=\"text-align: center;\">";
                    htmlnew += "<a style=\"cursor: pointer;\" class=\"btnRemoveRow\" data-id=\"" + idpa + "\" title=\"Xóa\"><span class=\"glyphicon glyphicon-trash\"></span> Xóa</a>";
                    htmlnew += "</td>";
                    htmlnew += '</tr>';
                }
                htmlnew += html;
                $(this).find("tbody").html(htmlnew);

            }
        });
    });
    $(document).on("click", ".btnRemoveRow", function () {

        var idpa = $(this).attr("data-id");
        var colcount = $(this).parent().parent().find("td").length - 1;
        $(this).parent().parent().remove();
        var html = "<tr>" + $(this).parent().parent().html() + "</tr>";
        $(".tblEform").each(function () {
            if ($(this).attr("data-id") == idpa) {
                var rowCount = $(this).find("tbody tr").length - 1;
                for (var t = 0; t <= rowCount - 1; t++) {
                    for (var i = 0; i <= colcount - 1; i++) {
                        var row = $(this).find("tbody tr:nth-child(" + (t + 1) + ")");
                        var col = row.find("td:nth-child(" + (i + 1) + ")").find("input").attr("id");
                        var value = $("#" + col).val();
                        $("#" + col).addClass("intro");
                        $("#" + col).attr("id", idpa + (i + t * (colcount) + 1));
                        //   $("p:first").addClass("intro");

                    }
                }
            }
        });
    });

    $(document).on("click", ".btn-close", function () {
        if ($(this).closest("[data-role=window]") != undefined && $(this).closest("[data-role=window]").length > 0)
            $(this).closest("[data-role=window]").data("kendoWindow").close();
    });

})
if (jQuery.validator != undefined) {
    jQuery.validator.addMethod("MinValue", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number > 0;
    }, "Bạn chưa chọn");
    jQuery.validator.addMethod("Phone", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(\+84|0)[1-9]\d{8,9}$/);
    }, "Nhập đúng định dạng số điện thoại");
    jQuery.validator.addMethod("Phoneormail", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || (phone_number.length > 9 &&
            phone_number.match(/^(\+84|0)[1-9]\d{8,9}$/)) || phone_number.match(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
    }, "Nhập đúng định dạng email hoặc số điện thoại");
    jQuery.validator.addMethod("smdatetime", function (value, element) {

        var regrex282 = /^\s*((31([-/ ])((0?[13578])|(1[02]))\3(\d\d)?\d\d)|((([012]?[1-9])|([123]0))([-/ ])((0?[13-9])|(1[0-2]))\12(\d\d)?\d\d)|(((2[0-8])|(1[0-9])|(0?[1-9]))([-/ ])0?2\22(\d\d)?\d\d)|(29([-/ ])0?2\25(((\d\d)?(([2468][048])|([13579][26])|(0[48])))|((([02468][048])|([13579][26]))00))))\s*$/;

        var key = value;
        if (key != "") {
            if (!regrex282.test(key)) {
                return false;
            }
        }
        return true;
    }, function (value, element) {
        var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        var key = $(element).val();

        if (regex.test(key)) {
            return "Ngày tháng không tồn tại"

        } else {
            return "Nhập đúng định dạng ngày tháng dd/mm/yyyy"
        }

    });
    jQuery.extend(jQuery.validator.messages, {
        required: "Trường này là bắt buộc.",
        remote: "Please fix this field.",
        email: "Vui lòng nhập đúng định dạng email.",
        url: "Vui lòng nhập đúng định dạng URL.",
        date: "Vui lòng nhập đúng định dạng ngày tháng.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Vui lòng nhập đúng định dạng số.",
        digits: "Vui lòng chỉ nhập ký tự số.",
        creditcard: "Vui lòng nhập đúng định dạng credit card .",
        equalTo: "Vui lòng nhập trùng giá trị.",
        accept: "Please enter a value with a valid extension.",
        maxlength: jQuery.validator.format("Bạn chỉ được nhập tối đa {0} ký tự."),
        minlength: jQuery.validator.format("Bạn phải nhập tối thiểu {0} ký tự."),
        rangelength: jQuery.validator.format("Vui lòng nhập giá trị có số ký tự nằm giữa {0} và {1} ký tự."),
        range: jQuery.validator.format("Vui lòng nhập giá trị nằm giữa {0} và {1}."),
        max: jQuery.validator.format("Vui lòng nhập giá trị nhỏ hơn hoặc bằng {0}."),
        min: jQuery.validator.format("Vui lòng nhập giá trị lớn hơn hoặc bằng {0}.")
    });
    $.validator.addMethod('lessThanEqual', function (value, element, param) {
        return this.optional(element) || $(param).val() == "" || value == "" || (parseInt(value) <= parseInt($(param).val()));
    }, "Giá trị {0} phải lớn hơn hoặc bằng {1}");
    $.validator.addMethod('lessThan', function (value, element, param) {
        return this.optional(element) || $(param).val() == "" || value == "" || (parseInt(value) < parseInt($(param).val()));
    }, "Giá trị {0} phải lớn hơn {1}");
}
function createUploaderAnh(idelment) {

}
function SetWidthForm() {
    var t = $(".fixWidth");
    if (t.length > 0) {
        for (e = 0; e < t.length; e++)
            t[e].style.width = "1px";
        for (var e = 0; e < t.length; e++)
            SetWidth(t[e]);
    }
}
function SetWidth(e) {
    var $e = $(e); var $parent = $e.closest("div");
    var temp = $parent.width();
    "p" == $e.parent()[0].localName && ($parent = $e.closest("p"));
    var pdl = $parent.css("padding-left"),
        pdr = $parent.css("padding-right"),
        divwidth = $parent.width();
    width = eval(divwidth + " - " + pdl.substring(0, pdl.length - 2) + " - " + pdr.substring(0, pdr.length - 2));
    e.style.width = width - e.offsetLeft + "px"
}
/**
 * format html to string
 * @param {any} str string input
 */
function formatHtml(str) {
    if (str != null) {
        var div = document.createElement('div');
        div.innerHTML = str.trim();
        return format(div, 0).innerHTML;
    } else return "";
}
function format(node, level) {
    var indentBefore = new Array(level++ + 1).join('  '),
        indentAfter = new Array(level - 1).join('  '),
        textNode;
    for (var i = 0; i < node.children.length; i++) {
        textNode = document.createTextNode('\n' + indentBefore);
        node.insertBefore(textNode, node.children[i]);
        format(node.children[i], level);
        if (node.lastElementChild == node.children[i]) {
            textNode = document.createTextNode('\n' + indentAfter);
            node.appendChild(textNode);
        }
    }
    return node;
}
$(document).on("click", ".btnBuuChinh", function (event) {
    event.preventDefault();
    var odata = $(this).data();
    openDialogView("Chọn nhà cung cấp dịch vụ chuyển phát", "/Ossi/OssiPublishingV2/DangKyBuuDien/frmChonDichVuBuuChinh.aspx", odata);
});
$(document).on("click", ".btnBuuChinh2", function (event) {
    event.preventDefault();
    var odata = $(this).data();
    openDialogView("Chọn nhà cung cấp dịch vụ chuyển phát", "/Ossi/OssiPublishing2020/DangKyBuuDien/frmChonDichVuBuuChinh.aspx", odata);
});
$(document).on("click", ".btnThuHoiHS", function (event) {
    event.preventDefault();
    var odata = $(this).data();
    openDialogView("Xác nhận thu hồi hồ sơ", "/Ossi/OssiPublishing2020/OssiMainData/pFormViewHoSoCD.aspx", odata);
});
//btnThanhToan
$(document).on("click", ".btnThanhToan", function (event) {
    event.preventDefault();
    var odata = $(this).data();
    openDialogView("Chọn đơn vị thanh toán", "/Ossi/OssiPublishingV2/ThanhToan/frmChonDichVuThanhToan.aspx", odata);
});
$(document).on("click", ".btnThanhToan2", function (event) {
    event.preventDefault();
    var odata = $(this).data();
    openDialogView("Chọn đơn vị thanh toán", "/Ossi/OssiPublishing2020/ThanhToan/frmChonDichVuThanhToan.aspx", odata);
});
$(document).on("click", ".btnXoaHS", function (event) {
    event.preventDefault();
    var odata = $(this).data();
    openDialogView("Xóa hồ sơ", "/Ossi/OssiPublishing2020/OssiMainData/frmChuyenHSThungRac.aspx", odata);
});
//end format html

function ControlFormview(elment, count) {
    elment.each(function (index) {
        var texthtml = $(this).html().trim();
        if (texthtml == "" || texthtml == "null") {
            if (count == "1") {
                $(this).parent().css("display", "none");
                $(this).parent().children().first().css("display", "none");
            } else
                $(this).parent().parent().css("display", "none");
        }
    });
}
function CanGiua() {
    $("a .btn-approved").closest("td").css("background-color", "red");
}
function getInBaoCao() {
    var tieudebcd = $(".mainContentBaoCao .zonehead p").first().text();
    if (tieudebcd != '') {
        $.post("/Ossi/CongThongTin/LConfig/pActionLConfig.ashx?do=GETBAOCAO", { Title: tieudebcd }, function (data) {
            if (data.Erros) {
            }
            else {
                $("#stPrint").html(data.Message);
                $("#nPrint").html(data.Source);
            }
        });
    }
}
function PrintElem(txt, title) {
    var content = txt;
    var docprint = window.open("", "");
    docprint.document.open();
    docprint.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"');
    docprint.document.write('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"');
    docprint.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">');
    docprint.document.write('<head><title>print view</title>');
    docprint.document.write('<link rel="stylesheet" type="text/css" href="/Content/bootstrap-3/css/bootstrap.css" />');
    docprint.document.write('<link type="text/css" href="/Content/Kendo/styles/kendo.silver.min.css" rel="stylesheet" />');
    docprint.document.write('<link type="text/css" href="/Content/Kendo/styles/kendo.common.min.css" rel="stylesheet" />');
    docprint.document.write('<link rel="stylesheet" type="text/css" href="/Content/Styles/style.css" media="all" />');
    docprint.document.write('<style> label{font-weight:bold} select.form-control{display:none} label[for=DiaChiNhan]{clear: both;} h2{font-weight: bold;font-size: 20px;clear: both;margin: 10px 0px}</style>');
    docprint.document.write('<script src="/Content/jquery/jquery-3.3.1.min.js">');
    docprint.document.write('</script>');
    docprint.document.write('<script src="/Content/Kendo/js/kendo.all.min.js" >');
    docprint.document.write('</script>');
    docprint.document.write('<script src="/Content/Scripts/CommonV2.js" >');
    docprint.document.write('</script>');
    docprint.document.write('<script src="/Content/Scripts/siteScript.js" >');
    docprint.document.write('</script>');
    docprint.document.write('</head><body onLoad="self.print();setTimeout(window.close, 0);" style="background:#fff;"></br>');
    docprint.document.write('<center style="font-weight: bold;font-size: 20px;">' + title + '</center></br>');
    docprint.document.write(content);
    docprint.document.write('</body></html>');
    docprint.document.close();
    docprint.focus();
}
function strToDate(date) {
    var parts = date.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
function strDateTime(date) {
    var datetime = date.split(" ");
    var times = datetime[0].split(":");
    var days = datetime[1].split("/");
    return new Date(days[2], days[1] - 1, days[0], times[1], times[0], 0, 0);

}
function goToPage(url) {
    window.location.href = url;
}
(function ($) {
    $.fn.DangKyFrmSearch2018 = function () {
        var values = {};
        var $input = $('input, select');
        var $inputs = $(this).find($input);
        var thisID = $(this).attr("id");
        //$inputs.change(function () {
        //    //alert("Handler for .change() called.");
        //    var $tagData = $(this).closest("div[data-role='fullGrid']");
        //    //var $idtable = $tagData.find("table.smdataTable").first().dataTable().fnDraw(false);
        //    $tagData.data("smGrid2018").RefreshGrid();
        //});
        $(this).find(".btnsearch").click(function () {
            var $tagData = $(this).closest("div[data-role='fullGrid']");
            //var $idtable = $tagData.find("table.smdataTable").first().dataTable().fnDraw(false);
            $tagData.data("smGrid2018").RefreshGrid();
        });
        //$('.input-datetime').daterangepicker({
        //    autoUpdateInput: false,
        //    singleDatePicker: true,
        //    locale: {
        //        cancelLabel: 'Clear'
        //    }
        //});
        //$('.input-datetime').on('apply.daterangepicker', function (ev, picker) {
        //    $(this).val(picker.startDate.format('DD/MM/YYYY'));
        //});
        //
        //$('.input-datetime').on('cancel.daterangepicker', function (ev, picker) {
        //    $(this).val('');
        //});
    };
    var smGrid2018 = function () {
        return {
            options: {
                UrlPost: "",
                pageSize: 20,
                height: 0,
                async: true,
                "template": "#SiTemplate",
                modelID: "ID",
                odata: { "action": "QUERYDATA" },
                group: null,
                Sort: [{ field: "ID", dir: "desc" }],
                renderItem: null,
                // Ham gan tham so post
                parameterPlus: function (para) {

                },
                // su kien change select
                change: function () {
                },
                // Su kien load xong du lieeuj
                dataBound: function () {
                    
                },
                defaultOptsPagging: {
                    totalPages: 20
                }
            },
            // --------------------------------------------------------------------
            init: function (options, element) {
                //console.log("init");
                this.options = $.extend(this.options, options);

                // Khởi tạo thông tin để lấy dữ liệu.
                // Post de lay du lieu ve hien thi.

                this.elem = element;
                this.attachEvents();
                this.initializerGrid();
            },
            GetDataPost: function (oDataRefresh) {
                var oDataPost = {
                    draw: 1, start: 0, length: this.options.pageSize,
                    "fieldOrder": this.options.Sort[0].field, "ascending": this.options.Sort[0].dir
                };
                if (oDataRefresh != undefined && oDataRefresh != null) {
                    oDataPost = $.extend(oDataPost, oDataRefresh);
                }
                oDataPost = $.extend(oDataPost, this.options.odata);
                //console.log($(this.elem));
                // Get thông tin trên role=search
                var _element = $(this.elem);
                var $zonesearch = _element.find("[role=\"search\"]").first();
                if ($zonesearch != undefined) {
                    //console.log($zonesearch.siSerializeDivFrm());
                    oDataPost = $.extend(oDataPost, $zonesearch.siSerializeDivFrm());
                } else {
                    console.log("Không thấy form search");
                }
                if (jQuery.isFunction(this.options.parameterPlus)) {
                    this.options.parameterPlus(oDataPost); //
                }
                return oDataPost;
            },
            RenderPaging: function (GridData, currentEntries) {
                var _SMGrid = this;
                //console.log(_SMGrid);
                var _element = $(this.elem);
                var $Config = this.options;
                var currentPage = 1;
                var totalPages = parseInt(GridData.recordsTotal / $Config.pageSize);
                if (totalPages * $Config.pageSize < GridData.recordsTotal)
                    totalPages = totalPages + 1;
                else if (totalPages * $Config.pageSize > GridData.recordsTotal)
                    totalPages = totalPages - 1;
                //console.log(totalPages);
                // Vẽ lại phân trang.
                var $pagination = _element.find(".clspaging").first();
                var current = 1;
                if ($pagination != undefined) {
                    $pagination.twbsPagination('destroy');
                    if (GridData.recordsTotal > 0) {
                        $pagination.twbsPagination($.extend({}, $Config.defaultOptsPagging, {

                            startPage: currentPage,
                            totalPages: totalPages,
                            initiateStartPageClick: false,
                            onPageClick: function (event, page) {

                                current = page;
                                //console.log("onPageClick");
                                _SMGrid.ChangePage({ start: (page - 1) * $Config.pageSize, totalItem: GridData.recordsTotal });
                                // $('#content').text('Tong so ban ghi ' + totalPages);
                            }
                        }));
                        //$pagination
                        var curentEntrie = 1
                        var toEntries = current * $Config.pageSize;
                        if (GridData.recordsTotal < current * $Config.pageSize)
                            toEntries = GridData.recordsTotal;
                        $pagination.prepend("<div class='dataTables_info' role='status' aria-live='polite'>Hiển thị " + curentEntrie + " đến " + toEntries + " trên số " + GridData.recordsTotal + " bản ghi</div>");
                    } else {
                        $pagination.prepend("<div class='dataTables_info col-xs-12' style='text-align:center;padding-bottom:20px;' role='status' aria-live='polite'>Không có dữ liệu</div>");
                    }

                }

            },
            RenderGrid: function (oDataPost, isRenderPaging) {
                var Entries = oDataPost.start + 1;
                var toEntries = oDataPost.start + oDataPost.length;
                $(".dataTables_info").html("Hiển thị " + Entries + " đến " + toEntries + " trên số " + oDataPost.totalItem + " bản ghi");
                isRenderPaging = (typeof isRenderPaging === "undefined") ? true : isRenderPaging
                // Tham số sẽ post đi.
                var _SMGrid = this;
                var _element = $(this.elem);
                var $elemGrid = _element.find("[role=\"grid\"]").first();
                $elemGrid.html('<img src="/Content/images/fb-loading.gif" />');
                var $Config = this.options;
                // Post dữ liệu
                $.ajax({
                    type: "POST",
                    url: $Config.UrlPost,
                    data: oDataPost,
                    async: $Config.async,
                    success: function (GridData) {
                        // get ra template code.
                        var $template = _element.find("[type=\"text/x-kendo-template\"]").first();
                        var htmlTEmp = '';
                        var templatehtmltr = kendo.template($("#" + $Config.template).html());
                        for (i = 0; i < GridData.Data.length; i++) {
                            if (!jQuery.isFunction($Config.renderItem) && $template != undefined) {
                                htmlTEmp += templatehtmltr(GridData.Data[i]);
                            }
                            else {
                                htmlTEmp += $Config.renderItem(GridData.Data[i]);
                            }
                        }
                        //$elemGrid.removeClass("smgridloading");
                        $elemGrid.html(htmlTEmp);
                        if (isRenderPaging)
                            _SMGrid.RenderPaging(GridData);
                    }
                });

                //$.post($Config.UrlPost, oDataPost, function (GridData) {
                //    // get ra template code.
                //    var $template = _element.find("[type=\"text/x-kendo-template\"]").first();
                //    var htmlTEmp = '';
                //    var templatehtmltr = kendo.template($template.html());
                //    for (i = 0; i < GridData.Data.length; i++) {
                //        if (!jQuery.isFunction($Config.renderItem) && $template != undefined) {
                //            htmlTEmp += templatehtmltr(GridData.Data[i]);
                //        }
                //        else {
                //            htmlTEmp += $Config.renderItem(GridData.Data[i]);
                //        }
                //    }
                //    //$elemGrid.removeClass("smgridloading");
                //    $elemGrid.html(htmlTEmp);

                //    if (isRenderPaging)
                //        _SMGrid.RenderPaging(GridData);
                //});
            },
            ChangePage: function (oDataRefresh) {
                //console.log("RefreshGrid");
                var oDataPost = this.GetDataPost(oDataRefresh);
                this.RenderGrid(oDataPost, false);
            },
            // refresh grid.
            RefreshGrid: function (oDataRefresh) {
                //console.log("RefreshGrid");
                if (oDataRefresh == undefined)
                    oDataRefresh = {};
                var oDataPost = this.GetDataPost(oDataRefresh);
                this.RenderGrid(oDataPost);
            },
            // --------------------------------------------------------------------
            initializerGrid: function () {
                // Tham số sẽ post đi.
                var oDataPost = this.GetDataPost();
                this.RenderGrid(oDataPost);
            },
            someMethod: function () {
                alert('someMethod called');
                return $(this.elem); // for chaining
            },
            // --------------------------------------------------------------------
            attachEvents: function () {
                var self = this;
                $(self.elem).on("hover", function (e) {
                    //console.log("hover");
                });
                $(self.elem).on("click", function (e) {
                    //console.log("click");
                });
                //btnsearch
                //var $btnsearch = $(self.elem).find(".btnsearch");
                //$($btnsearch).on("click", function (e) {
                //    //console.log("click");
                //    self.RefreshGrid();
                //});
            }
        };
    };

    // --------------------------------------------------------------------

    $.fn.smGrid2018 = function (options) {
        // create an instance for each element in the set
        return this.each(function () {
            var mysmGrid2018 = new smGrid2018();
            mysmGrid2018.init(options, this);
            // this lets us call methods on the selector
            $(this).data("smGrid2018", mysmGrid2018);
        });
    };
})(jQuery);