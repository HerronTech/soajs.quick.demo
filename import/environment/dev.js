var dev = {
	"code": "DEV",
	"domain": "mydomain.com",
	"sitePrefix": "dev",
	"apiPrefix": "dev-api",
	"port": 81,
	"protocol": "http",
	"profile": "/opt/soajs/FILES/profiles/profile.js",
	"description": "this is the DEV environment",
	"dbs": {
		"config": {
			"prefix": ""
		},
		"databases": {
			"urac": {
				"cluster": "dash_cluster",
				"tenantSpecific": true
			},
			"demo_SA": {
				"cluster": "dash_cluster",
				"tenantSpecific": false
			},
			"demo_MT": {
				"cluster": "dash_cluster",
				"tenantSpecific": true
			}
		},
		"session": {
			"cluster": "dash_cluster",
			"name": "core_session",
			"store": {},
			"collection": "sessions",
			"stringify": false,
			"tenantSpecific": false,
			"expireAfter": 1209600000
		}
	}
};

module.exports = dev;