"use strict";

module.exports = getUser;
var getUser = {
	"post" : function (req, res) {
		var id = req.soajs.inputmaskData.userId;
		if (id > 0 && id < 10){
			return true;
		}
		return res.soajs.returnAPIResponse(req, res, {code: 401, error: req.soajs.config.errors[401]});
	}
};