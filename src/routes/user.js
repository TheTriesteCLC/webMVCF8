const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport/passport')(passport);

const userController = require('../app/controllers/userController');

router.get('/show', /*isLoggedIn,*/ userController.show);
router.get('/welcome', /*isLoggedIn,*/ userController.welcome);
router.get('/log-in', userController.login);
router.get('/sign-up', userController.signup);
router.post('/find', userController.find);
router.post('/create', userController.create);
router.get('/', userController.login);
// router.get('/:slug', userController.show);

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;