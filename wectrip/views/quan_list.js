﻿define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var model = require('core/model');
    var Page = require('common/page');
    var menu = require('common/menu');
    var Form = require('components/form');
    var Grid = require('components/grid');

    return Page.extend({
        events: {
            'click .js_grid_delete': function (e) {
                var id = e.currentTarget.getAttribute('data-id');
                var self = this;

                if (window.confirm('确认删除？')) {
                    $.post('/api/manage/delete_quan', {
                        id: id
                    }, function (res) {
                        if (res.success) {
                            self.grid.load()
                        } else {
                            sl.tip(res.msg)
                        }

                    }, 'json');
                }
            }
        },

        onCreate: function () {
            var self = this;

            this.model = new model.ViewModel(this.$el, {
                title: '活动管理'
            });

            this.onResult('activity_change', function () {
                this.grid.load();
            });

            this.grid = new Grid({
                search: {
                    url: '/api/quan/list',
                    type: 'GET',
                    beforeSend: function () {
                    },
                    data: {
                        keywords: {
                            label: '关键字',
                            type: 'text'
                        }
                    }
                },
                onSelectRow: function () {
                },
                pageEnabled: true,
                pageSize: 20,
                columns: [{
                    text: "编号",
                    bind: "ID",
                    width: 5
                }, {
                    text: "发布人",
                    bind: "UserName",
                    width: 10
                }, {
                    text: "发布时间",
                    bind: "InsertTime",
                    width: 17,
                    render: function (data) {
                        this.append(util.formatDate(data.InsertTime));
                    }
                }, {
                    text: "内容",
                    bind: "Content",
                    width: 10,
                    render: function (data) {
                        this.append(!data.Content || data.Content.length < 15 ? data.Content : data.Content.substr(0, 15));
                    }
                }, {
                    text: "操作",
                    width: 10,
                    align: 'center',
                    valign: 'center',
                    render: function (data) {
                        this.append('<a href="javascript:;" >[详情]</a> <a href="javascript:;" data-id="' + data.ID + '" class="js_grid_delete">[删除]</a>');
                    }
                }]

            }).search();

            this.$el.find('.toolbar').after(this.grid.$el);
        },

        onShow: function () {
            this.menu = menu.get(this.route.path);
            this.$el.before(this.menu.$el);
        },

        onDestory: function () {
        }
    });
});