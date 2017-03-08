'use strict';
var _ = require("lodash");
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
	},

	"insertEntries": function (soajs, opts, cb) {
		opts.record['id'] = data.length -1;
		data = _.concat(data, opts.record);
		return cb(null, [data]);
		
	},

	"updateEntries": function (soajs, opts, cb) {
		for(var i = 0; i< data.length; i++){
			if(_.isMatch(data[i],opts.condition)){
				data[i] = opts.updatedFields;
			}
		}
		return cb(null, true);
	}
	
};