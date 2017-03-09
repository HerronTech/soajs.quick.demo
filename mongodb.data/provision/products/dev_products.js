var devProducts = {
	"_id": '58b98e9a4cbbb04403437fcc',
	"code": "DEV",
	"name": "Dev Product",
	"description": "This is a product for a demo",
	"packages": [
		{
			"code": "DEV_PACK1",
			"name": "Package 1",
			"description": "This package contains 4 public APIs: get, delete, post and put",
			"acl": {
				"dev": {
					"demoservice": {
						"access": false,
						"apisPermission": "restricted",
						"post": {
							"apis": {
								"/user": {}
							}
						},
						"get": {
							"apis": {
								"/user": {}
							}
						},
						"delete": {
							"apis": {
								"/user": {}
							}
						},
						"put": {
							"apis": {
								"/user": {}
							}
						}
					}
				}
			},
			"_TTL": 21600000
		},
		{
			"code": "DEV_PACK2",
			"name": "Package 2",
			"description": "This package have access to 2 protected APIs: get and post",
			"acl": {
				"dev": {
					"demoservice": {
						"access": true,
						"apisPermission": "restricted",
						"get": {
							"apis": {
								"/user": {
									"access": true
								}
							}
						},
						"delete": {
							"apis": {}
						},
						"post": {
							"apis": {
								"/user": {
									"access": true
								}
							}
						},
						"put": {
							"apis": {}
						}
					}
				}
			},
			"_TTL": 21600000
		},
		{
			"code": "DEV_PACK3",
			"name": "Package 3",
			"description": "This package have access 4 private APIs: get, post, put and delete",
			"acl": {
				"dev": {
					"demoservice": {
						"access": true,
						"apisPermission": "restricted",
						"post": {
							"apis": {
								"/user": {
									"access": true
								}
							}
						},
						"get": {
							"apis": {
								"/user": {
									"access": true
								}
							}
						},
						"delete": {
							"apis": {
								"/user": {
									"access": true
								}
							}
						},
						"put": {
							"apis": {
								"/user": {
									"access": true
								}
							}
						}
					}
				}
			},
			"_TTL": 21600000
		}
	]
};

module.exports = devProducts;