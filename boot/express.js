const config = require('nconf');
const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');

module.exports = function (app) {
  app.set('port', config.get('app:port') || 3000);
  app.set('views', path.join(`${__dirname}/..`, 'views'));
  app.set('view engine', 'pug');

  const sessionOptions = config.get('session');

  app.use(morgan('dev'));
  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(cookieParser());
  app.use(session(sessionOptions));
  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());

  if (app.get('env') === 'development') {
    app.use(errorhandler());
  }
};
