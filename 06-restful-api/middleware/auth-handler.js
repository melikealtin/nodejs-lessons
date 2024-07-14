const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const auth = async (req, res, next) => {

  try {
    if (req.header("Authorization")) {
      const token = req.header("Authorization").replace("Bearer ", "");
      const result = jwt.verify(token, "secretkey");
      console.log(await User.findById(result._id));

      const foundUser = await User.findById(result._id);

      if(foundUser) {
        req.user= foundUser
      } else {
        throw new Error("please login in");
      }


      next();
    } else {
      throw new Error("please login in");
    }
  } catch (e) {
    next(e);
  }

};

module.exports = auth;
