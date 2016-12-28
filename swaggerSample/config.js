'use strict';
var services = {
	"type": "service",
	"dbs": [],
	"prerequisites": {
		"cpu": '',
		"memory": ''
	},
	"serviceName": "swaggerSample",
	"serviceGroup": "sample",
	"serviceVersion": 1,
	"servicePort": 4061,
	"requestTimeout": 30,
	"requestTimeoutRenewal": 5,
	"extKeyRequired": false,
	"session": false,
	"oauth": false,
	"logger": false,
	"inputmask": true,
	"cookieParser": false,
	"methodOverride": false,
	"awareness": false,
	"bodyParser": false,
	"errors": {
		400: "Error connecting to the database",
		401: "invalid id",
		402: "missing required field"
	},
	"schema": {
		"commonFields": { //this shows that we can have common fields, but in this example we don't need it.
			"id": {
				"source": ['query.id'],
				"required": true,
				"validation": {"type": "string"}
			}
		},
		"get": {
			"/list": {
				"_apiInfo": {
					"l": "get item form a specified cart",
					"group": "users",
					"groupMain": true
				},
				"mw": __dirname + "/lib/mw/get.js",
				"imfv": {
					"custom": {
						"userId": {
							"source": ['query.userId'],
							"required": true,
							"validation": {
								"type": "integer"
							}
						}
					}
					
				}
				
			}
		},
		"post": {
			"/sss": {
				"_apiInfo": {
					"l": "set a cart",
					"group": "users"
				},
				"mw": __dirname + "/lib/mw/post.js",
				"imfv": {
					"custom": {
						"userId": {
							"source": ['body.userId'],
							"required": true,
							"validation": {
								"type": "integer"
							}
						},
						"items": {
							"source": ['body.items'],
							"required": true,
							"validation": {
								"type": "array",
								"items": {
									"type": "object",
									"properties": {
										"productId": {
											"type": "string",
											"required": true,
											"minLength": 8,
											"maxLength": 8
										},
										"price": {
											"type": "number",
											"required": true,
											"minimum": 0
										},
										"currency": {
											"type": "string",
											"required": true
										},
										"quantity": {
											"type": "integer",
											"required": true,
											"minimum": 1
										}
									}
								},
								"minItems": 1,
								"uniqueItems": true
							}
						}
					}
				}
			}
		}
	}
};
module.exports = services;