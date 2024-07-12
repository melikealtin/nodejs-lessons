const errorCatcher = (err, req, res, next) => {

  if (err.name === "CastError") {
    res.json({
      message: "please give a valid id",
    });
  } else {
    res.status(err.errorCode).json({
      message: err.message,
      errorCode: err.errorCode
    });
  }
};

module.exports = errorCatcher;
