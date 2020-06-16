/* ******************************************************************* *
 * bootstrap password strength plugin.
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

    var PasswordStrength = function (element, options) {
        this.element = element;
        this.options = options;
        this.type = 'passwordStrength';

        this.strongRegex = new RegExp("^(?=.{10,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W)", "g");
        this.mediumRegex = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9])))", "g");
        this.enoughRegex = new RegExp("(?=.{1,})", "g");

        this.initialize();
    };

    PasswordStrength.prototype.defaults = {
        show: true,
        Weak: '',
        Medium: '',
        Strong: ''
    };

    PasswordStrength.prototype.initialize = function () {
        var that = this;
        var $element = $(this.element);

        $element
            //.detach()
            //.css({ top: 0, left: 0, display: 'block' })
            //.addClass(placement)
            .data('bs.' + this.type, this);

        $element.on('input propertychange', function (e) {
            var value = $(this).val();
            if (that.strongRegex.test(value)) {
                $(that.options.Weak).addClass('Weak');
                $(that.options.Medium).addClass('Medium');
                $(that.options.Strong).addClass('Strong');
            } else if (that.mediumRegex.test(value)) {
                $(that.options.Weak).addClass('Weak');
                $(that.options.Medium).addClass('Medium');
                $(that.options.Strong).removeClass('Strong');
            } else if (that.enoughRegex.test(value)) {
                $(that.options.Weak).addClass('Weak');
                $(that.options.Medium).removeClass('Medium');
                $(that.options.Strong).removeClass('Strong');
            } else {
                $(that.options.Weak).removeClass('Weak');
                $(that.options.Medium).removeClass('Medium');
                $(that.options.Strong).removeClass('Strong');
            }
        });
    };

    PasswordStrength.prototype.show = function (_relatedTarget) {
        var that = this;
    };

    // PASSWORD STRENGTH PLUGIN DEFINITION
    // =========================

    function Plugin(options, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.passwordStrength');
            var optionset = $.extend({}, PasswordStrength.prototype.defaults, $this.data(), typeof options === 'object' && options);

            if (!data && /destroy|hide/.test(optionset)) return;
            if (!data) $this.data('bs.passwordStrength', (data = new PasswordStrength(this, optionset)));

            if (typeof options === 'string') data[options](_relatedTarget);
            else if (optionset.show) data.show(_relatedTarget);
            //else data.hide(_relatedTarget);
        });
    }

    var old = $.fn.passwordstrength;

    $.fn.passwordstrength = Plugin;
    $.fn.passwordstrength.Constructor = PasswordStrength;

    // PASSWORD STRENGTH NO CONFLICT
    // ===================

    $.fn.passwordstrength.noConflict = function () {
        $.fn.passwordstrength = old;
        return this;
    };

}));
