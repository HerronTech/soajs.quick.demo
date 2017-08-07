"use strict";

var gitRepo = null;
var gitOwner = null;
var gitBranch = null;
var ciProvider = null;
var gitCommit = null;

var authKey = process.env.SOAJS_CD_AUTH_KEY;
var deployToken = process.env.SOAJS_CD_DEPLOY_TOKEN;
var dashboardDomain = process.env.SOAJS_CD_DASHBOARD_DOMAIN;
var dashboardProtocol = process.env.SOAJS_CD_DASHBOARD_PROTOCOL || 'https';
var dashboardPort = process.env.SOAJS_CD_DASHBOARD_PORT || '443';
var dashboardAPIRoute= process.env.SOAJS_CD_API_ROUTE;


var config = null;
var request = require("request");

var utils = {
	"init": function (cb){
		console.log("Initializing CD script");
		//check the build environment
		if(process.env.TRAVIS){
			console.log("Travis build environment detected");
			ciProvider = 'travis';
			
			if(!process.env.TRAVIS_REPO_SLUG || !process.env.TRAVIS_BRANCH){
				console.log("Could not find Travis environment variables (Repo Slug | branch). Aborting");
				process.exit(0);
			}
			
			var repoSlug = process.env.TRAVIS_REPO_SLUG.split("/");
			gitOwner = repoSlug[0].toLowerCase();
			gitRepo = repoSlug[1].toLowerCase();
			gitBranch = process.env.TRAVIS_BRANCH.toLowerCase();
			gitCommit = process.env.TRAVIS_COMMIT;
		}
		else if(process.env.DRONE){
			console.log("Drone build environment detected");
			ciProvider = 'drone';
			
			if(!process.env.DRONE_REPO_NAME || !process.env.DRONE_REPO_BRANCH){
				console.log("Could not find Drone environment variables (Repo name | branch). Aborting");
				process.exit(0);
			}
			
			gitOwner = process.env.DRONE_REPO_OWNER.toLowerCase();
			gitRepo = process.env.DRONE_REPO_NAME.toLowerCase();
			gitBranch = process.env.DRONE_REPO_BRANCH.toLowerCase();
			gitCommit = process.env.DRONE_COMMIT;
		}
		else {
			console.log("Could not find any build environment. Aborting...");
			process.exit(0);
		}
		
		//Check if required envs are set
		console.log("Checking if required environment variables are set")
		//check auth env variables
		if(!authKey || !deployToken){
			console.log("Error: Missing AUTH env variables. Aborting...");
			process.exit(0);
		}
		//check dashboard env variables
		if(!dashboardDomain || !dashboardAPIRoute){
			console.log("Error: Missing DASHBOARD environment variables. Aborting...");
			process.exit(0);
		}
		
		console.log("Launching CD call...");
		utils.createRequest(function(params){
			console.log(params.uri);
			console.log(JSON.stringify(params.body, null, 2));
			request.post(params, cb);
		});
	},
	
	"createRequest": function(cb) {
		var params = {};
		
		params.uri = dashboardProtocol + "://" + dashboardDomain + ":" + dashboardPort +
			"/dashboard" + dashboardAPIRoute + "?deploy_token=" + deployToken;
		
		params.headers = {
			"key" : authKey,
			"Content-Type": "application/json"
		};
		
		params.json = true;
		
		try {
			config = require("./config.js");
		}
		catch(e) {
			console.log("Could not find a config.js file, searching for custom config file [soa.js] ...");
			
			try {
				config = require('./soa.js');
			}
			catch(e) {
				console.log("Could not find a soa.js file, repo does contain a service code...");
			}
		}
		
		params.body = {
			"repo" : gitRepo,
			"branch": gitBranch,
			"owner": gitOwner,
			"ciProvider": ciProvider,
			"commit": gitCommit
		};
		//if not a multi repo
		if(config && config.type && config.type !== "multi" && config.serviceName){
			params.body.services = [{"serviceName": config.serviceName}];
			if(config.serviceVersion) {
				params.body.services[0].serviceVersion = config.serviceVersion;
				
			}
		}
		
		else if(config && config.type === "multi"){
			
			//loop over each service to add its
			var services = [];
			config.folders.forEach(function(service){
				var serviceConfigPath = "./" + service + "/config.js";
				var serviceConfig = require(serviceConfigPath);
				//construct each service option
				var oneService = {
					"serviceName": serviceConfig.serviceName
				};
				
				if(serviceConfig.serviceVersion){
					oneService.serviceVersion = serviceConfig.serviceVersion;
				}
				services.push(oneService);
			});
			params.body.services = services;
		}
		return cb(params);
	}
};


utils.init(function(err,response,body){
	if (err) {
		console.log(JSON.stringify (err, null, 2));
	}
	else {
		console.log(JSON.stringify (body, null, 2));
	}
});
