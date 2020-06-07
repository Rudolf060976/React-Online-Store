const express = require('express');
const flash = require('connect-flash');
const createError = require('http-errors');
const logger = require('morgan');
const session = require('express-session');
const { mongoose } = require('./db/mongoose');
const passport = require('passport');
const uuidv4 = require('uuid/v4');
const path = require('path');

const MongoStore = require('connect-mongo')(session);

const config = require('./config/config');

const passportRoutes = require('./passport/Local/routes'); // Routes for Authentication

const userRoutes = require('./routes/userRoutes');

const itemRoutes = require('./routes/itemRoutes');

const categoryRoutes = require('./routes/categoryRoutes');

const itemSpecialsRoutes = require('./routes/itemSpecialsRoutes');

const cartRoutes = require('./routes/cartRoutes');

const app = express();

app.use(logger('dev'));


app.use(session({  // Session middleware always comes before passport.session()
	secret: config.general.RANDOM_STRING,
	genid: (req) => {
		console.log('Inside genid Session callback!!');
		console.log(`Request object sessionID from client: ${req.sessionID}`);
		return uuidv4();
	},
	cookie: { maxAge: parseInt(config.user.USER_SESSION_DURATION_MINUTES * 60 * 1000) },
	saveUninitialized: true,
	resave: false,
	name: 'pswSid',
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname,'./../../','dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

/* flash messages are stored on req.session.flash object */
/* passport uses an "error" array inside flash object */

app.use((req, res, next) => {  // PLEASE READ  https://javascript.info/fetch-crossorigin
	// **** PERMITTED ORIGINS SHOULD ONLY BE: 1. THE APP URL, 2. THE ADMIN APP URL
	// But for testing purposes I'm returning the same Origin
	
	const origin = req.get('Origin');
	res.set('Access-Control-Allow-Origin', origin);
	res.set('Access-Control-Allow-Credentials', 'true');
	res.set('Access-Control-Expose-Headers', 'Content-Range');

	next();
});

app.options('*', (req, res) => {  // PLEASE READ  https://javascript.info/fetch-crossorigin
	console.log('ESTOY AQUÍ!!!!!!');
	res.set('Access-Control-Allow-Methods','POST,GET,PUT,PATCH,DELETE,OPTIONS');
	res.set('Access-Control-Allow-Credentials', 'true');
	res.set('Access-Control-Allow-Headers','Content-Type,Content-Range');
	res.set('Access-Control-Max-Age', 86400);
		
	res.status(200).send();
});

app.use('/api', passportRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/specials', itemSpecialsRoutes);
app.use('/api/cart', cartRoutes);

app.all('*', (req, res) => {
	
	res.sendFile(path.join(__dirname,'./../../dist','index.html'));

});

// error handler
app.use( (err, req, res, next) => {
		
	// when you add a custom error handler, you must delegate to the default Express error handler, when the headers have already been sent to the client:

	if (res.headersSent) {
		return next(err)
	  }

	return res.status(err.status || 500).json({
		error: createError(err.status, err.message),
		ok: false,
		status: err.status,
		message: 'INTERNAL ERROR: ' + err.message,
		data: null
	});
  
});

module.exports = app;
