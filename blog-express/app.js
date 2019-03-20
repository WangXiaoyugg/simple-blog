const createError = require('http-errors')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session)
// var index = require('./routes/index');
// var users = require('./routes/users');
const blog = require('./routes/blog');
const user = require('./routes/user');

const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
})

var app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'garen_123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // path: '/',
    // httpOnly: true,
    expires: new Date().getTime() + 24 * 60 * 60 * 1000,
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: sessionStore,
}))
// app.use('/', index);
// app.use('/users', users);
app.use('/api/blog', blog);
app.use('/api/user', user);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, '404 Not Found'))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
