const isAdmin = (req, res, next) => {
  try {
    // Check if the user is authenticated and has admin role
    if (req.user && req.user.role === 1 || req.user.role === 2) {
      next();
    } else {
      res.code = 403;
      throw new Error('Access denied');
    }
  } catch (error) {
    next(error);
  }
}

module.exports = isAdmin;