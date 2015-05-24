var request = require("request");
_title = "fybr";
_firstName = "";
_type = "0";
_msg = "";

exports.homeGET = function(req, res) {
    var currentChannel = req.query.ch || "Comedy";
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
            console.log('channels', JSON.parse(body).document);

            for (var i = 0; i<JSON.parse(body).document.length; i++) {
                if (JSON.parse(body).document[i].channelName == currentChannel) {
                    var currentChannelId = JSON.parse(body).document[i]._id;
                    break;
                }
            }

            request.get("http://localhost:5000/timelines/"+currentChannelId, function(err, response1, body1) {
                if (err) {
                    console.log(err);
                    err.status = 404;
                    res.render("error", {error: err});
                } else {
                    console.log("No err;");
                    var data = JSON.parse(body1);

                    var renderData;
                    var isCreatorCurrentlyAiring = false;
                    if(data.creatorId === req.session.userId){
                        isCreatorCurrentlyAiring = true;
                    }
                    if (typeof data.fileId == "undefined") {
                        console.log("No timeline found")
                        renderData = {
                            title: _title,
                            subTitle: "home",
                            seriesId: 1345,
                            type: req.session.type || undefined,
                            firstName: req.session.firstName || undefined,
                            userId: 3,
                            msg: "Could not find videos at this time. Try again later...",
                            channels: JSON.parse(body).document,
                            currentChannelId: currentChannelId,
                            loggedIn: loggedIn,
                            isCreator: isCreatorCurrentlyAiring
                        }
                    } else {
                        console.log("timeline found")

                        var videoInfo = {
                            ts_index: data.ts_index,
                            tl_index: data.tl_index,
                            fileId: data.fileId,
                            start: data.start
                        };

                        renderData = {
                            title: _title,
                            subTitle: "home",
                            type: req.session.type || undefined,
                            firstName: req.session.firstName || undefined,
                            msg: _msg || null,
                            channels: JSON.parse(body).document,
                            loggedIn: loggedIn,
                            currentChannel: currentChannel,
                            currentChannelId: currentChannelId,
                            videoInfo: videoInfo,
                            seriesId: data.seriesId,
                            isCreator: isCreatorCurrentlyAiring
                        };
                    }

                    console.log(renderData)
                    res.render("home", renderData); 
                    delete _msg
                }   
            })
            
        } else {
            _msg = "Server malfunction";
            res.render("error", {error: error});
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