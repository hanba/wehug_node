define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../widget/loading');
    var model = require('../core/model');
    var Scroll = require('../widget/scroll');
    var animation = require('animation');
    var bridge = require('bridge');

    var cardAnimation = function (items) {

        if (items.eq(0).hasClass('show') || !items.length) return;

        var count = items.length;
        var index = count - 1;
        items.parent().css({ height: 100 * count });
        items.each(function (j, item) {
            item.style.zIndex = j;
        });
        setTimeout(function () {
            var next = arguments.callee;
            var item = items.eq(index);
            item[0].clientHeight;
            item.addClass('show');

            setTimeout((function (i) {
                return function () {
                    item.animate({
                        opacity: 1,
                        translate: '0px,' + 100 * i + 'px'

                    }, i * 450, 'ease-out');

                    index--;
                    if (index >= 0) {
                        next();
                    }
                }

            })(index), 300);

        }, 200)
    };

    return Activity.extend({
        events: {

        },

        swipeRightBackAction: '/',

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main);

            model.Filter.cardClass = function (price, VCA_VCT_ID) {
                return VCA_VCT_ID == 4 ? 'free' : VCA_VCT_ID == 2 ? 'price10' : VCA_VCT_ID == 1 ? 'price50' : '';
            }

            this.model = new model.ViewModel(this.$el, {
                back: '/',
                title: '我的卡券',
                isOverdue: false,
                open: function () {
                    bridge.open(self.user.OpenUrl || 'http://m.abs.cn');
                }
            });

            self.loading = new Loading({
                url: "/api/user/voucher_list",
                params: {
                    status: 1
                },
                $el: this.$el,
                check: false,
                checkData: false,
                success: function (res) {
                    if (res.closeNumber) {
                        alert("您有" + res.closeNumber + '张优惠券马上就要过期啦，\r尽快使用哦');
                    }

                    if (!res || !res.data || res.data.length == 0) {
                        self.model.set("data", []);
                        self.model.set("data1", []);
                    }
                    else {
                        var data = util.find(res.data, function (item) {
                            return !item.IsOverdue;
                        });
                        data.sort(function (a, b) {
                            return a.CSV_END_DT > b.CSV_END_DT ? 1 : a.CSV_END_DT == b.CSV_END_DT ? 0 : -1;
                        });

                        self.model.set("data", data);

                        var data1 = util.find(res.data, function (item) {
                            return item.IsOverdue;
                        });
                        data1.sort(function (a, b) {
                            return a.CSV_END_DT > b.CSV_END_DT ? -1 : a.CSV_END_DT == b.CSV_END_DT ? 0 : 1;
                        })

                        self.model.set("data1", data1);
                        var $items = self.$('.js_not_overdue').children('li');

                        cardAnimation($items);
                    }
                }
            });

            self.model.on('change:isOverdue', function () {
                if (self.model.data.isOverdue) {
                    var $items = self.$('.js_overdue').children('li');

                    cardAnimation($items);
                }
            });

            self.user = util.store('user');
        },

        onShow: function () {
            var self = this;

            self.user = util.store('user');

            if (!self.user) {
                self.forward('/login?success=' + this.route.url + "&from=/");
            } else {

                if (!self.isLoad && (self.isLoad = true))
                    self.loading.setParam({
                        UserID: self.user.ID,
                        Auth: self.user.Auth

                    }).load();
            }
        },

        onDestory: function () {
        }
    });
});
