/* ******************************************************************* *
 * bootstrap radio checkbox plugin.
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

    //计算表达式的值
    function evil(fn) {
        if (typeof fn === 'string') {
            var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
            return new Fn('return ' + fn)();
        } else {
            return {};
        }
    }

    var CheckBox = function (element, options) {
        this.element = element;
        this.options = options;
        this.type = 'checkbox';

        this.initialize();
    };

    CheckBox.prototype.defaults = {
    };

    CheckBox.prototype.initialize = function () {
        var that = this;
        var $element = $(this.element);

        $element
            //.detach()
            //.css({ top: 0, left: 0, display: 'block' })
            //.addClass(placement)
            .data('bs.' + this.type, this);

        if ($element.prop('checked') || $element.attr('checked')) {
            var options = evil($element.data('options'));//eval('(' + $(this).data('options') + ')');
            $element.parent('label').addClass('checked').addClass(options.font);
        }
        if ($element.prop('disabled')) {
            $element.parents('.checkbox').addClass('disabled');//.siblings().addClass('disabled');
        }
        $element
            .on('change', function () {
                var options = evil($(this).data('options'));//eval('(' + $(this).data('options') + ')');
                if (!options)
                    options = {};
                var name = $(this).attr('name');
                var id = $(this).attr('id');
                if (!$(this).prop('checked'))
                    $(this).parent('label').removeClass('checked').removeClass(options.font);
                else
                    $(this).parent('label').addClass('checked').addClass(options.font);
            });
    };

    CheckBox.prototype.show = function (_relatedTarget) {
        var that = this;
    };

    // DIALOG PLUGIN DEFINITION
    // =========================

    function Plugin(options, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.checkbox');
            var optionset = $.extend({}, CheckBox.prototype.defaults, $this.data(), typeof options === 'object' && options);

            if (!data && /destroy|hide/.test(optionset)) return;
            if (!data) $this.data('bs.checkbox', (data = new CheckBox(this, optionset)));

            if (typeof options === 'string') data[options](_relatedTarget);
            else if (optionset.show) data.show(_relatedTarget);
            //else data.hide(_relatedTarget);
        });
    }

    var old = $.fn.checkbox;

    $.fn.checkbox = Plugin;
    $.fn.checkbox.Constructor = CheckBox;

    // DIALOG NO CONFLICT
    // ===================

    $.fn.checkbox.noConflict = function () {
        $.fn.checkbox = old;
        return this;
    };

}));

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

    //计算表达式的值
    function evil(fn) {
        if (typeof fn === 'string') {
            var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
            return new Fn('return ' + fn)();
        } else {
            return {};
        }
    }

    var RadioBox = function (element, options) {
        this.element = element;
        this.options = options;
        this.type = 'radiobox';

        this.initialize();
    };

    RadioBox.prototype.defaults = {
    };

    RadioBox.prototype.initialize = function () {
        var that = this;
        var $element = $(this.element);

        $element
            //.detach()
            //.css({ top: 0, left: 0, display: 'block' })
            //.addClass(placement)
            .data('bs.' + this.type, this);

        if ($element.prop('checked') || $element.attr('checked')) {
            var options = evil($element.data('options'));//eval('(' + $(this).data('options') + ')');
            $element.parent('label').addClass('checked').addClass(options.font);
        }
        if ($element.prop('disabled'))
            $element.parents('.radiobox').addClass('disabled');//.siblings().addClass('disabled');

        $element
            //.on('click', function (e) {
            //if ($(this).data('checked')) {
            //    $(this).prop('checked', false);
            //    $(this).data('checked', false);
            //} else {
            //    $(this).prop('checked', true);
            //    $(this).data('checked', true);
            //}
            //$(this).trigger('change');
            //})
            .on('propertychange', function (e, data) {
                if (data.property === 'disabled')
                    var disabled;
                else if (data.property === 'checked')
                    var checked;

            })
            .on('change', function (e) {
                var options = evil($(this).data('options'));//eval('(' + $(this).data('options') + ')');
                if (!options)
                    options = {};
                var name = $(this).attr('name');
                var id = $(this).attr('id');
                $(this).parent('label').addClass('checked').addClass(options.font);
                $('input[type=radio][name=' + name + '][id!=' + id + ']').parent('label').removeClass('checked').removeClass(options.font);
                $(this).trigger('bs.radiobox.change');
            });

    };

    RadioBox.prototype.show = function (_relatedTarget) {
        var that = this;
    };

    // DIALOG PLUGIN DEFINITION
    // =========================

    function Plugin(options, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.radiobox');
            var optionset = $.extend({}, RadioBox.prototype.defaults, $this.data(), typeof options === 'object' && options);

            if (!data && /destroy|hide/.test(optionset)) return;
            if (!data) $this.data('bs.radiobox', (data = new RadioBox(this, optionset)));

            if (typeof options === 'string') data[options](_relatedTarget);
            else if (optionset.show) data.show(_relatedTarget);
            //else data.hide(_relatedTarget);
        });
    }

    var old = $.fn.radiobox;

    $.fn.radiobox = Plugin;
    $.fn.radiobox.Constructor = RadioBox;

    // DIALOG NO CONFLICT
    // ===================

    $.fn.radiobox.noConflict = function () {
        $.fn.radiobox = old;
        return this;
    };

}));
