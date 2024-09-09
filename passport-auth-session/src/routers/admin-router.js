const router = require("express").Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/", authMiddleware.isAuthenticated, adminController.showHomePage);

module.exports = router;
