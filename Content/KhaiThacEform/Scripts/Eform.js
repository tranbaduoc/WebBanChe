$.fn.fSelect2018 = function (settings) {
    var config = {
        Text: "Lựa chọn",
        Url: "",
        FieldValue: "ID",
        FieldText: "Title",
        ItemID: 0,
        numDisplayed: 2,
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
                                        $("#" + thisID + " option[value=" + value + "]").prop("selected", true);
                                    });
                                } else {
                                    $("#" + thisID + " option[value=" + $selected + "]").attr('selected', 'selected');
                                }
                            }
                            // get thẻ  modal-body gần nhất.

                            $("#" + thisID).fSelect({
                                placeholder: config.placeholder,
                                width: max_width
                            });
                            //if (jQuery.isFunction(config.dataBound)) {
                            //    config.dataBound(odata); //
                            //}
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
                    $select.append($('<option>', { value: '', text: $place }));
                    $.ajax({
                        url: $url,
                        async: config.async,
                        data: config.data,
                        success: function (odata) {
                            var data = odata.OData;
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
                                width: max_width
                            });
                            if (jQuery.isFunction(config.dataBound)) {
                                config.dataBound(odata); //
                            }
                        }
                    });
                } else {
                    $select.prepend($('<option>', { value: '0', text: $place }));
                    if ($selected != undefined || $selected != "") {
                        $("#" + thisID + " option[value=" + $selected + "]").attr('selected', 'selected');
                    } else {
                        $("#" + thisID + " option[value='0']").attr('selected', 'selected');
                    }
                    $select.select2({
                        dropdownParent: $this.closest(config.dropdownParent),
                        width: max_width
                    });

                }

            } else {
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
                    dropdownParent: $this.closest(config.dropdownParent),
                    width: max_width,
                    placeholder: $place,
                    tags: false,
                    minimumInputLength: 2,
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
        // Remove the redundant buttons from toolbar groups defined above.
        //removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar'
        //height: config.height
        // Remove the redundant buttons from toolbar groups defined above.
        //removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar'
    });
}
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
                    var indexstart = t * colcount + 1;
                    var indexfinish = indexstart + colcount - 2;
                    for (var i = indexstart; i <= indexfinish; i++) {
                        htmlnew += "<td>";
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
                    for (var i = 0; i < colcount - 1; i++) {
                        var row = $(this).find("tbody tr:nth-child(" + (t + 1) + ")");
                        var col = row.find("td:nth-child(" + (i + 1) + ")").find("input").attr("id");
                        $("#" + col).attr("id", "\"" + idpa + (i + t * (colcount) + 1) + "\"");
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
    //var regex = new RegExp("^[a-zA-Z0-9]+$");
    var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    var key = value;
    if (key != "") {
        if (!regex.test(key)) {
            return false;
        }
    }
    return true;
}, "Nhập đúng định dạng ngày tháng dd/mm/yyyy");
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