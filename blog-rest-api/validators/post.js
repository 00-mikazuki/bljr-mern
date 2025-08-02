const { check, param } = require('express-validator');
const mongoose = require('mongoose');

const createPostValidator = [
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
    // .isLength({ min: 3 })
    // .withMessage('Title must be at least 3 characters long'),
  check('description')
    .optional(),
  check('category')
    .notEmpty()
    .withMessage('Category is required')
    // .isMongoId
    .custom(async (category) => {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        throw new Error('Invalid category ID');
      }
    }),
  check('file')
    .optional()
    .custom(async (file) => {
      if (file && !mongoose.Types.ObjectId.isValid(file)) {
        throw new Error('Invalid file ID');
      }
    })
];

const updatePostValidator = [
  check('title')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  check('description')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  check('category')
    .optional()
    .custom(async (category) => {
      if (category && !mongoose.Types.ObjectId.isValid(category)) {
        throw new Error('Invalid category ID');
      }
    }),
  check('file')
    .optional()
    .custom(async (file) => {
      if (file && !mongoose.Types.ObjectId.isValid(file)) {
        throw new Error('Invalid file ID');
      }
    })
];

const idValidator = [
  param('id')
    .notEmpty()
    .withMessage('ID is required')
    .custom( async (id) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID format');
      }
    })
];

module.exports = {
  createPostValidator,
  updatePostValidator,
  idValidator
}