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
 * bootstrap modal plugin.
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

    var Messager = function Messager(element, options) {
        this.element = element;
        this.options = options;
        this.type = 'messager';

        this.initialize();
    };

    Messager.defaults = {
        show: true,
        timeout: 3000, //定时关闭
        template: ['<div class="modal" tabindex="-1">', '<div class="modal-content">', '</div>', '</div>'].join('')
    };

    Messager.prototype.initialize = function () {
        var that = this;
        var $element = $(this.element);
        var $container = $(that.options.template);

        if (!$container && $container.length < 1) {
            throw new Error('template option must consist of exactly 1 top-level element!');
        }

        $element.detach().data('bs.' + this.type, this).data('bs.template', $container);

        if (!$container.hasClass('modal-' + this.type)) {
            $container.addClass('modal-' + this.type);
        }
        $container.attr('role', this.type);

        var $content = $container.find('div.modal-content');
        $content.append($element);
    };

    Messager.prototype.show = function (_relatedTarget) {
        var that = this;
        var $element = $(this.element);
        var $container = $element.data('bs.template');

        var e1 = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });
        $element.trigger(e1);

        $container.modal(that.options);

        var e2 = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });
        $element.trigger(e2);
    };

    Messager.prototype.hide = function (_relatedTarget) {
        var that = this;
        var $element = $(this.element);
        var $container = $element.data('bs.template');

        var e1 = $.Event('hide.bs.modal', { relatedTarget: _relatedTarget });
        $element.trigger(e1);

        $container.modal('hide');

        var e2 = $.Event('hiden.bs.modal', { relatedTarget: _relatedTarget });
        $element.trigger(e2);
    };

    // Modal PLUGIN DEFINITION
    // =========================

    function Plugin(options, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.messager');
            var optionset = $.extend({}, Messager.defaults, $this.data(), (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options);

            if (!data && /destroy|hide/.test(optionset)) return;
            if (!data) $this.data('bs.messager', data = new Messager(this, optionset));

            if (typeof options === 'string') data[options](_relatedTarget);else if (optionset.show) data.show(_relatedTarget);else data.hide(_relatedTarget);
        });
    }

    var old = $.fn.messager;

    $.fn.messager = Plugin;
    $.fn.messager.Constructor = Messager;

    // Modal NO CONFLICT
    // ===================

    $.fn.messager.noConflict = function () {
        $.fn.messager = old;
        return this;
    };
});