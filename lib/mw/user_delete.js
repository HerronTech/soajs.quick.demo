"use strict";
var path = require("path");
/**
 *	Object containing the middleware of DELETE /user/:id API
 */
module.exports = {
	"Delete Record": function (req, res) {
		var modelInfo = (req.soajs.servicesConfig && req.soajs.servicesConfig.demo) ? req.soajs.servicesConfig.demo : req.soajs.config.demo;
		var modelToUse;
		var opts = {};
		req.soajs.log.debug("using model: ", modelInfo.model);
		if (!req.soajs[modelInfo.model]) {
			modelToUse = req.soajs.model = require(path.normalize(__dirname + "/../models/" + modelInfo.model.toLowerCase() + ".js"));
			opts = {"condition": {"id": req.soajs.inputmaskData.id}};
		}
		else {
			modelToUse = req.soajs.model;
			opts = {
				"condition": {},
				"collection": "data",
				"database" : (modelInfo.MT) ? "demo_MT" : "demo_SA"
			};
			opts.condition["_id"] = modelToUse.object_Id(req.soajs, opts.database, req.soajs.inputmaskData.id)
		}
		
		modelToUse.deleteEntries(req.soajs, opts, function (error, response) {
			return res.soajs.returnAPIResponse(req, res, {code: 400, error: error, data: response});
		});
		
	}
};