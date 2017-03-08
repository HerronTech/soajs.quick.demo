"use strict";
module.exports = {
  "type": "service",
  "prerequisites": {
    "cpu": " ",
    "memory": " "
  },
  "swagger": true,
  "dbs": [
    {
      "prefix": "",
      "name": "demo_SA",
      "mongo": true,
      "multitenant": false
    },
    {
      "prefix": "",
      "name": "demo_MT",
      "mongo": true,
      "multitenant": true
    }
  ],
  "models": {
    "path": __dirname + "/lib/models/",
    "name": "mongo"
  },
  "serviceName": "demoservice",
  "serviceGroup": "demo",
  "serviceVersion": 1,
  "servicePort": 4387,
  "requestTimeout": 30,
  "requestTimeoutRenewal": 5,
  "extKeyRequired": true,
  "injection": true,
  "oauth": false,
  "session": true,
  "errors": {
    "400": "unsuccessful update",
    "401": "user id not found",
    "600": "couldn't establish connection to database"
  },
  "schema": {
    "post": {
      "/user": {
        "_apiInfo": {
          "l": "Create user",
          "group": "user"
        },
        "mw": __dirname + "/lib/mw/user_post.js",
        "imfv": {
	      "commonFields": [
		    "user"
	      ]
        }
      }
    },
    "get": {
      "/user/:id": {
        "_apiInfo": {
          "l": "get user by id",
          "group": "user"
        },
        "mw": __dirname + "/lib/mw/user_get.js",
        "imfv": {
          "commonFields": [
	        "id"
          ]
        }
      }
    },
    "delete": {
      "/user/:id": {
        "_apiInfo": {
          "l": "delete a user by Id",
          "group": "user"
        },
        "mw": __dirname + "/lib/mw/user_delete.js",
        "imfv": {
          "commonFields": [
            "id"
          ]
        }
      }
    },
    "put": {
      "/user/:id": {
        "_apiInfo": {
          "l": "Update user",
          "group": "user"
        },
        "mw": __dirname + "/lib/mw/user_put.js",
        "imfv": {
          "commonFields": [
            "user",
	        "id"
          ]
        }
      }
    },
    "commonFields": {
      "id": {
        "required": true,
        "source": [
          "params.id"
        ],
        "validation": {
          "type": "string"
        }
      },
      "user": {
        "required": true,
        "source": [
          "body.user"
        ],
        "validation": {
          "type": "object",
          "required": [
            "username",
            "email"
          ],
          "properties": {
            "username": {
              "type": "string",
              "minLength": 4,
              "maxLength": 8,
              "pattern": "/^[a-zA-Z][0-9a-zA-Z_\\-]+$/"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "email": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "address",
                  "primary"
                ],
                "minItems": 1,
                "maxItems": 6,
                "uniqueItems": true,
                "properties": {
                  "address": {
                    "type": "string",
                    "format": "email"
                  },
                  "primary": {
                    "type": "boolean"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};