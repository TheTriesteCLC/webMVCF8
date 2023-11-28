const express = require('express');
const morgan = require('morgan');
const handleBars = require('express-handlebars');
const path = require('path');
const route = require('./routes');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash    = require('connect-flash');


// pass passport for configuration
require('./config/passport/passport')(passport);

const db = require('./config/db');
//Connect to DB
const databaseUrl = 'mongodb://localhost:27017/testFormDb';
db.connect(databaseUrl);

const app = express();
const port = 3000;

//Setup morgan
app.use(morgan('combined'));

//Setup view engine with handlebars
app.engine('handlebars', handleBars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resource', 'views'));

//Setup SASS
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// setup session
const store = session.MemoryStore();
app.use(session({
    saveUninitialized: false,
    secret: "440457",
    cookie: {
        maxAge: 1000 * 10 // 1s * 10
    },
    store
}))

// init passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Route init
route(app);


app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}/`);
});
