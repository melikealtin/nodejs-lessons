const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb://127.0.0.1:27017/test';

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.error('error: ' + err);
  });


  const blogSchema = new mongoose.Schema({
    title: String, 
  });


  const Blog = mongoose.model('Blog', blogSchema);

  const test =  Blog({title: 'test'})

  test.save().then(result => console.log(result)).catch(err => console.log(err))


