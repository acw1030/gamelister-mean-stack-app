var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var app = express();

/*let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ratem', {
  userNewUrlParser: true
});*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(__dirname + '/data'));

app.use('api/users', usersRouter);
app.use('api/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send( err );
});


module.exports = app;