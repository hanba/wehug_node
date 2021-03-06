﻿var $ = require('$'),
    util = require('util'),
    Event = require('./event'),
    slice = Array.prototype.slice;

var Component = function (options) {
    var self = this;

    self.options = $.extend({}, self.options, options);
    if (self.options.className) self.className = self.options.className;
    if (self.options.el) self.el = self.options.el;
    self.cid = util.guid();

    self.setElement(self.el);

    self.onDestroy && self.on('Destroy', self.onDestroy);
};

Component.prototype = $.extend({}, Event, {
    options: {},

    setElement: function (element, delegate) {
        if (element) {
            if (this.$el) this.undelegateEvents();
            this.$el = $(element);
            this.el = this.$el[0];
            if (this.className) this.$el.addClass(this.className);
            if (delegate !== false) this.delegateEvents();
        }
        return this;
    },

    undelegateEvents: function () {
        this.$el.off('.delegateEvents' + this.cid);
        return this;
    },

    delegateEvents: function () {
        this.listen(this.events);
        this.listen(this.options.events);
        return this;
    },

    listen: function (events, fn) {
        var self = this;

        if (!fn) {
            for (var k in events) {
                self.listen(k, events[k]);
            }
        } else {
            var els = events.split(' '),
                event = els.shift().replace(/,/g, '.delegateEvents' + self.cid + ' ');

            fn = $.proxy($.isFunction(fn) ? fn : self[fn], self);

            if (els.length > 0 && els[0] !== '') {
                self.$el.on(event, els.join(' '), fn);
            } else {
                self.$el.on(event, fn);
            }
        }

        return self;
    },

    listenTo: function (target) {

        var args = slice.apply(arguments),
            fn = args[args.length - 1];

        if (typeof target.on !== 'function') target = $(target);

        args[0] = target;
        args[args.length - 1] = $.proxy(fn, this);

        (this._bindListenTo || (this._bindListenTo = [])).push(args.slice());

        args.shift().on.apply(target, args);

        return this;
    },

    $: function (selector) {
        return this.$el.filter(selector).add(this.$el.find(selector));
    },

    destroy: function () {
        var $el = this.$el,
            self = this,
            target;

        this._bindListenTo && $.each(this._bindListenTo, function (i, attrs) {
            target = attrs.shift();
            target.off.apply(target, attrs);
        });

        self.undelegateEvents();
        self.$el.remove();

        self.trigger('Destroy');
    }
});

Component.extend = util.extend;

module.exports = Component;