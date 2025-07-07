const { check, param } = require('express-validator');
const mongoose = require('mongoose');

const addCategory = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  check('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Description must be at most 255 characters long'),
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

const updateCategory = [
  check('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  check('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Description must be at most 255 characters long'),
];

module.exports = {
  addCategory,
  updateCategory,
  idValidator
};