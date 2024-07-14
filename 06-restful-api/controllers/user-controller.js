const User = require('../models/user-model')
const createError = require("http-errors");
const bcrypt = require('bcrypt')

const allUsersList =  async (req, res) => {
    const allUsers = await User.find({});
    res.json(allUsers);
} 

const userInfo = (req, res, next) => {
    res.json(req.user)
}

const loggedInUserUpdate =  async (req, res, next) => {

    delete req.body.createdAt;
    delete req.body.updatedAt;
  
    if(req.body.hasOwnProperty('password')) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }
  
    const { error, value } = User.validationForUpdate(req.body);
    if (error) {
      next(createError(400, error));
    } else {
  
      try {
        const result = await User.findByIdAndUpdate(
          { _id: req.user._id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (result) {
          return res.json(result);
        } else {
          return res.status(404).json({
            message: "user could not found",
          });
        }
      } catch (e) {
        next(e);
      }
    }
    
  }

const createNewUser =  async (req, res, next) => {
  
    try {
      const user = new User(req.body);
      user.password = await bcrypt.hash(user.password,10)
  
      const { error, value } = user.validation(req.body);
      if (error) {
        next(createError(400, error));
      } else {
        const result = await user.save();
        res.json(result);
      }
    } catch (err) {
      next(err);
      console.log("user save error: ", err);
    }
  
  }


const login = async (req, res, next) => {

    try {
      const user = await User.login(req.body.email, req.body.password)
      const token = await user.generateToken()
      res.json({
        user,token
      })
      
    } catch(error) {
      next(error)
    }
  
  }

const adminUserUpdate = async (req, res, next) => {

    delete req.body.createdAt;
    delete req.body.updatedAt;
  
    if(req.body.hasOwnProperty('password')) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }
  
    const { error, value } = User.validationForUpdate(req.body);
    if (error) {
      next(createError(400, error));
    } else {
  
      try {
        const result = await User.findByIdAndUpdate(
          { _id: req.params.id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (result) {
          return res.json(result);
        } else {
          return res.status(404).json({
            message: "user could not found",
          });
        }
      } catch (e) {
        next(e);
      }
    }
  }


const allUsersDelete = async (req, res, next) => {

    try {
      const result = await User.deleteMany({isAdmin:false})
  
      if (result) {
        return res.json({
          message: "all users deleted",
        });
      } else {
        // const errorObject = new Error("user could not be found");
        // errorObject.errorCode = 404;
  
        throw createError(404, "user could not be found");
        // return res.status(404).json({
        //   message: "user could not be found and deleted",
        // });
      }
    } catch (e) {
      next(createError(400, e));
    }
  }

const deleteUserSelf = async (req, res, next) => {

    try {
      const result = await User.findByIdAndDelete({ _id: req.user._id });
  
      if (result) {
        return res.json({
          message: "user deleted",
        });
      } else {
        // const errorObject = new Error("user could not be found");
        // errorObject.errorCode = 404;
  
        throw createError(404, "user could not be found");
        // return res.status(404).json({
        //   message: "user could not be found and deleted",
        // });
      }
    } catch (e) {
      next(createError(400, e));
    }
    
  }

const adminDeleteUser = async (req, res, next) => {

    try {
      const result = await User.findByIdAndDelete({ _id: req.params.id });
  
      if (result) {
        return res.json({
          message: "user deleted",
        });
      } else {
        // const errorObject = new Error("user could not be found");
        // errorObject.errorCode = 404;
  
        throw createError(404, "user could not be found");
        // return res.status(404).json({
        //   message: "user could not be found and deleted",
        // });
      }
    } catch (e) {
      next(createError(400, e));
    }
    
  }  
  
module.exports = {
    allUsersList,
    userInfo,
    loggedInUserUpdate,
    createNewUser,
    login,
    adminUserUpdate,
    allUsersDelete,
    deleteUserSelf,
    adminDeleteUser
}