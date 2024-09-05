const router = require("express").Router();
const authController = require("../controllers/auth-controller");
const validatorMiddleware = require("../middlewares/validation-middleware");

router.get("/login", authController.showLoginForm);
router.post(
  "/login",
  validatorMiddleware.validateLogin(),
  authController.login
);

router.get("/register", authController.showRegisterForm);
router.post(
  "/register",
  validatorMiddleware.validateNewUser(),
  authController.register
);

router.get("/forgot-password", authController.showForgotPasswordForm);
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;
