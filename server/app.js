var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var app = express();

var indexRouter = require('./routes/index');

app.use(session({
  secret: 'esports physician',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

mongoose.connect('mongodb://127.0.0.1/gamelister');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});


module.exports = app;