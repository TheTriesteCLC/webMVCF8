const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')

class userController {

    //[GET] /log-in
    login(req, res, next) {
        res.render('users/login');
    }

    //[GET] /sign-up
    signup(req, res, next) {
        res.render('users/signup');
    }

    //[POST] /create
    create(req, res, next) {
        const formData = req.body;
        formData.slug = 'user-' + formData.username;
        const user = new User(formData);
        user.save();
        res.render('users/welcome', { formData });
    }

    //[POST] /find
    find(req, res, next) {
        const formData = req.body;
        User.find({ username: formData.username, password: formData.password })
            .then(users => {
                res.render('home', { users: multipleMongooseToObject(users) });
            })
            .catch(error => next(error));
    }

    //[GET] /user/:slug
    show(req, res, next) {
        User.findOne({ slug: req.params.slug })
            .then((user) => {
                res.render('users/show', { user: mongooseToObject(user) })
            })
            .catch(next)
    }

    //[GET] /welcome
    welcome(req, res) {
        User.find({})
            .then(users => {
                res.render('home', { users: multipleMongooseToObject(users) });
            })
            .catch(error => next(error));
    }


}

module.exports = new userController();
