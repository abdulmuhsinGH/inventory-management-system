require ("./api/model/db.js");

var express = require('express');
var path = require('path');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');





var index = require('./api/routes/index');
var product = require('./api/routes/product');
var supplier = require('./api/routes/supplier');
var customer = require('./api/routes/customer');
var inventory = require('./api/routes/inventory');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
 // uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('port', 5000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(session({
  secret: 'inventory',
  resave: true,
  saveUninitialized: true
}))
//app.use(passport.initialize());
//app.use(passport.session());




//
// //// Initialize Passport
// //var initPassport = require('./passport-init');
/*passport.use(new LocalStrategy());
passport.serializeUser(Model.serializeUser());
passport.deserializeUser(Model.deserializeUser());*/
// //initPassport(passport);
//




app.use('/', index);

app.use('/product', product);
app.use('/supplier', supplier);
app.use('/customer', customer);
app.use('/inventory', inventory);
// app.use('/api', api);
//app.use('/auth', authenticate);
//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//
// // error handlers
//
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
       .json(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
     .json({state: 'failure', user: null, message: "Oops! Something went wrong!!"});
});
//
//
//module.exports = app;
var server = app.listen(process.env.PORT || app.get('port'),function () {
    // body...
    var port = server.address().port;
    console.log('Magic happens on port '+ port);
});


module.exports = app;
