const showHomePage = (req, res, next) => {
  res.render("index", { layout: "./layout/admin-layout.ejs" });
};

module.exports = {
  showHomePage,
};
