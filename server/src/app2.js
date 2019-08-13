var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routes = require('./routes/index');
var catalog = require('./routes/catalog');

var app = express();

app.set('view engine','ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/catalog', catalog);

// catch 400 and forward to error handler
app.use(function(req, res, next) {
  next(createError(400,'BAD REQUEST - ROUT NOT FOUND'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status);

  switch(err.status) {

	case 400:
		// render the error page
  
		res.render('error');
	break;
	case 404: // Not found the Data on the Database
		
		res.json({ error: { status: err.status, message: `NOT FOUND - ${err.message}`}});
  }

});

module.exports = app;
