const router = require("express").Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const multerConfig = require("../config/multer-config");

router.get("/", authMiddleware.isAuthenticated, adminController.showHomePage);
router.get(
  "/profile",
  authMiddleware.isAuthenticated,
  adminController.showProfilePage
);
router.post(
  "/update-profile",
  authMiddleware.isAuthenticated,
  multerConfig.single("avatar"),
  adminController.updateProfile
);

module.exports = router;
