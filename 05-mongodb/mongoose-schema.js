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

  const blogSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number
    }
  },{collection: 'mytexts', minimize:false, bufferCommands:true, timestamps:true});

blogSchema.methods.showTitle = function () {
    return this.title
}

blogSchema.statics.getItemByTitle = function (name) {
    return this.find({title:name})
}

blogSchema.virtual('summary').get(function () {
    return "The title of this blog is: " + this.title + " and author: " + this.author
})


  const Blog = mongoose.model('blog', blogSchema)
  const myBlog = new Blog({ title: 'second blog'})

  console.log(myBlog.showTitle());

//   myBlog.save().then(result=> console.log(result)).catch(err=> console.log(err))

//   Blog.create({ title: 'third blog'})
//   Blog.getItemByTitle('third blog').then(res => console.log(res))


const virtualBlog = new Blog({ title: 'Virtual Blog', author: 'melike altın'})
console.log(virtualBlog.summary);
console.log(virtualBlog.toJSON({virtuals:true}));

virtualBlog.save()