_title = "fybr";
_firstName = "";
_type = "0";
_msg = ""
exports.homeGET = function(req, res) {	
	var loggedIn = true;

	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}
	if (typeof _msg == "undefined") _msg = "";
	res.render("home", {title: _title, subTitle: "home", type: req.session.type || undefined, firstName: req.session.firstName || undefined, msg: _msg, loggedIn: loggedIn}); delete _msg;
}
exports.uploadGET = function(req, res) {
	var loggedIn = true;

	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}
	res.render("upload", {title: _title, subTitle: "upload", loggedIn: loggedIn, firstName: req.session.firstName});
}