var soajs = require("soajs");
var async = require("async");

var dbconfig = {
	"name": "core_provision",
	"prefix": "DEMO_",
	"servers": [
		{
			"host": "127.0.0.1",
			"port": 27017
		}
	],
	"credentials": null,
	"URLParam": {
		"connectTimeoutMS": 0,
		"socketTimeoutMS": 0,
		"maxPoolSize": 5,
		"wtimeoutMS": 0,
		"slaveOk": true
	},
	"extraParam": {
		"db": {
			"native_parser": true,
			"bufferMaxEntries": 0
		},
		"server": {
			"socketOptions": {
				"autoReconnect": false
			}
		}
	}
};

var mongo = new soajs.mongo(dbconfig);

function addEnvironment(cb) {
	var env = require('./provision/environment/dev.js');
	if (env._id) {
		env._id = mongo.ObjectId(env._id);
	}
	mongo.insert("environment", env, {upsert: true, multi: true, safe: true}, function (error, result) {
		if (error) {
			console.log("error:");
			console.log(error);
		}
		else {
			//console.log(result);
			console.log("Dev environment added");
		}
		return cb();
	});
}

function addProducts(cb) {
	var products = require('./provision/products/dev_products.js');
	if (products._id){
		products._id = new mongo.ObjectId(products._id);
	}
	mongo.insert("products", products, {upsert: true, multi: false, safe: true}, function (err, results) {
		if (err) {
			console.log("error:");
			console.log(err);
		}
		else {
			//console.log(results);
			console.log("Products added");
		}
		return cb();
	});
}

function addTenants(cb) {
	var tenants = require('./provision/tenants/tenants.js');
	
	tenants.forEach(function (tenant) {
		tenant._id = mongo.ObjectId(tenant._id);
		tenant.applications.forEach(function (oneApp) {
			oneApp.appId = new mongo.ObjectId(oneApp.appId.toString());
		});
	});
	
	mongo.insert("tenants", tenants, {upsert: true, multi: true, safe: true}, function (err1, result) {
		if (err1) {
			console.log("error:");
			console.log(err1);
		}
		else {
			//console.log(result);
			console.log("Tenants added");
		}
		return cb();
	});
	
}



async.series([addEnvironment, addProducts, addTenants], function (error) {
	if (error) {
		throw error;
	}
	console.log("Provision data imported successfully");
	mongo.closeDb();
	process.exit();
	
});

