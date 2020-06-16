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
 * bootstrap placeholder plugin.
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

    var Placeholder = function Placeholder(element, options) {
        this.element = element;
        this.options = options;
        this.type = 'placeholder';

        this.initialize();
    };

    Placeholder.prototype.defaults = {
        show: true,
        template: ['<div style="position:absolute; display:none;">', '</div>'].join('')
    };

    Placeholder.prototype.initialize = function () {
        var that = this;
        var $element = $(this.element);
        var $placeholder = $(that.options.template);
        if (!$placeholder && $placeholder.length < 1) {
            throw new Error('placeholder template option must consist of exactly 1 top-level element!');
        }

        $element
        //.detach()
        //.css({ top: 0, left: 0, display: 'block' })
        //.addClass(placement)
        .data('bs.' + this.type, this).data('bs.template', $placeholder);

        //    $(this).focus(function () {
        //        if ($(this).val() == $(this).attr('placeholder')) {
        //            $(this).removeClass('placeholder');
        //            $(this).val('');
        //        }
        //    }).blur(function () {
        //        if ($(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
        //            $(this).addClass('placeholder');
        //            $(this).val($(this).attr('placeholder'));
        //        }
        //    }).blur();

        $element.parent().css({ "position": "relative" });

        $placeholder.addClass('placeholder').css({
            'top': $element.position().top + ($element.outerHeight() - $element.height()) / 2,
            'left': $element.position().left + ($element.outerWidth() - $element.width()) / 2,
            'width': $element.width(), 'height': $element.height()
        }).html($element.attr('placeholder')).off("click").on("click", function () {
            $element.focus();
        }).insertBefore($element);

        if ($element.attr('id')) {
            $placeholder.addClass($element.attr('id') + '-placeholder');
        }

        $element.keyup(function () {
            if ($element.val() === '' || $element.val() === null) {
                $placeholder.show();
            } else {
                $placeholder.hide();
            }
        }).focus(function () {
            if ($element.val() === '' || $element.val() === null) {
                $placeholder.show();
            } else {
                $placeholder.hide();
            }
        }).blur(function () {
            if ($(this).val() === '' || $(this).val() === null) {
                $placeholder.show();
            } else {
                $placeholder.hide();
            }
        }).load().blur();
    };

    Placeholder.prototype.show = function (_relatedTarget) {
        var that = this;
        var $element = $(this.element);
        var $placeholder = $element.data('bs.template');

        $placeholder.show();
    };

    // DIALOG PLUGIN DEFINITION
    // =========================

    function Plugin(options, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.placeholder');
            var optionset = $.extend({}, Placeholder.prototype.defaults, $this.data(), (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options);

            if (!data && /destroy|hide/.test(optionset)) return;
            if (!data) $this.data('bs.placeholder', data = new Placeholder(this, optionset));

            if (typeof options === 'string') data[options](_relatedTarget);else if (optionset.show) data.show(_relatedTarget);
            //else data.hide(_relatedTarget);
        });
    }

    var old = $.fn.placeholder;

    $.fn.placeholder = Plugin;
    $.fn.placeholder.Constructor = Placeholder;

    // DIALOG NO CONFLICT
    // ===================

    $.fn.placeholder.noConflict = function () {
        $.fn.placeholder = old;
        return this;
    };
});