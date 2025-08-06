const express = require('express');
const router = express.Router();
const { fileController } = require('../controllers');
const { isAuth, upload } = require('../middlewares');

router.post('/upload', isAuth, upload.single('image'), fileController.uploadFile);
router.get('/signed-url', isAuth, fileController.getSignedUrl);
router.delete('/delete', isAuth, fileController.deleteFile);

module.exports = router;