const newsRouter = require('./news');
const userRouter = require('./user');
const siteRouter = require('./site');

function route(app) {
    // app.use('/news', newsRouter);
    // app.use('/user', userRouter);
    app.use('/', userRouter);
}

module.exports = route;
