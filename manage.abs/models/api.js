var Http = require('core/http');

var API = Http.extend({
	baseUri: $('meta[name="api-base-url"]').attr('content'),
	xhrFields: {
		withCredentials: true
	}
});
exports.API = API;