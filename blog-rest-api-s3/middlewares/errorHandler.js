const errorHandler = (err, req, res, next) => {
  const code = res.code ? res.code : 500;

  res.status(code).json({
    code: code,
    status: false,
    message: err.message || 'Internal Server Error',
    stack: err.stack || null,
  });
}

module.exports = errorHandler;