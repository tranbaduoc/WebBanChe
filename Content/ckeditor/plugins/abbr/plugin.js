CKEDITOR.plugins.add('abbr', {
    icons: 'abbr',
    init: function (editor) {
        //editor.addCommand('insertTimestamp', {
        //    exec: function (editor) {
        //        var now = new Date();
        //        editor.insertHtml('The current date and time is: <em>' + now.toString() + '</em>');
        //    }
        //});
        editor.addCommand('abbr', new CKEDITOR.dialogCommand('abbrDialog'));

        editor.ui.addButton('Abbr', {
            label: 'Thêm thông tin form',
            command: 'abbr',
            toolbar: 'cusform'
        });

        //if (editor.contextMenu) {

        //    editor.addMenuGroup('abbrGroup');
        //    editor.addMenuItem('abbrItem', {
        //        label: 'Edit Abbreviation',
        //        icon: this.path + 'icons/abbr.png',
        //        command: 'abbr',
        //        group: 'abbrGroup'
        //    });

        //    editor.contextMenu.addListener(function (element) {
        //        if (element.getAscendant('abbr', true)) {
        //            return { abbrItem: CKEDITOR.TRISTATE_OFF };
        //        }
        //    });
        //}

        //editor.on('doubleclick', function (e) {
        //    var ClickedWidget = e.editor.widgets.widgetHoldingFocusedEditable;
        //    if (ClickedWidget != null && ClickedWidget.name == 'abbr') {
        //        ClickedWidget.edit();
        //    }
        //});


        CKEDITOR.dialog.add('abbrDialog', this.path + 'dialogs/abbr.js');

        

        
    }
});