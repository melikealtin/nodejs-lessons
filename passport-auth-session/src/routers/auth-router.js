const router = require("express").Router();
const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const validatorMiddleware = require("../middlewares/validation-middleware");

router.get(
  "/login",
  authMiddleware.checkNotAuthenticated,
  authController.showLoginForm
);
router.post(
  "/login",
  authMiddleware.checkNotAuthenticated,
  validatorMiddleware.validateLogin(),
  authController.login
);

router.get(
  "/register",
  authMiddleware.checkNotAuthenticated,
  authController.showRegisterForm
);
router.post(
  "/register",
  authMiddleware.checkNotAuthenticated,
  validatorMiddleware.validateNewUser(),
  authController.register
);

router.get(
  "/forgot-password",
  authMiddleware.checkNotAuthenticated,
  authController.showForgotPasswordForm
);
router.post(
  "/forgot-password",
  authMiddleware.checkNotAuthenticated,
  authController.forgotPassword
);

router.get("/logout", authController.logout);

module.exports = router;
