"use strict";
/**
 *	Object containing the middleware of DELETE /user/:id API
 */
module.exports = {
	"middleware1": function(req, res, next){
		console.log("inside Business Logic of /user API");
		next();
	},
	"middleware2": function(req, res){
		return res.soajs.returnAPIResponse(req, res, {code: 400, error: null, data: true });
	}
};