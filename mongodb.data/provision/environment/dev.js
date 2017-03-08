var dev = {
	"_id": '586d11a1fa0ec324aadcd620',
	"code": "DEV",
	"domain": "mydomain.com",
	"sitePrefix": "dev",
	"apiPrefix": "dev-api",
	"port": 80,
	"profile": "/opt/soajs/FILES/profiles/profile.js",
	"description": "this is the DEV environment",
	"deployer": {
		"type": "manual",
		"selected": "container.docker.local",
		"container": {
			"docker": {
				"local": {
					"socketPath": "/var/run/docker.sock"
				},
				"remote": {
					"nodes": []
				}
			},
			"kubernetes": {
				"local": {},
				"remote": {
					"nodes": []
				}
			}
		}
	},
	"dbs": {
		"clusters": {
			"dev_cluster": {
				"servers": [
					{
						"host": "127.0.0.1",
						"port": 27017
					}
				],
				"credentials": null,
				"URLParam": {
					"maxPoolSize": 2
				},
				"extraParam": {
					"db": {
						"bufferMaxEntries": 0
					}
				}
			},
			"test": {
				"servers": [
					{
						"host": "127.0.0.1",
						"port": "8345"
					}
				],
				"credentials": {},
				"URLParam": {},
				"extraParam": {
					"extra": 5
				},
				"streaming": {},
				"clusterType": "default"
			}
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
			"myContactsw": {
				"cluster": "dev_cluster",
				"tenantSpecific": false
			}
		}
	},
	"services": {
		"controller": {
			"maxPoolSize": 100,
			"authorization": true,
			"requestTimeout": 30,
			"requestTimeoutRenewal": 0
		},
		"config": {
			"awareness": {
				"healthCheckInterval": 5000,
				"autoRelaodRegistry": 3600000,
				"maxLogCount": 5,
				"autoRegisterService": true
			},
			"agent": {
				"topologyDir": "/opt/soajs/"
			},
			"key": {
				"algorithm": "aes256",
				"password": "soajs key lal massa"
			},
			"logger": {
				"src": true,
				"level": "debug",
				"formatter": {
					"outputMode": "long"
				}
			},
			"cors": {
				"enabled": true,
				"origin": "*",
				"credentials": "true",
				"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
				"headers": "key,soajsauth,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type",
				"maxage": 1728000
			},
			"oauth": {
				"grants": [
					"password",
					"refresh_token"
				],
				"debug": false
			},
			"ports": {
				"controller": 4000,
				"maintenanceInc": 1000,
				"randomInc": 100
			},
			"cookie": {
				"secret": "this is a secret sentence"
			},
			"session": {
				"name": "soajsID",
				"secret": "this is antoine hage app server",
				"cookie": {
					"path": "/",
					"httpOnly": true,
					"secure": false,
					"maxAge": null
				},
				"resave": false,
				"saveUninitialized": false,
				"rolling": false,
				"unset": "keep"
			}
		}
	}
};

module.exports = dev;