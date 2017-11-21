var soajs = require("soajs");
var async = require("async");
var mongo = new soajs.mongo(dbconfig);

var keySecurity = "";

function addRecipes(cb) {
	var catalogs = require('./catalogs/');
	mongo.remove("catalogs", {"name": {"$in": ['Dev Nginx Recipe', 'Dev Service Recipe']}}, function (error) {
		if (error) {
			return cb(error);
		}
		
		mongo.insert("catalogs", catalogs, {upsert: true, multi: false, safe: true}, function (err, results) {
			if (err) {
				return cb(err);
			}
			
			console.log("Catalogs added");
			return cb();
		});
	});
}

function generateExternalKey(opts, cb) {
	var module = require("soajs").core.key;
	var key = opts.key;
	
	var tenant = {
		id: opts.tenantId
	};
	var application = {
		"package": opts.package
	};
	var config = {
		algorithm: "aes256",
		password: opts.secret.password
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
	
	mongo.findOne("environment", {"code": "DASHBOARD"}, function (error, dashboardRecord) {
		if (error) {
			return cb(error);
		}
		var env = require('./environment/dev.js');
		env._id = mongo.ObjectId();
		env.deployer = dashboardRecord.deployer;
		env.dbs.config = dashboardRecord.dbs.config;
		env.dbs.session.name = "dev_" + dashboardRecord.dbs.session.name;
		env.dbs.databases.urac = dashboardRecord.dbs.databases.urac;
		env.services = dashboardRecord.services;
		keySecurity = dashboardRecord.services.config.key;
		mongo.remove("environment", {"code": "DEV"}, function (error) {
			if (error) {
				return cb(error);
			}
			mongo.insert("environment", env, {upsert: true, multi: false, safe: true}, function (error, result) {
				if (error) {
					return cb(error);
				}
				console.log("Dev environment added");
				return cb();
			});
		});
	});
}

function addProducts(cb) {
	var products = require('./products/');
	if (products._id) {
		products._id = new mongo.ObjectId(products._id);
	}
	
	mongo.remove("products", {"code": "DEV"}, function (error) {
		if (error) {
			return cb(error);
		}
		
		mongo.insert("products", products, {upsert: true, multi: false, safe: true}, function (err, results) {
			if (err) {
				return cb(err);
			}
			
			console.log("Products added");
			return cb();
		});
	});
}

function addTenants(cb) {
	var tenants = require('./tenants/');
	
	var count = 0;
	tenants.forEach(function (tenant) {
		if(tenant._id){
			tenant._id = mongo.ObjectId(tenant._id);
		}
		else{
			tenant._id = mongo.ObjectId();
		}
		tenant.applications.forEach(function (oneApp) {
			oneApp.appId = new mongo.ObjectId(oneApp.appId.toString());
			
			oneApp.keys.forEach(function (oneKey) {
				generateExternalKey({
					key: oneKey.key,
					tenantId: tenant._id,
					package: oneApp.package,
					secret: keySecurity
				}, function (error, externalKey) {
					if (error) {
						return cb(error);
					}
					oneKey.extKeys[0].extKey = externalKey;
					count++;
					
					if (count === tenants.length) {
						storeTenants();
					}
				});
			});
		});
	});
	
	function storeTenants() {
		var tenantsList = ["DETE", "DET1", "DET2", "DET3", "DET4"];
		mongo.remove("tenants", {"code": {"$in": tenantsList}}, function (error) {
			if (error) {
				return cb(error);
			}
			
			mongo.insert("tenants", tenants, {upsert: true, multi: true, safe: true}, function (err) {
				if (err) {
					return cb(err);
				}
				else {
					console.log("Tenants added");
				}
				return cb();
			});
		});
	}
}

function modifyDashboardDefaults(cb) {
	mongo.findOne("products", {"code": "DSBRD", "locked": true}, function (error, dsbrdProduct) {
		if (error) {
			return cb(error);
		}
		
		dsbrdProduct.packages.forEach(function (onePackage) {
			if (onePackage.code === "DSBRD_OWNER") {
				if (!onePackage.acl.dev) {
					onePackage.acl.dev = {};
				}
				
				onePackage.acl.dev.quickdemo = {"access": false};
				
				onePackage.acl.dev.urac = {
					"access": ["owner"],
					"apisPermission": "restricted",
					"get": {
						"apis": {
							"/owner/admin/users/count": {"access": false},
							"/owner/admin/listUsers": {"access": false},
							"/owner/admin/changeUserStatus": {"access": false},
							"/owner/admin/getUser": {"access": false},
							"/owner/admin/group/list": {"access": false},
							"/owner/admin/tokens/list": {"access": false}
						}
					},
					"post": {
						"apis": {
							"/owner/admin/addUser": {"access": false},
							"/owner/admin/editUser": {"access": false},
							"/owner/admin/editUserConfig": {"access": false},
							"/owner/admin/group/add": {"access": false},
							"/owner/admin/group/edit": {"access": false},
							"/owner/admin/group/addUsers": {"access": false}
						}
					},
					"delete": {
						"apis": {
							"/owner/admin/group/delete": {"access": false},
							"/owner/admin/tokens/delete": {"access": false}
						}
					}
				};
			}
		});
		
		mongo.save("products", dsbrdProduct, function (error) {
			if (error) {
				return cb(error);
			}
			
			mongo.findOne("tenants", {"code": "DBTN", "locked": true}, function (error, dbtnTenant) {
				if (error) {
					return cb(error);
				}
				
				dbtnTenant.applications.forEach(function (oneApplication) {
					if (oneApplication.package == "DSBRD_OWNER") {
						oneApplication.keys.forEach(function (oneKey) {
							if (!oneKey.config.dev) {
								oneKey.config.dev = {};
							}
							oneKey.config.dev['quickdemo'] = {"model": "memory"};
							
							generateExternalKey({
								key: oneKey.key,
								tenantId: dbtnTenant._id,
								package: oneApplication.package,
								secret: keySecurity
							}, function (error, externalKey) {
								if (error) {
									return cb(error);
								}
								
								for (var i = oneKey.extKeys.length - 1; i >= 0; i--) {
									if (oneKey.extKeys[i].env === 'DEV') {
										oneKey.extKeys.splice(i, 1);
									}
								}
								
								oneKey.extKeys.push({
									"extKey": externalKey,
									"device": {},
									"geo": {},
									"env": "DEV"
								});
								storeTenant(dbtnTenant);
							});
						});
					}
				});
			});
		});
	});
	
	function storeTenant(dbtnTenant) {
		mongo.save("tenants", dbtnTenant, cb);
	}
}

async.series([addRecipes, cloneEnvironment, addProducts, addTenants, modifyDashboardDefaults], function (error) {
	if (error) {
		throw error;
	}
	mongo.closeDb();
	process.exit();
});