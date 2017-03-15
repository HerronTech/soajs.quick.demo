"use strict";
var composer = require("soajs.composer");
composer.deploy(__dirname + "/config.js", function(error){
	console.log( (error)? error : "Quick Demo started ...");
});