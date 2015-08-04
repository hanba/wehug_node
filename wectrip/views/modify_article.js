﻿define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var model = require('core/model');
    var Page = require('common/page');
    var menu = require('common/menu');
    var Form = require('components/form');

    return Page.extend({
        events: {},

        onCreate: function () {
            var self = this;

            this.model = new model.ViewModel(this.$el, {
                title: '修改活动',
                buttons: [{
                    value: '确认',
                    click: function () {
                        form.submit(function (res) {
                            if (res.success) {
                                sl.tip('修改成功');
                                self.setResult('article_change');
                                self.back('/article_list');
                                self.form.reset();

                            } else {
                                sl.tip(res.msg);
                            }
                        });
                    }
                }]
            });

            $.get('/api/article/get?id=' + this.route.data.id, function (res) {
                self.model.set(res);

            }, 'json')

            var form = new Form({
                model: this.model,
                name: 'data',
                title: 'test',
                useIframe: true,
                url: '/api/manage/modify_article',
                validator: 'userValid',
                enctype: '',
                fields: [{
                    field: 'ID',
                    type: 'hidden'
                }, {
                    label: '标题',
                    field: 'Title',
                    emptyAble: false,
                    emptyText: '必填'
                }, {
                    label: '副标题',
                    field: 'SubTitle',
                    emptyAble: false,
                    emptyText: '必填'
                }, {
                    label: '教龄',
                    field: 'TeachingAge',
                    emptyAble: false,
                    emptyText: '必填'
                }, {
                    label: '所属专题',
                    field: 'Type',
                    type: 'select',
                    options: {
                        data: [{
                            text: '钢琴',
                            value: '0'
                        }, {
                            text: '游泳',
                            value: '1'
                        }, {
                            text: '语文',
                            value: '2'
                        }]
                    }
                }, {
                    label: '好评率',
                    field: 'PraiseRate',
                    emptyAble: false,
                    emptyText: '必填'
                }, {
                    label: '关联ID',
                    field: 'RelativeID',
                    type: 'number',
                    regex: /^\d+$/,
                    regexText: '必填数字'
                }, {
                    label: '价格',
                    field: 'Price',
                    regex: /^\d+(\.\d+){0,1}$/,
                    regexText: '必填数字'
                }, {
                    label: '特价',
                    field: 'SpecialPrice',
                    regex: /^\d+(\.\d+){0,1}$/,
                    regexText: '必填数字'
                }, {
                    label: '图片',
                    field: 'Pic',
                    type: 'file'
                }, {
                    label: '图片2',
                    field: 'Pic1',
                    type: 'file'
                }, {
                    label: '排序权重',
                    field: 'Sort',
                    type: 'number',
                    emptyAble: false,
                    emptyText: '不可为空',
                    regex: /^\d+$/,
                    regexText: '必填数字'
                }, {
                    label: '正文',
                    field: 'Content',
                    vAlign: 'top',
                    type: 'textarea',
                    emptyAble: false,
                    emptyText: '不可为空'
                }, {
                    label: '文案1',
                    field: 'Content1',
                    vAlign: 'top',
                    type: 'textarea'
                }, {
                    label: '文案2',
                    field: 'Content2',
                    vAlign: 'top',
                    type: 'textarea'
                }, {
                    label: '文案3',
                    field: 'Content3',
                    vAlign: 'top',
                    type: 'textarea'
                }]
            });

            this.model.before('.action', form.$el);
        },

        onShow: function () {
            this.menu = menu.get(this.route.path);
            this.$el.before(this.menu.$el);
        },

        onDestory: function () {
        }
    });
});
