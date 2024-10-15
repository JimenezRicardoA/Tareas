var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const {
  mongoURL
} = require('./config').variablesdeconfiguracion;

const databaseUrl = mongoURL;
//const databaseUrl = "mongodb+srv://ElmeroBueno:MN12Lk45@jimenezriardo.0ntna.mongodb.net/tareas";

mongoose.connect(databaseUrl, { 
  useNewUrlParser: true,
})
mongoose.connection.on('open', function(){
  console.log("connection Ok")
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var listadorouter = require('./routes/listado');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/listado', listadorouter);

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
  res.render('error');
});

module.exports = app;