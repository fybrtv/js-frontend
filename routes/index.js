_title = "fybr";

exports.homeGET = function(req, res) {
	res.render("index", {title: _title});
}

exports.uploadGET = function(req, res) {
	res.render("upload", {title: _title});
}
exports.loginPage = function(req, res) {
	res.render("login", {title: _title});
}
exports.createAccountPage = function(req, res) {
	res.render("create-account", {title: _title});
}