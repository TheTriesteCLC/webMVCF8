const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.get('/sign-up', userController.signup);
router.post('/store', userController.store);
router.get('/:slug', userController.show);

module.exports = router;