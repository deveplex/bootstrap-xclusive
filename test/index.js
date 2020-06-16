//require.config({
//    paths: {
//        "jquery": "../lib/jquery/dist/jquery",
//        "bootstrap": "../lib/bootstrap/dist/js/bootstrap",
//        "placeholder": "../src/js/placeholder",
//        "passwordstrength": "../src/js/passwordstrength",
//        "dialog": "../src/js/dialog",
//        "table": "../src/js/table",
//        "forms": "../src/js/forms"
//    }
//});

//require([
//    'jquery',
//    'bootstrap',
//    'placeholder',
//    'passwordstrength',
//    'dialog',
//    'table',
//    'forms'
//],
//function ($, _, Backbone) {
//    "use strict";
$(document).ready(function () {

    $('.fffff.input-group.spinner input').on('bs.spinner.change', function (e, arg) {
        var fff = '';
        $('.aaaaaaa').text($(this).val());
    }).val(0).trigger('input');

    $('input[type=checkbox]').checkbox();
    $('input[type=radio]').radiobox();
    //$('#placeholder_panel input').placeholder({});
   // $('#password').passwordstrength({
   //     Weak: '#regWeak',
   //     Medium: '#regMedium',
   //     Strong: '#regStrong'
   // });

    var buttons = [
    {
        text: "确定", classes: 'btn-primary confirm active', handler: function (e) {
            $("body").unbind("touchmove");

            var formd = $(e.data.dialogTarget).find('form');

            var ggg = formd.serializeObject();
            //                if ($.isFunction(confirm)) {
            //                    confirm(obj);
            //                }
        }
    },
   {
       text: "取消", classes: 'btn-default exit cancel timeout', handler: function (target) {
           $("body").unbind("touchmove");
           //               if ($.isFunction(cancel)) {
           //                   cancel(obj);
           //               }
       }
   }];
    //dialog
    $('button#dialog').on('click', function (e) {
       var  fdfd =  $('form#dialog1').dialog({
            classes: 'fade dialog full'    //在modal添加class
            , backdrop: true     //是否点击外面关闭
            , caption: '对话框标题'        //对话框标题
            //,message: ''        //对话框消息
            , buttons: buttons   //按钮集
            , timeout: 0      //定时关闭
        });
    });
   // //popup
   // $('button#popup').on('click', function (e) {
   //     $('div#dialog1').popup({
   //         classes: ''    //在modal添加class
   //         , backdrop: true     //是否点击外面关闭
   //         //, caption: '对话框标题'        //对话框标题
   //         //,message: ''        //对话框消息
   //         //, buttons: buttons   //按钮集
   //         //,timeout: 20000      //定时关闭
   //     });
   //     //$('.modal.window .modal-body').height($('.modal.window .modal-content').height());
   // });
   // $('button#popup_table').on('click', function (e) {
   //     $('.ggggggg').popup({
   //         classes: 'popuptable'    //在modal添加class
   //         , backdrop: true     //是否点击外面关闭
   //         //, caption: '对话框标题'        //对话框标题
   //         //,message: ''        //对话框消息
   //         //, buttons: buttons   //按钮集
   //         //,timeout: 20000      //定时关闭
   //     });
   //     //$('.modal.window .modal-body').height($('.modal.window .modal-content').height());
   // });
   // //loading
   // $('button#loading').on('click', function (e) {

   //     $('div#loading1').dialog({
   //         classes: 'loading full'    //在modal添加class
   //         , backdrop: 'static'     //是否点击外面关闭
   //         //,caption: ''        //对话框标题
   //         //,message: ''        //对话框消息
   //         , buttons: null   //按钮集
   //         //,timeout: 20000      //定时关闭
   //     });
   // });
   // //iframe dialog
   // $('button#iframedlg').on('click', function (e) {

   //     $('div#iframedlg').dialog({
   //         classes: 'dialog'    //在modal添加class
   //         , backdrop: 'static'     //是否点击外面关闭
   //         , caption: '对话框标题'        //对话框标题
   //         //,message: ''        //对话框消息
   //         , buttons: null   //按钮集
   //         //,timeout: 20000      //定时关闭
   //     });
   // });
   // //checkbox
   // $('#checkbox_panel button').on('click', function (e) {
   //     var d = new Date();
   //     var checkbox = $(['<div class="checkbox-item">',
   //                     '<label class="check-box rectangle"><input type="checkbox" id="checkbox_' + d.getTime() + '1" class="from-address" data-options="{font:\'glyphicon glyphicon-ok\'}" /></label>',
   //                     '<label for="checkbox_' + d.getTime() + '1" class="">首次下单每张优惠￥5</label>',
   //                     '</div>',
   //                     '<div class="checkbox-item">',
   //                     '<label class="check-box rectangle"><input type="checkbox" id="checkbox_' + d.getTime() + '2" class="from-address" data-options="{font:\'glyphicon glyphicon-ok\'}" /></label>',
   //                     '<label for="checkbox_' + d.getTime() + '2" class="">首次下单每张优惠￥5</label>',
   //                     '</div>',
   //                     '<div class="checkbox-item">',
   //                     '<label class="check-box rectangle disabled"><input type="checkbox" id="checkbox_' + d.getTime() + '3" class="from-address" data-options="{font:\'glyphicon glyphicon-ok\'}" /></label>',
   //                     '<label for="checkbox_' + d.getTime() + '3" class="disabled">首次下单每张优惠￥5</label>',
   //                     '</div>'].join(''));
   //     checkbox.appendTo($('#checkbox_panel .checkbox-group'));
   // });
   // //checkbox
   // $('#radiobox_panel button').on('click', function (e) {
   //     var d = new Date();
   //     var checkbox = $(['<div class="radiobox-item">',
   //                     '<label class="radio-box circle"><input type="radio" id="radiobox_' + d.getTime() + '1" name="radio_name" class="from-address" data-options="{font:\'glyphicon glyphicon-ok\'}" /></label>',
   //                     '<label for="radiobox_' + d.getTime() + '1" class="">首次下单每张优惠￥5</label>',
   //                     '</div>',
   //                     '<div class="radiobox-item">',
   //                     '<label class="radio-box circle"><input type="radio" id="radiobox_' + d.getTime() + '2" name="radio_name" class="from-address" data-options="{font:\'glyphicon glyphicon-ok\'}" /></label>',
   //                     '<label for="radiobox_' + d.getTime() + '2" class="">首次下单每张优惠￥5</label>',
   //                     '</div>',
   //                     '<div class="radiobox-item">',
   //                     '<label class="radio-box circle disabled"><input type="radio" id="radiobox_' + d.getTime() + '3" name="radio_name" class="from-address" data-options="{font:\'glyphicon glyphicon-ok\'}" /></label>',
   //                     '<label for="radiobox_' + d.getTime() + '3" class="disabled">首次下单每张优惠￥5</label>',
   //                     '</div>'].join(''));
   //     checkbox.appendTo($('#radiobox_panel .radiobox-group'));
   // });




    var dag = [
        { "aidNumber": null, "aidaiGuid": null, "arGuid": "eb343be4dc1242bdbe6c1faa6921fa18", "arNo": "WXQKF00001", "arName": "测试1", "aidPaperNum": null, "aidActualNum": 1, "aidDifference": null, "aidDifRemarks": null, "aiGuid": "b172a17504a8450381fc81b5d829dbc1" },
        { "aidNumber": null, "aidaiGuid": null, "arGuid": "eb343be4dc1242bdbe6c1faa6921fa18", "arNo": "WXQKF00001", "arName": "测试1", "aidPaperNum": null, "aidActualNum": 0, "aidDifference": null, "aidDifRemarks": null, "aiGuid": "b172a17504a8450381fc81b5d829dbc1" },
        { "aidNumber": null, "aidaiGuid": null, "arGuid": "eb343be4dc1242bdbe6c1faa6921fa18", "arNo": "WXQKF00001", "arName": "测试1", "aidPaperNum": null, "aidActualNum": 0, "aidDifference": null, "aidDifRemarks": null, "aiGuid": "b172a17504a8450381fc81b5d829dbc1" },
        { "aidNumber": null, "aidaiGuid": null, "arGuid": "eb343be4dc1242bdbe6c1faa6921fa18", "arNo": "WXQKF00001", "arName": "测试1", "aidPaperNum": null, "aidActualNum": 1, "aidDifference": null, "aidDifRemarks": null, "aiGuid": "b172a17504a8450381fc81b5d829dbc1" },
        { "aidNumber": null, "aidaiGuid": null, "arGuid": "eb343be4dc1242bdbe6c1faa6921fa18", "arNo": "WXQKF00001", "arName": "测试1", "aidPaperNum": null, "aidActualNum": 0, "aidDifference": null, "aidDifRemarks": null, "aiGuid": "b172a17504a8450381fc81b5d829dbc1" }
    ];
    $('.table').table({
        data: dag
        //onRowClick: function (r) {
        //    //alert(JSON.stringify(r));
        //}
    });
    //$('.table').table({
    //    data: dag,
    //    append: true,
    //    onRowClick: function (r) {
    //        alert(JSON.stringify(r));
    //    }
    //});
    //$('.table').table({
    //    data: dag,
    //    append: false,
    //    onRowClick: function (r) {
    //        alert(JSON.stringify(r));
    //    }
    //});

});
//});