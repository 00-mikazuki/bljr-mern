const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: Number,
    default: 3, // 1: superadmin, 2: admin, 3: user
  },
  verificationCode: {
    type: String,
  },
  forgotPasswordCode: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: mongoose.Types.ObjectId,
    ref: 'File',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;