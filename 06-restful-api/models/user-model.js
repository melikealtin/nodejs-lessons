const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('@hapi/joi')
const createError = require("http-errors");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    name: {
        type:String,
        required:true,
        trim:true,
        minlength: 3,
        maxlength:50
    },
    userName: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength: 3,
        maxlength:50
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password: {
        type:String,
        required:true,
        minlength:6,
        trim:true,
    }
}, {collection:"users", timestamps:true })

const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().min(6).trim()
})

UserSchema.methods.generateToken = async function () {
    const loginUser = this;
    const token = await jwt.sign({_id: loginUser.id}, 'secretkey', {expiresIn:'1h'})
   
    return token
}

//for create user
UserSchema.methods.validation = function(userObject) {
    return schema.required().validate(userObject);
}

UserSchema.statics.login = async (email, password) => {
    
    const {error, value } = schema.validate({email, password})
    if(error) {
        throw createError(400, error)
    }

    const user = await User.findOne({email})

    if(!user) {
        throw createError(400, "e-mail and password incorrect")
    }

    const passwordControl = await bcrypt.compare(password, user.password)

    if(!passwordControl) {
        throw createError(400, "e-mail and password incorrect")
    }

    return user
}

//for update user
UserSchema.statics.validationForUpdate = function(userObject) {
    return schema.validate(userObject)
}

UserSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user._id
    delete user.password
    delete user.createdAt
    delete user.updatedAt
    delete user.__v

    return user
}

const User = mongoose.model('User',UserSchema )

module.exports = User