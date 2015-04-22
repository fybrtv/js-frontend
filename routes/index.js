_title = "fybr";

exports.homeGET = function(req, res) {
	res.render("home", {title: _title});
}
exports.uploadGET = function(req, res) {
	res.render("upload", {title: _title});
}