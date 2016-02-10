var VERSION = "0.2.1",
	querystring = require("querystring"),
	keys = require("./keys"),
	_ = require("underscore");

function Douban(options) {
	if (!(this instanceof Douban)) return new Douban(options);
	
	var defaults = {
		fields: undefined,	// will active when douban triggered get method.
		headers: {
			'Accept': '*/*',
			'Connection': 'close',
			'User-Agent': 'douban-book-client/' + VERSION
		}
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
	
	if (params && _.size(params) > 0) {
		url += "?" + querystring.stringify(params);
	}
	
	// append filter
	if (this.options.fields) {
		url += (url.indexOf("?") > -1 ? "&" : "?") + this.options.fields;
	}
	
	var getOpts = _.extend({}, this.options.headers, {
		method: "GET"
	});
	
	var request = require("request");
	request({
		url: url,
		headers: getOpts
	}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			
			callback(null, info);
		} else {
			callback(error);
		}
	});
	return this;
}

/**
 * Search book by isbn
 */
Douban.prototype.searchByIsbn = function (isbn, callback) {
	if (typeof callback !== 'function') {
		throw new Error('FAIL: INVALID CALLBACK.');
		return this;
	}
	
	if (!isbn) {
		throw new Error("FAIL: INVALID isbn");
		return this;
	}
	
	var url = this.options.book_basic_r_isbn_request_info_base + "/" + isbn;
	this.get(url, callback);
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
	
	var parameters = {start:0,count:10};	// defaults
	if (params && _.size(params) > 0) {
		if (params.q) parameters.q = params.q;
		if (params.tag) parameters.tag = params.tag;
		if (params.start) parameters.start = params.start;
		if (params.count) parameters.count = params.count; 
	}
	
	var url = this.options.book_basic_r_search_base;
	this.get(url, parameters, callback);
	return this;
}

/**
 * Get book info
 */
Douban.prototype.info = function (id, callback) {
	if (typeof callback !== 'function') {
		throw new Error('FAIL: INVALID CALLBACK.');
		return this;
	}
	
	// validate id
	if (!id) {
		throw new Error("FAIL: INVALID BOOK ID");
		return this;
	}
	
	var url = this.options.book_basic_r_request_info_base + "/" + id;
	this.get(url, callback);
	return this;
}

/**
 * Get the most marked tags of book info
 */
Douban.prototype.tags = function(id, callback) {
	if (typeof callback !== 'function') {
		throw new Error('FAIL: INVALID CALLBACK.');
		return this;
	}
	
	// validate id
	if (!id) {
		throw new Error("FAIL: INVALID BOOK ID");
		return this;
	}
	
	var url = this.options.book_basic_r_request_info_base + "/" + id + "/tags";
	this.get(url, callback);
	return this;
}

/**
 * Get the books of the series
 */
Douban.prototype.seriesBooks = function(seriesId, callback) {
	if (typeof callback !== 'function') {
		throw new Error('FAIL: INVALID CALLBACK.');
		return this;
	}
	
	// validate id
	if (!seriesId) {
		throw new Error("FAIL: INVALID SERIES ID");
		return this;
	}
	
	var url = this.options.book_basic_r_request_series_books_base + "/" + seriesId + "/books";
	this.get(url, callback);
	return this;
}