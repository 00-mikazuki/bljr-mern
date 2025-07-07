const bcrypt = require('bcryptjs');

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing password');
  }
}

module.exports = comparePassword;