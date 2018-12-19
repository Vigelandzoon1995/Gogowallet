var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');


var app = express();

var mysql = require("mysql");
var fs = require('fs');

var obj = JSON.parse(fs.readFileSync('../dbconnection.json', 'utf8'));

const db = mysql.createConnection(obj);

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;

var http = require('http');

//If the command is ran using a jasmine instance, use the test port 4444
//So It won't disturb the pm2 instance running on 3333
if (process.argv[1].includes("jasmine.js")) {
  http.createServer(app).listen(4444, "0.0.0.0");
  console.log("running jasmine test environment at port 4444");
} else {
  http.createServer(app).listen(3333, "::");
  console.log("running at port 3333");
}

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set the routes that are allowed to be used
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

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
  res.render('error');
});

module.exports = app;


