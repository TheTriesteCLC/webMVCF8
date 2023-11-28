const express = require('express');
const router = express.Router();
const passport = require('passport');
// const authenticator = require('../../config/passport/passport')
const userController = require('../app/controllers/userController');

router.get('/sign-up', /*authenticate*/userController.signup);
router.get('/log-in', userController.login);
router.post('/store', userController.store);
router.get('/:slug', userController.show);

module.exports = router;