var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pretty = require('express-prettify');

var app = express();
//Connect to MongoDB
var mongoose = require('mongoose');
var mongoDB = '';
if(process.env.NODE_ENV === 'production'){
  mongoDB = 'mongodb://admin:admin@ds221258.mlab.com:21258/node-project-db';
} else {
  mongoDB = 'mongodb://localhost:27017/data';
}
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Routes import
var index = require('./routes/index');
var catalog = require('./routes/catalog');

//Middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pretty({ query: 'pretty' }));

app.use('/', index);
app.use('/catalog', catalog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
