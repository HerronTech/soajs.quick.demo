var soajs = require("soajs");
var async = require("async");
var mongo = new soajs.mongo(dbconfig);

var keySecurity = "";

function generateExternalKey(opts, cb){
	var module = require("soajs/modules/soajs.core").key;
	var key = opts.key;
	
	var tenant = {
		id: opts.tenantId
	};
	var application = {
		"package": opts.package
	};
	var config = {
		algorithm: "aes256",
		password: opts.secret
	};
	
	module.generateExternalKey(key, tenant, application, config, function (error, extKey) {
		if (error) {
			return cb(error);
		}
		
		module.getInfo(extKey, config, function (error, response) {
			if (error) {
				return cb(error);
			}
			if (response.key === key) {
				return cb(null, extKey);
			}
			else {
				return cb(new Error("Generated Key is invalid."))
			}
		});
	});
}

function cloneEnvironment(cb) {
	
	mongo.findOne("environment", {"code": "DASHBOARD"}, function(error, dashboardRecord){
		if(error){
			return cb(error);
		}
		
		var env = require('./environment/dev.js');
		env._id = mongo.ObjectId();
		
		env.deployer = dashboardRecord.deployer;
		
		env.dbs.clusters['dev_cluster'] = dashboardRecord.dbs.clusters.dash_cluster;
		
		env.dbs.config = dashboardRecord.dbs.config;
		env.dbs.config.session.cluster = "dev_cluster";
		env.dbs.config.session.name = "dev_" + dashboardRecord.dbs.config.session.name;
		
		env.dbs.databases.urac = dashboardRecord.dbs.databases.urac;
		env.dbs.databases.urac.cluster = "dev_cluster";
		
		env.services = dashboardRecord.services;
		
		keySecurity = dashboardRecord.services.config.key;
		mongo.insert("environment", env, {upsert: true, multi: false, safe: true}, function (error, result) {
			if (error) {
				return cb(error);
			}
			console.log("Dev environment added");
			return cb();
		});
	});
}

function addProducts(cb) {
	var products = require('./products/');
	if (products._id){
		products._id = new mongo.ObjectId(products._id);
	}
	mongo.insert("products", products, {upsert: true, multi: false, safe: true}, function (err, results) {
		if (err) {
			return cb(err);
		}
		
		console.log("Products added");
		return cb();
	});
}

function addTenants(cb) {
	var tenants = require('./tenants/');
	
	var count = 0;
	tenants.forEach(function (tenant) {
		tenant._id = mongo.ObjectId(tenant._id);
		tenant.applications.forEach(function (oneApp) {
			oneApp.appId = new mongo.ObjectId(oneApp.appId.toString());
			
			oneApp.keys.forEach(function(oneKey){
				generateExternalKey({
					key: oneKey.key,
					tenantId: tenant._id,
					package: oneApp.package,
					secret: keySecurity
				}, function(error, externalKey){
					if(error){
						return cb(error);
					}
					oneKey.extKeys[0].extKey = externalKey;
					count ++;
					
					if (count === tenant.length){
						storeTenants();
					}
				});
			});
		});
	});
	
	function storeTenants(){
		mongo.insert("tenants", tenants, {upsert: true, multi: true, safe: true}, function (err) {
			if (err) {
				return cb(err);
			}
			else {
				console.log("Tenants added");
			}
			return cb();
		});
	}
}

async.series([cloneEnvironment, addProducts, addTenants], function (error) {
	if (error) {
		throw error;
	}
	mongo.closeDb();
	process.exit();
});