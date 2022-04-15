var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
const dotenv = require('dotenv');
var fileupload = require('express-fileupload')

dotenv.config({path:'./.env'});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');
var authRouter = require('./routes/auth/index')
var postsRouter = require('./routes/posts')
var noticesRouter = require('./routes/notices');
var notesRouter = require('./routes/notes');
var notesMainRouter = require('./routes/notes_main');
var pdfRouter = require('./routes/pdf');
const bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Connect

// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE
// })

// db.connect((err) => {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log("Database Connected");
//   }
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/posts',postsRouter);
app.use('/notices',noticesRouter);
app.use('/profile',profileRouter);
app.use('/notes',notesRouter);
app.use('/notes_year',notesMainRouter);
app.use('/pdf',pdfRouter);


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
