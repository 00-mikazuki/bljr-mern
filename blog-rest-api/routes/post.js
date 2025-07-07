const express = require('express');
const router = express.Router();
const { isAuth } = require('../middlewares');
const { postController } = require('../controllers');
const { validate, postValidator } = require('../validators');

router.get('/', isAuth, postController.getPosts);
router.get('/:id', isAuth, postValidator.idValidator, validate, postController.getPost);
router.post('/', isAuth, postValidator.createPostValidator, validate, postController.addPost);
router.put('/:id', isAuth, postValidator.idValidator, postValidator.updatePostValidator, validate, postController.updatePost);
router.delete('/:id', isAuth, postValidator.idValidator, validate, postController.deletePost);

module.exports = router;