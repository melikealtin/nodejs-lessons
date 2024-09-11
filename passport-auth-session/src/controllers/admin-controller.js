const showHomePage = (req, res, next) => {
  res.render("index", { layout: "./layout/admin-layout.ejs" });
};

const showProfilePage = (req, res, next) => {
  console.log(req.user);
  res.render("profile", {
    user: req.user,
    layout: "./layout/admin-layout.ejs",
  });
};

module.exports = {
  showHomePage,
  showProfilePage,
};
