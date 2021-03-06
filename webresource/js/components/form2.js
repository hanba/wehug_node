﻿define(function(require, exports, module) {
    var $ = require('$');
    var form = require('./form2.html');
    var util = require('util');
    var Validator = require('./validator');
    var model = require('core/model2');
    var Promise = require('core/promise');
    var TimePicker = require('./timepicker');

    var valid_keys = ["stringifyData", 'emptyAble', 'emptyText', 'regex', 'regexText', 'compare', 'compareText', 'validate', 'validateText', 'success', 'msg'];
    var guid = 0;

    module.exports = exports = function(options) {
        var self = this,
            option,
            fields;

        var items = {};
        var data = {};
        this.hiddens = [];
        this.fields = [];
        this.plugins = [];
        this.compo = {};

        var validator = {};
        for (var key in options) {
            option = options[key];

            if (key == 'fields') {
                for (var i = 0, len = option.length; i < len; i++) {
                    fields = option[i];
                    if (fields.type === 'hidden') {
                        items[fields.field] = fields;
                        data[fields.field] = fields.value;

                        this.hiddens.push(fields);
                    } else {
                        if (!fields.length) fields = [fields];
                        this.fields.push(fields);

                        for (var j = 0, length = fields.length; j < length; j++) {
                            var field = fields[j];
                            var valid = util.pick(field, valid_keys);

                            items[field.field] = field;
                            data[field.field] = field.value;

                            if (!util.isEmptyObject(valid)) {
                                validator[field.field] = valid;
                            }
                        }
                    }

                }

            } else
                this[key] = option;
        }

        this.$el = $(this.template.html(this));
        this.el = this.$el[0];

        this.model = new model.ViewModel(this.$el, {
            fields: items,
            data: data
        });

        this.valid = new Validator(validator, this.model.data.data);

        this.$el.on('blur', '[name]', $.proxy(this._validInput, this))
            .on('focus', '[name]', function(e) {
                var $target = $(e.currentTarget);
                var name = $target.attr('name');
                var valid = validator[name];

                valid && valid.msg && self.model.set('result.' + name, {
                    success: -1,
                    msg: valid.msg
                });

            })

        for (var i = 0, len = this.plugins.length; i < len; i++) {
            var plugin = this.plugins[i];
            var $hidden = this.$el.find('[name="' + plugin.field + '"]');
            var compo = this.compo[plugin.field] = plugin.render ? plugin.render.call(this, $hidden, plugin) : new (exports.require(plugin.type))($hidden, plugin);
            var value = this.model.data.data[plugin.field];

            if (value !== undefined && value !== null)
                compo.val(value);

            this.model.on('change:data/' + plugin.field, (function(compo, plugin) {
                return function(e, value) {
                    compo.val(value.data[plugin.field]);
                }
            })(compo, plugin))
        }
    };

    exports.prototype = {
        model: null,
        name: 'form',
        template: form,
        useIframe: false,
        url: '',
        enctype: '',
        method: "post",
        fields: [],

        set: function(arg0, arg1, arg2) {
            this.model.getModel('data').set(arg0, arg1, arg2);

            console.log(this.model.data.data);

            return this;
        },

        get: function(key) {
            return this.model.getModel('data').get(key);
        },

        reset: function() {
            for (var key in this.compo) {
                this.compo[key].val('');
            }
            this.model.getModel("data").reset();

            return this;
        },

        submit: function(success, error) {
            var self = this;

            this.$el.find('select').each(function() {
                if (this.selectedIndex == -1) {
                    this.selectedIndex = 0;
                }
                self.set(this.name, this.value);
            });

            var res = this.validate();

            if (res.success) {

                if (this.useIframe || this.$el.has('[type="file"]').length) {
                    guid++;
                    var target = "_submit_iframe" + guid;
                    var resultText;
                    var $iframe = $('<iframe style="top:-999px;left:-999px;position:absolute;display:none;" frameborder="0" width="0" height="0" name="' + target + '"></iframe>')
                        .appendTo(document.body)
                        .on('load', function() {
                            var result = $.trim((this.contentWindow.document.body.innerHTML));
                            if (!resultText || result != resultText) {
                                resultText = result;
                                try {
                                    success.call(self, JSON.parse(resultText));
                                } catch (e) {
                                    error && error.call(self, e, resultText);
                                }
                            }
                        });

                    this.$el.attr("target", target).submit();

                } else {
                    $.ajax({
                        url: this.url,
                        type: 'POST',
                        dataType: 'json',
                        xhrFields: this.xhrFields,
                        contentType: this.stringifyData ? "application/json" : undefined,
                        data: this.stringifyData ? JSON.stringify(this.model.data.data) : this.$el.serialize(),
                        success: $.proxy(success, this),
                        error: error && $.proxy(error, this)
                    });
                }
            } else {
                sl.tip("请检查填写是否有误");
            }
        },

        validate: function() {
            var res = this.valid.validate();
            this.model.set(res);

            return res;
        },

        _validInput: function(e) {
            var $target = $(e.currentTarget);
            var name = $target.attr('name');
            var res = this.valid.validate(name);

            if (!this.model.data.result) this.model.set({ result: {} });

            this.model.set('result.' + name, res);
        },

        destory: function() {
            this.$el.on('off', '[name]', this._validInput);
        }
    };

    var plugins = {};
    exports.define = function(id, Func) {
        plugins[id.toLowerCase()] = Func;
    };

    exports.require = function(id) {
        return plugins[id.toLowerCase()];
    };

    var RichTextBox = function($input, options) {
        var self = this;
        self.$input = $input;
        self.id = 'UMEditor' + (RichTextBox.guid++);

        var $script = $('<script type="text/plain" id="' + self.id + '" style="width:' + (options.width || 640) + 'px;height:300px;"></script>').insertBefore($input);

        window.UMEDITOR_HOME_URL = seajs.resolve('components/umeditor/');
        self.promise = Promise();

        (function(fn) {
            window.jQuery ? fn() : seajs.use(['components/umeditor/third-party/jquery.min'], fn);

        })(function() {
            seajs.use(['components/umeditor/umeditor.config', 'components/umeditor/umeditor', 'components/umeditor/themes/default/css/umeditor.css'], function(a) {
                var editorOptions = {};
                if (options.toolbar) editorOptions.toolbar = options.toolbar;
                else if (options.simple) editorOptions.toolbar = ['source | undo redo | bold italic underline strikethrough | removeformat | justifyleft justifycenter justifyright justifyjustify | link unlink | image'];

                var editor = UM.getEditor(self.id, editorOptions);
                editor.addListener('blur', function() {
                    var content = editor.getContent();
                    var original = $input[0].value;

                    $input.val(content);
                    if (original !== content) $input.trigger('change');
                    $input.trigger('blur');
                });

                self.editor = editor;
                editor.ready(function() {
                    self.promise.resolve();
                });
            });
        });
    };

    RichTextBox.prototype = {
        val: function(val) {
            var self = this;
            self.promise.then(function() {
                self.editor.setContent(val, false);
            });
            self.$input.val(val).trigger('change');
        }
    }

    RichTextBox.guid = 0;

    exports.define('RichTextBox', RichTextBox);
    exports.define('TimePicker', TimePicker);

    var CheckBoxList = function($input, options) {
        var self = this;
        self.$input = $input;
        self.options = options;

        options.options.forEach(function(item) {
            $('<input pname="' + options.field + '" type="checkbox" value="' + item.value + '" /><span style="margin-right: 10px">' + item.text + '</span>').insertBefore($input);
        })

        self.$checkBoxList = self.$input.siblings('[pname="' + self.options.field + '"]');

        self.$checkBoxList.on('click', function() {
            var res = [];
            self.$checkBoxList.each(function() {
                if (this.checked) {
                    res.push(this.value);
                }
            });
            var original = $input[0].value;
            var content = res.join('|');

            $input.val(content);
            if (original !== content) $input.trigger('change');
            $input.trigger('blur');
        });

        console.log(options)
    }
    CheckBoxList.prototype = {
        val: function(val) {
            var self = this;

            self.$input.siblings('[pname="' + self.options.field + '"]').removeAttr('checked').each(function() {
                this.checked = false;

            }).filter((val || 'null').split('|').map(function(item) {
                return '[value="' + item + '"]';

            }).join(',')).attr('checked', 'checked').each(function() {
                this.checked = true;
            });

            self.$input.val(val).trigger('change');
        }
    }
    exports.define('CheckBoxList', CheckBoxList);

});
