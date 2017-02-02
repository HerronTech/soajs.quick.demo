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
      "name": "myDb",
      "model": "mongo",
      "multitenant": false
    }
  ],
  "serviceName": "myService",
  "serviceGroup": "myGroup",
  "serviceVersion": 1,
  "servicePort": 4265,
  "requestTimeout": 30,
  "requestTimeoutRenewal": 5,
  "extKeyRequired": true,
  "oauth": false,
  "session": true,
  "errors": {},
  "schema": {
    "get": {
      "/": {
        "_apiInfo": {
          "l": "get all products",
          "group": "Products"
        },
        "mw": __dirname + "/lib/mw/_get.js",
        "key": {
          "required": false,
          "source": [
            "header;.key"
          ],
          "validation": {
            "type": "string",
            "format": "string"
          }
        },
        "soajsauth": {
          "required": false,
          "source": [
            "headers.soajsauth"
          ],
          "validation": {
            "type": "string",
            "format": "string"
          }
        }
      }
    },
    "post": {
      "/": {
        "_apiInfo": {
          "l": "add a product",
          "group": "Products"
        },
        "mw": __dirname + "/lib/mw/_post.js",
        "newProduct": {
          "required": true,
          "source": [
            "body.newProduct"
          ],
          "validation": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "the items of a product",
              "properties": {
                "userId": {
                  "type": "integer",
                  "format": "int32"
                },
                "productId": {
                  "type": "string"
                },
                "price": {
                  "type": "number"
                },
                "currency": {
                  "type": "string"
                },
                "quantity": {
                  "type": "integer"
                }
              }
            }
          }
        },
        "key": {
          "required": false,
          "source": [
            "headers.key"
          ],
          "validation": {
            "type": "string",
            "format": "string"
          }
        },
        "soajsauth": {
          "required": false,
          "source": [
            "headers.soajsauth"
          ],
          "validation": {
            "type": "string",
            "format": "string"
          }
        }
      }
    }
  }
};