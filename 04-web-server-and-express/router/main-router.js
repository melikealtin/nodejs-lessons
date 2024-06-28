const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("home page");
    res.send("hello from index !");
  });

module.exports = router

