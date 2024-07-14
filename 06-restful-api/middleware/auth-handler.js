const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const auth = async (req, res, next) => {

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const result = jwt.verify(token, "secretkey");
    
    req.user = await User.findById(result._id);
    next();
  } catch (e) {
    next(e);
  }

};

module.exports = auth;
