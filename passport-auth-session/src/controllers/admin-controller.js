const User = require("../model/user-model");

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

const updateProfile = async (req, res, next) => {
  const currentInformation = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  try {
    if (req.file) {
      currentInformation.avatar = req.file.filename;
      console.log(currentInformation);
    }

    const result = await User.findByIdAndUpdate(
      req.user.id,
      currentInformation
    );

    if (result) {
      console.log("updated");
      res.redirect("/admin/profile");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  showHomePage,
  showProfilePage,
  updateProfile,
};
