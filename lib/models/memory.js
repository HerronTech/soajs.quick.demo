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
	"findEntry": function (soajs, cb) {
		var id = soajs.inputmaskData.id;
		if (data.length === 0) {
			return cb(new Error("data array is empty!"));
		}
		async.each(data, function(user, callback){
			if(user.id === id ){
				return cb(null, user);
			}
			callback(null, null);
		}, cb);
	},

	"findEntries": function (soajs, cb) {
		if (data.length === 0) {
			return cb(new Error("data array is empty!"));
		}
		async.each(data, function(user, callback){
			if(user.id === id ){
				return callback(null, user);
			}
		}, function (err, users) {
			if(err){
				console.log("No id found for a user");
			} else if(users){
				return cb(null, users);
			}
			cb(null, null);
		});
	}
};