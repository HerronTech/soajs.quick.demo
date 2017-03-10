var devProducts = {
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
						"access": false
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
						"access": false,
						"apisPermission": "restricted",
						"get": {
							"apis": {
								"/user/:id": {
									"access": false
								}
							}
						},
						"post": {
							"apis": {
								"/user": {
									"access": false
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