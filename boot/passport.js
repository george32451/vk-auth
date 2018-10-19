const config = require('nconf');
const passport = require('passport');
const AuthVKStrategy = require('passport-vkontakte').Strategy;

passport.use('vk', new AuthVKStrategy({
  clientID: config.get('auth:vk:app_id'),
  clientSecret: config.get('auth:vk:secret'),
  callbackURL: `${config.get('app:url')}/auth/vk/callback`
},
((accessToken, refreshToken, profile, done) => done(null, {
  username: profile.displayName,
  photoUrl: profile.photos.value,
  profileUrl: profile.profileUrl,
  userID: profile.id
})
)));

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((data, done) => {
  try {
    done(null, JSON.parse(data));
  } catch (e) {
    done(err);
  }
});

module.exports = function (app) {
};
