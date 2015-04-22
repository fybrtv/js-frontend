_title = "fybr";

exports.loginPage = function(req, res) {
	res.render("login", {title: _title});
}
exports.createAccountPage = function(req, res) {
	res.render("create-account", {title: _title});
}