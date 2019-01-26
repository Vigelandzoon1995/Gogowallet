var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var gpsRouter = require('./routes/coordinate');
var contactRouter = require('./routes/contact')
var budgetRouter = require('./routes/budget')
var transactionRouter = require('./routes/transaction')
var solenoidRouter = require('./routes/solenoid');



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
var https = require('https');



//If the command is ran using a jasmine instance, use the test port 4444
//So It won't disturb the pm2 instance running on 3333
if (process.argv[1].includes("jasmine.js")) {
  http.createServer(app).listen(4444, "0.0.0.0");
  console.log("running jasmine test environment at port 4444");
} else if (process.argv[2] != null && process.argv[2].includes("--local")) {
  http.createServer(app).listen(80, "::");
  console.log("running at port 3333");
} else {
  var privateKey = fs.readFileSync('../privkey.pem', 'utf8');
  var certificate = fs.readFileSync('../cert.pem', 'utf8');
  https.createServer({ key: privateKey, cert: certificate }, app).listen(3333, "::");
  console.log("https running at port 3333");
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
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/gps', gpsRouter);
app.use('/budget', budgetRouter)
app.use('/transaction', transactionRouter)
app.use('/contact', contactRouter);
app.use('/solenoid', solenoidRouter);

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


