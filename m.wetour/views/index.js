﻿define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../widget/loading');
    var Slider = require('../widget/slider');
    var model = require('../core/model');
    var Scroll = require('../widget/scroll');
    var animation = require('animation');
    var bridge = require('bridge');

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

                    this.$el.find('.head_city').css({
                        display: index == 3 ? 'none' : 'block'
                    })

                    if (!this.loading[index].isDataLoaded) {
                        this.loading[index].load();
                    }
                }
            },
            'tap .quanli_up': function (e) {
                var $target = $(e.currentTarget);
                var $el = $target.closest('[data-id]');
                var id = $el.data('id');
                var user;

                if (user = util.store('user')) {
                    var quan_up = util.store('quan_up') || [];
                    var isUp;

                    if (quan_up.indexOf(id) == -1) {
                        isUp = true;
                        $target.html(parseInt($target.html()) + 1);
                        quan_up.push(id);
                    } else {
                        isUp = false;
                        $target.html(Math.max(parseInt($target.html()) - 1, 0));
                        quan_up.splice(quan_up.indexOf(id), 1);
                    }
                    $.post(bridge.url('/api/user/update'), {
                        UserID: user.ID,
                        Auth: user.Auth,
                        Favorite: user.Favorite,
                        FavoriteID: id,
                        FavoriteType: 'quan',
                        IsFavorite: isUp
                    });
                    util.store('quan_up', quan_up);

                } else {
                    sl.tip('请先登录');
                }
            },
            'tap .quanli_reply': function (e) {
                var $target = $(e.currentTarget);
                var $el = $target.closest('[data-id]');
                var id = $el.data('id');

                util.store('replyAt', '@' + $el.data('at'));

                this.forward('/reply/' + id);
            },
            'tap .citylistwrap': function (e) {
                if ($(e.target).hasClass("citylistwrap")) {
                    this.$citylist.removeClass("show");
                    this.$('.head_city').removeClass('select_city');
                    this.$('.head_menu').css({ visibility: '' });
                }
            },
            'tap .head_city': function (e) {
                var $target = $(e.currentTarget).toggleClass("select_city");
                if ($target.hasClass('select_city')) {
                    this.$citylist.show()[0].clientHeight;
                    this.$citylist.addClass("show");
                    this.$('.head_menu').css({ visibility: 'hidden' });
                } else {
                    this.$citylist.removeClass("show");
                    this.$('.head_menu').css({ visibility: '' });
                }
            },
            'tap .city_list li[data-id]': function (e) {
                var $target = $(e.currentTarget);
                var id = $target.data('id');
                util.store('global_area', id);

                this.$('.citylistwrap').trigger('tap');

                this.setResult('global_area_change', id);
            },
            'tap .js_picviewer': function (e) {
                $(e.currentTarget).hide();
            }
        },

        swipeRightForwardAction: '/menu',

        className: 'home',
        titles: ['来次go', '目的地', '活动', '驴友圈'],

        onCreate: function () {
            var self = this;
            var areaId = util.store('global_area');
            var city_list = [{
                city_id: 1,
                city_name: '北京',
                code: '101010100'
            }, {
                city_id: 2,
                city_name: '厦门',
                code: '101230201'
            }, {
                city_id: 3,
                city_name: '江门',
                code: '101281101'
            }];

            self.picView = new Slider(this.$('.js_picviewer'), {
                itemTemplate: '<img src="<%=Src%>">',
                data: []
            });

            var city = util.first(city_list, function (item) {
                return item.city_id == areaId
            });
            this.model = new model.ViewModel(this.$el, {
                menu: 'head_menu',
                titleClass: 'head_title',
                title: '来次go',
                city: city.city_name,
                city_list: city_list,
                showPic: function (e, pictures, index) {
                    self.$('.js_picviewer').show();
                    self.picView.set(pictures.data);
                    self.picView.index(index);
                }
            });

            self.getWeather(city.code);

            this.$citylist = this.$('.citylistwrap');
            this.listenTo(this.$citylist, $.fx.transitionEnd, function () {
                if (!this.$citylist.hasClass('show')) {
                    this.$citylist.hide();
                }
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

            ['/api/recommend/list', '/api/destination/list?getall=1', '/api/activity/list', '/api/quan/list'].forEach(function (url, index) {
                var loading = new Loading({
                    url: url,
                    params: {
                        areaid: areaId
                    },
                    $el: $main.eq(index),
                    $content: $main.eq(index).children(":first-child"),
                    $scroll: $main.eq(index),
                    checkData: false,
                    success: function (res) {
                        this.isDataLoaded = true;

                        self.model.set("data" + index, res.data);

                        if (!res.data) {
                            this.showError('暂无数据');
                        }
                    },
                    append: (index == 1) ? null : function (res) {
                        self.model.get('data' + index).append(res.data);
                    }
                });

                self.loading.push(loading);
            });

            this.loading[0].load();

            self.onResult('comment_success', function () {
                self.loading[3].reload();
            });

            self.onResult('global_area_change', function (e, id) {
                var city = util.first(city_list, function (item) {
                    return item.city_id == id
                });
                self.model.set('city', city.city_name);

                self.loading.forEach(function (item) {
                    item.setParam({
                        areaid: id
                    }).reload();
                })

                self.getWeather(city.code);
            });
        },

        getWeather: function (code) {
            var self = this;
            $.get((sl.isDebug ? '' : 'http://m.weather.com.cn') + '/mweather/' + code + '.shtml', function (res) {
                var match = res.match(/<table width="98%" border="0">\s*<tr>\s*<td width="20%"><img src="(.+?)" width="70" alt=".*?"><\/td>\s*<td width="50%" class="wd">(.+?)<\/td>/m);

                if (match) {
                    self.model.set('weather', ' <img src="' + match[1] + '" style=" width: 30px; height: 30px; background: none; vertical-align: -10px;"/> ' + match[2] + '');
                }
            })
        },

        onShow: function () {
            var self = this;

            self.user = util.store('user');
        },

        onDestory: function () {
        }
    });
});
