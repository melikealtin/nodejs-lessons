const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user-model");
const bcrypt = require("bcrypt");

module.exports = function (passport) {
  const options = {
    usernameField: "email",
    passwordField: "password",
  };

  passport.use(
    new LocalStrategy(options, async (email, password, done) => {
      try {
        const _user = await User.findOne({ email: email });

        if (!_user) {
          return done(null, false, { message: "user not found" });
        }

        const passwordControl = await bcrypt.compare(password, _user.password);
        if (!passwordControl) {
          return done(null, false, { message: "password incorrect" });
        } else {
          if (_user && _user.emailActive == false) {
            return done(null, false, {
              message: "please confirm your email",
            });
          } else {
            return done(null, _user);
          }
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    console.log("recorded in session" + user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
