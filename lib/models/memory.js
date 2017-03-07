'use strict';
var _ = require("lodash");
var async = require("async");
var data = [];

module.exports = {
	/**
	 * function that finds an entry in the memory by id
	 * @param soajs
	 * @param cb
	 * @returns {*}
	 */
	"findEntry": function (soajs, opts, cb) {
		var response = _.filter(data, opts.condition || {});
		return cb(null, response[0]);
	},

	"findEntries": function (soajs, opts, cb) {
		var response = _.filter(data, opts.condition || {});
		return cb(null, response);
	},

	"deleteEntries": function (soajs, opts, cb) {
		data = _.reject(data, opts.condition || "");
		return cb(null, true);
	}
};