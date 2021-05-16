
function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

function createMessage(title, message) {
    //$("#dialog-message").attr("title", title);
    $("#dialog-message").html("<p>" + message + "</p>");
    $("#dialog-message").dialog({
        resizable: true,
        height: 160,
        //width: 420,
        modal: true,
        title: title,
        buttons: {
            "Đóng lại": function () {
                $(this).dialog("close");
            }
        }
    });
}
function endLoading() {
    $("#dialog-loading").html("").dialog('close');
}
function loading() {

    $("#dialog-loading").html("<br><br><p><div style=\"text-align:center\"><img style=\"width:50px; heigth:50px; margin: -5px 0px 15px 0px;\" src=\"/Content/Kendo/styles/Default/loading-image.gif\"/></br><b>Đang xử lí dữ liệu</b></div></p>");
    $("#dialog-loading").dialog({
        closeOnEscape: false,
        // resizable: true,
        height: 180,
        width: 180,
        modal: true
    });
    $('#dialog-loading').dialog('widget').find(".ui-dialog-titlebar").hide();
    $('#dialog-loading').dialog('widget').find(".ui-resizable-handle").hide();
}
function createSubmit(title, message, form) {
    $("#dialog-confirm").attr("title", title);
    $("#dialog-confirm").html("<p>" + message + "</p>");
    $("#dialog-confirm").dialog({
        resizable: false,
        height: 160,
        modal: true,
        buttons: {
            "Tiếp tục": function () {
                $(this).dialog("close");
                $("#" + form).submit();
                //return true;
            },
            "Hủy": function () {
                $(this).dialog("close");
                return false;
            }
        }
    });
}
function createCallFunction(title, message, doaction) {
    $("#dialog-confirm").attr("title", title);
    $("#dialog-confirm").html("<p>" + message + "</p>");
    $("#dialog-confirm").dialog({
        resizable: false,
        height: 160,
        modal: true,
        buttons: {
            "Tiếp tục": function () {
                $(this).dialog("close");
                if (doaction == 1)
                    doHoanThanhCT();
                else
                    doHoanThanh()
                //return true;
            },
            "Hủy": function () {
                $(this).dialog("close");
                return false;
            }
        }
    });
}
function loadAjaxContent(urlContent, container) {
    $(container).html("<img src='/Content/images/fb-loading.gif' />");
    $.ajax({
        url: urlContent,
        cache: false,
        type: "POST",
        success: function (data) {
            $(container).html(data);
        }
    });
}


function loadAjaxContentGet(urlContent, container) {
    $(container).html("<img src='/Content/images/fb-loading.gif' />");
    $.ajax({
        url: urlContent,
        cache: false,
        type: "GET",
        success: function (data) {
            $(container).html(data);
        }
    });
}

