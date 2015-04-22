_title = "fybr"
var request = require("request");

exports.seriesGET = function(req, res) {
	var seriesName = req.params.name;
	request({
		  uri: "http://127.0.0.1:5000/series?name"=seriesName,
		  method: "GET"
		}, function(error, response, body) {
			if (!error) {
				res.render("series", {title: _title, subTitle: "series", sname: body.name});
			} else {
				_msg = "Server malfunction";
				res.redirect('/')
			}

	});
	
}