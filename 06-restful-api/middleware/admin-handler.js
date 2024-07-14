const admin = (req, res, next) => {

  if (req.user && !req.user.isAdmin) {
    return res.status(403).json({
      message: "access denied, you are not admin",
    });
  }
  next()
};

module.exports = admin;
