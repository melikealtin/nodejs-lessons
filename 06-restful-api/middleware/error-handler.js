const errorCatcher = (err, req, res, next) => {
  console.log(err);
  
  if(err.code === 11000) {
    return res.json(
      {
        message: Object.keys(err.keyValue) + " value you entered cannot be added/updated because it has already been in the database once before, it must be unique",
        errorCode: 400
      }
    )
  }
  res.json({
    errorCode: err.statusCode,
    message: err.message,
  });
};

module.exports = errorCatcher;
