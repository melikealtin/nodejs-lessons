const { validationResult } = require("express-validator");

const showLoginForm = (req, res, next) => {
  res.render("login", { layout: "./layout/auth-layout.ejs" });
};

const login = (req, res, next) => {
  console.log(req.body);
  res.render("login", { layout: "./layout/auth-layout.ejs" });
};

const showRegisterForm = (req, res, next) => {
  res.render("register", { layout: "./layout/auth-layout.ejs" });
};

const register = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render("register", {
      layout: "./layout/auth-layout.ejs",
      errors: errors.array(),
    });
  }
};

const showForgotPasswordForm = (req, res, next) => {
  res.render("forgot-password", { layout: "./layout/auth-layout.ejs" });
};

const forgotPassword = (req, res, next) => {
  console.log(req.body);
  res.render("forgot-password", { layout: "./layout/auth-layout.ejs" });
};

module.exports = {
  showLoginForm,
  showRegisterForm,
  showForgotPasswordForm,
  register,
  login,
  forgotPassword,
};
