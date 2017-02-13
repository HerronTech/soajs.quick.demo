'use strict';
var soajs = require('soajs');
var mongo = require('../models/mongo.js');
var getUser = {
	"get": function (req, res) {
			mongo.findEntries(req.soajs, {}, function(err,data){
				if(err) {
					return "no record found";
				}
				return res.soajs.returnAPIResponse(req, res, {data: data});
			});
		}
};
module.exports = getUser;