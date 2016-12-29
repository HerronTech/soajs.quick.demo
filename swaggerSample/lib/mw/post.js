"use strict";

var postUser = {
	"post": function (req, res) {
		var id = req.soajs.inputmaskData.userId;
		if (id > 0 && id < 10) {
			return res.soajs.returnAPIResponse(req, res, {data: true});
		}
		return res.soajs.returnAPIResponse(req, res, {code: 401, error: req.soajs.config.errors[401]});
	}
};
module.exports = postUser;