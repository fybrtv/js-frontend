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
loginFunc = function(uname, pword, req, res){
	console.log('login function called');
	request({
		  uri: "http://127.0.0.1:5000/users/auth",
		  method: "POST",
		  form: {
		    username: uname,
		    password: pword
		  }
		}, function(error, response, body) {
		  if(!error){
		  	console.log('login return ', body);
		  	req.session.token = body.token;
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
		    passwordCheck: req.body.cpassword,
		    firstName: req.body.firstname,
		    lastName: req.body.lastName,
		    email: req.body.email
		  }
		}, function(error, response, body) {
		  console.log('create return ', body);
		  if(!error){
		  	loginFunc(req.body.username, req.body.password, req, res)
		  }
		});
	}
	else{
		res.redirect('/createAccount')
	}
}
exports.loginPOST = function(req, res){
	console.log('POST login');
	loginFunc(req.body.username, req.body.password, req, res)
}