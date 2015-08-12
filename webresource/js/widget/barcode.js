﻿define(function (require, exports, module) {

    module.exports = function (code) {

        return code.replace(/0/g, "_|_|__||_||_|")
            .replace(/1/g, "_||_|__|_|_||")
            .replace(/2/g, "_|_||__|_|_||")
            .replace(/3/g, "_||_||__|_|_|")
            .replace(/4/g, "_|_|__||_|_||")
            .replace(/5/g, "_||_|__||_|_|")
            .replace(/7/g, "_|_|__|_||_||")
            .replace(/6/g, "_|_||__||_|_|")
            .replace(/8/g, "_||_|__|_||_|")
            .replace(/9/g, "_|_||__|_||_|")
            .replace(/a/g, "_||_|_|__|_||")
            .replace(/b/g, "_|_||_|__|_||")
            .replace(/c/g, "_||_||_|__|_|")
            .replace(/d/g, "_|_|_||__|_||")
            .replace(/e/g, "_||_|_||__|_|")
            .replace(/f/g, "_|_||_||__|_|")
            .replace(/g/g, "_|_|_|__||_||")
            .replace(/h/g, "_||_|_|__||_|")
            .replace(/i/g, "_|_||_|__||_|")
            .replace(/j/g, "_|_|_||__||_|")
            .replace(/k/g, "_||_|_|_|__||")
            .replace(/l/g, "_|_||_|_|__||")
            .replace(/m/g, "_||_||_|_|__|")
            .replace(/n/g, "_|_|_||_|__||")
            .replace(/o/g, "_||_|_||_|__|")
            .replace(/p/g, "_|_||_||_|__|")
            .replace(/r/g, "_||_|_|_||__|")
            .replace(/q/g, "_|_|_|_||__||")
            .replace(/s/g, "_|_||_|_||__|")
            .replace(/t/g, "_|_|_||_||__|")
            .replace(/u/g, "_||__|_|_|_||")
            .replace(/v/g, "_|__||_|_|_||")
            .replace(/w/g, "_||__||_|_|_|")
            .replace(/x/g, "_|__|_||_|_||")
            .replace(/y/g, "_||__|_||_|_|")
            .replace(/z/g, "_|__||_||_|_|")
            .replace(/-/g, "_|__|_|_||_||")
            .replace(/\*/g, "_|__|_||_||_|")
            .replace(/\//g, "_|__|__|_|__|")
            .replace(/%/g, "_|_|__|__|__|")
            .replace(/\+/g, "_|__|_|__|__|")
            .replace(/\./g, "_||__|_|_||_|");
    }
})