const router = require("express").Router();
const authHandler = require('../middleware/auth-handler')
const adminHandler = require('../middleware/admin-handler')
const UserController = require('../controllers/user-controller')

//make all users view only admin
router.get("/", [authHandler, adminHandler], UserController.allUsersList);

//logged in user lists users
router.get("/me",  authHandler, UserController.userInfo);

//logged in user performs the update process
router.patch("/me", authHandler, UserController.loggedInUserUpdate);

//create new user
router.post("/", UserController.createNewUser);

router.post('/login', UserController.login)

//admin user update
router.patch("/:id", UserController.adminUserUpdate);

//logged in user deletes itself
router.delete("/me", authHandler, UserController.deleteUserSelf);

//if admin wants to delete a person
router.delete("/:id", [authHandler,adminHandler], UserController.adminDeleteUser);

router.get("/deleteAll", [authHandler, adminHandler], UserController.allUsersDelete);

module.exports = router;
