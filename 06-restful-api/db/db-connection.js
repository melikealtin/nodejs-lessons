const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb://127.0.0.1:27017/restful_api';

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.error('error: ' + err);
  });
