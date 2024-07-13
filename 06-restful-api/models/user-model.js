const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('@hapi/joi')

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
        trim:true,
    }
}, {collection:"users", timestamps:true })

const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().trim()
})

//for create user
UserSchema .methods.validation = function(userObject) {
    return schema.required().validate(userObject);
}

//for update user
UserSchema .statics.validationForUpdate = function(userObject) {
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