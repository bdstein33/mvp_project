var user = require('../../app/controllers/user.server.controller');
var passport = require('passport');
module.exports = function(app) {
  app.route('/users')
    .post(user.create)
    .get(user.list);

  app.route('/users/:userId')
    // .get(user.read)
    .put(user.update);
    // .delete(user.delete);

  app.route('/signup')
    .get(user.renderSignup)
    .post(user.signup);

  app.route('/signin')
    .get(user.renderSignin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
  }));

 

  app.get('/signout', user.signout);

  // app.param('userId', user.userByID);
};