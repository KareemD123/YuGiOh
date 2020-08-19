// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const cards = require("../models/card");
// console.log(process.env.GOOGLE_CLIENT_ID);
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         "1019942543490-4js73hh0ifro1atk5jvnng8qtrfpk6o0.apps.googleusercontent.com",
//       clientSecret: "hpIa8QETPz4NEScdNKWCRudG",
//       callbackURL: "http://localhost:3000/",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       cards.findOne({ googleId: profile.id }, function (err, cards) {
//         if (err) return cb(err);
//         if (cards) {
//           return cb(null, cards);
//         } else {
//           var newUser = new UserLogin({
//             username: profile.displayName,
//             email: profile.emails[0].value,
//             googleId: profile.id,
//           });
//           newUser.save(function (err) {
//             if (err) return cb(err);
//             return cb(null, newUser);
//           });
//         }
//       });
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   Student.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
