"use strict";
var path = require("path");
/**
 *	Object containing the middleware of PUT /user/:id API
 */
module.exports = {
	"Put Record": function (req, res) {
		var modelInfo = req.soajs.servicesConfig.demo;
		var modelToUse;
		var opts = {};
		req.soajs.log.debug("using model: ", modelInfo.model);
		if (!req.soajs[modelInfo.model]) {
			modelToUse = req.soajs.model = require(path.normalize(__dirname + "/../models/" + modelInfo.model.toLowerCase() + ".js"));
			opts = {"condition": {"id": req.soajs.inputmaskData.id},
				"updatedFields": {"user": req.soajs.inputmaskData.user}};
		}
		else {
			modelToUse = req.soajs.model;
			opts = {
				"condition": {"_id": req.soajs.inputmaskData.id},
				"collection": "data",
				"updatedFields": {"user": req.soajs.inputmaskData.user},
				"database" : (modelInfo.MT) ? "demo_MT" : "demo_SA"
			};
		}
		
		modelToUse.updateEntries(req.soajs, opts, function (error, response) {
			return res.soajs.returnAPIResponse(req, res, {code: 400, error: error, data: response});
		});
		
	}
};