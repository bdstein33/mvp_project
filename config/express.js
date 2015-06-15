var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var busboy = require('connect-busboy');

module.exports = function() {
  var app = express();

  // add logging if in development mode
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    // production settings
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));


  app.engine('.hbs', exphbs({layout: 'false', extname : '.hbs'}));  // assign hbs to app engine
  app.set('views', './app/views'); // tells express where view files are located
  app.set('view engine', '.hbs'); // tells express to use hbs template engine

  app.use(flash());
  app.use(passport.initialize()); // bootstraps the Passport module 
  app.use(passport.session()); // uses Express session to keep track of user's session
  app.use(busboy());

  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/user.server.routes.js')(app);
  require('../app/routes/upload.server.routes.js')(app);

  app.use(express.static('public'));
  // app.use(express.static(__dirname + '/public'));

  return app;
};