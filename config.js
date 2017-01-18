'use strict';
var config = {
	"type": "service",
	"prerequisites": {
		"cpu": '',
		"memory": ''
	},
	"swagger": true,
	"dbs": [
		{
			prefix: "",
			name: "swaggerSampleDB",
			multitenant: false,
			es: false
		}],
	"serviceName": "swaggerSample",
	"serviceGroup": "sample",
	"serviceVersion": 1,
	"servicePort": 4061,
	"requestTimeout": 30,
	"requestTimeoutRenewal": 5,
	"extKeyRequired": false,
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
			"/": {
				"_apiInfo": {
					"l": "get users",
					"group": "users",
					"groupMain": true
				},
				"mw": __dirname + "/lib/mw/get.js"
			}
		},
		"post": {
			"/": {
				"_apiInfo": {
					"l": "set a cart",
					"group": "users"
				},
				"mw": __dirname + "/lib/mw/post.js",
				"imfv": {
					"custom": {
						"items": {
							"source": ['body.items'],
							"required": true,
							"validation": {
								"type": "array",
								"items": {
									"type": "object",
									"properties": {
										"userId":{
											"type": "integer",
											"required": true,
											"format": "int32"
										},
										"productId": {
											"type": "string",
											"required": true
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
module.exports = config;