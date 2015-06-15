var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy   = require('passport-local').Strategy;
// var User = require('../app/models/user.server.model')

module.exports = function() {
  var User = mongoose.model('User');

  // determines what data from the user object should be stored in the session
  //result of serializeUser method is attached to the session as req.session.passport.user
  passport.serializeUser(function(user, done) {
    // the key of the user object provided in the second argument is used to retrieve the whole object via a deserialize function
    done(null, user.id);
  });


  // pass in key that is saved in req.session.passport.user -- this key is used to retrieve the user object
  //attaches the user object to the request as req.user
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, function(err, user) {
      done(err, user);
    });
  });

  // require the lcoal authentication strategy
  require('./strategies/local.js')();
};

