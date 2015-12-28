var VERSION = "0.1",
	request = require("request"),
	keys = require("./keys"),
	_ = require("underscore");

function Douban(options) {
	var defaults = {
		
	}
	
	this.options = _.extend({}, defaults, options, keys.urls);
}
Douban.VERSION = VERSION;
module.exports = Douban;

/**
 * GET
 */
Douban.prototype.get = function (url, params, callback) {
	if (typeof params === 'function') {
		callback = params;
		params = null;
	}

	if (typeof callback !== 'function') {
		throw new Error('FAIL: INVALID CALLBACK.');
		return this;
	}

	if (url.charAt(0) == '/') {
		url = this.options.book_basic_url + url;
	}
	
	var request = require("request");
	request.get(url, params, function(error, response, body) {
		console.log(body);
		console.log(error);
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			console.log(info.stargazers_count + " Stars");
    		console.log(info.forks_count + " Forks");
			
			callback(null, info);
		} else {
			callback(error);
		}
	});
	return this;
}

/**
 * Search book
 */
Douban.prototype.search = function (params, callback) {
	if (typeof params === 'function') {
		callback = params;
		params = {};
	}

	if (typeof callback !== 'function') {
		throw new Error('FAIL: INVALID CALLBACK.');
		return this;
	}
	
	// validate params
	if (!params.q && !params.tag) {
		throw new Error("FAIL: Q OR TAG Required.");
		return this;
	}
	
	var url = this.options.book_basic_r_search_base;
	this.get(url, params, callback);
	return this;
}