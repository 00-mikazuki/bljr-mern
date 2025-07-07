const { check } = require('express-validator');
const validateEmail = require('./validateEmail');
const mongoose = require('mongoose');

const signup = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  check('role')
    .optional()
    .isIn([1, 2, 3])
    .withMessage('Role must be 1 (superadmin), 2 (admin), or 3 (user)')
];

const signin = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
];

const emailValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
];

const verify = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('code')
    .notEmpty()
    .withMessage('Verification code is required')
];

const recoverPassword = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('code')
    .notEmpty()
    .withMessage('Verification code is required'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const changePassword = [
  check('oldPassword')
    .notEmpty()
    .withMessage('Old password is required'),
  check('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
];

const updateProfile = [
  check('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  check('email')
    // .optional()
    // .isEmail()
    .custom(async (email) => {
      if (email) {
        const isValid = await validateEmail(email);
        if (!isValid) {
          throw new Error('Invalid email format');
        }
      }
    }),
  check('profilePicture')
    .custom(async (profilePicture) => {
      if (profilePicture && !mongoose.Types.ObjectId.isValid(profilePicture)) {
        throw new Error('Invalid profile picture ID format');
      }
    })
];

module.exports = {
  signup,
  signin,
  emailValidator,
  verify,
  recoverPassword,
  changePassword,
  updateProfile,
};