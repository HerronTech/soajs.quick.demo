'use strict';
var _ = require("lodash");
var data = [];

module.exports = {
	/**
	 * function that finds an entry in the memory by id
	 * @param soajs
	 * @param opts
	 * @param cb
	 * @returns {*}
	 */
	"findEntry": function (soajs, opts, cb) {
		var response = _.filter(data, opts.condition || {});
		return cb(null, response[0] || null);
	},
	
	/**
	 * function that finds entrys in the memory
	 * @param soajs
	 * @param opts
	 * @param cb
	 * @returns {*}
	 */
	"findEntries": function (soajs, opts, cb) {
		var response = _.filter(data, opts.condition || {});
		return cb(null, response);
	},
	
	/**
	 * function that deletes an entry from the memory by id
	 * @param soajs
	 * @param opts
	 * @param cb
	 * @returns {*}
	 */
	"deleteEntries": function (soajs, opts, cb) {
		data = _.reject(data, opts.condition || "");
		return cb(null, true);
	},
	
	/**
	 * function that pushes a new entry to the stack in memory
	 * @param soajs
	 * @param opts
	 * @param cb
	 * @returns {*}
	 */
	"insertEntries": function (soajs, opts, cb) {
		opts.records['id'] = data.length;
		data = _.concat(data, opts.records);
		return cb(null, [data]);
		
	},
	
	/**
	 * functions that updates an entry from the stack in memory based on the given id
	 * @param soajs
	 * @param opts
	 * @param cb
	 * @returns {*}
	 */
	"updateEntries": function (soajs, opts, cb) {
		for (var i = 0; i < data.length; i++) {
			if (_.isMatch(data[i], opts.condition)) {
				data[i] = opts.updatedFields;
			}
		}
		return cb(null, true);
	},
	
	"closeConnections": function(){}
};