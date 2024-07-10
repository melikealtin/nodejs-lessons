const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DATABASE_URL = "mongodb://127.0.0.1:27017/test";

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.error("error: " + err);
  });

//   const schema = new Schema({ name : 'String'})
//   console.log(schema.path('name') instanceof mongoose.SchemaType );
//   console.log(schema.path('name') instanceof mongoose.Schema.Types.String );
//   console.log(schema.path('name').instance);

////////////////////////////

// const numberSchema = new Schema({
//     integerOnly: {
//         type: Number,
//         get: v => {
//             console.log('get v: ' , v);
//             return Math.round(v) + 1
//         },
//         set: v => {
//             console.log('set v: ', v);
//             return Math.round(v) + 5
//         },
//         alias: 'i'
//     }
// })

// const NumberModel = mongoose.model('NumberModel', numberSchema)

// const doc = new NumberModel()
// doc.integerOnly = 1.002
// console.log(doc.integerOnly);
// console.log(doc.i);
// doc.i = 14.005

////////////////////////////

// const textSchema = new Schema({
//     text: {
//         type:Schema.Types.String,
//         required:true,
//         trim: true,
//         lowercase: true,
//         minlength: 4,
//         maxlength: 50,
//         enum: ['melo', 'nunu', 'ummu'],
//         validate: {
//             validator: function (v) {
//                 return v.length > 2
//             },
//             message: 'err'
//         }
//     }
// })

// const Text = new mongoose.model('Text', textSchema)
// const t1 = Text({ text: '    mel     '})
// t1.save()

////////////////////////////

// const toySchema = new Schema({
//   name: String,
// });

// const toyBoxSchema = new Schema({
//   toys: {
//     type: [toySchema],
//     default: undefined,
//   },
//   toyColors: [String],
// });

// const ToyBox = mongoose.model("ToyBox", toyBoxSchema);

// const myToyBox = new ToyBox();
// myToyBox.toys = [{ name: "test1" }, { name: "test2" }];
// myToyBox.toyColors = ['red', 'blue'];
// console.log(myToyBox);

// myToyBox.save()

////////////////////////////

const root = 'https://mongoosejs.com'

const userSchema = new Schema({
    name: String,
    picture: {
        type: String,
        get: v => `${root}${v}`
    }
})

const User = mongoose.model('User', userSchema)

const doc = new User({name: 'Val', picture: '/123.png'})
console.log(doc.picture);
console.log(doc.toObject({getters: true}));
