var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');
 
 module.exports = function() {
  passport.use(new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    User.findOne({ 'email' : email}, function(err, user) {
      if (err) return done(err);

      if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'));

      if (!user.authenticate(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      return done(null, user);
    });
  }));
 };