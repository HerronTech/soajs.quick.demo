'use strict';
var config = {
	"type": "service",
	"prerequisites": {
		"cpu": '',
		"memory": ''
	},
	"swagger": true,
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
			"/": {
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