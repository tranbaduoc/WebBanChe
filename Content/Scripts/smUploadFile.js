function delfileupload(filedel, atid, $input) {
    $lement = $('#' + atid + ' li.clslifile[data-id="' + filedel + '"]');
    $lement.remove();
    $elemendDelete = $("#" + $input).val("");
    changeHiddenInput("#" + atid, $input);
    var it = atid.substring(atid.length - 1, atid.length);
    $("#HoSoDinhKem" + it).prop("checked", false);
}
function DeleteFileUpdate(filename, fileid) {
    $lement = $('li.removeFile[data-id="' + filename + '"]');
    $lement.remove();
    var lstRemove = $("#" + fileid).val();
    if (lstRemove == null || lstRemove == "") {
        lstRemove += filename;
    } else {
        lstRemove += ("#" + filename);
    }
    $("#" + fileid).val(lstRemove);
}
function changeHiddenInput(atid, $input) {
    var valueFile = '[';
    var total = $(atid + " li.clslifile").length;
    $(atid + " li").each(function (i) {
        valueFile += '{"FileServer": "' + $(this).attr("data-id") + '"\,';
        valueFile += '"FileName": "' + $(this).attr("data-title") + '"\}';
        if (i + 1 < total)
            valueFile += ',';
    });
    valueFile += "]";
    if ($input == undefined)
        $input = "listValueFileAttach";

    $("#" + $input).val(valueFile);
    return valueFile;
}
function CK_jQ() {
    for (instance in CKEDITOR.instances) {
        CKEDITOR.instances[instance].updateElement();
    }
}
(function ($) {
    $.fn.SmUpload = function (settings) {
        var $this = $(this);
        var isexit = true;
        var nameCurent = "";
        var thisID = $this.attr("id");
        var place = $this.attr("data-placeholder");
        if (place == "" || place == undefined)
            place = "Đính kèm file ...";
        var config = {
            preview: true,
            files: '',
            hauto: '',
            ulshow: "listFileAttach",
            ValueFileAttach: "listValueFileAttach",
            ValueFileAttachRemove: "listValueFileAttachRemove",
            lstfile: [],
            numFile: 0,
            async: {
                saveUrl: "/BaseWeb/ActionHandler.aspx?do=SaveUpload",
                removeUrl: "/BaseWeb/ActionHandler.aspx?do=RemoveUpload",
                autoUpload: true
            },
            validation: {
                allowedExtensions: ["jpg", "jpeg", "png", "gif", "doc", "docx", "wmv", "mp4", "xls", "xlsx", "pdf", "xml", "txt"],
                maxFileSize: 15000000
            },
            localization: {
                select: place,
                statusFailed: "Fail gì đó",
                stastatusUploaded: "customStatusUploaded",
                statusUploading: "customStatusUploading",
                invalidFileExtension: "Sai rồi",
                headerStatusUploaded: "<span class='sm-control-status'>Xong</span>",
                headerStatusUploading: "<span class='sm-control-status'>Đang tải ...</span>"
            },
            multiple: true,
            select: function (e) {

            },
            success: function (e) {

            },

            complete: function (e, data) { },
            error: function (e) {
            },
            progress: function (e) {

            },
            remove: function (e) { },
            showFileList: false,
            dropZone: ".DrZone-" + $(this).attr("id")
        };

        if (settings) $.extend(config, settings);
        if (config.hauto != undefined && config.hauto != '') {
            config.ValueFileAttach = "listValueFileAttach" + config.hauto;
            config.ulshow = "listFileAttach" + config.hauto;
            config.ValueFileAttachRemove = "listValueFileAttach" + config.hauto + "Remove";
        }
        //Xử lý với trường hợp.
        if (typeof config.files == 'string' && config.files.length > 0)
            config.files = JSON.parse(config.files);
        // Xử lý html để ra file đính kèm
        var $attachshow = "AttachShow-" + $(this).attr("id");
        var $htmlinput = "<input type=\"hidden\" id=\"" + config.ValueFileAttach + "\" name=\"" + config.ValueFileAttach + "\" />" +
            "<input type=\"hidden\" id=\"" + config.ValueFileAttachRemove + "\" name=\"" + config.ValueFileAttachRemove + "\" />";
        $("#" + $attachshow).html($htmlinput +
            "<ul id=\"" + config.ulshow + "\"></ul><ul id=\"" + config.ulshow + "Remove\"></ul>");
        //xử lý file đã đính kèm
        if (config.files.length > 0) {
            $.each(config.files, function (index, value) {
                var $htmlfile = "<li class=\"removeFile\" data-id=\"" + value.Name + "\">" +
                    "<img class='icontype' src='/Content/Sigov/images/FileType/" + value.Name.split('.').pop().toLowerCase() + ".png' /> " +
                    "<a href=\"" + encodeURI(value.Url) + "\" target=\"_blank\"><span title=\"" + value.Name + "\" id=\"" + value.Name + "\">" + value.Name + "</span></a>" +
                    "&nbsp; <a class=\"lnkDeFile\" href=\"javascript:DeleteFileUpdate('" + value.Name + "', '" + config.ValueFileAttachRemove + "');\">" +
                    "<img border=\"0\" title=\"Xóa file đính kèm\" src=\"/Content/Sigov/images/act_filedelete.png\">" +
                    "</a></li>";
                $("#" + config.ulshow + "Remove").append($htmlfile);
            });
        }
        $this.kendoUpload({
            validation: config.validation,
            async: config.async,
            localization: config.localization,
            showFileList: config.showFileList,
            dropZone: config.dropZone,
            multiple: config.multiple,
            select: function (e) {
                var filesInList = [];
                var error = config.error;
                $("#AttachShow-" + thisID + " li.clslifile").each(function () {
                    filesInList.push($(this).attr('data-title'));
                });
                $("#AttachShow-" + thisID + " li.removeFile").each(function () {
                    filesInList.push($(this).attr('data-id'));
                });
                if (config.numFile > 0 && filesInList.length >= config.numFile) {
                    createThongBao("Thông báo", "Chỉ cho phép nhập " + config.numFile + " file.");
                    $("#" + thisID + " .sm-control-status").html("Lỗi");
                    e.preventDefault();
                }
                $.each(e.files, function (index, value) {
                    nameCurent = value.name;

                    $.each(filesInList, function (index, value) {
                        if (value === nameCurent) {
                            createThongBao("Thông báo", "Tên file " + nameCurent + " đã tồn tại trong hệ thống.");
                            $("#" + thisID + " .sm-control-status").html("Lỗi");
                            e.preventDefault();
                        }
                    });
                    if (value.size > config.validation.maxFileSize) {
                        //createMessage("Thông báo", "Dung lượng file quá lớn!!! Dung lượng tối đa cho phép: " + config.validation.maxFileSize + "bytes");
                        //openDialogMsg("Thông báo", "Dung lượng file quá lớn!!! Dung lượng tối đa cho phép: " + config.validation.maxFileSize + "bytes")
                        openDialogMsg("Thông báo", "Dung lượng file quá lớn!!! Dung lượng tối đa cho phép: " + config.validation.maxFileSize / 1000000 + "MB");
                        //createThongBao("Thông báo", "Dung lượng file quá lớn!!! Dung lượng tối đa cho phép: " + config.validation.maxFileSize / 1000000 + "MB");
                        $("#" + thisID + " .sm-control-status").html("Lỗi");
                    }
                    if (config.validation.allowedExtensions.indexOf(value.extension.slice(1).toLowerCase()) == -1) {
                        //openDialogMsg("Thông báo", "File không nằm trong định dạng cho phép!!! Các định dạng cho phép: " + config.validation.allowedExtensions.toString())
                        //createMessage("Thông báo", "File không nằm trong định dạng cho phép!!! Các định dạng cho phép: " + config.validation.allowedExtensions.toString());
                        //createThongBao("Thông báo", "File không nằm trong định dạng cho phép!!! Các định dạng cho phép: " + config.validation.allowedExtensions.toString());
                        openDialogMsg("Thông báo", "File không nằm trong định dạng cho phép!!! Các định dạng cho phép: " + config.validation.allowedExtensions.toString());
                        $("#" + thisID + " .sm-control-status").html("Lỗi");
                    }
                });
                config.select(e);
            },
            success: function (e) {
                // xử lý file upload trùng tên
                if (e.response.Erros == true) {
                    openDialogMsg("Thông báo", e.response.Message);
                } else {
                    if (!isexit) {
                        isexit = true;
                        try {
                            openDialogMsg("Thông báo", "File " + nameCurent + " đã được đính kèm");
                        }
                        catch (err) {
                            openDialogMsg("Thông báo", "File " + nameCurent + " đã được đính kèm");
                        }
                        return false;
                    }

                    var files = e.files;
                    var response = e.response;
                    if (e.operation == "upload") {
                        //debugger;
                        var nameFile = files[0].name;
                        var ext = nameFile.split('.').pop();
                        //var nameFile1 = nameFile.replace(ext, '');
                        var nameFile1 = nameFile;
                        //!@#$ %^
                        nameFile1 = nameFile1.replace(/[\*\^\'\!\,\;\:\!\@\#\$\%\^\&\+]/g, '');
                        for (var i = 0; i < nameFile1.length; i++) {
                            if (nameFile1[i] == '.' && nameFile1[i + 1] == '.') {
                                nameFile1 = nameFile1.replace(nameFile1[i] + nameFile1[i + 1], '.')
                                i--;
                            }
                        }
                        if (nameFile1.length > 120)
                            nameFile1 = nameFile1.substring(0, 119);
                        //nameFile1 = nameFile1 + "." + ext;
                        var resultBack = "<li class='clslifile' data-title=\"" + nameFile1 + "\" data-id='" + response.ServerName + "'>" + "<img class='icontype' src='/Content/Sigov/images/FileType/" +
                            files[0].extension.substring(1) + ".png' />" +
                            "<a href=\"" + response.Data + "\" target=\"_blank\"><span data-url=\"" + response.Data + "\" data-name=\"" + response.ServerName + "\">" + nameFile1 + "</span></a>" +
                            "&nbsp; <a class=\"lnkDeFile\" href=\"javascript:delfileupload('" + response.ServerName + "','" + config.ulshow + "','" + config.ValueFileAttach + "');\"><img class='filedelete' data-id='" +
                            response.ServerName + "' src='/Content/Sigov/images/act_filedelete.png' /></a>"
                        "</li>";
                        $("#" + config.ulshow).append(resultBack);
                        changeHiddenInput("#" + config.ulshow, config.ValueFileAttach);
                    }
                    if (jQuery.isFunction(config.success)) {
                        config.success(response); //
                    }
                    return false;
                }
            },
            complete: config.complete,
            //error: config.error,
            progress: config.progress,
            remove: config.remove
        });
        if (config.hide == true) {
            $this.closest(".wrapper-chat").hide();
        }
        else {
            $this.closest(".k-upload").width($this.width() + 50);
        }
    }
    $.fn.SmUploadV2 = function (settings) {
        debugger;
        var $this = $(this);
        var thisID = $this.attr("id");
        var config = {
            preview: true,
            files: '',
            ulshow: "list" + thisID,
            ValueFileAttach: "listValue" + thisID,
            ValueFileAttachRemove: "listValue" + thisID + "Remove",
            async: {
                saveUrl: "/BaseWeb/ActionHandler.aspx?do=SaveUpload",
                removeUrl: "/BaseWeb/ActionHandler.aspx?do=RemoveUpload",
                autoUpload: true
            },
            validation: {
                allowedExtensions: ["jpg", "jpeg", "png", "gif", "doc", "docx", "wmv", "mp4", "xls", "xlsx", "pdf", "xml", "txt"],
                maxFileSize: 15000000
            },
            localization: {
                select: "Đính kèm file ...",
                statusFailed: "Fail gì đó",
                stastatusUploaded: "customStatusUploaded",
                statusUploading: "customStatusUploading",
                invalidFileExtension: "Sai rồi",
                headerStatusUploaded: "<span class='sm-control-status'>Xong</span>",
                headerStatusUploading: "<span class='sm-control-status'>Đang tải ...</span>"
            },
            multiple: true,
            select: function (e) {
                $.each(e.files, function (index, value) {
                    if (value.size > config.validation.maxFileSize) {
                        createMessage("Thông báo", "Dung lượng file quá lớn!!! Dung lượng tối đa cho phép: " + config.validation.maxFileSize + "bytes");
                        $("#" + thisID + " .sm-control-status").html("Lỗi");
                    }
                    if (config.validation.allowedExtensions.indexOf(value.extension.slice(1).toLowerCase()) == -1) {
                        createMessage("Thông báo", "File không nằm trong định dạng cho phép!!! Các định dạng cho phép: " + config.validation.allowedExtensions.toString());
                        $("#" + thisID + " .sm-control-status").html("Lỗi");
                    }
                });
            },
            complete: function (e) { },
            error: function (e) {
            },
            progress: function (e) {
            },
            remove: function (e) { },
            showFileList: false,
            dropZone: ".DrZone-" + $(this).attr("id")
        };
        if (settings) $.extend(config, settings);
        //Xử lý với trường hợp.
        if (typeof config.files == 'string' && config.files.length > 0)
            config.files = JSON.parse(config.files);
        // Xử lý html để ra file đính kèm
        var $attachshow = "AttachShow-" + $(this).attr("id");
        var $htmlinput = "<input type=\"hidden\" id=\"" + config.ValueFileAttach + "\" name=\"" + config.ValueFileAttach + "\" />" +
            "<input type=\"hidden\" id=\"" + config.ValueFileAttachRemove + "\" name=\"" + config.ValueFileAttachRemove + "\" />";
        $("#" + $attachshow).html($htmlinput +
            "<ul id=\"" + config.ulshow + "\"></ul><ul id=\"" + config.ulshow + "Remove\"></ul>");
        //xử lý file đã đính kèm
        if ($.isArray(config.files) && config.files.length > 0) {
            $.each(config.files, function (index, value) {
                var $htmlfile = "<li class=\"removeFile\" data-id=\"" + value.Name + "\">" +
                    "<img class='icontype' src='/Content/Sigov/images/FileType/" + value.Name.split('.').pop().toLowerCase() + ".png' />" +
                    "<a href=" + value.Url + " target=\"_blank\"><span title=\"" + value.Name + "\" id=\"" + value.Name + "\">" + value.Name + "</span></a>" +
                    "&nbsp; <a href=\"javascript:DeleteFileUpdate('" + value.Name + "', '" + config.ValueFileAttachRemove + "');\">" +
                    "<img border=\"0\" title=\"Xóa file đính kèm\" src=\"/Content/Sigov/images/act_filedelete.png\">" +
                    "</a></li>";
                $("#" + config.ulshow + "Remove").append($htmlfile);
            });
        }
        $this.kendoUpload({
            async: config.async,
            validation: config.validation,
            localization: config.localization,
            showFileList: config.showFileList,
            dropZone: config.dropZone,
            multiple: config.multiple,
            select: config.select,
            success: function (e) {
                var files = e.files;
                var response = e.response;
                if (e.operation == "upload") {
                    var nameFile = files[0].name;
                    var resultBack = "<li class='clslifile' data-title=\"" + nameFile + "\" data-id='" + response.ServerName + "'>" + "<img class='icontype' src='/Content/Sigov/images/FileType/" + files[0].extension.substring(1) + ".png' />" +
                        "<a href=\"" + response.Data + "\"><span data-url=\"" + response.Data + "\" data-name=\"" + response.ServerName + "\">" + nameFile + "</span></a>" +
                        "&nbsp; <a href=\"javascript:delfileupload('" + response.ServerName + "','" + config.ulshow + "','" + config.ValueFileAttach + "');\"><img class='filedelete' data-id='" + response.ServerName + "' src='/Content/Sigov/images/act_filedelete.png' /></a>"
                    "</li>"
                    $("#" + config.ulshow).append(resultBack);
                    changeHiddenInput("#" + config.ulshow, config.ValueFileAttach);
                }
            },
            complete: config.complete,
            error: config.error,
            progress: config.progress,
            remove: config.remove
        });
        if (config.hide == true) {
            $this.closest(".wrapper-chat").hide();
        }
        else {
            $this.closest(".k-upload").width($this.width() + 50);
        }
    }
    $.fn.SmUploadImg = function (settings) {

        var $this = $(this);
        var isexit = true; var nameCurent = "";
        var thisID = $this.attr("id");
        var config = {
            preview: true,
            files: '',
            hauto: '',
            ulshow: "listFileAttach",
            ValueFileAttach: "listValueFileAttach",
            ValueFileAttachRemove: "listValueFileAttachRemove",
            lstfile: [],
            async: {
                saveUrl: "/BaseWeb/ActionHandler.aspx?do=SaveUpload",
                removeUrl: "/BaseWeb/ActionHandler.aspx?do=RemoveUpload",
                autoUpload: true
            },
            validation: {
                allowedExtensions: ["jpg", "jpeg", "png", "gif", "svg"],
                maxFileSize: 15000000
            },
            localization: {
                select: "Chọn ảnh đại diện",
                statusFailed: "Fail gì đó",
                stastatusUploaded: "customStatusUploaded",
                statusUploading: "customStatusUploading",
                invalidFileExtension: "Sai rồi",
                headerStatusUploaded: "<span class='sm-control-status'>Xong</span>",
                headerStatusUploading: "<span class='sm-control-status'>Đang tải ...</span>"
            },
            multiple: true,
            select: function (e) {

                $.each(e.files, function (index, value) {
                    nameCurent = value.name;
                    var controlValue = $("#" + config.ValueFileAttach).val();
                    if (controlValue != null && controlValue != "") {
                        var arrExit = JSON.parse(controlValue);
                        var item = $.grep(arrExit, function (item) {
                            return item.FileName == nameCurent;
                        });
                        if (item.length > 0) {
                            //createMessage("Thông báo", "File " + nameCurent+" đã tồn tại");
                            //alert("File " + nameCurent + " đã tồn tại")
                            isexit = false;
                        }
                    }
                    //// xử lý file đã upload trùng tên
                    //if (config.files.length > 0) {
                    //    $.each(config.files, function (index2, value2) {
                    //        if (value2.Name == nameCurent) {
                    //            DeleteFileUpdate(nameCurent, config.ValueFileAttachRemove);
                    //        }
                    //    });
                    //}
                    if (value.size > config.validation.maxFileSize) {
                        alert("Dung lượng file quá lớn!!! Dung lượng tối đa cho phép: " + config.validation.maxFileSize + "bytes");
                        $("#" + thisID + " .sm-control-status").html("Lỗi");
                    }
                    if (config.validation.allowedExtensions.indexOf(value.extension.slice(1).toLowerCase()) == -1) {
                        alert("File không nằm trong định dạng cho phép!!! Các định dạng cho phép: " + config.validation.allowedExtensions.toString());
                        $("#" + thisID + " .sm-control-status").html("Lỗi");
                    }
                });

            },
            success: function (e) {

            },

            complete: function (e, data) { },
            error: function (e) {
            },
            progress: function (e) {
            },
            remove: function (e) { },
            showFileList: false,
            dropZone: ".DrZone-" + $(this).attr("id")
        };

        if (settings) $.extend(config, settings);
        if (config.hauto != undefined && config.hauto != '') {
            config.ValueFileAttach = "listValueFileAttach" + config.hauto;
            config.ulshow = "listFileAttach" + config.hauto;
            config.ValueFileAttachRemove = "listValueFileAttach" + config.hauto + "Remove";
        }

        //Xử lý với trường hợp.


        if (typeof config.files == 'string' && config.files.length > 0)
            config.files = JSON.parse(config.files);
        // Xử lý html để ra file đính kèm
        var $attachshow = "AttachShow-" + $(this).attr("id");
        var $htmlinput = "<input type=\"hidden\" id=\"" + config.ValueFileAttach + "\" name=\"" + config.ValueFileAttach + "\" />" +
            "<input type=\"hidden\" id=\"" + config.ValueFileAttachRemove + "\" name=\"" + config.ValueFileAttachRemove + "\" />";
        $("#" + $attachshow).html($htmlinput +
            "<ul id=\"" + config.ulshow + "\" class=\"content-image-dd\"></ul><ul id=\"" + config.ulshow + "Remove\"></ul>");
        //xử lý file đã đính kèm
        if (config.files.length > 0) {
            $.each(config.files, function (index, value) {
                var $htmlfile = "<li class=\"removeFile\" data-id=\"" + value.Name + "\">" +
                    "<img src=\"" + value.Url + "\" />" +
                    "&nbsp; <a href=\"javascript:DeleteFileUpdate('" + value.Name + "', '" + config.ValueFileAttachRemove + "');\">" +
                    "<img border=\"0\" title=\"Xóa file đính kèm\" src=\"/Content/Sigov/images/act_filedelete.png\">" +
                    "</a></li>";
                $("#" + config.ulshow + "Remove").append($htmlfile);
            });
        }
        $this.kendoUpload({
            validation: config.validation,
            async: config.async,
            localization: config.localization,
            showFileList: config.showFileList,
            dropZone: config.dropZone,
            multiple: config.multiple,
            select: config.select,
            success: function (e) {
                if (!isexit) {
                    isexit = true;
                    alert("File " + nameCurent + " đã đính kèm")
                    return false;
                }

                var files = e.files;
                var response = e.response;
                if (e.operation == "upload") {
                    var nameFile = files[0].name;
                    var resultBack = "<li class='clslifile' data-title=\"" + nameFile + "\" data-id='" + response.ServerName + "'>" + "<img src=" + response.Data + " style=\"width:210px;\"/>" +
                        "&nbsp; <a class=\"lnkDeFile\" href=\"javascript:delfileupload('" + response.ServerName + "','" + config.ulshow + "','" + config.ValueFileAttach + "');\"><img class='filedelete' data-id='" +
                        response.ServerName + "' src='/Content/Sigov/images/act_filedelete.png' /></a></li>";
                    $("#" + config.ulshow).append(resultBack);
                    changeHiddenInput("#" + config.ulshow, config.ValueFileAttach);
                }
                if (jQuery.isFunction(config.success)) {
                    config.success(response); //
                }

            },
            complete: config.complete,
            error: config.error,
            progress: config.progress,
            remove: config.remove
        });
        if (config.hide == true) {
            $this.closest(".wrapper-chat").hide();
        }
        else {
            $this.closest(".k-upload").width($this.width() + 50);
        }
    }
    $.fn.SmUploadV3 = function (settings) {
        var $this = $(this);
        var isexit = true;
        var nameCurent = "";
        var thisID = $this.attr("id");
        var place = $this.attr("data-placeholder");
        if (place == "" || place == undefined)
            place = "Đính kèm file ...";
        var config = {
            preview: true,
            files: '',
            hauto: '',
            ulshow: "listFileAttach",
            ValueFileAttach: "listValueFileAttach",
            ValueFileAttachRemove: "listValueFileAttachRemove",
            lstfile: [],
            numFile: 0,
            async: {
                saveUrl: "/BaseWeb/ActionHandler.aspx?do=SaveUpload",
                removeUrl: "/BaseWeb/ActionHandler.aspx?do=RemoveUpload",
                autoUpload: true
            },
            validation: {
                allowedExtensions: ["jpg", "jpeg", "png", "gif", "doc", "docx", "wmv", "mp4", "xls", "xlsx", "pdf", "xml", "txt"],
                maxFileSize: 15000000
            },
            localization: {
                select: place,
                statusFailed: "Fail gì đó",
                stastatusUploaded: "customStatusUploaded",
                statusUploading: "customStatusUploading",
                invalidFileExtension: "Sai rồi",
                headerStatusUploaded: "<span class='sm-control-status'>Xong</span>",
                headerStatusUploading: "<span class='sm-control-status'>Đang tải ...</span>"
            },
            multiple: true,
            select: function (e) {

            },
            success: function (e) {

            },

            complete: function (e, data) { },
            error: function (e) {
            },
            progress: function (e) {

            },
            remove: function (e) { },
            showFileList: false,
            dropZone: ".DrZone-" + $(this).attr("id")
        };

        if (settings) $.extend(config, settings);
        if (config.hauto != undefined && config.hauto != '') {
            config.ValueFileAttach = "listValueFileAttach" + config.hauto;
            config.ulshow = "listFileAttach" + config.hauto;
            config.ValueFileAttachRemove = "listValueFileAttach" + config.hauto + "Remove";
        }
        //Xử lý với trường hợp.
        if (typeof config.files == 'string' && config.files.length > 0)
            config.files = JSON.parse(config.files);
        // Xử lý html để ra file đính kèm
        var $attachshow = "AttachShow-" + $(this).attr("id");
        var $htmlinput = "<input type=\"hidden\" id=\"" + config.ValueFileAttach + "\" name=\"" + config.ValueFileAttach + "\" />";
            //"<input type=\"hidden\" id=\"" + config.ValueFileAttachRemove + "\" name=\"" + config.ValueFileAttachRemove + "\" />";
        $("#" + $attachshow).html($htmlinput +
            "<ul id=\"" + config.ulshow + "\"></ul><ul id=\"" + config.ulshow + "Remove\"></ul>");
        //xử lý file đã đính kèm
        if (config.files.length > 0) {
            $.each(config.files, function (index, value) {
                var $htmlfile = "<li class=\"removeFile\" data-id=\"" + value.Name + "\">" +
                    "<img class='icontype' src='/Content/Sigov/images/FileType/" + value.Name.split('.').pop().toLowerCase() + ".png' /> " +
                    "<a href=\"" + encodeURI(value.Url) + "\" target=\"_blank\"><span title=\"" + value.Name + "\" id=\"" + value.Name + "\">" + value.Name + "</span></a>" +
                    "&nbsp; <a class=\"lnkDeFile\" href=\"javascript:DeleteFileUpdate('" + value.Name + "', '" + config.ValueFileAttachRemove + "');\">" +
                    "<img border=\"0\" title=\"Xóa file đính kèm\" src=\"/Content/Sigov/images/act_filedelete.png\">" +
                    "</a></li>";
                $("#" + config.ulshow + "Remove").append($htmlfile);
            });
        }
        $this.kendoUpload({
            validation: config.validation,
            async: config.async,
            localization: config.localization,
            showFileList: config.showFileList,
            dropZone: config.dropZone,
            multiple: config.multiple,
            select: function (e) {
                var filesInList = [];
                var error = config.error;
                $("#AttachShow-" + thisID + " li.clslifile").each(function () {
                    filesInList.push($(this).attr('data-title'));
                });
                $("#AttachShow-" + thisID + " li.removeFile").each(function () {
                    filesInList.push($(this).attr('data-id'));
                });
                if (config.numFile > 0 && filesInList.length >= config.numFile) {
                    createThongBao("Thông báo", "Chỉ cho phép nhập " + config.numFile + " file.");
                    $("#" + thisID + " .sm-control-status").html("Lỗi");
                    e.preventDefault();
                }
                $.each(e.files, function (index, value) {
                    nameCurent = value.name;

                    $.each(filesInList, function (index, value) {
                        if (value === nameCurent) {
                            createThongBao("Thông báo", "Tên file " + nameCurent + " đã tồn tại trong hệ thống.");
                            $("#" + thisID + " .sm-control-status").html("Lỗi");
                            e.preventDefault();
                        }
                    });
                    if (value.size > config.validation.maxFileSize) {
                        //createMessage("Thông báo", "Dung lượng file quá lớn!!! Dung lượng tối đa cho phép: " + config.validation.maxFileSize + "bytes");
                        //openDialogMsg("Thông báo", "Dung lượng file quá lớn!!! Dung lượng tối đa cho phép: " + config.validation.maxFileSize + "bytes")
                        createThongBao("Thông báo", "Dung lượng file quá lớn!!! Dung lượng tối đa cho phép: " + config.validation.maxFileSize / 1000000 + "MB");
                        $("#" + thisID + " .sm-control-status").html("Lỗi");
                    }
                    if (config.validation.allowedExtensions.indexOf(value.extension.slice(1).toLowerCase()) == -1) {
                        //openDialogMsg("Thông báo", "File không nằm trong định dạng cho phép!!! Các định dạng cho phép: " + config.validation.allowedExtensions.toString())
                        //createMessage("Thông báo", "File không nằm trong định dạng cho phép!!! Các định dạng cho phép: " + config.validation.allowedExtensions.toString());
                        createThongBao("Thông báo", "File không nằm trong định dạng cho phép!!! Các định dạng cho phép: " + config.validation.allowedExtensions.toString());
                        $("#" + thisID + " .sm-control-status").html("Lỗi");
                    }
                });
                config.select(e);
            },
            success: function (e) {
                debugger;
                // xử lý file upload trùng tên
                if (e.response.Erros == true) {
                    createThongBao("Thông báo", e.response.Message);
                } else {
                    if (!isexit) {
                        isexit = true;
                        try {
                            openDialogMsg("Thông báo", "File " + nameCurent + " đã được đính kèm");
                        }
                        catch (err) {
                            createMessage("Thông báo", "File " + nameCurent + " đã được đính kèm");
                        }
                        return false;
                    }

                    var files = e.files;
                    var response = e.response;
                    if (e.operation == "upload") {
                        var nameFile = files[0].name;
                        var resultBack = "<li class='clslifile' data-title=\"" + nameFile + "\" data-id='" + response.ServerName + "'>" + "<img class='icontype' src='/Content/Sigov/images/FileType/" +
                            files[0].extension.substring(1) + ".png' />" +
                            "<a href=\"" + response.Data + "\" target=\"_blank\"><span data-url=\"" + response.Data + "\" data-name=\"" + response.ServerName + "\">" + nameFile + "</span></a>" +
                            "&nbsp; <a class=\"lnkDeFile\" href=\"javascript:delfileupload('" + response.ServerName + "','" + config.ulshow + "','" + config.ValueFileAttach + "');\"><img class='filedelete' data-id='" +
                            response.ServerName + "' src='/Content/Sigov/images/act_filedelete.png' /></a>"
                        "</li>";
                        $("#" + config.ulshow).append(resultBack);
                        changeHiddenInput("#" + config.ulshow, config.ValueFileAttach);
                        if (response.Data.indexOf(".pdf") !== -1)
                            $("#UrlToKhai").val(response.Data);
                        else
                            $("#UrlToWord").val(response.Data);
                        //$("#urlfile").val(response.Data);
                        //openmodalpdf(response.Data);
                        //$("#myTokahiModal").modal();
                        //loadAjaxContentPostData("/Ossi/OssiPublishingV2/NopHoSo/formNhapToKhai.aspx", "#loadtokhai", {
                        //    "IDEForm": 379, "ItemID": 0, "UrlSite": "/sgtvt" });
                    }
                    if (jQuery.isFunction(config.success)) {
                        config.success(response); //
                    }
                    return false;
                }
            },
            complete: config.complete,
            //error: config.error,
            progress: config.progress,
            remove: config.remove
        });
        if (config.hide == true) {
            $this.closest(".wrapper-chat").hide();
        }
        else {
            $this.closest(".k-upload").width($this.width() + 50);
        }
    }
})(jQuery);