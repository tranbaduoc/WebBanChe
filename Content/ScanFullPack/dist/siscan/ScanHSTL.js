/*! Copyright (c) 2015 SIMAX
 * Version: 1.1
 */
(function ($) {
    $.fn.scanHstl = function(options) {
        var defaults = {
            UrlUploadHandler: '/ScanUploadHandler.ashx',
            UrlSeccussHandler: '/ScanSeccussHandler.ashx',
            ScanedFilePaths: 'D:/Projects/Luu tru/SourceCode/Admin/AppFile/data/Upload/',
            ScanedFilePathToOCRs: 'D:/Projects/Luu tru/SourceCode/Admin/AppFile/data/ScanToOCR/',
            ScanedFilePathOCReds: 'D:/Projects/Luu tru/SourceCode/Admin/AppFile/data/SoHoa/',
            DynScanedFilePaths: '/AppFile/data/Upload/',
            TwPixelType: 'Gray',
            UrlFileSetup: '/AppFile/ScanFullPack/filesetup/setupscanservice.msi',
            OCREnabled: false,
            ScanHaiMat: true,
            XoayAnh: true,
            LoaiTrangTrang: false,
            WordEnabled: false,
            FolderName: '',
            ExcelEnabled: false,
            ClearBG: false,
            AutoRotate: true,
            DuplexEnabled: false,
            FeederEnable: false,
            ShowUI: false,
            Zoom: 75,
            AutoDiscardBlankPages: true,
            ShowProgress: false,
            FileFormatFinal: 'Pdf',
            ExportFormatUI: false,
            ExportPixelTypeUI: true,
            ExportShowUI: false,
            EditContent: true,
            Quality: 30,
            ShowFileResult: true,
            BitDepth: 8,
            Brightness: 15,
            Contrast: 35,
            ScanCallbackSeccuss: function(result) {
            },
            ScanCallbackError: function(e) {
            },
            ScanCallbackCompleted: function(e) {
            },
            UserName: '',
            Password: '',
            Url: '',
            Urls: ['http://127.0.0.1:16692/ScanService/Scan/',
                'http://127.0.0.1:17894/ScanService/Scan/',
                'http://127.0.0.1:8733/ScanService/Scan/',
                'http://127.0.0.1:30894/ScanService/Scan/'],
            UrlEditContent: '',
            dialogId: 'jdialog2',
            PixelTypes: [{ Title: 'B&W', Value: 'BW' }, { Title: 'Gray', Value: 'Gray' }, { Title: 'Color', Value: 'RGB' }],
            Formats: [{ Title: 'PDF', Value: 'Pdf' }, { Title: 'TIFF', Value: 'Tiff' }, { Title: 'PNG', Value: 'Png' }, { Title: 'BMP', Value: 'Bmp' }],
            DPI: 200,
            DPIs: [100, 150, 200, 250, 300]
        };
        var configName = 'scanconfig';

        var o = $.extend(defaults, options);
        if (typeof(Storage) !== "undefined") {
            var config = localStorage.getItem(configName);
            if (config != null) {
                try {
                    $.extend(o, JSON.parse(config));
                } catch(e) {
                }
            }
        }
        // Lấy danh sách các máy in
        var FillDevices = function($container, result) {
            $container.empty();
            if (result.Devices != null) {
                var selectedScan = 1;
                $.each(result.Devices, function(index, value) {
                    if (selectedScan == 1) {
                        $container.append('<option value="' + value + '" selected>' + value + '</option>');
                        selectedScan++;
                    }
                    else
                        $container.append('<option value="' + value + '">' + value + '</option>');
                });
            }
        };
        // Lấy danh sách các máy in đã kết nối thành công
        var CheckConnectionAndGetDevices = function($container, urls, index, isNext) {
            var dfd = $.Deferred();
            if (isNext) {
                var url = urls[index];
                index++;
                $.getJSON(url + 'GetDevices').done(function(result) {
                    result.Url = url;
                    FillDevices($container, result);
                    o.Url = result.Url;
                    dfd.resolve($container, urls, index, false);
                }).fail(function(e) {
                    dfd.resolve($container, urls, index, true);
                });
            } else
                return dfd.resolve(urls, index, false);
            return dfd.promise();
        };
        this.each(function() {
            var $this = $(this);
            $this.addClass("si-box-scaner");
            //Tạo vùng chọn thiết bị
            var $tablescandevice = $("<table class='tblform'></table>");
            // Header boxscan
            var $boxscandevice = $("<tr class='header'></tr>");
            $boxscandevice.append("<td colspan='2'><b>Scan tài liệu</b></td>");
            $tablescandevice.append($boxscandevice);
            // Chọn máy scan
            $boxscandevice = $("<tr></tr>");
            $boxscandevice.append("<td style='padding: 5px 3px 0;' colspan='2'><span class='autocomplete-input fixwidth'><select id='selScan' class='scan-device'></select></span><button type='button' class='btn-action btn-reload'>Refesh</button></td>");
            $tablescandevice.append($boxscandevice);


            $tablescandevice.append("<tr>" + 
                                        "<td colspan='2'><span class='autocomplete-input fixwidth'><select id='typeScan'>" + 
                                                "<option value='1'>Không tích hợp nhận dạng</option>" +
                                                "<option value='3' selected='true'>Tích hợp nhận dạng</option>" +
                                                //"<option value='3'>Tích hợp nhận dạng sau</option>" +
                                            "</select></span></td>" +
                                    "</tr>");
            //Tạo vùng chọn màu
            if (o.ExportPixelTypeUI) {
                var $boxCheDoMau = $("<tr></tr>");
                $boxCheDoMau.append("<td class='label' style='width: 120px;'>Chế độ mầu</td>");
                var $boxInputCDM = $("<td class='radiocontrols fixwidthrd'></td>");
                for (i = 0; i < o.PixelTypes.length; i++) {
                    $boxInputCDM.append('<input id="PixelType'+i+'" type="radio" name="PixelType" data-value="' + o.PixelTypes[i].Value + '"' + ((o.PixelTypes[i].Value == o.TwPixelType) ? 'checked' : '') + '/>'
                        + '<label for="PixelType'+i+'">' + o.PixelTypes[i].Title + '</label>');
                }
                $boxCheDoMau.append($boxInputCDM);
                $tablescandevice.append($boxCheDoMau);
            }
            // Độ phân giải
            var $doPhanGiai = $("<tr></tr>");
            $doPhanGiai.append("<td class='label'>Độ phân giải</td>");
            var $boxDPI = $('<td class="autocomplete-input"></td>');
            var $dpi = $('<select id="Resolution" class="select-dpi"></select>');
            for (i = 0; i < o.DPIs.length; i++) {
                $dpi.append('<option value="' + o.DPIs[i] + '" ' + (o.DPIs[i] == o.DPI ? 'selected' : '') + ' >' + o.DPIs[i] + '</option>');
            }
            $boxDPI.append($dpi);
            $doPhanGiai.append($boxDPI);
            $tablescandevice.append($doPhanGiai);
            // Hiển thị form format
            if (o.ExportFormatUI) {
                var $boxFormat = $("<tr></tr>");
                $boxFormat.append("<td class='label'>Format</td>");
                var $boxFormat2 = $('<td class="autocomplete-input"></td>');
                var $fomart = $('<select class="select-format"></select>');
                for (i = 0; i < o.Formats.length; i++) {
                    $fomart.append('<option value="' + o.Formats[i].Value + '" ' + (o.Formats[i].Value == o.FileFormatFinal ? 'selected' : '') + ' >' + o.Formats[i].Title + '</option>');
                }
                $boxFormat2.append($fomart);
                $boxFormat.append($boxFormat2);
                $tablescandevice.append($boxFormat);
            }
            // Tạo vùng chọn option
            if (o.ExportShowUI) {
                var boxOptionShowUI = $("<tr></tr>");
                boxOptionShowUI.append("<td class='label'>Show UI</td>");
                boxOptionShowUI.append("<td class='label'><input type='checkbox' name='ShowUI'" + (o.ShowUI ? "checked" : "") + "/></td>");
                $tablescandevice.append(boxOptionShowUI);
            }
            // Hiển thị checkbox scan
            var boxOptionScanHaiMat = $("<tr></tr>");
            boxOptionScanHaiMat.append("<td class='label'></td>");
            boxOptionScanHaiMat.append("<td class='pad-top-10'><input type='checkbox' name='ScanHaiMat' id='chkScanHaiMat' title='Scan hai mặt'" + (o.ScanHaiMat ? "checked" : "") + "/><label for='chkScanHaiMat'>Scan hai mặt</label></td>");
            // Hiển thị checkbox tự loại khoảng trắng
            var boxOptionLoaiTrangTrang = $("<tr></tr>");
            boxOptionLoaiTrangTrang.append("<td class='label'></td>");
            boxOptionLoaiTrangTrang.append("<td class='pad-top-10'><input type='checkbox' name='TuLoaiTrangTrang' id='chkTuLoaiTrangTrang' title='Tự loại trang trắng'" + (o.LoaiTrangTrang ? "checked" : "") + "/><label for='chkTuLoaiTrangTrang'>Tự loại trang trắng</label></td>");
            // Hiển thị checkbox xoay ảnh
            var boxOptionXoayImg = $("<tr></tr>");
            boxOptionXoayImg.append("<td class='label'></td>");
            boxOptionXoayImg.append("<td class='pad-top-10'><input type='checkbox' name='XoayAnh' id='chkXoayAnh' title='Xoay ảnh'" + (o.XoayAnh ? "checked" : "") + "/><label for='chkXoayAnh'>Xoay ảnh</label></td>");
            // Tạo check box debug
            var boxOptionDebug = $('<tr style="display: none"></tr>');
            boxOptionDebug.append('<td class="label"></td>');
            boxOptionDebug.append('<td class="pad-top-10"><input type="checkbox" id="chkDebug" name="Debug" /><label for="chkDebug" class="pointer">Debug</label></td>');

            $tablescandevice.append(boxOptionLoaiTrangTrang);
            $tablescandevice.append(boxOptionScanHaiMat);
            $tablescandevice.append(boxOptionXoayImg);
            $tablescandevice.append(boxOptionDebug);
            
            //$boxConfig.append($boxOption);
            //tạo div hiển thi progress
            $tablescandevice.append("<tr><td class='label' colspan='2'><div class='scan-progress scan-hide'></div></td></tr>");
            //Tạo vùng sẽ hiển thị thông báo nếu có
            $tablescandevice.append("<tr><td class='label' colspan='2'><div class='scan-message'></div></td></tr>");
            // Hiển thị nút
            var $buttonForm = $("<tr class='submit'></tr>");
            var $tdButtonForm = $("<td colspan='2'></td>");
            if (o.EditContent) {
                $tdButtonForm.append('<button type="button" class="btn-action btn-editcontent">Sửa nội dung</button>');
                $tdButtonForm.find(".btn-editcontent").click(function() {
                    ShowEditForm(o.UrlEditContent, o.dialogId);
                });
            }
            $tdButtonForm.append("<button type='button' class='btn-action btn-scan'>Scan</button>");
            $tdButtonForm.append("<button type='button' id='btnClose' class='btnClose btn-action'>Đóng</button>");
            $buttonForm.append($tdButtonForm);
            $tablescandevice.append($buttonForm);
            $this.append($tablescandevice);
            //Tạo vùng hiển thị kết quả scan
            var $message = $this.find('.scan-message');
            var $devices = $this.find('.scan-device');
            var $progress = $this.find('.scan-progress');
            $message.html('Bạn chưa cài đặt công cụ scan.Click <a class="download-file" href="' + o.UrlFileSetup + '">vào đây</a> để tải file cài đặt');
                
            $this.on('click', '.btn-saveconfig', function() {
                if (typeof(Storage) !== "undefined") {
                    var oConfig = {
                        TwPixelType: (o.ExportPixelTypeUI ? $this.find('input[name="PixelType"]:checked').data('value') : o.TwPixelType),
                        DPI: $this.find('.select-dpi').val(),
                        DuplexEnabled: $this.find("input[name='ScanHaiMat']").is(":checked"),
                        OCREnabled: $this.find("input[name='OCR']").is(":checked"),
                        WordEnabled: $this.find("input[name='Word']").is(":checked"),
                        ExcelEnabled: $this.find("input[name='Excel']").is(":checked"),
                        ClearBG: $this.find("input[name='TuLoaiTrangTrang']").is(":checked"),
                        FeederEnable: $this.find("input[name='ADF']").is(":checked"),
                        ShowUI: (o.ExportShowUI ? $this.find("input[name='ShowUI']").is(":checked") : o.ShowUI),
                        ShowProgress: o.ShowProgress,
                        FileFormatFinal: o.ExportFormatUI ? $('.select-format').val() : o.FileFormatFinal,
                    };
                    localStorage.setItem(configName, JSON.stringify(oConfig));
                    $message.html("Lưu cấu hình thành công");
                } else {
                    alert("Trình duyệt không hỗ trợ lưu cấu hình");
                }
            });
            $this.on('click', '.btn-defconfig', function() {
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem(configName, null);
                    $message.html("Hủy cấu hình thành công");
                }
            });
            $this.on('click', '.btn-reload', function() {
                if (o.Url == '' || o.Url == null) {
                    var promiss = CheckConnectionAndGetDevices($devices, o.Urls, 0, true);
                    promiss.then(CheckConnectionAndGetDevices)
                        .then(CheckConnectionAndGetDevices)
                        .then(CheckConnectionAndGetDevices)
                        .then(function() {
                            if (o.Url != '' && o.Url != null) {
                                $message.empty();
                            }
                        });
                } else {
                    $.getJSON(o.Url + 'GetDevices').done(function(result) {
                        if (!result.Error) {
                            FillDevices($devices, result);
                        } else
                            $message.html(result.Message);
                    }).fail(function(e) {
                        $message.html('Bạn chưa cài đặt công cụ scan.Click <a href="' + o.UrlFileSetup + '">vào đây</a> để tài file cài đặt');
                    });
                }
            });
            $this.on('click', '.btn-scan', function() {
                $this.find(".btn-editcontent").parent().hide();
                $btnScan = $(this);
                $message.html('');
                var data = {
                    SourceName: $this.find('.scan-device').val(),
                    UrlUploadHandler: window.location.origin + o.UrlUploadHandler,
                    UrlSeccussHandler: o.UrlSeccussHandler,
                    TwPixelType: (o.ExportPixelTypeUI ? $this.find('input[name="PixelType"]:checked').data('value') : o.TwPixelType),
                    DPI: $this.find('.select-dpi').val(),
                    DuplexEnabled: $this.find("input[name='ScanHaiMat']").is(":checked"),
                    FeederEnable: $this.find("input[name='ADF']").is(":checked"),
                    ShowUI: (o.ExportShowUI ? $this.find("input[name='ShowUI']").is(":checked") : o.ShowUI),
                    ShowProgress: o.ShowProgress,
                    FileFormatFinal: o.ExportFormatUI ? $('.select-format').val() : o.FileFormatFinal,
                    Quality: o.Quality,
                    BitDepth: o.BitDepth,
                    AutoDiscardBlankPages: o.AutoDiscardBlankPages,
                    UserName: o.UserName,
                    Password: o.Password,
                    Brightness: o.Brightness,
                    Contrast: o.Contrast,
                    ScanedFilePaths: o.ScanedFilePaths,
                    OCREnabled: false,
                    WordEnabled: $this.find("input[name='Word']").is(":checked"),
                    ExcelEnabled: $this.find("input[name='Excel']").is(":checked"),
                    ClearBG: $this.find("input[name='TuLoaiTrangTrang']").is(":checked"),
                    AutoRotate: o.AutoRotate,
                    FolderName: o.FolderName,
                    debug: $this.find("input[name='Debug']").is(":checked")
                };
                var ocrType = $("#typeScan").val();
                if (ocrType == "1") // Chỉ scan
                    data.ScanedFilePaths = o.ScanedFilePaths;
                else if (ocrType == "2") {// Nhận dạng luôn
                    data.ScanedFilePaths = o.ScanedFilePathOCReds;
                    data.OCREnabled = true;
                }
                else
                    data.ScanedFilePaths = o.ScanedFilePathToOCRs;
                if (data.SourceName == '' || data.SourceName == null) {
                    $message.html("Bạn chưa chọn máy scan nào!.");
                    return;
                }
                $btnScan.attr("disabled", "disabled");
                $progress.removeClass("scan-hide");
                $.getJSON(o.Url + 'ScanGo?callback=?', data).done(function(result) {
                    if (result.Error) {
                        $message.html("Đã xảy ra lỗi." + result.Message);
                    } else {
                        //var ocrData = {
                        //        folderName: result.Source,
                        //        UserName: o.UserName,
                        //        Password: o.Password,
                        //        ScanedFilePaths: o.ScanedFilePaths,
                        //        OCREnabled: result.OCREnabled
                        //}
                        //$.getJSON('http:/127.0.0.1:15120/OCRService/OCR/OCRScanFile?callback=?', ocrData).done(function (ocrresult) {
                        //    alert(ocrresult);
                        //});                         

                        $progress.removeClass("scan-hide");
                        $.post(o.UrlSeccussHandler, {
                            IdKey: result.Source,
                            FileFormat: data.FileFormatFinal,
                            ScanedFilePaths: o.ScanedFilePaths,
                            DynScanedFilePaths: o.DynScanedFilePaths,
                            OCREnabled: result.OCREnabled,
                            WordEnabled: result.WordEnabled,
                            ExcelEnabled: result.ExcelEnabled
                        })
                            .done(function(subResult) {
                                if (subResult.Error) {
                                    $message.html("Kết nối với OCR Server thất bại.");
                                } else {
                                    subResult.IdKey = result.Source;
                                    subResult.OCREnabled = result.OCREnabled;
                                    subResult.WordEnabled = result.WordEnabled;
                                    subResult.ExcelEnabled = result.ExcelEnabled;

                                    if ($this.find("input[name=OCR]").is(":checked")) {
                                        $this.find(".btn-editcontent").parent().show();
                                    } else
                                        $this.find(".btn-editcontent").parent().hide();

//                                    var ocrData = {
//                                            folderName: result.Source,
//                                            UserName: o.UserName,
//                                            Password: o.Password,
//                                            ScanedFilePaths: o.ScanedFilePaths,
//                                            OCREnabled: result.OCREnabled
//                                    }
//                                    $.getJSON('http:/127.0.0.1:15120/OCRService/OCR/OCRScanFile?callback=?', ocrData).done(function (result) {
//                                        o.ScanCallbackSeccuss(subResult);
//                                    });
                                    o.ScanCallbackSeccuss(subResult);
                                }
                            })
                            .fail(function() {
                                o.ScanCallbackError(result);
                            })
                            .always(function() {
                                $progress.addClass("scan-hide");
                                o.ScanCallbackCompleted(result);
                            });
                    }
                }).fail(function(e) {
                    $message.html("Đã xảy ra lỗi.");
                }).always(function() {
                    $progress.addClass("scan-hide");
                    $btnScan.removeAttr("disabled");
                });
            });
            $(this).find('.btn-reload').click();
        });
        return this;
    }
})(jQuery);


