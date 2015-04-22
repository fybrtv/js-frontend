_title = "fybr";
_firstName = "";
_type = "0";
exports.homeGET = function(req, res) {
	if(req.session.userID){
		_firstName = req.session.firstName;
		_type = req.session.type;
	}
	res.render("home", {title: _title, subTitle: "home",type: _type,firstName: _firstName});
}
exports.uploadGET = function(req, res) {
	res.render("upload", {title: _title, subTitle: "upload"});
}