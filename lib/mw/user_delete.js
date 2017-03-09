"use strict";
/**
 *	Object containing the middleware of DELETE /user/:id API
 */
module.exports = {
	"Delete Record": function (req, res) {
		var modelInfo = req.soajs.servicesConfig.demo;
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
				"condition": {"_id": req.soajs.inputmaskData.id},
				"collection": "data",
				"database" : (modelInfo.MT) ? "demo_MT" : "demo_SA"
			};
		}
		
		modelToUse.deleteEntries(req.soajs, opts, function (error, response) {
			return res.soajs.returnAPIResponse(req, res, {code: 400, error: error, data: response});
		});
		
	}
};