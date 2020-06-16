/* ******************************************************************* *
 * bootstrap dialog plugin.
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

    var Dialog = function (element, options) {
        this.element = element;
        this.options = options;
        this.type = 'dialog';

        this.initialize();
    };

    Dialog.prototype.defaults = {
        caption: null,    //对话框标题
        buttons: null,    //按钮集
        show: true,
        offset: {
            x: 10,
            y: 10
        },
        template: [
            '<div class="modal" tabindex="-1">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<button type="button" class="cysicons close" style="border: 0;font-size: 1em;" data-dismiss="modal" aria-label="Close" aria-hidden="true"> &times;</button>',
            '<div class="modal-title" id="modal_title"></div>',
            '</div>',
            '<div class="modal-body"></div>',
            '<div class="modal-footer"></div>',
            '</div>',
            '</div>'
        ].join('')
    };

    Dialog.prototype.initialize = function () {
        var that = this;
        var $element = $(this.element);
        var $self = $element.clone(true, true);
        var $parent = $element.parent();
        var index = $element.index();
        var $container = $(that.options.template);

        if (!$container && $container.length < 1) {
            throw new Error('template option must consist of exactly 1 top-level element!');
        }

        //modal
        $element
            .detach()
            .show()
            .data('bs.' + this.type, this)
            .data('bs.template', $container);

        that.options.self = $self;
        that.options.parent = $parent;
        that.options.index = index;

        if (!$container.hasClass('modal-' + this.type)) { $container.addClass('modal-' + this.type); }
        $container.attr('role', this.type);
        $container.attr('aria-hidden', true);
        $container.attr('aria-labelledby', "modal_title");

        var $dialog = $container.find('div.modal-dialog');
        var $content = $container.find('div.modal-content');
        var $header = $container.find('div.modal-header');
        var $bodier = $container.find('div.modal-body');
        var $footer = $container.find('div.modal-footer');

        //header
        if (that.options.caption) {
            $header.find('>div.modal-title').html(that.options.caption);
        }
        else {
            //$header.css({ display: 'none', height: 0 });
            $header.remove();
        }

        //footer
        if (that.options.buttons && that.options.buttons.length > 0) {
            $.each(that.options.buttons, function (ix, it) {
                var $btngroup = $('<div class="btn-group"></div>');
                var $btn = $('<button type="button" class=""></button>')
                    .addClass(it.classes).text(it.text);

                if ($.isFunction(it.handler)) {
                    $btn.on('click', { dialogTarget: $element.data('bs.template').get(0) }, it.handler);
                }

                $btn.appendTo($btngroup);
                $btngroup.appendTo($footer);
            });
        }
        else {
            //$footer.css({ display: 'none', height: 0 });
            $footer.remove();
        }

        //body
        $element.appendTo($bodier);

        $container.on('resized.bs.modal', function (e) {
            $bodier.css({
                'max-width': $(window).width() - ($content.outerWidth(true) - $content.outerWidth()),
                'max-height': $(window).height() - ($content.outerHeight(true) - $content.outerHeight()) - $header.outerHeight() - $footer.outerHeight()
            });
        });
        $container.on('shown.bs.modal', function (e) {
            $bodier.css({
                'max-width': $(window).width() - ($content.outerWidth(true) - $content.outerWidth()),
                'max-height': $(window).height() - ($content.outerHeight(true) - $content.outerHeight()) - $header.outerHeight() - $footer.outerHeight()
            });
        });
    };

    Dialog.prototype.show = function (_relatedTarget) {
        var that = this;
        var $element = $(this.element);
        var $container = $element.data('bs.template');

        return $container.modal(this.options);
    };

    Dialog.prototype.hide = function (_relatedTarget) {
        var that = this;
        var $element = $(this.element);
        var $container = $element.data('bs.template');

        return $container.modal('hide');
    };

    // Modal PLUGIN DEFINITION
    // =========================

    function Plugin(options, _relatedTarget) {
        var $container;
         this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.dialog');
            var optionset = $.extend({}, Dialog.prototype.defaults, $this.data(), typeof options === 'object' && options);

            if (!data && /destroy|hide/.test(optionset)) return;
            if (!data) $this.data('bs.dialog', (data = new Dialog(this, optionset)));

            if (typeof options === 'string') $container = data[options](_relatedTarget);
            else if (optionset.show) $container = data.show(_relatedTarget);
            else $container = data.hide(_relatedTarget);
        });
        return $container;
    }

    var old = $.fn.dialog;

    $.fn.dialog = Plugin;
    $.fn.dialog.Constructor = Dialog;

    // Modal NO CONFLICT
    // ===================

    $.fn.dialog.noConflict = function () {
        $.fn.dialog = old;
        return this;
    };

}));
