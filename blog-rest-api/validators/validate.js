const { validationResult } = require('express-validator');

const validate = (req, res, next) => { // function to validate the request body
  const errors = validationResult(req);
  const errorMessages = {};

  if (!errors.isEmpty()) {
    errors.errors.map(error => {
      if (!errorMessages[error.path]) {
        errorMessages[error.path] = error.msg;
      }
    });

    res.status(400).json({
      code: 400,
      status: false,
      message: 'Validation failed',
      errors: errorMessages,
    });
  } else {
    next();
  }
}

module.exports = validate;