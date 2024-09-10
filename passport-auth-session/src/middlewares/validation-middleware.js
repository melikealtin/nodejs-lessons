const { body } = require("express-validator");

const validateNewUser = () => {
  return [
    body("email").trim().isEmail().withMessage("enter a valid email"),

    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters")
      .isLength({ max: 20 })
      .withMessage("password must be maximum 20 characters"),

    body("firstName")
      .trim()
      .isLength({ min: 2 })
      .withMessage("firstname must be at least 2 characters")
      .isLength({ max: 30 })
      .withMessage("firstname must be maximum 30 characters"),

    body("lastName")
      .trim()
      .isLength({ min: 2 })
      .withMessage("lastname must be at least 2 characters")
      .isLength({ max: 30 })
      .withMessage("lastname must be maximum 30 characters"),

    body("repeatPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("passwords are not the same");
        }
        return true;
      }),
  ];
};

const validateLogin = () => {
  return [
    body("email").trim().isEmail().withMessage("enter a valid email"),

    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters")
      .isLength({ max: 20 })
      .withMessage("password must be maximum 20 characters"),
  ];
};

const validateEmail = () => {
  return [body("email").trim().isEmail().withMessage("enter a valid email")];
};

const validateNewPassword = () => {
  return [
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters")
      .isLength({ max: 20 })
      .withMessage("password must be maximum 20 characters"),

    body("repeatPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("passwords are not the same");
        }
        return true;
      }),
  ];
};

module.exports = {
  validateNewUser,
  validateLogin,
  validateEmail,
  validateNewPassword,
};
