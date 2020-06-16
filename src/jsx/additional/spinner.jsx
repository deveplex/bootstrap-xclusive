/* ******************************************************************* *
 * bootstrap spinner plugin.
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

    var Spinner = function (element, options) {
        this.element = element;
        this.options = options;
        this.type = 'spinner';

        this.initialize();
    };

    Spinner.prototype.defaults = {
    };

    Spinner.prototype.initialize = function () {
        var that = this;
        var $element = $(this.element);

        $element
            //.detach()
            //.css({ top: 0, left: 0, display: 'block' })
            //.addClass(placement)
            .data('bs.' + this.type, this);

        $('.spinner-group input').on('click', function () {
            $(this).select();
        }).on('blur', function () {
            var min = parseInt($(this).attr('min'));
            if (isNaN(min)) min = Number.MIN_VALUE;
            var val = parseInt($(this).val());
            if (isNaN(val) || val <= min) {
                $(this).val(min);
            }
        }).on('input propertychange', function (e, arg) {
            var min = parseInt($(this).attr('min'));
            if (isNaN(min)) min = Number.MIN_VALUE;
            var max = parseInt($(this).attr('max'));
            if (isNaN(max)) max = Number.MAX_VALUE;
            var val = parseInt($(this).val());
            if (val <= min) {
                $(this).val(min);
                $(this).parent().prev().addClass('disabled').prop('disabled', true);
            } else if (val >= max) {
                $(this).val(max);
                $(this).parent().next().addClass('disabled').prop('disabled', true);
            } else {
                $(this).val(val);
                $(this).parent().prev().removeClass('disabled').prop('disabled', false);
                $(this).parent().next().removeClass('disabled').prop('disabled', false);
            }
            $(this).autoWidth();
            $(this).trigger('bs.spinner.change', arg);
        }).trigger('input');

        $('.spinner-group .spinner-group-addon.spinner-minus').on('click', function () {
            var input = $(this).parent().find('input');
            var val = parseInt(input.val()) - 1;
            input.val(val).trigger('input', { value: val });
        });

        $('.spinner-group .spinner-group-addon.spinner-plus').on('click', function () {
            var input = $(this).parent().find('input');
            var val = parseInt(input.val()) + 1;
            input.val(val).trigger('input', { value: val });
        });
    };

    Spinner.prototype.show = function (_relatedTarget) {
        var that = this;
    };

    // SPINNER PLUGIN DEFINITION
    // =========================

    function Plugin(options, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.spinner');
            var optionset = $.extend({}, Spinner.prototype.defaults, $this.data(), typeof options === 'object' && options);

            if (!data && /destroy|hide/.test(optionset)) return;
            if (!data) $this.data('bs.spinner', (data = new Spinner(this, optionset)));

            if (typeof options === 'string') data[options](_relatedTarget);
            else if (optionset.show) data.show(_relatedTarget);
            //else data.hide(_relatedTarget);
        });
    }

    var old = $.fn.spinner;

    $.fn.spinner = Plugin;
    $.fn.spinner.Constructor = Spinner;

    // SPINNER NO CONFLICT
    // ===================

    $.fn.spinner.noConflict = function () {
        $.fn.spinner = old;
        return this;
    };






    //$(document).ready(function () {

    //    $('.spinner-group input').on('click', function () {
    //        $(this).select();
    //    }).on('blur', function () {
    //        var min = parseInt($(this).attr('min'));
    //        if (isNaN(min)) min = Number.MIN_VALUE;
    //        var val = parseInt($(this).val());
    //        if (isNaN(val) || val <= min) {
    //            $(this).val(min);
    //        }
    //    }).on('input propertychange', function (e, arg) {
    //        var min = parseInt($(this).attr('min'));
    //        if (isNaN(min)) min = Number.MIN_VALUE;
    //        var max = parseInt($(this).attr('max'));
    //        if (isNaN(max)) max = Number.MAX_VALUE;
    //        var val = parseInt($(this).val());
    //        if (val <= min) {
    //            $(this).val(min);
    //            $(this).parent().prev().addClass('disabled').prop('disabled', true);
    //        } else if (val >= max) {
    //            $(this).val(max);
    //            $(this).parent().next().addClass('disabled').prop('disabled', true);
    //        } else {
    //            $(this).val(val);
    //            $(this).parent().prev().removeClass('disabled').prop('disabled', false);
    //            $(this).parent().next().removeClass('disabled').prop('disabled', false);
    //        }
    //        $(this).autoWidth();
    //        $(this).trigger('bs.spinner.change', arg);
    //    }).trigger('input');

    //    $('.spinner-group .spinner-group-addon.spinner-minus').on('click', function () {
    //        var input = $(this).parent().find('input');
    //        var val = parseInt(input.val()) - 1;
    //        input.val(val).trigger('input', { value: val });
    //    });

    //    $('.spinner-group .spinner-group-addon.spinner-plus').on('click', function () {
    //        var input = $(this).parent().find('input');
    //        var val = parseInt(input.val()) + 1;
    //        input.val(val).trigger('input', { value: val });
    //    });
    //});

}));
