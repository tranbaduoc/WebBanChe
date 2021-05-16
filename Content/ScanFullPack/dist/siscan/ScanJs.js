/*! Copyright (c) 2015 SIMAX
 * Version: 1.1
 */
(function ($) {
    $.fn.extend({
        scanApp: function (options) {
            var defaults = {
                UrlUploadHandler: '/BaseWeb/ScanUploadHandler.ashx',
                UrlSeccussHandler: '/BaseWeb/ScanSeccussHandler.ashx',
                ScanedFilePaths: 'D:/Projects/Luu tru/SourceCode/Admin/AppFile/data/Upload/',
                FolderName: '',
                HoSoId: null,
                TwPixelType: 'Gray',
                DPI: 200,
                UrlFileSetup: '/Content/ScanFullPack/filesetup/setupscanservice.msi',
                OCREnabled: false,
                WordEnabled: false,
                ExcelEnabled: false,
                ClearBG: false,
                AutoRotate: true,
                DuplexEnabled: true,
                FeederEnable: true,
                ShowUI: false,
                Zoom: 75,
                AutoDiscardBlankPages: true,
                ShowProgress: false,
                FileFormatFinal: 'Pdf',
                ExportFormatUI: false,
                ExportPixelTypeUI: true,
                ExportShowUI: false,
                ExportSaveConfig: true,
                EditContent: true,
                Quality: 70,
                ShowFileResult: true,
                BitDepth: 8,
                Brightness: 15,
                Contrast: 35,
                ScanCallbackSeccuss: function (result) { console.log(result); },
                ScanCallbackError: function (e) { console.log(e); },
                ScanCallbackCompleted: function (e) { console.log(e); },
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
                DPIs: [100, 150, 200, 250, 300],
                scandevice : ''
            }
            var configName = 'scanconfig';

            var o = $.extend(defaults, options);
            //
            if (typeof (Storage) !== "undefined") {
                var config = localStorage.getItem(configName);
                if (config != null) {
                    try {
                        $.extend(o, JSON.parse(config));
                    } catch (e) {
                    }
                }
            }
            // Đổ danh sách thiết bị vào select box thiết bị
            var FillDevices = function ($container, result) {
                $container.empty();
                if (result.Devices != null) {
                    $.each(result.Devices, function (index, value) {
                        $container.append('<option value="' + value + '" ' + (value == o.scandevice ? 'selected' : '') + '>' + value + '</option>');
                    });

                }
            }
            // Kiểm tra kết nối và lấy về danh sách thiết bị nếu kết nối thành công.
            var CheckConnectionAndGetDevices = function ($container, urls, index, isNext) {
                var dfd = $.Deferred();
                if (isNext) {
                    var url = urls[index];
                    index++;
                    $.getJSON(url + 'GetDevices').done(function (result) {
                        result.Url = url;
                        FillDevices($container, result);
                        o.Url = result.Url;
                        dfd.resolve($container, urls, index, false);
                    }).fail(function (e) {
                        dfd.resolve($container, urls, index, true);
                    });
                }
                else
                    return dfd.resolve(urls, index, false);
                return dfd.promise();
            }
            this.each(function () {
                var $this = $(this);
                $this.addClass("si-box-scaner")
                //Tạo vùng chọn thiết bị
                var $boxscandevice = $('<div class="box-scan-device"></div>');
                $boxscandevice.append('<div><label>Chọn máy Scan</label></div>');
                $boxscandevice.append('<select class="scan-device"></select>');
                $boxscandevice.append('<input type="button" class="btn-action btn-reload" value="Refesh" />');
                $boxscandevice.append('<input type="button" class="btn-action btn-scan" value="Scan" />');
                $this.append($boxscandevice);

                //Tạo vùng hiển thị cấu thiết lập
                var $boxConfig = $('<div class="box-scan-config"></div>');
                //$boxConfig.append('<div>Cấu hình:</div>')
                //Tạo vùng chọn màu
                if (o.ExportPixelTypeUI) {
                    var $boxColor = $('<div class="box-scan-option"></div>');
                    $boxColor.append('<div class="scan-option">Pixel type:</div>');
                    for (i = 0; i < o.PixelTypes.length; i++) {
                        $boxColor.append('<div class="scan-option">'
                                            + '<input type="radio" name="PixelType" data-value="' + o.PixelTypes[i].Value + '" ' + ((o.PixelTypes[i].Value == o.TwPixelType) ? 'checked' : '') + '/>'
                                            + '<label>' + o.PixelTypes[i].Title + '</label></div>');
                    }
                    $boxConfig.append($boxColor);
                }
                //Tạo DPI và định dạng file
                var $dpiFile = $('<div class="box-scan-option"></div>');
                var $boxDPI = $('<div class="scan-option"></div>');
                $boxDPI.append('<label>DPI:</label>');
                var $dpi = $('<select class="select-dpi"></select>');

                for (i = 0; i < o.DPIs.length; i++) {
                    $dpi.append('<option value="' + o.DPIs[i] + '" ' + (o.DPIs[i] == o.DPI ? 'selected' : '') + ' >' + o.DPIs[i] + '</option>');
                }
                $boxDPI.append($dpi);
                $dpiFile.append($boxDPI);
                //
                if (o.ExportFormatUI) {
                    var $boxFormat = $('<div class="scan-option"></div>');
                    $boxFormat.append('<label>Format:</label>');
                    var $fomart = $('<select class="select-format"></select>');
                    for (i = 0; i < o.Formats.length; i++) {
                        $fomart.append('<option value="' + o.Formats[i].Value + '" ' + (o.Formats[i].Value == o.FileFormatFinal ? 'selected' : '') + ' >' + o.Formats[i].Title + '</option>');
                    }
                    $boxFormat.append($fomart);
                    $dpiFile.append($boxFormat);
                }
                //Tạo vùng chọn option
                //var $boxOption = $('<div class="box-scan-option"></div>');
                if (o.ExportShowUI) {
                    var boxOptionShowUI = $('<div class="scan-option"></div>');
                    boxOptionShowUI.append('<input type="checkbox" name="ShowUI"' + (o.ShowUI ? 'checked' : '') + '/>');
                    boxOptionShowUI.append('<label>Show UI</label>');
                    $boxColor.append(boxOptionShowUI);
                }

                var boxOptionADF = $('<div class="scan-option"></div>');
                boxOptionADF.append('<input type="checkbox" id="chkADF" name="ADF" ' + (o.FeederEnable ? 'checked' : '') + '/>');
                boxOptionADF.append('<label for="chkADF">ADF</label>');
                var boxOptionDuplex = $('<div class="scan-option"></div>');
                boxOptionDuplex.append('<input type="checkbox" id="chkDuplex" name="Duplex"' + (o.DuplexEnabled ? 'checked' : '') + '/>');
                boxOptionDuplex.append('<label for="chkDuplex">Duplex</label>');
                var boxOptionAutoDiscardBlankPages = $('<div class="scan-option"></div>');
                boxOptionAutoDiscardBlankPages.append('<input type="checkbox" id="chkAutoDiscardBlankPages" name="AutoDiscardBlankPages"' + (o.AutoDiscardBlankPages ? 'checked' : '') + '/>');
                boxOptionAutoDiscardBlankPages.append('<label for="chkAutoDiscardBlankPages">Loại trang trắng</label>');
                var boxOptionOCR = $('<div class="scan-option" style=""></div>');
                boxOptionOCR.append('<input type="checkbox" id="chkOCR" name="OCR" title="Tự động nhận dạng"' + (o.OCREnabled ? 'checked' : '') + '/>');
                boxOptionOCR.append('<label for="chkOCR" class="pointer">PDF2</label>');
                var boxOptionWord = $('<div class="scan-option"  style="display:none"></div>');
                boxOptionWord.append('<input type="checkbox" id="chkWord" name="Word" title="Kết xuất file word"' + (o.WordEnabled ? 'checked' : '') + '/>');
                boxOptionWord.append('<label for="chkWord" class="pointer">Word</label>');
                var boxOptionExcel = $('<div class="scan-option" style="display:none"></div>');
                boxOptionExcel.append('<input type="checkbox" id="chkExcel" name="Excel" title="Kết xuất file excel"' + (o.ExcelEnabled ? 'checked' : '') + '/>');
                boxOptionExcel.append('<label for="chkExcel" class="pointer">Excel</label>');
                var boxOptionClearBG = $('<div class="scan-option" style="display:none"></div>');
                boxOptionClearBG.append('<input type="checkbox" id="chkClearBG" name="ClearBG" title="Loại bỏ màu nền trước khi nhận dạng"' + (o.ClearBGEnabled ? 'checked' : '') + '/>');
                boxOptionClearBG.append('<label for="chkClearBG" class="pointer">CBG</label>');
                var boxOptionDebug = $('<div class="scan-option" style="display: none"></div>');
                boxOptionDebug.append('<input type="checkbox" id="chkDebug" name="Debug" />');
                boxOptionDebug.append('<label for="chkDebug" class="pointer">Debug</label>');
                //Đăng ký sự kiện hiển thi html thay cho pdf

                //boxOptionWord.click(function(e){
                //    if(e.target.hasClass="pointer"){
                //        displayHtml();
                //    }
                //});
                //boxOptionExcel.click(function(e){
                //    if(e.target.hasClass="pointer"){
                //        displayHtml();
                //    }
                //});

                //boxOptionOCR.click(function(e){
                //    if(e.target.hasClass="pointer"){
                //        displayPdf();
                //    }
                //});


                $dpiFile.append(boxOptionADF);
                $dpiFile.append(boxOptionDuplex);
                $dpiFile.append(boxOptionAutoDiscardBlankPages);
                $dpiFile.append(boxOptionOCR);
                $dpiFile.append(boxOptionWord);
                $dpiFile.append(boxOptionExcel);
                $dpiFile.append(boxOptionClearBG);
                $dpiFile.append(boxOptionDebug);
                //$boxConfig.append($boxOption);
                $boxConfig.append($dpiFile);
                $this.append($boxConfig);
                if (o.ExportSaveConfig) {
                    var $boxOptionSaveConfig = $('<div class="scan-option"></div>');
                    $boxOptionSaveConfig.append('<input type="button" class="btn-action btn-saveconfig" value="Lưu" />');
                    $boxOptionSaveConfig.append('<input type="button" class="btn-action btn-defconfig" value="Hủy" />');
                    $dpiFile.append($boxOptionSaveConfig);
                }
                if (o.EditContent) {
                    var $boxOptionEditContent = $('<div class="scan-option" style="float:right;"></div>');
                    $boxOptionEditContent.append('<input type="button" class="btn-action btn-editcontent" value="Sửa nội dung" />');
                    $boxOptionEditContent.find(".btn-editcontent").click(function () {
                        ShowEditForm(o.UrlEditContent, o.dialogId);
                    });
                    $dpiFile.append($boxOptionEditContent);
                    $boxOptionEditContent.hide();
                }
                //tạo div hiển thi progress
                $this.append('<div class="scan-progress scan-hide"></div>');
                //Tạo vùng sẽ hiển thị thông báo nếu có
                $this.append('<div class="scan-message"></div>');
                //Tạo vùng hiển thị kết quả scan
                $this.append('<div class="scan-viewer' + (o.ShowFileResult ? '' : ' scan-hide') + '"><object style="height: 100%;" type="application/pdf" class="scan-viewpdf scan-hide"></object><img src="#" class="scan-viewimg scan-hide"/><div class="scan-viewtif scan-hide"></div></div>');
                var $message = $this.find('.scan-message');
                var $devices = $this.find('.scan-device');
                var $boxViewer = $this.find('.scan-viewer');
                var $pdfViewer = $boxViewer.find('.scan-viewpdf');
                var $imageViewer = $boxViewer.find('.scan-viewimg');
                var $tifViewer = $boxViewer.find('.scan-viewtif');
                var $progress = $this.find('.scan-progress');
                $message.html('Bạn chưa cài đặt công cụ scan.Click <a class="download-file" href="' + o.UrlFileSetup + '">vào đây</a> để tải file cài đặt');
                $this.on('click', '.btn-saveconfig', function () {
                    if (typeof (Storage) !== "undefined") {
                        //
                        var oConfig = {
                            TwPixelType: (o.ExportPixelTypeUI ? $this.find('input[name="PixelType"]:checked').data('value') : o.TwPixelType),
                            DPI: $this.find('.select-dpi').val(),
                            DuplexEnabled: $this.find("input[name='Duplex']").is(":checked"),
                            OCREnabled: $this.find("input[name='OCR']").is(":checked"),
                            WordEnabled: $this.find("input[name='Word']").is(":checked"),
                            AutoDiscardBlankPages: $this.find("input[name='AutoDiscardBlankPages']").is(":checked"),
                            ExcelEnabled: $this.find("input[name='Excel']").is(":checked"),
                            ClearBG: $this.find("input[name='ClearBG']").is(":checked"),
                            FeederEnable: $this.find("input[name='ADF']").is(":checked"),
                            ShowUI: (o.ExportShowUI ? $this.find("input[name='ShowUI']").is(":checked") : o.ShowUI),
                            ShowProgress: o.ShowProgress,
                            FileFormatFinal: o.ExportFormatUI ? $('.select-format').val() : o.FileFormatFinal,
                            scandevice: $this.find('.scan-device').val()
                        }
                        localStorage.setItem(configName, JSON.stringify(oConfig));
                        $message.html("Lưu cấu hình thành công");
                    } else {
                        alert("Trình duyệt không hỗ trợ lưu cấu hình");
                    }
                });
                $this.on('click', '.btn-defconfig', function () {
                    if (typeof (Storage) !== "undefined") {
                        localStorage.setItem(configName, null);
                        $message.html("Hủy cấu hình thành công");
                    }
                });
                $this.on('click', '.btn-reload', function () {
                    if (o.Url == '' || o.Url == null) {
                        var promiss = CheckConnectionAndGetDevices($devices, o.Urls, 0, true);
                        promiss.then(CheckConnectionAndGetDevices)
                            .then(CheckConnectionAndGetDevices)
                            .then(CheckConnectionAndGetDevices)
                            .then(function () {
                                if (o.Url != '' && o.Url != null) {
                                    $message.empty();
                                }
                            });
                    }
                    else {
                        $.getJSON(o.Url + 'GetDevices').done(function (result) {
                            if (!result.Error) {
                                FillDevices($devices, result);
                            }
                            else
                                $message.html(result.Message);
                        }).fail(function (e) {
                            console.log(e);
                            $message.html('Bạn chưa cài đặt công cụ scan.Click <a href="' + o.UrlFileSetup + '">vào đây</a> để tài file cài đặt');
                        });
                    }
                });
                $this.on('click', '.btn-scan', function () {
                    $this.find(".btn-editcontent").parent().hide();
                    $btnScan = $(this);
                    $message.html('');
                    var data = {
                        SourceName: $this.find('.scan-device').val(),
                        UrlUploadHandler: window.location.origin + o.UrlUploadHandler,
                        UrlSeccussHandler: o.UrlSeccussHandler,
                        TwPixelType: (o.ExportPixelTypeUI ? $this.find('input[name="PixelType"]:checked').data('value') : o.TwPixelType),
                        DPI: $this.find('.select-dpi').val(),
                        DuplexEnabled: $this.find("input[name='Duplex']").is(":checked"),
                        FeederEnable: $this.find("input[name='ADF']").is(":checked"),
                        ShowUI: (o.ExportShowUI ? $this.find("input[name='ShowUI']").is(":checked") : o.ShowUI),
                        ShowProgress: o.ShowProgress,
                        FileFormatFinal: o.ExportFormatUI ? $('.select-format').val() : o.FileFormatFinal,
                        Quality: o.Quality,
                        BitDepth: o.BitDepth,
                        AutoDiscardBlankPages: $this.find("input[name='AutoDiscardBlankPages']").is(":checked"),
                        UserName: o.UserName,
                        Password: o.Password,
                        Brightness: o.Brightness,
                        Contrast: o.Contrast,
                        ScanedFilePaths: o.ScanedFilePaths,
                        OCREnabled: $this.find("input[name='OCR']").is(":checked"),
                        WordEnabled: $this.find("input[name='Word']").is(":checked"),
                        ExcelEnabled: $this.find("input[name='Excel']").is(":checked"),
                        ClearBG: $this.find("input[name='ClearBG']").is(":checked"),
                        AutoRotate: o.AutoRotate,
                        FolderName: o.FolderName,
                        debug: $this.find("input[name='Debug']").is(":checked")
                    }
                    if (data.SourceName == '' || data.SourceName == null) {
                        $message.html("Bạn chưa chọn máy scan nào!.");
                        return;
                    }
                    $btnScan.attr("disabled", "disabled");
                    $progress.removeClass("scan-hide");
                    //$boxViewer.height($boxViewer.height() - 16);
                    //$pdfViewer.height($pdfViewer.height() - 16);
                    $.getJSON(o.Url + 'ScanGo?callback=?', data).done(function (result) {
                        if (result.Error) {
                            $message.html("Đã xảy ra lỗi." + result.Message);
                        }
                        else {
                            $progress.removeClass("scan-hide");
                            var dataSuccessHandler = {
                                IdKey: result.Source
                                , FileFormat: data.FileFormatFinal
                                , ScanedFilePaths: o.ScanedFilePaths
                                , OCREnabled: result.OCREnabled
                                , WordEnabled: result.WordEnabled
                                , ExcelEnabled: result.ExcelEnabled
                            };
                            if (o.HoSoId != null && o.HoSoId != '')
                                dataSuccessHandler.HoSoId = o.HoSoId;
                            $.post(o.UrlSeccussHandler, dataSuccessHandler)
                            .done(function (subResult) {
                                if (subResult.Error) {
                                    $message.html("Kết nối với OCR Server thất bại.");
                                }
                                else {
                                    if (o.ShowFileResult && subResult.Files != null && subResult.Files.length > 0) {
                                        var firstFile = subResult.Files[0];
                                        if (firstFile.indexOf('.tif') >= 0) {
                                            $imageViewer.addClass('scan-hide');
                                            $pdfViewer.addClass('scan-hide');
                                            $tifViewer.removeClass('scan-hide');
                                            LoadTiff($tifViewer, firstFile);
                                        }
                                        else if (firstFile.indexOf('.pdf') >= 0) {
                                            $imageViewer.addClass('scan-hide');
                                            $pdfViewer.removeClass('scan-hide');
                                            $tifViewer.addClass('scan-hide');
                                            $pdfViewer.attr('data', firstFile + "?zoom=" + o.Zoom);
                                        }
                                        else {
                                            $pdfViewer.addClass('scan-hide');
                                            $imageViewer.removeClass('scan-hide');
                                            $tifViewer.addClass('scan-hide');
                                            $imageViewer.attr('src', firstFile);
                                        }
                                    }
                                    subResult.IdKey = result.Source;
                                    subResult.OCREnabled = result.OCREnabled;
                                    subResult.WordEnabled = result.WordEnabled;
                                    subResult.ExcelEnabled = result.ExcelEnabled;

                                    if ($this.find("input[name=OCR]").is(":checked")) {
                                        $this.find(".btn-editcontent").parent().show();
                                    }
                                    else
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
                            .fail(function () {
                                console.log("fail");
                                o.ScanCallbackError(result);
                            })
                            .always(function () {
                                console.log("always");
                                $progress.addClass("scan-hide");
                                //$boxViewer.height($boxViewer.height() + 16);
                                //$pdfViewer.height($pdfViewer.height() + 16);
                                o.ScanCallbackCompleted(result);
                            });
                        }
                    }).fail(function (e) {
                        console.log(e);
                        $message.html("Đã xảy ra lỗi.");
                    }).always(function () { $progress.addClass("scan-hide"); $btnScan.removeAttr("disabled"); })
                })
                $(this).find('.btn-reload').click();
            });

            return this;
        }
    })
    $.fn.extend({
        scanApp: $.fn.scanApp
    });
})(jQuery);
function GetUrlOCR(strHoSoId, fileUrl, scanFilePaths, IdKey, callBack, debug) {
    openWaitBox("Đang kiểm tra kết nối");
    if (debug == null)
        debug = false;
    var param = {
        Url: '',
        Urls: ['http://127.0.0.1:16692/ScanService/Scan/',
            'http://127.0.0.1:17894/ScanService/Scan/',
            'http://127.0.0.1:8733/ScanService/Scan/',
            'http://127.0.0.1:30894/ScanService/Scan/']
    }
    var count = 0;
    // Kiểm tra kết nối và lấy về danh sách thiết bị nếu kết nối thành công.
    var CheckConnectionAndGetDevices = function (urls, index, isNext) {
        count++;
        var dfd = $.Deferred();
        if (isNext) {
            var url = urls[index];
            index++;
            $.getJSON(url + 'GetDevices').done(function (result) {
                result.Url = url;
                param.Url = result.Url;
                dfd.resolve(urls, index, false);
            }).fail(function (e) {
                dfd.resolve(urls, index, true);
            });
        }
        else
            return dfd.resolve(urls, index, false);
        if (count == 4)
            closeWaitBox();
        return dfd.promise();
    }
    var promiss = CheckConnectionAndGetDevices(param.Urls, 0, true);
    promiss.then(CheckConnectionAndGetDevices)
        .then(CheckConnectionAndGetDevices)
        .then(CheckConnectionAndGetDevices)
        .then(function () {
            if (param.Url != '' && param.Url != null) {
                closeWaitBox();
                PostToOCR(strHoSoId, param.Url, fileUrl, scanFilePaths, IdKey, callBack, debug);
            }
        });
}
function PostToOCR(strHoSoId, urlService, fileUrl, scanFilePaths, IdKey, callBack, debug) {
    var data = {
        SourceName: "-69",
        UrlUploadHandler: fileUrl,
        UrlSeccussHandler: "/ScanSeccussHandler.ashx",
        TwPixelType: "Gray",
        DPI: 300,
        DuplexEnabled: true,
        FeederEnable: true,
        ShowUI: true,
        ShowProgress: true,
        FileFormatFinal: "Pdf",
        Quality: 8,
        BitDepth: 8,
        AutoDiscardBlankPages: true,
        UserName: "",
        Password: "",
        Brightness: 6,
        Contrast: 6,
        ScanedFilePaths: scanFilePaths,
        OCREnabled: true,
        WordEnabled: true,
        ExcelEnabled: true,
        ClearBG: true,
        AutoRotate: true,
        FolderName: IdKey,
        debug: debug,
        fileUrl: fileUrl
    }
    openWaitBox("Đang nhận dạng");
    $.getJSON(urlService + 'ScanGo?callback=?', data).done(function (result) {
        if (result.Error) {
            closeWaitBox();
            console.log("Xảy ra lỗi");
        }
        else {
            $.post("/UC/CustomAction.aspx", { "do": "getfileinfo", "ItemId": IdKey, "HoSoId": strHoSoId }, function (data) {
                closeWaitBox();
                callBack(data.Data, data);
            });
        }
    }).fail(function (e) {
    }).always(function () { });
}
function PostToSaveSTTScan(urlService, IdKeyNew, folder, strData, callBack) {
    var data = {
        SourceName: folder,
        UrlUploadHandler: '/ScanUploadHandler.ashx',
        UrlSeccussHandler: "/ScanSeccussHandler.ashx",
        TwPixelType: "Gray",
        DPI: 300,
        DuplexEnabled: true,
        FeederEnable: true,
        ShowUI: true,
        ShowProgress: true,
        FileFormatFinal: "Pdf",
        Quality: 8,
        BitDepth: 8,
        AutoDiscardBlankPages: true,
        UserName: "",
        Password: "",
        Brightness: 6,
        Contrast: 6,
        ScanedFilePaths: IdKeyNew,
        OCREnabled: true,
        WordEnabled: true,
        ExcelEnabled: true,
        ClearBG: true,
        AutoRotate: true,
        FolderName: strData,
        debug: false,
        fileUrl: "",
        fileCount: "savestt"
    }
    data.UrlUploadHandler = window.location.origin + data.UrlUploadHandler;
    openWaitBox("Đang lưu số thứ tự file scan");
    $.getJSON(urlService + 'ScanGo?callback=?', data).done(function (result) {
        closeWaitBox();
        if (result.Error) {
            msgBox("Có lỗi khi lưu thứ tự file scan");
        }
        else
            callBack();
    }).fail(function (e) {
    }).always(function () { });
}
function PostToDeleteScan(urlService, IdKeyNew, folder, strData, callBack) {
    var data = {
        SourceName: folder,
        UrlUploadHandler: IdKeyNew,
        UrlSeccussHandler: "/ScanSeccussHandler.ashx",
        TwPixelType: "Gray",
        DPI: 300,
        DuplexEnabled: true,
        FeederEnable: true,
        ShowUI: true,
        ShowProgress: true,
        FileFormatFinal: "Pdf",
        Quality: 8,
        BitDepth: 8,
        AutoDiscardBlankPages: true,
        UserName: "",
        Password: "",
        Brightness: 6,
        Contrast: 6,
        ScanedFilePaths: "",
        OCREnabled: true,
        WordEnabled: true,
        ExcelEnabled: true,
        ClearBG: true,
        AutoRotate: true,
        FolderName: strData,
        debug: false,
        fileUrl: "",
        fileCount: "delfile"
    }
    openWaitBox("Đang lưu số thứ tự file scan");
    $.getJSON(urlService + 'ScanGo?callback=?', data).done(function (result) {
        closeWaitBox();
        if (result.Error) {
            msgBox("Có lỗi khi lưu thứ tự file scan");
        }
        else
            callBack();
    }).fail(function (e) {
    }).always(function () { });
}
function PostToTaoFilePdf(urlService, ScanedFilePaths, IdKeyNew, folder, callBack) {
    var data = {
        SourceName: folder,
        UrlUploadHandler: '/ScanUploadHandler.ashx',
        UrlSeccussHandler: "/ScanSeccussHandler.ashx",
        TwPixelType: "Gray",
        DPI: 300,
        DuplexEnabled: true,
        FeederEnable: true,
        ShowUI: true,
        ShowProgress: true,
        FileFormatFinal: "Pdf",
        Quality: 8,
        BitDepth: 8,
        AutoDiscardBlankPages: true,
        UserName: "",
        Password: "",
        Brightness: 6,
        Contrast: 6,
        ScanedFilePaths: ScanedFilePaths,
        OCREnabled: true,
        WordEnabled: true,
        ExcelEnabled: true,
        ClearBG: true,
        AutoRotate: true,
        FolderName: IdKeyNew,
        debug: false,
        fileUrl: "",
        fileCount: "taofilepdf"
    }
    data.UrlUploadHandler = window.location.origin + data.UrlUploadHandler;
    openWaitBox("Đang tạo file");
    $.getJSON(urlService + 'ScanGo?callback=?', data).done(function (result) {
        closeWaitBox();
        if (result.Error) {
            msgBox("Có lỗi khi tạo file");
        }
        else
            callBack();
    }).fail(function (e) {
    }).always(function () { });
}
//Function khi hiển chọn hiển thị html OCR
function displayHtml() {
    var Viewer = $("object.scan-viewpdf");
    Viewer.attr("type", "text/html");
    var data = Viewer.attr("data");
    var indexSplash = data.lastIndexOf('\\');
    var pre = data.substring(0, indexSplash + 1);
    var last = data.substring(indexSplash + 1, data.length);
    var id = last.split(".")[0];
    var tmpid = data.lastIndexOf(id);
    if (tmpid + 40 > indexSplash)
        data = pre + id + "\\" + last;
    data = data.replace(".pdf", ".html");
    Viewer.attr("data", data);
}

function displayPdf() {
    var Viewer = $("object.scan-viewpdf");
    Viewer.attr("type", "application/pdf");
    var data = Viewer.attr("data");
    data = data.replace(".html", ".pdf");
    Viewer.attr("data", data);
}

function ShowEditForm(UrlEditContent, dialogId) {
    var Viewer = $("object.scan-viewpdf");
    var data = Viewer.attr("data");
    $.post(UrlEditContent, { "pdfPath": data }, function (data) {
        $("#" + dialogId).html(data).dialog({
            title: "Cập nhật nội dung file",
            width: windowWidth,
            height: windowHeight
        });
        $("#" + dialogId).dialog("open");
    });
}