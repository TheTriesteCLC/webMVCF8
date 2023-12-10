// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../../app/models/User');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(username, done) {
        User.findByUsername(username, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, async (req, username, password, done) => {

        // asynchronous

        // find a user whose username is the same as the forms email
        // we are checking to see if the user trying to login already exists
        var user = await User.findOne({ 'username' :  username });
        // if there are any errors, return the error

        // check to see if theres already a user with that username
        if (user) {
            return done(null, false);
        } else {

            // if there is no user with that username
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.username = username;
            newUser.password = password;
            newUser.slug = 'user-' + username;

            // save the user
            newUser.save();

            // User.create({username: username, password: password});
            console.log('created')
        }
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    async (req, username, password, done) => { // callback with email and password from our form
        console.log('proccessing');
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        var user = await User.findOne({ 'username' :  username });
        console.log('ok');
        // if no user is found, return the message
        if (!user)
            return done(null, false); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        var checkPass = await user.comparePassword(password);
        console.log('passed')
        if (!checkPass)
            return done(null, false); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        console.log('success');
        console.log(user);
        return done(null, user);
    }));
}
