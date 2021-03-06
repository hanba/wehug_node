﻿define(function (require, exports, module) {
    var $ = require('$');
    var util = require('util');
    var menu = require('./menu.tpl');
    var model = require('core/model');

    module.exports = exports = function () {
        this.$el = $(menu.html());
        this.model = new model.ViewModel(this.$el, {
            area: util.store('global_area') || 1,
            data: [{
                url: '/recommend_list',
                title: '推荐管理',
                children: [{
                    title: '添加推荐',
                    url: '/add_recommend'
                }, {
                    title: '评论管理',
                    url: '/recommend_comments'
                }]
            }, {
                url: '/',
                title: '目的地管理',
                children: [{
                    title: '添加目的地',
                    url: '/add_destination'
                }, {
                    title: '评论管理',
                    url: '/destination_comments'
                }]
            }, {
                url: '/activity_list',
                title: '活动管理',
                children: [{
                    title: '添加活动',
                    url: '/add_activity'
                }, {
                    title: '评论管理',
                    url: '/activity_comments'
                }]
            }, {
                id: 'user',
                url: '/user',
                title: '用户管理'
            }, {
                url: '/quan_list',
                title: '驴友圈管理'
            }/*, {
                url: '/article_list',
                title: '文案管理',
                children: [{
                    title: '添加文案',
                    url: '/add_article'
                }]
            }*/]
        });

        this.model.on('change:area', function (e, val) {
            util.store('global_area', val);

            location.reload();
        });
    };

    var cache = null;

    exports.get = function (id) {
        !cache && (cache = new exports());

        cache.current && cache.current.set({
            current: false
        });

        for (var i = 0, item; i < cache.model.data.data.length; i++) {
            item = cache.model.data.data[i];
            var children = item.children;

            if (item.url == id || item.id == id) {
                cache.current = cache.model.get('data').get(i).set({
                    current: true
                });
                break;

            } else if (children) {
                for (var j = 0; j < children.length; j++) {
                    if (children[j].url == id || children[j].id == id) {
                        cache.current = cache.model.get('data.' + i + '.children.' + j).set({
                            current: true
                        });
                        break;
                    }
                }
            }
        }
        cache.$el.show();
        return cache;
    }
});

