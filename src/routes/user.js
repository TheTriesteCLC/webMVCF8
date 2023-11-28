const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.get('/log-in', userController.login);
router.get('/sign-up', userController.signup);
router.post('/store', userController.store);
router.get('/', userController.login);
// router.get('/:slug', userController.show);

module.exports = router;