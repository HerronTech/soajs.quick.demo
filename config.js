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
  "schema": {}
};