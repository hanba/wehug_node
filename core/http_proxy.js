﻿var http = require('http');
var _ = require('underscore');

module.exports = function (host, port, replace) {

    return function (request, response) {
        var url = replace ? replace(request.url) : request.url;

        var options = {
            hostname: host,
            port: port,
            path: url,
            method: request.method,
            headers: _.extend({}, request.headers, { host: host })
        };

        var req = http.request(options, function (res) {
            response.set(res.headers);
            response.set('Access-Control-Allow-Credentials', true);
            response.set('Access-Control-Allow-Origin', request.headers.origin);

            res.on('data', function (chunk) {
                response.write(chunk);
            });

            res.on('end', function () {
                response.end();
            });
        });

        req.on('error', function (e) {
            response.end();
        });

        request.on('data', function (postData) {
            req.write(postData);
        });

        request.on('end', function () {
            req.end();
        });
    };
}