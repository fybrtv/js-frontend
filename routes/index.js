var request = require("request");
_title = "fybr";
_firstName = "";
_type = "0";
_msg = "";
var request = require("request");

exports.homeGET = function(req, res) {
    var loggedIn = true;
    request({
        uri: "http://127.0.0.1:5000/channels",
        method: "GET"
    }, function(error, response, body) {
        if (!error) {
            if (typeof req.session != "undefined") {
                if (typeof req.session.token == "undefined") {
                    loggedIn = false;
                }
            }
            if (typeof _msg == "undefined") _msg = "";
            console.log(body)
            console.log('channels', body.document);
            res.render("home", {
                title: _title,
                subTitle: "home",
                type: req.session.type || undefined,
                firstName: req.session.firstName || undefined,
                msg: _msg,
                channels: JSON.parse(body).document,
                loggedIn: loggedIn
            });
            delete _msg;
        } else {
            _msg = "Server malfunction";
            res.redirect('/')
        }

    });
}
exports.uploadGET = function(req, res) {
    var loggedIn = true;


	if (typeof req.session != "undefined") {
		if (typeof req.session.token == "undefined") {
			loggedIn = false;
		} 
	}

	request.get("http://localhost:5000/series/userId/"+req.session.userID, function(err, data) {
		if (err) {
			console.log(err);
			res.redirect("/");
		} else {
			var seriesDocs = JSON.parse(data.body).document;
			res.render("upload", {title: _title, subTitle: "upload", loggedIn: loggedIn, firstName: req.session.firstName, userSeries: seriesDocs});
		}
	});
}