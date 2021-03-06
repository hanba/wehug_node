define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../widget/loading');
    var model = require('../core/model');
    var Scroll = require('../widget/scroll');
    var animation = require('animation');


    return Activity.extend({
        events: {
            'tap .myactivity > li[data-id]': function (e) {
                var $target = $(e.currentTarget);
                this.forward('/activity/' + $target.data('id') + "?from=" + this.route.url);
            }
        },
        swipeRightBackAction: '/',

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main);

            this.model = new model.ViewModel(this.$el, {
                back: '/',
                title: '我的活动'
            });

            var loading = new Loading({
                url: "/api/user/activity_list",
                $el: this.$el,
                success: function (res) {

                    self.model.set("data", res.data);
                },
                append: function (res) {
                    self.model.get('data').append(res.data);
                }
            });
            self.user = util.store('user');
            if (self.user) {
                loading.setParam({
                    UserID: self.user.ID,
                    Auth: self.user.Auth

                }).load();
            }
        },

        onShow: function () {
            var self = this;

            self.user = util.store('user');

            if (!self.user) {
                self.forward('/login?success=' + this.route.url + "&from=" + this.route.url);
            }
        },

        onDestory: function () {
        }
    });
});
