﻿define(function (require, exports, module) {

    var $ = require('$'),
        util = require('util'),
        ua = navigator.userAgent,
        ios = util.ios,
        isAndroid = util.android,
        slice = Array.prototype.slice,
        blankFn = function () { },
        $win = $(window),
        baseUrl = $('meta[name="api-base-url"]').attr('content'),
        hybridFunctions = {};

    window.hybridFunctions = hybridFunctions;

    window.trigger = function () {
        $.fn.trigger.apply($win, arguments);
    };

    window.callJS = function (data) {
        $win.trigger(data.method, data.params);
    }

    var queue = [],
        guid = 0,
        hybrid = function (method, params, hybridCallback) {
            var data, hybridReturn;

            if (typeof method == 'object') {
                hybridCallback = data.callback;

            } else {
                if (typeof params === "function") hybridCallback = params, params = null;
                data = {
                    method: method,
                    params: params
                }
            }

            if (typeof hybridCallback == "function") {
                hybridReturn = "hybridCallback" + (++guid);

                data.callback = hybridReturn;
                hybridFunctions[hybridReturn] = function () {
                    hybridCallback.apply(null, arguments);
                    delete hybridFunctions[hybridReturn];
                };
            }

            if (ios) {
                alert('slapp://' + JSON.stringify(data));

            } else if (isAndroid) {
                prompt(JSON.stringify(data));
            }
        },
        bridge = {
            isInApp: /SLApp/.test(ua),
            isAndroid: isAndroid,
            android: isAndroid,
            ios: ios,
            versionName: isAndroid ? '1.0' : "1.0",
            exec: hybrid,
            tip: function (msg) {
                hybrid('tip', msg + "");
            },
            openInApp: function (url) {
                hybrid('openInApp', url + '');
            },
            open: function (url) {
                hybrid('open', url + '');
            },
            pickImage: function (f) {
                hybrid('pickImage', f);
            },
            takePhoto: function (f) {
                setTimeout(function () {
                    hybrid('takePhoto', f);
                }, 0);
            },
            queryThumbnailList: function (f) {
                hybrid('queryThumbnailList', f);
            },
            pickColor: function (f) {
                hybrid('pickColor', f);
            },
            getDeviceToken: function (f) {
                hybrid('getDeviceToken', f);
            },
            pay: function (data, f) {
                hybrid('pay', data, f);
            },
            share: function () {
                hybrid('share');
            },
            isDevelopment: navigator.platform == "Win32" || navigator.platform == "Win64",
            url: function (url) {
                return /^http\:\/\//.test(url) ? url : (baseUrl + url);
            },
            post: function (url, data, files, callback) {
                callback = typeof files === 'function' ? files : callback;
                files = typeof files === 'function' ? null : files;

                hybrid('post', {
                    url: this.url(url),
                    files: files,
                    data: data
                }, callback);
            },
            exit: function () {
                hybrid('exit');
            },
            update: function (downloadUrl, versionName, f) {
                hybrid('updateApp', {
                    downloadUrl: downloadUrl,
                    versionName: versionName
                }, f);
            }
        };

    bridge.hasStatusBar = bridge.isInApp && util.ios && util.osVersion >= 7;

    return bridge;
});
