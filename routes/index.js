_title = "fybr";

exports.homeGET = function(req, res) {
	res.render("home", {title: _title, subTitle: "home"});
}
exports.uploadGET = function(req, res) {
	res.render("upload", {title: _title, subTitle: "upload"});
}