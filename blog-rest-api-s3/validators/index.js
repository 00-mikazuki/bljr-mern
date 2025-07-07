const validate = require('./validate');
const authValidator = require('./auth');
const categoryValidator = require('./category');
const fileValidator = require('./file');
const postValidator = require('./post');

module.exports = {
  authValidator,
  categoryValidator,
  fileValidator,
  postValidator,
  validate
};