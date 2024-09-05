const showHomePage = function (req, res, next) {
  res.render("index", { layout: "./layout/auth-layout.ejs" });
};

module.exports = {
  showHomePage,
};
