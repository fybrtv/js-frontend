_title = "fybr";
var request = require("request");
_firstName = "";
_type = "0";
_msg = ""

exports.createAccount = function(req, res) {
	console.log('GET create acc')
	if (typeof _msg == "undefined") _msg = "";
	res.render("create-account", {title: _title, subTitle: "Create Account",type: _type,firstName: _firstName, error: _msg});
	delete _msg;
}

exports.login = function(req, res) {
    console.log("GET login");
    if (typeof _msg == "undefined") _msg = "";
    res.render("login", {title: _title, subTitle: "Login",type: _type,firstName: _firstName, error: _msg});
    delete _msg;
}

function loginFunc(uname, pword, req, res){
	console.log('login function called');
	request({
		  uri: "http://127.0.0.1:5000/users/auth",
		  method: "POST",
		  form: {
		    username: uname,
		    password: pword
		  }
		}, function(error, response, body) {
		  if(JSON.parse(response.body).success == "true"){
		  	console.log('login return ', body);
		  	req.session.firstName = (JSON.parse(body)).firstName;
		  	req.session.lastName = (JSON.parse(body)).lastName;
		  	req.session.email = (JSON.parse(body)).email;
		  	req.session.userID = (JSON.parse(body)).userID;
		  	req.session.type = (JSON.parse(body)).type;
		  	req.session.username = (JSON.parse(body)).username;
		  	req.session.token = (JSON.parse(body)).token;
		  	res.redirect('/');
		  } else {
		  	_msg = JSON.parse(response.body).message;
		  	res.redirect("/login")
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
		  if(body.success == "true"){
		  	loginFunc(req.body.username, req.body.password, req, res)
		  } else {
		  	_msg = JSON.parse(response.body).message;;
		  	res.redirect("/createAccount")
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
exports.logout = function(req, res){
	if (typeof req.session.token != "undefined") {
		req.session.destroy();
		console.log("Logged off user");
		// console.log("logout: "+req.session.token)
		// request.post({url: "http://127.0.0.1:5000/users/logout", form: {token: req.session.token}}, function(error, response, body) {
		//   console.log("body: "+JSON.parse(body).success)
		//   if (JSON.parse(body).success == "true") {
		//   	req.session.destroy();
		//   } else {
		//   	_msg = "Logout Unsuccessful"
		//   	req.session.destroy();
		//   }
		//   res.redirect('/');
		// });
	}
	res.redirect('/');
		
}