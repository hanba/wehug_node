﻿define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../widget/loading');
    var Slider = require('../widget/slider');
    var model = require('../core/model');
    var Scroll = require('../widget/scroll');
    var animation = require('animation');

    return Activity.extend({
        events: {
            'tap': function (e) {
                if (e.target == this.el) {
                    this.back('/')
                }
            },
            'tap .head_menu': function (e) {
                this.forward('/menu');
            },
            'tap .js_comment_list [data-id]': function (e) {
                var $target = $(e.currentTarget);

                this.forward(($target.data('type') == 1 ? "/activity/" : "/destination/") + $target.data('id'))
            },
            'tap .js_comment': function (e) {
                if (!this.user) {
                    this.forward('/login');
                } else {
                    this.forward('/comment');
                }
            },
            'tap .footer li': function (e) {
                var $target = $(e.currentTarget);
                if (!$target.hasClass('curr')) {
                    var index = $target.index();
                    $target.addClass('curr').siblings('.curr').removeClass('curr');
                    this.$main.eq(index).show().siblings('.main').hide();
                    this.model.set("title", this.titles[index]);

                    this.$el.find('.js_comment').css({
                        display: index == 3 ? 'block' : 'none'
                    })

                    if (!this.loading[index].isDataLoaded) {
                        this.loading[index].load();
                    }
                }
            },
            'tap .quanli_reply': function (e) {
                var $target = $(e.currentTarget);
                var $el = $target.closest('[data-id]');
                var id = $el.data('id');

                util.store('replyAt', '@' + $el.data('at'));

                this.forward('/reply/' + id);
            }
        },

        swipeRightForwardAction: '/menu',

        className: 'home',
        titles: ['福州', '目的地', '活动', '驴友圈'],

        onCreate: function () {
            var self = this;

            this.model = new model.ViewModel(this.$el, {
                menu: 'head_menu',
                titleClass: 'head_title',
                title: '福州'
            });

            var $main = this.$main = this.$('.main');

            Scroll.bind($main, {
                refresh: function (resolve, reject) {
                    var index = this.parentNode.getAttribute('data-index');

                    if (index == 1) {
                        resolve();
                    } else {
                        self.loading[index].reload({
                            showLoading: false
                        }, function (err, data) {
                            if (err) reject(err)
                            else resolve(data);
                        });
                    }
                }
            });

            this.loading = [];

            ['/api/activity/recommend', '/api/destination/list?getall=1', '/api/activity/list', '/api/quan/list'].forEach(function (url, index) {
                var loading = new Loading({
                    url: url,
                    $el: $main.eq(index),
                    $content: $main.eq(index).children(":first-child"),
                    $scroll: $main.eq(index),
                    success: function (res) {
                        this.isDataLoaded = true;

                        if (index == 1) {
                            self.slider = new Slider(this.$content, {
                                arrow: true,
                                itemTemplate: '<a href="/destination/<%=ID%>" forward><img src="<%=LargePic%>"></a>',
                                data: res.data
                            })
                        } else {
                            self.model.set("data" + index, res.data);
                        }
                    },
                    append: function (res) {
                        self.model.get('data' + index).append(res.data);
                    }
                });

                self.loading.push(loading);
            });

            this.loading[0].load();

            self.onResult('comment_success', function () {
                self.loading[3].reload();
            });
        },

        onShow: function () {
            var self = this;

            self.user = util.store('user');
        },

        onDestory: function () {
        }
    });
});
