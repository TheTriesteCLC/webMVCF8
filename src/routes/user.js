const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.get('/show', userController.show);
router.get('/welcome', userController.welcome);
router.get('/log-in', userController.login);
router.get('/sign-up', userController.signup);
router.post('/find', userController.find);
router.post('/create', userController.create);
router.get('/', userController.login);
// router.get('/:slug', userController.show);

module.exports = router;