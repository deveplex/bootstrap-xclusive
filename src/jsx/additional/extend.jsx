/* ******************************************************************* *
 * bootstrap jQuery extend.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ******************************************************************* */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    $.extend($.fn, {
        autoWidth: function () {
            var size = $(this).css('font-size');
            var text = '';
            if ($(this).prop('tagName') === 'INPUT')
                text = $(this).val();
            else
                text = $(this).text();
            var sensor = $('<pre>' + text + '</pre>').css({ display: 'none', 'box-sizing': 'border-box', 'padding-left': $(this).css('padding-left'), 'padding-right': $(this).css('padding-right'), 'font-size': size });
            $(this).parent().append(sensor);
            var width = sensor.width();
            sensor.remove();
            $(this).width(width);
            return this;
        },
        serializeObject: function () {
            if ($(this[0]).is("form") == false) {
                return;
            }
            var obj = {};
            var fields = $(this).serializeArray();
            $.each(fields, function (i, field) {
                obj[field.name] = field.value;
            });
            return obj;
        }
    });

}));
