const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    jwtSecret, // Secret key for signing the token
    { expiresIn: '7d' } // Token expiration time
  );

  return token;
}

module.exports = generateToken;