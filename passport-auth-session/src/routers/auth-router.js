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
  validatorMiddleware.validateEmail(),
  authController.forgotPassword
);

router.get("/verify", authController.verifyMail);

router.get("/reset-password/:id/:token", authController.showNewPasswordForm);
router.get("/reset-password", authController.showNewPasswordForm);
router.post(
  "/reset-password",
  validatorMiddleware.validateNewPassword(),
  authController.saveNewPassword
);

router.get("/logout", authController.logout);

module.exports = router;
