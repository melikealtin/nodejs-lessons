const router = require("express").Router();
const adminController = require("../controllers/admin-controller");

router.get("/", adminController.showHomePage);

module.exports = router;
