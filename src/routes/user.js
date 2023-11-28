const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport/passport')(passport);
const userController = require('../app/controllers/userController');


router.get('/sign-up', userController.signup);
router.get('/login', userController.login);
router.post('/store', userController.store);
router.get('/protected', isLoggedIn, userController.protected);
router.post('/logingin', userController.logingin);
router.get('/:slug', userController.show);
router.get('/logout', userController.logout);


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        console.log('is authenticated');
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/user/login');
}


module.exports = router;