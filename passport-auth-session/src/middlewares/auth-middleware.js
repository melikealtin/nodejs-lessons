const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", ["please sign in"]);
    res.redirect("/login");
  }
};

const checkNotAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/admin");
  }
};

module.exports = {
  isAuthenticated,
  checkNotAuthenticated,
};
