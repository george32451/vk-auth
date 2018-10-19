const passport = require('passport');

module.exports = function (app) {
  app.get('/auth', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/');
      return;
    }

    res.render('auth', {
      error: req.flash('error')
    });
  });

  app.get('/sign-out', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/vk',
    passport.authenticate('vk', {
      scope: ['friends']
    }),
    (req, res) => {
    });

  app.get('/auth/vk/callback',
    passport.authenticate('vk', {
      failureRedirect: '/auth'
    }),
    (req, res) => {
      res.redirect('/friends');
    });
};
