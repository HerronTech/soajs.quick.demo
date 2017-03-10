var dev = {
	"code": "DEV",
	"domain": "mydomain.com",
	"sitePrefix": "dev",
	"apiPrefix": "dev-api",
	"port": 81,
	"profile": "/opt/soajs/FILES/profiles/profile.js",
	"description": "this is the DEV environment",
	"dbs": {
		"clusters": {
			"dev_cluster": {}
		},
		"config": {
			"prefix": "",
			"session": {
				"cluster": "dev_cluster",
				"name": "core_session",
				"store": {},
				"collection": "sessions",
				"stringify": false,
				"expireAfter": 1209600000
			}
		},
		"databases": {
			"urac": {
				"cluster": "dev_cluster",
				"tenantSpecific": true
			},
			"demo_SA": {
				"cluster": "dev_cluster",
				"tenantSpecific": false
			},
			"demo_MT": {
				"cluster": "dev_cluster",
				"tenantSpecific": true
			}
		}
	}
};

module.exports = dev;