//Function khi hiển chọn hiển thị html OCR
function displayHtml(){
    var Viewer = $("object.scan-viewpdf");
    Viewer.attr("type","text/html");
    var data = Viewer.attr("data");
    var indexSplash = data.lastIndexOf('\\');
    var pre = data.substring(0, indexSplash + 1);
    var last = data.substring(indexSplash + 1, data.length);
    var id = last.split(".")[0];
    var tmpid = data.lastIndexOf(id);
    if(tmpid + 40 > indexSplash)
        data = pre + id + "\\" + last;
    data = data.replace(".pdf",".html");
    Viewer.attr("data",data);
}

//function displayPdf(){
//    var Viewer = $("object.scan-viewpdf");
//    Viewer.attr("type","application/pdf");
//    var data = Viewer.attr("data");
//    data = data.replace(".html",".pdf");
//    Viewer.attr("data",data);
//}

function ShowEditForm(UrlEditContent,dialogId){
    var Viewer = $("object.scan-viewpdf");
    var data = Viewer.attr("data");
    $.post(UrlEditContent,{ "pdfPath":data },function(data){
        $("#"+dialogId).html(data).dialog({
                                    title: "Cập nhật nội dung file",
                                    width: windowWidth,
                                    height: windowHeight
                                });
        $("#"+dialogId).dialog("open");
    });
}