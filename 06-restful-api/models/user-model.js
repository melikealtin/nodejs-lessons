const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

const User = mongoose.model('User',userSchema)

module.exports = User