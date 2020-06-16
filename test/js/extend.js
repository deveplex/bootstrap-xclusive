/**
 * bootstrap-xclusive v1.0.0
 * The most popular front-end framework for developing responsive, mobile first projects on the web.
 * link https://github.com/deveplex/bootstrap-xclusive/
 * Copyright (c) 2015-2019 by virtual
 * Released under the MIT license
 **/
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* ******************************************************************* *
 * bootstrap jQuery extend.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ******************************************************************* */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function ($) {
    'use strict';

    $.extend($.fn, {
        autoWidth: function autoWidth() {
            var size = $(this).css('font-size');
            var text = '';
            if ($(this).prop('tagName') === 'INPUT') text = $(this).val();else text = $(this).text();
            var sensor = $('<pre>' + text + '</pre>').css({ display: 'none', 'box-sizing': 'border-box', 'padding-left': $(this).css('padding-left'), 'padding-right': $(this).css('padding-right'), 'font-size': size });
            $(this).parent().append(sensor);
            var width = sensor.width();
            sensor.remove();
            $(this).width(width);
            return this;
        },
        serializeObject: function serializeObject() {
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
});