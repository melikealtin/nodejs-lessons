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
  if(err.code == 66) {
    return res.json({
      message: "you tried to update an unchangeable area",
      errorCode: 400
    })
  }
  
  res.status(err.statusCode || 500)
  res.json({
    errorCode: err.statusCode,
    message: err.message,
  });
};

module.exports = errorCatcher;
