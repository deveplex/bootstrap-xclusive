/* ******************************************************************* *
 * bootstrap table plugin.
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
        var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
        return new Fn('return ' + fn)();
    }

    var Table = function (element, options) {
        this.element = element;
        this.options = options;
        this.type = 'table';

        //this.initialize();
        //this.initHeader();
        //this.initBody();
        //this.initFooter();
    };

    Table.prototype.defaults = {
        data: []
    };

    Table.prototype.initialize = function () {
        var that = this;
        var $element = $(this.element);
        var $thead = $element.children('thead');
        var $tbody = $element.children('tbody');
        var $tfoot = $element.children('tfoot');

        $element
            //.detach()
            //.css({ top: 0, left: 0, display: 'block' })
            //.addClass(placement)
            .data('bs.' + this.typ, this);

        //thead
        if ($thead && $thead.length > 0) {
            $thead.detach();
        }
        else {
            $thead = $('<thead></thead>');
        }
        $thead.appendTo($element);

        //tbody
        if ($tbody && $tbody.length > 0) {
            $tbody.detach();
        }
        else {
            $tbody = $('<tbody></tbody>');
        }
        $tbody.appendTo($element);

        //tfoot
        if ($tfoot && $tfoot.length > 0) {
            $tfoot.detach();
        }
        else {
            $tfoot = $('<tfoot></tfoot>');
        }
        $tfoot.appendTo($element);
    };

    Table.prototype.initHeader = function () {
        var that = this;
        var $element = $(this.element);
        var $thead = $element.children('thead');
        var columns = [];

        $thead.find('tr:last>th').each(function (ix, th) {
            columns.push(th);
        });

        if (columns.length <= 0) {
            //that.defaults.data.sort(function (a, b) {
            //    return b.length - a.length;
            //});
            var col = that.options.data.pop();
            $.each(col, function (ix, it) {
                var $th = $('<th></th>').data('field', ix);
                columns.push($th);
            });
        }
        that.options.columns = columns;
    };

    Table.prototype.initBody = function () {
        var that = this;
        var $element = $(this.element);
        var $tbody = $element.children('tbody');
        var rows = [];

        if (!that.options.append) {
            $tbody.data('rows-count', 0).html('');
        }

        $.each(that.options.data, function (ix, row) {
            var rowscount = Number($tbody.data('rows-count'));
            var $tr = $('<tr></tr>').data('rowdata', row);
            if (that.options.onRowClick)
                $tr.on('click', function () {
                    that.options.onRowClick($tr.data('rowdata'));
                });
            $.each(that.options.columns, function (iv, col) {
                var $td = $('<td></td>');
                var d = new Date();
                switch ($(col).data('type')) {
                    case 'radiobox': {
                        var radioboxOptions = evil($(col).data('options'));//eval('(' + $(col).data('options') + ')');
                        var radiobox = {
                            type: $(col).data('type'),
                            name: $(col).data('name'),
                            id: $(col).data('field'),
                            checked: Boolean(row[$(col).data('field')])
                        };
                        var radioboxTemplate = $(['<div class="radiobox-item ' + radiobox.id + '">',
                        '<label class="radio-box circle"><input type="radio" name="' + radiobox.name + '" id="' + radiobox.id + '_' + d.getTime() + '" class="" data-options="{iconFont:\"glyphicon glyphicon-ok\"" /></label>',
                        '<label for="' + radiobox.id + '_' + d.getTime() + '" class=""></label>',
                            '</div>'
                        ].join(''));
                        if (radioboxOptions.iconFont)
                            radioboxTemplate.find('input[type=radio]').data('options', radioboxOptions);
                        radioboxTemplate.on('click', function (e) { e.stopPropagation(); });
                        radioboxTemplate.find('input[type=radio]').radiobox();
                        $td.html(radioboxTemplate);
                    }
                        break;
                    case 'checkbox': {
                        var checkboxOptions = evil($(col).data('options'));//eval('(' + $(col).data('options') + ')');
                        //console.log(dataoptions);
                        var checkbok = {
                            type: $(col).data('type'),
                            id: $(col).data('field'),
                            checked: Boolean(row[$(col).data('field')])
                        };
                        var checkbokTemplate = $(['<div class="checkbox-item ' + checkbok.id + '">',
                        '<label class="check-box rectangle"><input type="checkbox" id="' + checkbok.id + '_' + d.getTime() + '" class="" data-options="{iconFont:\"glyphicon glyphicon-ok\"" /></label>',
                        '<label for="' + checkbok.id + '_' + d.getTime() + '" class=""></label>',
                            '</div>'
                        ].join(''));
                        if (checkboxOptions.iconFont)
                            checkbokTemplate.find('input[type=checkbox]').data('options', checkboxOptions);
                        checkbokTemplate.on('click', function (e) { e.stopPropagation(); });
                        checkbokTemplate.find('input[type=checkbox]').checkbok();
                        $td.html(checkbokTemplate);
                    }
                        break;
                    case 'control': {
                        var callback = window[$(col).data('control')];
                        if ($.isFunction(callback)) {
                            var ctrl = callback();
                            $td.html(ctrl);
                        }
                    }
                        break;
                    default:
                        var text = row[$(col).data('field')];
                        $td.html(text);
                }
                $td.appendTo($tr);
            });
            $tr.appendTo($tbody);
            rowscount = rowscount + 1;
            $tbody.data('rows-count', rowscount);
            //console.log(rowscount);
        });
    };

    Table.prototype.initFooter = function () {
        var that = this;
        var $element = $(this.element);
        var $tfoot = $element.children('tfoot');
    };

    Table.prototype.append = function (_relatedTarget) {
        var that = this;

        that.initBody();
        that.initFooter();
    };

    // TABLE PLUGIN DEFINITION
    // =========================

    function Plugin(options, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.table');
            var optionset = $.extend({}, Table.prototype.defaults, $this.data(), typeof options === 'object' && options);

            if (!data && /destroy|hide/.test(optionset)) return;
            if (!data) $this.data('bs.table', (data = new Table(this, optionset)));

            if (typeof options === 'string') data[options](_relatedTarget);
            else if (optionset.append) data.append(_relatedTarget);
            else data.append(_relatedTarget);
        });
    }

    var old = $.fn.table;

    $.fn.table = Plugin;
    $.fn.table.Constructor = Table;


    // TABLE NO CONFLICT
    // ===================

    $.fn.table.noConflict = function () {
        $.fn.table = old;
        return this;
    };

}));
