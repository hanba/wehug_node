﻿define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../widget/loading');
    var model = require('../core/model');
    var Promise = require('../core/promise');
    var Scroll = require('../widget/scroll');
    var animation = require('animation');


    return Activity.extend({
        events: {
            'tap .js_submit:not(.disabled)': function (e) {
                if (!this.user) {
                    this.forward('/login?success=' + this.route.url + "&from=" + this.route.url);
                } else {
                    this.$submit.addClass('disabled');
                    this.submit.setParam({
                        UserID: this.user.ID,
                        Auth: this.user.Auth

                    }).load();
                }
            },
            'tap .js_comment': function () {
                this.forward('/actcomment/' + this.route.data.id);
            }
        },

        onCreate: function () {
            var self = this;

            this.promise = new Promise();
            this.$main = this.$('.main');

            Scroll.bind(this.$main);

            model.Filter.precent = function (score) {
                return parseFloat(score) + '%'
            }

            this.model = new model.ViewModel(this.$el, {
                title: '活动详情',
                back: this.route.queries.from || '/'
            });

            this.loading = new Loading({
                url: '/api/activity/get',
                params: {
                    id: this.route.data.id
                },
                check: false,
                checkData: false,
                $el: this.$el,
                $content: this.$main.children(":first-child"),
                $scroll: this.$main,
                success: function (res) {

                    self.promise.then(function () {
                        self.model.set(res);
                    });
                    localStorage.setItem('destination', JSON.stringify(res.data));
                }
            });

            this.loading.load();

            this.$submit = this.$el.find('.js_submit');

            this.submit = new Loading({
                url: '/api/activity/signup',
                params: {
                    id: this.route.data.id
                },
                check: false,
                checkData: false,
                $el: this.$el,
                success: function (res) {
                    if (res.success) {
                        sl.tip('报名成功！')
                        self.model.set('data.SignUpQty', self.model.data.data.SignUpQty + 1);
                    } else {
                        sl.tip(res.msg);
                    }
                    self.$submit.removeClass('disabled');
                }
            });

            this.comments = new Loading({
                url: '/api/activity/comment_list',
                $el: self.$('.quan_list'),
                success: function (res) {
                    self.model.set("comments", res.data);
                },
                append: function (res) {
                    self.model.get('comments').append(res.data);
                }
            });

            this.comments.load();

            self.onResult('actcomment_success', function () {
                self.comments.reload();
            });
        },

        onLoad: function () {
            this.promise.resolve();
        },

        onShow: function () {
            this.user = util.store('user');
        },

        onDestory: function () {
        }
    });
});