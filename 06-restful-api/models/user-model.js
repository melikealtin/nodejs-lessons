const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('@hapi/joi')

const userSchema = new Schema({
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


userSchema.methods.validation = function(userObject) {
    
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).trim().required(),
        userName: Joi.string().min(3).max(50).trim().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required()
    })

    return schema.validate(userObject)
}

const User = mongoose.model('User',userSchema)

module.exports = User