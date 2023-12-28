const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')
const passport = require('passport');
const express = require('express');
const app = express();
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
    loginPost(req, res, next) {
        
    } 

    //[GET] /user/sign-up
    signup(req, res, next) {
        res.render('users/signup');
    }


    //[POST] /user/store
    signupPost(req, res, next) {
    }


    //[GET] /user/protected
    protected(req, res, next){
        res.render('users/protected');
    }

    //[GET] /user/logout
    logout(req, res, next){
        console.log("Loging out");
        req.logout(function(err) {
        // res.clearCookie('connect.sid');  // clear the cookie
        if (err) { return next(err); }
        res.redirect('./login');
        // req.session.destroy(function (err) { // destroys the session
		// 	res.send();
		// });
    });
    }

}
module.exports = new userController();
