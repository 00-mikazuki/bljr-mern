const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

const isAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization ? req.headers.authorization.split(' ') : [];
    const token = authorization.length > 1 ? authorization[1] : null;

    if (!token) {
      res.code = 401;
      throw new Error('Unauthorized access');
    }

    const decoded = jwt.verify(token, jwtSecret);
    
    if (!decoded) {
      res.code = 401;
      throw new Error('Unauthorized access');
    }

    req.user = {
      _id: decoded._id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    }

    next();
    
  } catch(error) {
    next(error);
  }
}

module.exports = isAuth;