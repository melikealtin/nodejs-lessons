const express = require("express")
const router = express.Router()

router.use((req, res) => {
    res.send("404 page not found");
  });

module.exports = router
