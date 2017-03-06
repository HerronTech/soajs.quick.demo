"use strict";
var soajs = require('soajs');
var mongo = require('../models/mongo');
var config = require('../../config.js');

module.exports = {
	"middleware1": function(req, res, next){
		console.log("inside Business Logic of /user API");
		next();
	},
	"middleware2": function(req, res){
		return res.soajs.returnAPIResponse(req, res, {code: 400, error: null, data: true });
	}
};