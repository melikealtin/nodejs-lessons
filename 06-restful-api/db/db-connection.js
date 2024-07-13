const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb://127.0.0.1:27017/restful_api';

mongoose.connect(DATABASE_URL)
  .then(async () => {
    console.log('connected to DB');
    const User = require('../models/user-model'); 
    await User.init();  // recreates indexes for unique values
  })
  .catch((err) => {
    console.error('error: ' + err);
  });