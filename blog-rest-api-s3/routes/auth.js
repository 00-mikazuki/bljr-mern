const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { validate, authValidator } = require('../validators');
const { isAuth } = require('../middlewares');

router.post('/signup', authValidator.signup, validate, authController.signup);
router.post('/signin', authValidator.signin, validate, authController.signin);
router.post('/verification-code', authValidator.emailValidator, validate, authController.verificationCode);
router.post('/verify', authValidator.verify, validate, authController.verify);
router.post('/forgot-password-code', authValidator.emailValidator, validate, authController.forgotPasswordCode);
router.post('/recover-password', authValidator.recoverPassword, validate, authController.recoverPassword);
router.put('/change-password', isAuth, authValidator.changePassword, validate, authController.changePassword);
router.put('/update-profile', isAuth, authValidator.updateProfile, validate, authController.updateProfile);
router.get('/current-user', isAuth, authController.currentUser);

module.exports = router;