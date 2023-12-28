const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport/passport')(passport);
const User = require('../app/models/User');
const { multipleMongooseToObject } = require('../util/mongoose')
const {mongooseToObject} = require('../util/mongoose')
const userController = require('../app/controllers/userController');

router.get('/signup', userController.signup);
router.post('/signup', 
passport.authenticate('local-signup', { failureRedirect : './signup'}), 
function(req,res){
    console.log("redirecting");
    res.redirect('./protected');
}, userController.signupPost);


router.get('/login', userController.login);
router.post('/login', 
passport.authenticate('local-login', { failureRedirect : './login'}), 
function(req,res){
    console.log("redirecting");
    res.redirect('./protected');
}, userController.loginPost);


router.use('/protected', isLoggedIn, userController.protected);
router.get('/logout', isLoggedIn, userController.logout);


router.get('/:slug', userController.show);


// router.get('/signup', function(req, res, next){
//     res.render('users/signup');
//     // userController.signup();
// });


// router.post('/store',
//     passport.authenticate('local-signup', {
//         successRedirect : './login', 
//         failureRedirect : './sign-up'
//     })
// );


// router.get('/protected', isLoggedIn, function(req, res, next){
//     res.render('users/protected');
// });


// router.get('/login', function(req, res, next){
//     res.render('users/login');
// });


// router.post('/login', 
//     passport.authenticate('local-login', {
//     failureRedirect : './login'
// }), function(req,res){
//     console.log("redirecting");
//     res.redirect('/user/protected');
// });


// router.get('/logout', isLoggedIn, function(req, res){ // they made it post
//     console.log("Loging out");
//     req.logout(function(err) {
//         // res.clearCookie('connect.sid');  // clear the cookie
//         if (err) { return next(err); }
//         res.redirect('./login');
//         // req.session.destroy(function (err) { // destroys the session
// 		// 	res.send();
// 		// });
//     });
// });

// router.get('/:slug', function(req, res, next){
//     User.findOne({slug: req.params.slug})
//     .then((user) => {
//         res.render('users/show', {user: mongooseToObject(user)})
//     })
//     .catch(next)
// });



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    console.log("Authenticate checking");
    if (req.isAuthenticated()){
        console.log('is authenticated');
        return next();
    }

    // if they aren't redirect them to the home page
    console.log("user is not authenticated");
    res.redirect('/user/login');
}


module.exports = router;