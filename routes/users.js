_title = "fybr";
var request = require("request");

exports.createAccount = function(req, res) {
	console.log('GET create acc')
	res.render("create-account", {title: _title});
}
exports.login = function(req, res) {
    console.log("GET login");
    res.render("login", {title: _title});
}
loginFunc = function(uname, pword, res){
	request({
		  uri: "http://127.0.0.1:5000/users/auth",
		  method: "POST",
		  form: {
		    username: username,
		    password: pword
		  }
		}, function(error, response, body) {
		  if(!error){
		  	console.log(body);
		  	res.redirect('/');
		  }
		});
}
exports.createAccountPOST = function(req, res) {
	console.log('POST create acc');
	if(req.body.password === req.body.cpassword){
		request({
		  uri: "http://127.0.0.1:5000/users",
		  method: "POST",
		  form: {
		    username: req.body.username,
		    password: req.body.password,
		    firstName: req.body.firstname,
		    lastName: req.body.lastName,
		    email: req.body.email
		  }
		}, function(error, response, body) {
		  console.log(body);
		  if(!error){
		  	loginFunc(req.body.username, req.body.password, res)
		  }
		});
	}
	else{
		res.redirect('/createAccount')
	}
}
exports.loginPOST = function(req, res){
	console.log('POST login');
	loginFunc(req.body.username, req.body.password, res)
}