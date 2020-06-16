/* ******************************************************************* *
 * bootstrap xclusive JavaScript requires.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ******************************************************************* */

    if (typeof jQuery === 'undefined') {
        throw new Error('bootstrap xclusive\'s JavaScript requires jQuery');
    }

    if (typeof jQuery.fn.modal === 'undefined') {
        throw new Error('bootstrap xclusive\'s JavaScript requires bootstrap');
    }

+function ($) {
    'use strict';

    var version = $.fn.jquery.split(' ')[0].split('.');
    if ((version[0] < 2 && version[1] < 9) || (version[0] === 1 && version[1] === 9 && version[2] < 1) || (version[0] > 3)) {
        throw new Error('bootstrap xclusive\'s JavaScript requires jQuery version 1.9.1 or higher.');
    }

}(jQuery);
