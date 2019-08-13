const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('./db/mongoose');
const passport = require('passport');
const uuidv4 = require('uuid/v4');

const MongoStore = require('connect-mongo')(session);

const config = require('./config/config');

const passportRoutes = require('./passport/Jwt/routesJwt').router; // Routes for Authentication

const app = express();

app.use(logger('dev'));

app.use(session({  // Session middleware always comes before passport.session()
	secret: config.general.RANDOM_STRING,
	genid: (req) => {
		console.log('Inside genid Session callback!!');
		console.log(`Request object sessionID from client: ${req.sessionID}`);
		return uuidv4();
	},
	cookie: { maxAge: parseInt(config.user.USER_SESSION_DURATION_MINUTES * 60 * 60) },
	saveUninitialized: true,
	resave: false,
	name: 'pswSid',
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

/* flash messages are stored on req.session.flash object */
/* passport uses an "error" array inside flash object */

app.use('/', passportRoutes);

module.exports = app;
