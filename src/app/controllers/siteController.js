const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose')

class siteController {
    //[GET] /
    index(req, res) {
        User.find({})
            .then(users => {
                res.render('home', { users: multipleMongooseToObject(users) });
            })
            // .catch(error => next(error));
    }


    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new siteController();
