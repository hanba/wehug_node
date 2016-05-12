define(function (require, exports) {

    var $ = require('$'),
        util = require('util'),
        Promise = require('core/promise');

    var $el = $('<div class="tip" style="display:none"></div>')
        .on($.fx.transitionEnd, function () {
            if ($el.hasClass('tip-hide')) {
                $el.hide();
            }
        })
        .appendTo(document.body),
        timer;

    exports.promise = Promise.resolve();

    exports.msec = 2000;

    exports.show = function () {
        if (!$el.hasClass('tip-show'))
            $el.removeClass('tip-hide').show().addClass('tip-show');
    }



    exports.msg = function (msg,callback) {
        var self = this;

        self.promise.then(function () {
            $el.html(msg);
            self.show();

            setTimeout(function () {

                self.hide();

                self.promise.resolve();
                // console.log(callback);
                // console.log(typeof callback);
                if(typeof callback=='function'){
                    console.log(111);
                    self.callback(callback);
                    
                }
                
            }, self.msec);



            return this;
        })
    }

    exports.hide = function () {
        $el.removeClass('tip-show').addClass('tip-hide');
    }

exports.callback=function (callback) {
    return this.callback();
}


    sl.tip = function (msg,callback) {
        exports.msg(msg,callback);
        
    };
});