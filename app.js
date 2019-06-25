// require necessary packages
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// define path to routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var yearsRouter = require('./routes/years');
var agesRouter = require('./routes/ages');
var searchRouter = require('./routes/search');
var gendersRouter = require('./routes/genders');
var areasRouter = require('./routes/areas');
var offencesRouter = require('./routes/offences');

// set variable to use express
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up app to use knex
const options = require('./knexfile.js');
const knex = require('knex')(options);
app.use((req, res, next) => {
 req.db = knex
 next()
})

// set routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/years', yearsRouter);
app.use('/ages', agesRouter);
app.use('/search', searchRouter);
app.use('/genders', gendersRouter);
app.use('/areas', areasRouter);
app.use('/offences', offencesRouter);



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
  res.status(err.status || 400).send("oops! it looks like you're missing the offence query parm");
  res.status(err.status || 401).send("oh no! it looks like your authorization token is invalid...");
  res.render('error');

});

module.exports = app;
