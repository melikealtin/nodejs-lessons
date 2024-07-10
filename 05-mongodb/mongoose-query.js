const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DATABASE_URL = "mongodb://127.0.0.1:27017/test1";

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.error("error: " + err);
  });


const userSchema = new Schema({_id:String, age:Number, eyeColor:String, name:String, isActive:Boolean}, {collection: 'user'})
const User = mongoose.model('user', userSchema)

// User.find({age: 25}).countDocuments().then(allUser => console.log(allUser)).catch(err => console.log(err))
// User.find({age: 25}, {name:1 , company:1, _id:0}).then(allUser => console.log(allUser)).catch(err => console.log(err))
// User.find({age: 25}, {name:0, _id:0}).then(allUser => console.log(allUser)).catch(err => console.log(err))

// User.find({age:25})
// .limit(3)
// .skip(3)
// .sort({name:1})
// .select({name:1, address:1})
// .then(users => console.log(users))

// User.findById('668edc65d826555162341af4').then(users => console.log(users))
// User.findOne({age:23}, {name:1, age:1}).then(user => console.log(user))

// Comparison Operators
// $eq (equal)
// $ne (not equal)
// $gt (greater than)
// $gte (greater than or equal)
// $lt (less than)
// $lte (less than or equal)
// $in (in)
// $nin (not in)

// User.find({age: {$lte:30}} , {name:1, age:1}).then(users => console.log(users))

// User.find({}, {name:1, eyeColor:1, age:1, isActive:1})
// .and([{age : {$gte : 25}} , {isActive : true} ])
// .or([{age:29} , {eyeColor:'blue'}]).limit(5).then(users => console.log(users))


// Do pagination
// /api/courses?pageNumber=4&postsPerPage=10

// const pageNumber = 4;
// const postsPerPage = 10;

// User.find({})
//   .skip((pageNumber - 1) * postsPerPage)
//   .limit(postsPerPage)
//   .then(res => console.log(res))
//   .catch(err => console.error(err));


// User.findByIdAndUpdate('668edc65d826555162341af4', {age:30},{new:true}).then(res => console.log(res))

// User.updateOne({index:5}, {eyeColor:"blue"}).then(res => console.log(res))
// User.updateMany({index: {$lt : 4}}, {name:'melike altın', isActive:true}).then(res => console.log(res))
User.deleteMany({index: {$lt : 2}}).then(res => console.log(res))