function loadAjaxContentPostData(urlContent, container, data) {
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
(function ($) {
    $.fn.siSerializeDivFrm = function () {
        var values = {};
        var $input = $('input, select');
        var $inputs = $(this).find($input);
        $inputs.each(function () {
            if ($(this).val() != "" && $(this).val() != undefined)
                values[this.name] = $(this).val();
        });
        //returning += $(this).serialize();
        return values;
    };
    //closefrm
    $.fn.closefrm = function (settings) {
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
        }
        if (settings) $.extend(config, settings);
        var thisID = $(this).attr("id");
        setTimeout(function () {
            $('#' + thisID + ' #Title').focus();

        }, 500);
        $('#' + thisID + ' label.required').each(function () {
            $(this).append("<span class='clslable'>(<span class='clsred'>*</span>)</span>");
        });
        $('.input-datetime').daterangepicker({
            autoUpdateInput: false,
            singleDatePicker: true,
            locale: {
                cancelLabel: 'Clear'
            }
        });
        $('.input-datetime').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
        });

        $('.input-datetime').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });

        $('.upercase').each(function () {
            $(this).keyup(function () {
                this.value = this.value.toLocaleUpperCase();
            });
        });

        $('.in_hoa').each(function () {
            $(this).keyup(function () {
                this.value = this.value.toLocaleUpperCase();
            });
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

        return odata;
    };
    // select2
    $.fn.viSelect2018 = function (settings) {
        var config = {
            Url: "",
            FieldValue: "ID",
            FieldText: "Title",
            ItemID: 0,
            lookup: false,
            Ajax: false,
            placeholder: "Chọn",
            dropdownParent: ".k-window",
            Remove: false,
            width: 0,
            dataBound: function () {

            }
        }
        if (settings) $.extend(config, settings);
        return this.each(function () {
            var thisID = $(this).attr("id");
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
                    if ($url != "" && $url != undefined) {
                        if (config.Remove) {
                            $select.html("");
                        }
                        $select.append($('<option>', { value: 0, text: $place }));
                        $.getJSON($url,
                            function (odata) {
                                var data = odata.Data;
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
                                        $select.append($('<option>', { value: $val, text: $text }));
                                    } else {
                                        $select.append($('<option>', { value: val[config.FieldValue], text: val[config.FieldText] }));
                                    }
                                });
                                if ($selected != undefined && $selected != "") {
                                    if ($selected.indexOf(",") > -1) {
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
                            });
                    } else {
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
            ]
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
            height: config.height
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
            pageSize: 20,
            height: 0,
            modelID: "ID",
            odata: { "do": "QUERYDATA" },
            group: null,
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
                                options[$arraysearch[i].name] = $arraysearch[i].value;
                            }
                        }
                        return options;
                    }
                },
                pageSize: config.pageSize,
                schema: {
                    data: function (data) {
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
                        id: config.modelID
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
            $(this).kendoGrid({
                dataSource: $dataSource,
                sortable: true,
                selectable: true,
                height: config.height,
                maxheight: 0,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: config.columns,
                change: config.change,
                dataBound: config.dataBound,
            });
        });
    };
    //Grid boostrap.
    $.fn.siGridboostrap = function (settings) {
        var config = {
            UrlPost: "",
            aaSorting: [0, 'desc'],
            visible: true,
            parameterPlus: function (para) {

            },
            // Các cấu hình mặc định
            columns: [
                        {
                            "mData": function (o) {
                                return '<a target="_blank" data-id="' + o.ID + '" href="?ItemID=' + o.ID + '">' + o.Title + '</a>';
                            },
                            "name": "Title",
                            "sTitle": "Tiêu đề",
                        }
            ]
        };
        config = $.extend(config, settings);
        return this.each(function () {
            var $idelement = $(this).attr("id");
            var $gridparent = $(this).closest(".smgrid");
            var tblBSDataTable = $(this).DataTable(
               {
                   "lengthMenu": [[20, 30, 50, 100], [20, 30, 50, 100]],
                   "dom": 't<"col-xs-12 col-sm-4 col-md-4 nopadding infortotal"i><"col-xs-12 col-sm-8 col-md-8 nopadding"p><"clear">',
                   "searching": false,
                   "lengthChange": true,
                   "visible": config.visible,
                   "length": '20',
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
                   "aoColumns": config.columns
               });
        })
    };
    $.fn.DangKyFrmSearchPL = function () {
        var values = {};
        var $input = $('input, select');
        var $inputtext = $('input[type=text]');
        var $inputtextboxs = $(this).find($inputtext);
        $($inputtextboxs).keypress(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                var $tagData = $(this).closest("div[role='body-data']");
                var $idtable = $tagData.find("table.smdataTable").first().dataTable().fnDraw(false);
                return false;
            }
        });
        var $inputs = $(this).find($input);
        $inputs.change(function () {
            //alert("Handler for .change() called.");
            var $tagData = $(this).closest("div[role='body-data']");
            var $idtable = $tagData.find("table.smdataTable").first().dataTable().fnDraw(false);
        });
        $(this).find(".btnsearch").click(function () {
            var $tagData = $(this).closest("div[role='body-data']");
            console.log($tagData.find("table.smdataTable").first());
            var $idtable = $tagData.find("table.smdataTable").first().dataTable().fnDraw(false);
        });
        $('.input-datetime').daterangepicker({
            autoUpdateInput: false,
            singleDatePicker: true,
            locale: {
                cancelLabel: 'Clear'
            }
        });
        $('.input-datetime').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
        });

        $('.input-datetime').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });
        $('label.required').each(function () {
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
            size: BootstrapDialog.SIZE_FULL,
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
})(jQuery);
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
    //var date = new Date(strValue);
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
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
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
function openDialogMsg(stitle, sMsg, funcCall) {
    BootstrapDialog.show({
        title: stitle,
        cssClass: 'bootstrap-dialog-message',
        message: function () {
            var $content = '<div>' + sMsg + '</div>';
            return $content;
        },
        closable: true,
        draggable: true,
        buttons: [
        {
            id: 'btn-1',
            label: "Đóng",
            action: function (dialogRef) {
                dialogRef.close();
                if (funcCall != undefined && jQuery.isFunction(funcCall)) {
                    funcCall();
                }
            }
        }]
    });
}
function GetTitleTrangThaiByMa(maTT) {
    var status = "";
    switch (maTT) {
        case "10":
            status = "Hoàn thành tạo lập";
            break;
        case "20":
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
            status = "Đăng ký mới";
            break;
        case "701":
            status = "Đăng ký thành công";
            break;
        case "702":
            status = "Đã xác nhận";
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
    $loading.find(".text:first").html("<span>" + text.split('').join("</span><span>") + "</span>")
    $loading.show();
}
function closeWaitBox() {
    $(".sm-loader:first").fadeOut(500);
}
function getRoleTable($tag) {
    return $tag.closest("table");
}
function getRoleData($tag) {
    return $tag.closest("div[role='body-data']");
}
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
        $("#" + idpa).val(value.substring(0, value.length-2));
    });
}
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
                    $("#" + col).attr("id", "\"" + idpa + (i + t*(colcount) + 1) + "\"");
                }
            }
        }
    });
});