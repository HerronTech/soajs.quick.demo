"use strict";
var os = require("os");
var stdio = require('stdio');
var exec = require("child_process").exec;
var fs = require("fs");
var authentication = false;

var config = {
	"username": "",
	"password": "",
	"authSource": "",
	"host": "dashboard-soajsdata",
	"port": 27017,
	"file": ""
};

var ops = stdio.getopt({
	"authenticationDatabase": {key: "a", args: 1, description: "Authentication Database (Default null)"},
	"prefix": {key: "i", args: 1, description: "DB Prefix", mandatory: false},
	"host": {key: "h", args: 1, description: "Host (Default dashboard-soajsdata)", mandatory: false},
	"password": {key: "w", args: 1, description: "Github Password (Default null)", mandatory: false},
	"port": {key: "p", args: 1, description: "Port number (Default 27017)", mandatory: false},
	"username": {key: "u", args: 1, description: "Database Username (Default null)", mandatory: false}
});

var lib = {
	"fillVariables": function (config, ops, cb) {
		//check supplied credentials
		if (ops.authenticationDatabase && (!ops.username || !ops.password) || ops.username && (!ops.authenticationDatabase || !ops.password)
			|| ops.password && (!ops.username || !ops.authenticationDatabase)) {
			return cb("Either the credentials or the authentication database is missing")
		}
		else if (ops.authenticationDatabase && ops.username && ops.password) {
			
			config.username = ops.username;
			config.password = ops.password;
			config.authSource = ops.authenticationDatabase;
			authentication = true;
		}
		if (ops.host) {
			config.host = ops.host;
		}
		if (ops.port) {
			config.port = ops.port;
		}
		return cb(null, true);
	},
	
	"printParams": function (config, cb) {
		console.log("Below are the information provided");
		console.log("Host: " + config.host);
		console.log("Port: " + config.port);
		console.log("Username: " + config.username);
		console.log("Password: " + config.password);
		console.log("Authentication Database: " + config.authSource);
		return cb(null, true);
	},
	
	"launchDataFile": function (cb) {
		/*
		 1- read the file data.js as utf8 inside a variable called data
		 2- create a new write stream on data-tmp.js
		 3- write the information of stdio each on a new line in the new data-tmp.js file
		 4- write the data variable after them in data-tmp.js
		 5- execute node data-tmp.js
		 */
		//utils.updateEnvironments(config, function(err, res){
		console.log("Data import Started");
		fs.readFile("./data.js", function (error, data) {
			if (error) {
				return cb(error);
			}
			var dbconfig = require("./profile.js");
			
			if (ops.prefix) {
				dbconfig.prefix = ops.prefix;
			}
			if (ops.host) {
				dbconfig.servers[0].host = ops.host;
			}
			if (ops.port) {
				dbconfig.servers[0].port = ops.port;
			}
			
			if(authentication){
				dbconfig.credentials = {
					username: config.username,
					password: config.password
				};
				dbconfig.URLParam.authSource = config.authSource;
			}
			
			var writeStream = fs.createWriteStream("./dataTmp.js");
			writeStream.write("var dbconfig = " + JSON.stringify(dbconfig, null, 2) + ";" + os.EOL);
			writeStream.write(data, {
				"encoding": 'utf8'
			});
			writeStream.end();
			
			setTimeout(function () {
				var execString = "chmod +x dataTmp.js && " + "node " + __dirname + "/dataTmp.js";
				exec(execString, cb);
				
			}, 1000);
		});
	}
};

lib.fillVariables(config, ops, function (err, result) {
	if (err)
		throw new Error(err);
	else {
		lib.printParams(config, function (error, res2) {
			if (error) {
				throw new Error(error);
			}
			
			lib.launchDataFile(function (error, r) {
				if (error) {
					throw new Error(error);
				}
				else {
					console.log("Data import is Successfully Done");
				}
			});
		});
	}
});