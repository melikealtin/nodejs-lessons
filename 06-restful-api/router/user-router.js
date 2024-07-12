const router = require("express").Router();
const User = require("../models/user-model");
var createError = require("http-errors");

router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

router.get("/:id", (req, res, next) => {

  res.json({
    message: "The user with id " + req.params.id + " will be listed",
  });

});

router.post("/", async (req, res, next) => {
  
  try {
    const user = new User(req.body);

    const { error, value } = user.validation(req.body);
    if (error) {
      next(createError(400, error));
    } else {
      const result = await user.save();
      res.json(result);
    }
  } catch (err) {
    next(err);
    console.log("user save error: ", err);
  }

});

router.patch("/:id", async (req, res, next) => {

  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (result) {
      return res.json(result);
    } else {
      return next(createError(404, "User could not be found"));
    }
  } catch (e) {
    next(createError(400, e));
  }

});

router.delete("/:id", async (req, res, next) => {

  try {
    const result = await User.findByIdAndDelete({ _id: req.params.id });

    if (result) {
      return res.json({
        message: "user deleted",
      });
    } else {
      // const errorObject = new Error("user could not be found");
      // errorObject.errorCode = 404;

      throw createError(404, "user could not be found");
      // return res.status(404).json({
      //   message: "user could not be found and deleted",
      // });
    }
  } catch (e) {
    next(createError(400, e));
  }
  
});

module.exports = router;
