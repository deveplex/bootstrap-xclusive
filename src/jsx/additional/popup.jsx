/* ******************************************************************* *
 * bootstrap placeholder plugin.
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

    var Popup = function (element, options) {
        this.element = element;
        this.options = options;
        this.type = 'popup';

        this.initialize();
    };

    Popup.prototype.defaults = {
        classes: null,     //在modal添加class
        backdrop: 'static',      //是否点击外面关闭
        caption: null,         //对话框标题
        message: null,         //对话框消息
        buttons: null,    //按钮集
        timeout: 0,       //定时关闭
        modal: true,
        show: true,
        position: { left: 0, bottom: 0 },
        attr: { height: 'toggle' }
        //template: [
        //    '<div class="popup-backdrop in">',
        //    '</div>',
        //].join('')
    };

    Popup.prototype.initialize = function () {
        var that = this;
        var $element = $(this.element);
        var $modal = null;

        $element
            //.detach()
            .data('bs.' + this.type, this);


        if (that.options.modal) {
            $modal = $('<div class="popup-backdrop in"></div>');

            if (that.options.classes) {
                $modal.addClass(that.options.classes);
            }
        }

        if (that.options.position) {
            $modal.css(that.options.position);
            $element.css(that.options.position);
        }

        $element.data('bs.template', $modal);
    };

    Popup.prototype.show = function (_relatedTarget) {
        var that = this;
        var $element = $(this.element);
        var $modal = $element.data('bs.template');

        var e = $.Event('hide.bs.popup', { relatedTarget: _relatedTarget });

        var classes = $element.attr('class');
        $element
            .removeClass()
            .toggleClass('popup ' + classes);

        if ($modal) {

            if (typeof that.options.backdrop === 'string' && that.options.backdrop === 'static') {
                //
            } else if (($modal) && (typeof that.options.backdrop === 'boolean' && that.options.backdrop)) {
                $modal.on('click', function (e) {
                    that.hide(e);
                });
                //$modal.on('hide.bs.popup', function (e) {
                //    that.hide(e);
                ////$modal.trigger('hide.bs.popup');
                //});
            }
            $modal.hide().appendTo('body');
        }

        $element.animate(that.options.attr);
        $modal.animate(that.options.attr);
    };

    Popup.prototype.hide = function (_relatedTarget) {
        var that = this;
        var $element = $(this.element);
        var $modal = $element.data('bs.template');

        $element.animate(that.options.attr, function (e) {
            $(this).removeClass('popup');
        });
        $modal.animate(that.options.attr, function (e) {
            $(this).remove();
        });
    };

    // DIALOG PLUGIN DEFINITION
    // =========================

    function Plugin(options, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.popup');
            var optionset = $.extend({}, Popup.prototype.defaults, $this.data(), typeof options === 'object' && options);

            if (!data && /destroy|hide/.test(optionset)) return;
            if (!data) $this.data('bs.popup', (data = new Popup(this, optionset)));

            if (typeof options === 'string') data[options](_relatedTarget);
            else if (optionset.show) data.show(_relatedTarget);
            else data.hide(_relatedTarget);
        });
    }

    var old = $.fn.popup;

    $.fn.popup = Plugin;
    $.fn.popup.Constructor = Popup;

    // DIALOG NO CONFLICT
    // ===================

    $.fn.popup.noConflict = function () {
        $.fn.popup = old;
        return this;
    };

}));
