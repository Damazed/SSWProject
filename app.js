var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');

var indexRouter = require('./routes/index/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register/index');
var scheduleRouter = require('./routes/schedule/index');
var speakersRouter = require('./routes/speakers/index');
var venueRouter = require('./routes/venue/index');
var dbConnector = require("./utils/dbConnector");
var sendToFile = require('./parseToFile');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/speakers', speakersRouter);
app.use('/schedule', scheduleRouter);
app.use('/venue', venueRouter);
app.use('/register', registerRouter);
app.post('/registerForm', sendToFile);

/**
 * DB setup
 */
(async() => {
    try {
        const tableExists = await dbConnector.schema.hasTable("users");
        if (!tableExists) {
            const result = await dbConnector.schema.createTable('users', function(table) {
                table.increments()
                table.integer('id')
                table.string('name')
                table.string('email')
                table.string('number_passes')
                table.string('comment')
            });
        }
    } catch (error) {
        console.log(error);
    }
})();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;