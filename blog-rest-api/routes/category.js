const express = require('express');
const router = express.Router();
const { categoryController } = require('../controllers');
const { validate, categoryValidator } = require('../validators');
const { isAuth, isAdmin } = require('../middlewares');

router.get('/', isAuth, categoryController.getCategories);
router.get('/:id', isAuth, categoryValidator.idValidator, validate, categoryController.getCategory);
router.post('/', isAuth, categoryValidator.addCategory, validate, categoryController.addCategory);
router.put('/:id', isAuth, categoryValidator.idValidator, categoryValidator.updateCategory, validate, categoryController.updateCategory);
router.delete('/:id', isAuth, categoryValidator.idValidator, validate, categoryController.deleteCategory);

module.exports = router;