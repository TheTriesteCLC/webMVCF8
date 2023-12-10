const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport/passport')(passport);
const User = require('../app/models/User');
const { multipleMongooseToObject } = require('../util/mongoose')
const {mongooseToObject} = require('../util/mongoose')

router.get('/sign-up', function(req, res, next){
    res.render('users/signup');
});


router.get('/login', function(req, res, next){
    res.render('users/login');
});


router.post('/store',
    passport.authenticate('local-signup', {
        successRedirect : './login', 
        failureRedirect : './sign-up'
    })
);


router.get('/protected', isLoggedIn, function(req, res, next){
    res.render('users/protected');
});


router.post('/logingin', passport.authenticate('local-login', {
    successRedirect : './protected', // redirect to the secure profile section
    failureRedirect : './login'// redirect back to the signup page if there is an error
}), function(err, req,res,next){
    console.log(err);
});


router.get('/:slug', function(req, res, next){
    User.findOne({slug: req.params.slug})
    .then((user) => {
        res.render('users/show', {user: mongooseToObject(user)})
    })
    .catch(next)
});


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('user/login');
});


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