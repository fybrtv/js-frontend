_title = "fybr";
var request = require("request");
_msg = ""


exports.profileDashboard = function(req, res){
	console.log('GET profile dashboard');
	var loggedIn = true;

	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}
	if (loggedIn){
		if (typeof _msg == "undefined") _msg = "";
		res.render("profile-dashboard", {title: _title, subTitle: "Edit Profile",type: req.session.type,firstName: req.session.firstName, lastName: req.session.lastName, email: req.session.email, username: req.session.username, loggedIn: true, error: _msg})
		delete _msg;
	}
	else{
		res.redirect('/login');
	}
}
exports.resignCreator = function(req, res){
	var loggedIn = true;

	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}
	if(loggedIn){
		console.log('resign creator called');
			request({
			  uri: ("http://127.0.0.1:5000/users/" + req.session.userID),
			  method: "POST",
			  form: {
			    typeOfAccount: 0
			  }
			}, function(error, response, body) {
			  console.log('edit return ', body);
			  if(JSON.parse(body).success == "true"){
			  	req.session.type = 0;
			  	res.redirect("/profileDashboard")
			  } else {
			  	_msg = JSON.parse(response.body).message;;
			  	res.redirect("/profileDashboard")
			  }
			});
	}
	else{
		res.redirect('/login');
	}
}
exports.becomeCreator = function(req, res){
	var loggedIn = true;

	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}
	if(loggedIn){
		console.log('become creator called');
			request({
			  uri: ("http://127.0.0.1:5000/users/" + req.session.userID),
			  method: "POST",
			  form: {
			    typeOfAccount: 1
			  }
			}, function(error, response, body) {
			  console.log('edit return ', body);
			  if(JSON.parse(body).success === "true"){
			  	req.session.type = 1;
			  	res.redirect("/profileDashboard")
			  } else {
			  	_msg = JSON.parse(response.body).message;
			  	res.redirect("/profileDashboard")
			  }
			});
	}
	else{
		res.redirect('/login');
	}
}
exports.profileDashboardPOST = function(req, res){
	var loggedIn = true;

	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}
	if(loggedIn){
		request({
		  uri: ("http://127.0.0.1:5000/users/" + req.session.userID),
		  method: "POST",
		  form: {
		    username: req.body.username || req.session.username,
		    password: req.body.password || req.session.password,
		    passwordCheck: req.body.cpassword || req.session.cpassword,
		    firstName: req.body.firstName || req.session.firstName,
		    lastName: req.body.lastName || req.session.lastName,
		    email: req.body.email || req.session.email
		  }
		}, function(error, response, body) {
		  console.log('edit return from post', body);
		  if(JSON.parse(body).success == "true"){
		  	console.log('success= true');
		  	req.session.username = req.body.username || req.session.username;
		  	req.session.firstName = req.body.firstName || req.session.firstName;
		  	req.session.lastName = req.body.lastName || req.session.lastName;
		  	req.session.email = req.body.email || req.session.email;
			_msg = JSON.parse(response.body).message;
			res.redirect('/profileDashboard')
		  	
		  } else {
		  	_msg = JSON.parse(response.body).message;
			res.redirect('/profileDashboard')
		  }
		});
	}
	else{
		res.redirect('/login');
	}
}
exports.createAccount = function(req, res) {
	console.log('GET create acc')
	var loggedIn = true;

	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}
	if(!loggedIn){
		if (typeof _msg == "undefined") _msg = "";
		res.render("create-account", {title: _title, subTitle: "Create Account",type: req.session.type,firstName: req.session.firstName, error: _msg});
		delete _msg;
	}
	else{
		res.redirect('/');
	}
}

exports.login = function(req, res) {
    console.log("GET login");
    var loggedIn = true;

	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}
	if(!loggedIn){
	    if (typeof _msg == "undefined") _msg = "";
	    res.render("login", {title: _title, subTitle: "Login",type: req.session.type,firstName: req.session.firstName, error: _msg});
	    delete _msg;
	}
	else{
		res.redirect('/');
	}
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
	console.log("GET login");
    var loggedIn = true;

	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}
	if(!loggedIn){
		if(req.body.password === req.body.cpassword){
			request({
			  uri: "http://127.0.0.1:5000/users",
			  method: "POST",
			  form: {
			    username: req.body.username,
			    password: req.body.password,
			    passwordCheck: req.body.cpassword,
			    firstName: req.body.firstName,
			    lastName: req.body.lastName,
			    email: req.body.email
			  }
			}, function(error, response, body) {
			  console.log('create return ', body);
			  if(JSON.parse(body).success == "true"){
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
	else{
		res.redirect('/');
	}
}
exports.loginPOST = function(req, res){
	console.log('POST login');
	var loggedIn = true;

	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}
	if(!loggedIn){
		loginFunc(req.body.username, req.body.password, req, res)
	}
	else{
		res.redirect('/');
	}
}
exports.logout = function(req, res){
	if (typeof req.session.token != "undefined") {
		req.session.destroy();
		console.log("Logged off user");
		res.redirect('/');
	}
		
}