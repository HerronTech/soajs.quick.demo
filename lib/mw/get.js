'use strict';
var soajs = require('soajs');
var Mongo = soajs.mongo;
var mongo;
var dbName = "swaggerSampleDB";
var collName = "swaggerTestDB";

function checkIfMongo(soajs) {
	if (!mongo) {
		mongo = new Mongo(soajs.registry.coreDB[dbName]);
	}
}

function validateId(id, cb) {
	try {
		return cb(null, mongo.ObjectId(id));
	}
	catch (e) {
		return cb(e);
	}
}
var getUser = {
	"get": function (req, res) {
			checkIfMongo(req.soajs);
			mongo.find(collName, {}, function(err,data){
				if(err) {
					return "no record found";
				}
				return res.soajs.returnAPIResponse(req, res, {data: data});
			});
		}
};
module.exports = getUser;