"use strict";
var path = require("path");
/**
 *	Object containing the middleware of POST /user API
 */
module.exports = {
	"Post Record": function (req, res) {
		var modelInfo = req.soajs.servicesConfig.demo;
		var modelToUse;
		var opts = {};
		req.soajs.log.debug("using model: ", modelInfo.model);
		if (!req.soajs[modelInfo.model]) {
			modelToUse = req.soajs.model = require(path.normalize(__dirname + "/../models/" + modelInfo.model.toLowerCase() + ".js"));
			opts = {
				"condition": {},
				"records": {"user": req.soajs.inputmaskData.user}
			};
		}
		else {
			modelToUse = req.soajs.model;
			opts = {
				"condition": {},
				"records": {"user": req.soajs.inputmaskData.user},
				"collection": "data",
				"database" : (modelInfo.MT) ? "demo_MT" : "demo_SA"
			};
		}
		modelToUse.insertEntries(req.soajs, opts, function (error, response) {
			return res.soajs.returnAPIResponse(req, res, {code: 400, error: error, data: response});
		});
		
	}
};