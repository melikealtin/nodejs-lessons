const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    console.log("about page");
    res.send("hello from about page !");
  });

module.exports = router