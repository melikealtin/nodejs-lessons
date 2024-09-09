const { validationResult } = require("express-validator");
const User = require("../model/user-model");
const passport = require("passport");
require("../config/passport-local")(passport);

const showLoginForm = (req, res, next) => {
  res.render("login", { layout: "./layout/auth-layout.ejs" });
};

const login = (req, res, next) => {
  // console.log(req.body);
  const errors = validationResult(req);

  req.flash("email", req.body.email);
  req.flash("password", req.body.password);

  if (!errors.isEmpty()) {
    req.flash("validation_error", errors.array());

    res.redirect("/login");
  } else {
    passport.authenticate("local", {
      successRedirect: "/admin",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }
};

const showRegisterForm = (req, res, next) => {
  res.render("register", { layout: "./layout/auth-layout.ejs" });
};

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("validation_error", errors.array());
    req.flash("email", req.body.email);
    req.flash("firstName", req.body.firstName);
    req.flash("lastName", req.body.lastName);
    req.flash("password", req.body.password);
    req.flash("repeatPassword", req.body.repeatPassword);

    res.redirect("/register");
  } else {
    try {
      const _user = await User.findOne({ email: req.body.email });

      if (_user) {
        req.flash("validation_error", [{ msg: "this mail is being used" }]);
        req.flash("email", req.body.email);
        req.flash("firstName", req.body.firstName);
        req.flash("lastName", req.body.lastName);
        req.flash("password", req.body.password);
        req.flash("repeatPassword", req.body.repeatPassword);
        res.redirect("/register");
      } else {
        const newUser = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
        });

        await newUser.save();
        // console.log("user registered");

        req.flash("success_message", [{ msg: "you can login" }]);
        res.redirect("/login");
      }
    } catch (e) {
      console.error(e);
      res.redirect("/register");
    }
  }
};

const showForgotPasswordForm = (req, res, next) => {
  res.render("forgot-password", { layout: "./layout/auth-layout.ejs" });
};

const forgotPassword = (req, res, next) => {
  console.log(req.body);
  res.render("forgot-password", { layout: "./layout/auth-layout.ejs" });
};

const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      // req.flash("success_message", [{ msg: "successfully exited" }]);
      // res.render("login", {
      //   layout: "./layout/auth-layout.ejs",
      //   success_message: [{ msg: "successfully exited" }],
      // });
      // res.send("exit made");
      res.redirect("/login");
    });
  });
};

module.exports = {
  showLoginForm,
  showRegisterForm,
  showForgotPasswordForm,
  register,
  login,
  forgotPassword,
  logout,
};
