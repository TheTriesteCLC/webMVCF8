const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')

class userController {
    //[GET] /user/:slug
    show(req, res, next) {
        User.findOne({ slug: req.params.slug })
            .then((user) => {
                res.render('users/show', { user: mongooseToObject(user) })
            })
            .catch(next)
    }

    //[GET] /user/log-in
    login(req, res, next) {
        res.render('users/login');
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
    }
}

module.exports = new userController();
