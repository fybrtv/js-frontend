_title = "fybr";

exports.createAccount = function(req, res) {
	console.log('GET create acc')
	res.render("create-account", {title: _title});
}
exports.login = function(req, res) {
    console.log("GET login");
    res.render("login", {title: _title});
}
exports.createAccountPOST = function(req, res) {
	console.log('POST create acc');
	res.redirect('/');
}
exports.loginPOST = function(req, res){
	console.log('POST login');
	res.redirect('/')
}