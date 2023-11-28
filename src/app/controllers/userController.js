const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')
const passport = require('passport');
require('../../config/passport/passport')(passport);

class userController {
    //[GET] /user/:slug
    show(req, res, next) {
        User.findOne({slug: req.params.slug})
            .then((user) => {
                res.render('users/show', {user: mongooseToObject(user)})
            })
            .catch(next)
    }


    //[GET] /user/login
    login(req, res, next){
        res.render('users/login');
    }

    // [POST] /user/logingin
    logingin(req, res, next){
        // authenticator.checkNotAuthenticated
        passport.authenticate('local-login', {
            successRedirect : 'user/protected', // redirect to the secure profile section
            failureRedirect : 'user/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        });
    }


    //[GET] /user/sign-up
    signup(req, res, next) {
        res.render('users/signup');
    }


    //[POST] /user/store
    store(req, res, next) {
        const formData = req.body;
        formData.slug = 'user-' + formData.username;
        const user = new User(formData);
        user.save();
        res.send("Create new user !!!");

        passport.authenticate('local-signup', {
            successRedirect : 'user/login', // redirect to the login section
            failureRedirect : 'user/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        })
    }


    //[GET] /user/protected
    protected(req, res, next){
        res.render('users/protected');
    }


    //[GET] /user/logout
    logout(req, res, next){
        req.logout();
        res.redirect('user/login');
    }

}
module.exports = new userController();
