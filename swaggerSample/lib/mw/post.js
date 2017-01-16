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
var postUser = {
	"post": function (req, res) {
		var id = req.soajs.inputmaskData.items[0].userId;
		var pId = req.soajs.inputmaskData.items[0].productId;
		var price = req.soajs.inputmaskData.items[0].price;
		var currency = req.soajs.inputmaskData.items[0].currency;
		var quantity = req.soajs.inputmaskData.items[0].quantity;
		if (id > 0 && id < 10) {
			checkIfMongo(req.soajs);
			mongo.insert(collName, {
				"items": [{
					"userId": id,
					"productId": pId,
					"price": price,
					"currency": currency,
					"quantity": quantity
				}]
			}, function (err) {
				if(err){
					return res.soajs.returnAPIResponse(req, res, {code: 401, error: req.soajs.config.errors[401]});
				}
				return res.soajs.returnAPIResponse(req, res, {data: true});
			});
		}
	}
};
module.exports = postUser;