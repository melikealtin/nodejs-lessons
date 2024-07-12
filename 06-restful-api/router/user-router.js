const router = require("express").Router();
const User = require("../models/user-model");

router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

router.get("/:id", (req, res) => {
  res.json({
    message: "The user with id " + req.params.id + " will be listed",
  });
});

router.post("/", async (req, res) => {

  try {
    const user = new User(req.body);
    const result = await user.save();
    res.json(result);
  } catch (err) {
    console.log("user save error: ", err);
  }

});

router.patch("/:id", async (req, res) => {

  try {
    const result = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (result) {
      return res.json(result);
    } else {
      return res.status(404).json({
        message: "user could not be found",
      });
    }
  } catch (e) {
    console.log("user update error", e);
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

      const errorObject =  new Error("user could not be found")
      errorObject.errorCode = 404

      throw errorObject 
      // return res.status(404).json({
      //   message: "user could not be found and deleted",
      // });
    }
  } catch (e) {

     next(e)
  }
  
});

module.exports = router;
