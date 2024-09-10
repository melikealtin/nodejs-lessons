const { validationResult } = require("express-validator");
const User = require("../model/user-model");
const passport = require("passport");
require("../config/passport-local")(passport);
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

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

      if (_user && _user.emailActive == true) {
        req.flash("validation_error", [{ msg: "this mail is being used" }]);
        req.flash("email", req.body.email);
        req.flash("firstName", req.body.firstName);
        req.flash("lastName", req.body.lastName);
        req.flash("password", req.body.password);
        req.flash("repeatPassword", req.body.repeatPassword);
        res.redirect("/register");
      } else if ((_user && _user.emailActive == false) || _user == null) {
        if (_user) {
          await User.findByIdAndDelete({ _id: _user._id });
        }

        const newUser = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: await bcrypt.hash(req.body.password, 10),
        });

        await newUser.save();
        console.log("user registered");

        //jwt
        const jwtInformation = {
          id: newUser.id,
          mail: newUser.email,
        };

        const jwtToken = jwt.sign(
          jwtInformation,
          process.env.CONFIRM_MAIL_JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        console.log(jwtToken);

        //mail send

        const url = process.env.WEB_SITE_URL + "verify?id=" + jwtToken;
        console.log("url: " + url);

        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
          },
        });

        await transporter.sendMail(
          {
            from: "Nodejs app <info@nodejscourse.com",
            to: newUser.email,
            subject: "please confirm your email",
            text: "please click on this link to confirm your email: " + url,
          },
          (error, info) => {
            if (error) {
              console.log("there is a error" + error);
            }
            console.log("mail sent");
            console.log(info);
            transporter.close();
          }
        );

        req.flash("success_message", [{ msg: "please check your mailbox" }]);
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

const forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("validation_error", errors.array());
    req.flash("email", req.body.email);

    res.redirect("/forgot-password");
  }

  //if this works the user has entered a correct email
  else {
    try {
      const _user = await User.findOne({
        email: req.body.email,
        emailActive: true,
      });

      if (_user) {
        const jwtInformation = {
          id: _user._id,
          email: _user.email,
        };

        const secret =
          process.env.RESET_PASSWORD_JWT_SECRET + "-" + _user.password;

        const jwtToken = jwt.sign(jwtInformation, secret, {
          expiresIn: "1d",
        });

        const url =
          process.env.WEB_SITE_URL +
          "reset-password/" +
          _user._id +
          "/" +
          jwtToken;
        console.log("url: " + url);

        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
          },
        });

        await transporter.sendMail(
          {
            from: "Nodejs app <info@nodejscourse.com",
            to: _user.email,
            subject: "password update",
            text: "please click on this link to update your password: " + url,
          },
          (error, info) => {
            if (error) {
              console.log("there is a error" + error);
            }
            console.log("mail sent");
            console.log(info);
            transporter.close();
          }
        );

        req.flash("success_message", [{ msg: "please check your mailbox" }]);
        res.redirect("/login");
      } else {
        req.flash("validation_error", [
          { msg: "this mail is not registered or the user is inactive" },
        ]);
        req.flash("email", req.body.email);
        res.redirect("forgot-password");
      }
    } catch (e) {}
  }
  // res.render("forgot-password", { layout: "./layout/auth-layout.ejs" });
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

const verifyMail = (req, res, next) => {
  const token = req.query.id;

  if (token) {
    try {
      jwt.verify(
        token,
        process.env.CONFIRM_MAIL_JWT_SECRET,
        async (e, decoded) => {
          if (e) {
            req.flash("error", "the code is incorrect or expired");
            res.redirect("/login");
          } else {
            const tokenID = decoded.id;
            const result = await User.findByIdAndUpdate(tokenID, {
              emailActive: true,
            });

            if (result) {
              req.flash("success_message", [
                { msg: "mail successfully confirmed" },
              ]);
              res.redirect("/login");
            } else {
              req.flash("error", [{ msg: "please create a new user" }]);
              res.redirect("/login");
            }
          }
        }
      );
    } catch (err) {}
  } else {
    req.flash("error", "token is missing or invalid");
    res.redirect("/login");
  }
};

const saveNewPassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("validation_error", errors.array());
    req.flash("password", req.body.password);
    req.flash("repeatPassword", req.body.repeatPassword);

    console.log("values from form");
    console.log(req.body);

    res.redirect("/reset-password/" + req.body.id + "/" + req.body.token);
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await User.findByIdAndUpdate(req.body.id, {
      password: hashedPassword,
    });

    if (result) {
      req.flash("success_message", [{ msg: "password successfully updated" }]);
      res.redirect("/login");
    } else {
      req.flash("error", [{ msg: "please create a new password" }]);
      res.redirect("/login");
    }
  }
};

const showNewPasswordForm = async (req, res, next) => {
  const linkID = req.params.id;
  const linkToken = req.params.token;

  if (linkID && linkToken) {
    const _foundUser = await User.findOne({ _id: linkID });
    const secret =
      process.env.RESET_PASSWORD_JWT_SECRET + "-" + _foundUser.password;

    try {
      jwt.verify(linkToken, secret, async (e, decoded) => {
        if (e) {
          req.flash("error", "the code is incorrect or expired");
          res.redirect("/forgot-password");
        } else {
          res.render("new-password", {
            id: linkID,
            token: linkToken,
            layout: "./layout/auth-layout.ejs",
          });

          // const tokenID = decoded.id;
          // const result = await User.findByIdAndUpdate(tokenID, {
          //   emailActive: true,
          // });

          // if (result) {
          //   req.flash("success_message", [
          //     { msg: "mail successfully confirmed" },
          //   ]);
          //   res.redirect("/login");
          // } else {
          //   req.flash("error", [{ msg: "please create a new user" }]);
          //   res.redirect("/login");
          // }
        }
      });
    } catch (err) {}
  } else {
    req.flash("validation_error", [
      { msg: "please click the link in the mail. token not found" },
    ]);
    req.flash("email", req.body.email);
    res.redirect("forgot-password");
  }
};

module.exports = {
  showLoginForm,
  showRegisterForm,
  showForgotPasswordForm,
  register,
  login,
  forgotPassword,
  logout,
  verifyMail,
  showNewPasswordForm,
  saveNewPassword,
};
