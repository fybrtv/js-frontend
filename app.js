var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var routes = require('./routes/index');
var userRoutes = require('./routes/users');
var seriesRoutes = require('./routes/series');

var app = express();
// view engine setup
app.use(express.static('uploads'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', 3000);
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ resave: true,
                  store: new RedisStore({
                    host: '127.0.0.1',
                    port: 6379,
                    prefix: 'sess'
                  }),
                  saveUninitialized: true,
                  secret: 'fybriseverything' }));

app.get('/', routes.homeGET);
app.get('/upload', routes.uploadGET);
app.get('/login', userRoutes.login);
app.post('/login',userRoutes.loginPOST)
app.get('/createAccount', userRoutes.createAccount)
app.post('/createAccount', userRoutes.createAccountPOST)
app.get('/logout', userRoutes.logout);
app.get('/series/:name', seriesRoutes.seriesGET)
app.get('/profileDashboard', userRoutes.profileDashboard);
app.post('/profileDashboard',userRoutes.profileDashboardPOST);
app.get('/becomeCreator',userRoutes.becomeCreator);
app.get('/resignCreator',userRoutes.resignCreator);
app.post('/newSeries',userRoutes.newSeries);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function() {
    console.log("Server listening on port "+app.get('port'));
})
module.exports = app;
