CKEDITOR.dialog.add('abbrDialog', function (editor) {
    return {
        title: 'Danh sách trường thông tin',
        minWidth: 900,
        minHeight: 400,
        onShow: function () {
            var document = this.getElement().getDocument();
            var $this = this;
            var element = document.getById('bar');
           
            $.post("/Ossi/AdminEform/OssiDataType/pActionOssiDataType.ashx?do=QUERYDATA&pageSize=10&page=1", {}, function (data) {
                console.log(data);
                // Vẽ table, hoặc ul để hiển thị danh sách., có nút chọn để chọn.
                var strHtmlDataType = '';
                strHtmlDataType += "<table style=\"border:1px solid #ccc;height: 360px;overflow: auto;width: 100%;\">";
                strHtmlDataType += "<tr>";
                strHtmlDataType += "<th style=\"border:1px solid #ccc;padding:5px;font-weight:bold\">Select</th>";
                strHtmlDataType += "<th style=\"border:1px solid #ccc;padding:5px;font-weight:bold\">Title</th>";
                strHtmlDataType += "<th style=\"border:1px solid #ccc;padding:5px;font-weight:bold\">Data Name</th>";
                strHtmlDataType += "<th style=\"border:1px solid #ccc;padding:5px;font-weight:bold\">Kiểu dữ liệu</th>";
                strHtmlDataType += "</tr>";
                for (var i = 0; i < data.Data.length; i++) {
                    strHtmlDataType += "<tr>";
                    strHtmlDataType += "<td style=\"border:1px solid #ccc;padding:5px\"><input type=\"radio\" name=\"data\" value=\"" + data.Data[i].ID + "\" data-dataname=\"" + data.Data[i].dataName +"\" class=\"slradio\"/></td>";
                    strHtmlDataType += "<td style=\"border:1px solid #ccc;padding:5px\">" + data.Data[i].Title + "</td>";
                    strHtmlDataType += "<td style=\"border:1px solid #ccc;padding:5px\">" + data.Data[i].dataName + "</td>";
                    strHtmlDataType += "<td style=\"border:1px solid #ccc;padding:5px\">" + data.Data[i].dataKieuDuLieu + "</td>";
                    strHtmlDataType += "</tr>";
                }
                strHtmlDataType += "</table>";
                $("#ContentHtml").html(strHtmlDataType);
                $(".slradio").click(function () {
                    var name = $(this).data("dataname");
                    var vlue = "<input id=\"" + name + "\" name=\"" + name + "\" type=\"text\">";

                    $this.setValueOf('tab-basic', 'abbr2', vlue);
                });

            });
        },
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'html',
                        id: 'foo',
                        html: '<div id="ContentHtml" style="height: 360px;overflow: auto;"></div>',
                        setup: function (element) {
                           
                        }
                    },
                    {
                        type: 'text',
                        id: 'abbr2',
                        label: 'Thuộc tính',
                        setup: function (element) {
                           
                        }
                    }
                    //{
                    //    type: 'button',
                    //    id: 'buttonId',
                    //    label: 'Click me',
                    //    title: 'My title',
                    //    onClick: function () {
                    //        // this = CKEDITOR.ui.dialog.button
                    //        alert('Clicked: ' + this.id);
                    //    }
                    //}

                ]
            },
            //{
            //    id: 'tab-adv',
            //    label: 'Advanced Settings',
            //    elements: [
            //        {
            //            type: 'text',
            //            id: 'abbr2',
            //            label: 'Abbreviation',
            //            validate: CKEDITOR.dialog.validate.notEmpty("Abbreviation field cannot be empty.")
            //        }, {
            //            type: 'html',
            //            id: 'foo2',
            //            html: '<div id="bar1"></div>',
            //        }
            //    ]
            //}
        ],
        onOk: function () {
            var dialog = this;
            var abbr = dialog.getValueOf('tab-basic', 'abbr2');
            editor.insertHtml(abbr);
        }
    };
});