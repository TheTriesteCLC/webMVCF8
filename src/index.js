const express = require('express');
const morgan = require('morgan');
const handleBars = require('express-handlebars');
const path = require('path');
const route = require('./routes');

const db = require('./config/db');

//Connect to DB
const databaseUrl = 'mongodb+srv://vmtriet21:vmtriet21@ptudweb-ga02.dbulhp7.mongodb.net/PTUDWEB-GA02';
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

//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}/`);
});
