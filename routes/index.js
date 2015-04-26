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
    res.render("upload", {
        title: _title,
        subTitle: "upload",
        loggedIn: loggedIn,
        firstName: req.session.firstName
    });
}