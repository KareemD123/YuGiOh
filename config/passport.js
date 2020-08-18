const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const cards = require("../models/card");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      cards.findOne({ googleId: profile.id }, function (err, cards) {
        if (err) return cb(err);
        if (cards) {
          return cb(null, cards);
        } else {
          var newUser = new UserLogin({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          newUser.save(function (err) {
            if (err) return cb(err);
            return cb(null, newUser);
          });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Student.findById(id, function (err, user) {
    done(err, user);
  });
});
