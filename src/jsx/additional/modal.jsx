/* ******************************************************************* *
 * bootstrap modal plugin.
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

    var Modal = function (element, options) {
        this.element = element;
        this.options = options;
        this.type = 'modal';
        this.isShow = false;

        this.initialize();
    };

    Modal.defaults = {
        classes: '',    //在modal添加class，flat:扁平对话框，fade:淡出淡入，slide:滑动，scale:缩放
        backdrop: 'static',      //是否点击外面关闭
        show: true,
        modal: true,
        halign: 'center',
        valign: 'center',
        offset: {
            x: 0,
            y: 0
        },
        timeout: 0,       //定时关闭
        backdroptemplate: '<div class="modal modal-backdrop"></div>'
    };

    Modal.prototype.initialize = function () {
        var that = this;
        var $element = $(this.element);
        var $self = $(this.options.self);
        var $parent = $(this.options.parent);
        var index = this.options.index;
        var $backdrop = $(that.options.backdroptemplate);

        //modal
        $backdrop
            .detach()
            .addClass('in');

        $element
            .detach()
            .css({ display: 'none' })
            .data('bs.' + this.type, this)
            .data('bs.backdroptemplate', $backdrop);

        if (!$element.hasClass('modal')) { $element.addClass('modal'); }
        if (that.options.classes) { $element.addClass(that.options.classes); }

        //$container.css({ 'margin-left': that.options.offset.x, 'margin-right': that.options.offset.x, 'margin-top': that.options.offset.y, 'margin-bottom': that.options.offset.y });

        $element.on('click', function (e) {
            e.preventDefault();
        });

        if (this.options.backdrop === 'static' || this.options.backdrop === false) {
            $element.get(0).focus();
        } else {
            $backdrop.on('click', function () {
                that.hide();
            });
        }

        $element.find('.close,.exit').on('click', function () {
            that.hide();
        });

        $element.on('show.bs.modal', function (e) {
            $(window).bind("touchmove", function (e) {
                e.preventDefault();
            });

            if ($.isNumeric(that.options.timeout) && that.options.timeout > 0) {
                var $timeout = null;
                if ($element.hasClass('timeout')) { $timeout = $element; } else { $timeout = $element.find('.timeout'); }
                var timeout = that.options.timeout / 1000;
                var $i = $('<i></i>').text(timeout);
                if ($timeout) { $i.appendTo($timeout); }

                var timer = setInterval(function () {
                    if (timeout <= 1) {
                        clearTimeout(timer);
                        timer = null;
                        that.hide();
                    } else {
                        timeout--;
                        if ($timeout) { $i.text(timeout); }
                    }
                }, 1000);
            }
        });

        $element.on('hide.bs.modal', function (e) {
            $(window).unbind("touchmove");
            if (!$self || $self.length < 1) {
                return;
            }
            if ($parent && $parent.length > 0) {
                var children = $parent.children();
                if (children && children.length > 0) {
                    if (index === 0)
                        $self.prependTo($parent);
                    else
                        $self.insertAfter($(children[index - 1]));
                }
                else
                    $self.appendTo($parent);
            }
        });
    };

    Modal.prototype.toggle = function (_relatedTarget) {
        return this.isShow ? this.hide(_relatedTarget) : this.show(_relatedTarget);
    };

    Modal.prototype.show = function (_relatedTarget) {
        var that = this;
        var $element = $(this.element);
        var $backdrop = $element.data('bs.backdroptemplate');

        $('body').addClass('modal-open');
        $backdrop.addClass('in');
        $element.addClass('in');

        if (that.options.modal) {
            $('body').append($backdrop);
        }
        $('body').append($element);

        var e1 = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });
        $element.trigger(e1);

        this.isShow = true;

        that.resizeHandler();
        that.escape();
        that.resize();

        if ($.support.transition && $element.hasClass('scale')) {
            var w1 = $element.width();
            var h1 = $element.height();
            $element.css({ width: 0, height: 0, display: 'block' });
            var l1 = $element.position().left;
            var t1 = $element.position().top;
            $element.css({ left: l1 + w1 / 2, top: t1 + h1 / 2 });
            $element.animate({
                left: l1,
                top: t1,
                width: w1,
                height: h1
            },
                100,
                function () {

                });
        } else if ($.support.transition && $element.hasClass('slide')) {
            var w2 = $element.width();
            var h2 = $element.height();
            $element.css({ display: 'block' });
            var l2 = $element.position().left;
            var t2 = $element.position().top;
            $element.css({ top: t2 - 150 });
            $element.animate({
                top: t2
            },
                200,
                function () {

                });
        } else if ($.support.transition && $element.hasClass('fade')) {
            $element.fadeIn(400, function () {
            });
        } else {
            $element.show();
        }

        var e2 = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });
        $element.trigger(e2);

    };
    Modal.prototype.hide = function (_relatedTarget) {
        var that = this;
        var $element = $(this.element);
        var $backdrop = $element.data('bs.backdroptemplate');

        $('body').removeClass('modal-open');

        var e1 = $.Event('hide.bs.modal', { relatedTarget: _relatedTarget });
        $element.trigger(e1);

        this.isShow = false;

        this.escape();
        this.resize();

        if ($.support.transition && $element.hasClass('scale')) {
            var w1 = $element.width();
            var h1 = $element.height();
            var l1 = $element.position().left + w1 / 2;
            var t1 = $element.position().top + h1 / 2;
            $element.animate({
                left: l1,
                top: t1,
                width: 0,
                height: 0
            },
                100,
                function () {
                    $([$backdrop, $element]).each(function (ix, it) {
                        it && it.remove();
                    });
                });
        } else if ($.support.transition && $element.hasClass('slide')) {
            var w2 = $element.width();
            var h2 = $element.height();
            var l2 = $element.position().left;
            var t2 = $element.position().top;
            $element.animate({
                top: t2 - 150
            },
                200,
                function () {
                    $([$backdrop, $element]).each(function (ix, it) {
                        it && it.remove();
                    });
                });
        } else if ($.support.transition && $element.hasClass('fade')) {
            $element.fadeOut(400, function () {
                $([$backdrop, $element]).each(function (ix, it) {
                    it && it.remove();
                });
            });
        } else {
            $([$backdrop, $element]).each(function (ix, it) {
               it && it.remove();
            });
        }

        var e2 = $.Event('hiden.bs.modal', { relatedTarget: _relatedTarget });
        $element.trigger(e2);

    };

    Modal.prototype.escape = function () {
        var that = this;
        var $element = $(this.element);

        if (this.isShow && this.options.keyboard) {
            $element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
                if (e.which === 27) { that.hide(); }
            }, this));
        } else if (!this.isShow) {
            $element.off('keydown.dismiss.bs.modal');
        }
    };

    Modal.prototype.resize = function (_relatedTarget) {
        if (this.isShow) {
            $(window).on('resize.bs.modal', $.proxy(this.resizeHandler, this));
        } else {
            $(window).off('resize.bs.modal');
        }
    };

    Modal.prototype.resizeHandler = function (_relatedTarget) {
        var that = this;
        var $element = $(this.element);
        var $backdrop = $element.data('bs.backdroptemplate');

        var e = $.Event('resized.bs.modal', { relatedTarget: _relatedTarget });
        $element.trigger(e);

        var css = { };
        var left = ($(window).width() - $element.width()) / 2;// + (this.measureScrollbar() / 2)
        var top = ($(window).height() - $element.height()) / 2;
        if (that.options.halign === 'center') {
            css.left = left <= 0 ? 0 : left;
        } else {
            css[that.options.halign] = 0;
        }
        if (that.options.valign === 'center') {
            css.top = top <= 0 ? 0 : top;
        } else {
            css[that.options.valign] = 0;
        }
        $element.css(css);

    };

    Modal.prototype.measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        $('body').append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        $('body')[0].removeChild(scrollDiv);
        return scrollbarWidth;
    };

    // Modal PLUGIN DEFINITION
    // =========================

    function Plugin(options, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.modal');
            var optionset = $.extend({}, Modal.defaults, $this.data(), typeof options === 'object' && options);

            if (!data && /destroy|hide/.test(optionset)) return;
            if (!data) $this.data('bs.modal', data = new Modal(this, optionset));

            if (typeof options === 'string') data[options](_relatedTarget);
            else if (optionset.show) data.show(_relatedTarget);
            else data.hide(_relatedTarget);
        });
    }

    var old = $.fn.modal;

    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Modal;

    // Modal NO CONFLICT
    // ===================

    $.fn.modal.noConflict = function () {
        $.fn.modal = old;
        return this;
    };

}));
