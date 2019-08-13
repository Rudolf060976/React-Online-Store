const express = require('express');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('./configJwt');
const config = require('../../config/config');
const moment = require('moment');

const crudUsers = require('../../db/crud_operations/crudUsers');

const router = express.Router();

const Options = { // **** THE SAME OPTIONS USED IN configJwt.js		
	algorithm: 'HS256',
	expiresIn: config.user.USER_SESSION_DURATION_MINUTES * 60 // Expires in Seconds
};

router.post('/register', (req, res) => {

	if (req.body && req.body.username && res.body.password && res.body.firstname && res.body.lastname && res.body.email) {

		const { username, password, firstname, lastname, email } = req.body;

		crudUsers.registerUser(username, password, firstname, lastname, email).then(res => {

			// ******* ENVIAR EMAIL DE VALIDACIÓN AL USUARIO ***** 

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'REGISTRATION SUCCESSFULL!!',
				data: {
					firstname: res.firstname,
					lastname: res.lastname
				}
			});
			

		}).catch(err => {

			return res.status(401).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});

		});

	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING CREDENTIALS',
			data: null
		});
	}

});


router.post('/login', (req, res) => {

	if (req.body && req.body.username && req.body.password) {

		const { username } = req.body;
		const { password } = req.body;

		crudUsers.getUserByUsername(username).then((user) => {

					
			if (bcrypt.compareSync(password, user.password)) {

				// CHECK IF USER IS SUSPENDED AND CHECK THE RESTING TIME TO FREE USER

				if (user.isSuspended) {

					const suspendedAt = moment(user.suspendedAt);
					const now = moment();

					const durationConfig = config.user.USER_BLOCK_DURATION_MINUTES;

					const duration = moment.duration(now.diff(suspendedAt)).minutes();

					if (duration < durationConfig) {

						return res.status(423).json({
							error: createError(423, 'LOCKED'),
							ok: false,
							status: 423,
							message: 'USER IS SUSPENDED',
							data: {
								minutesRest: (durationConfig - duration)
							}
						});

					}

				}

				// CHECK IF USER HAS BEEN VALIDATED....


				if (!user.isValidated) {

					return res.status(423).json({
						error: createError(423, 'LOCKED'),
						ok: false,
						status: 423,
						message: 'USER IS NOT VALIDATED',
						data: null
					});

				}

				// IF USER PASSES ALL CONDITIONS ABOVE,
				// THEN WE CAN GENERATE THE TOKEN AND LOGIN

				const payload = {
					sub: user._id,
					firstname: user.firstname,
					lastname: user.lastname
				};

				const secretOrKey = config.general.RANDOM_STRING;

				const token = jwt.sign(payload, secretOrKey, Options);

				res.status(200).json({
					error: null,
					ok: true,
					status: 200,
					message: 'AUTHENTICATION ACCEPTED',
					data: {
						token
					}
				});

			} else {

				return res.status(401).json({
					error: createError(401, 'INCORRECT PASSWORD'),
					ok: false,
					status: 401,
					message: 'UNAUTHORIZED',
					data: null
				});
			}

		}, (err) => {

			return res.status(401).json({
				error: createError(401, 'USER NOT FOUND'),
				ok: false,
				status: 401,
				message: 'UNAUTHORIZED',
				data: null
			});

		});

	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING CREDENTIALS',
			data: null
		});
	}

});

const passportAuth = passport.authenticate('jwt', {
	session: true,
	failureRedirect: '/unauthorized'
});

// ALL ROUTES IN THE API MUST INCLUDE passportAuth Middleware FOR EXAMPLE:

router.get('/secret', passportAuth, (req, res) => {
	// IF THE TOKEN IS AUTHENTICATED, WE HAVE ACCESS TO THE USER PROFILE
	// IN req.user Object
	console.log('req.user : ', req.user);
	
	res.json({ message: 'Success! You can not see this without a token' });
  
	return null;

});

router.get('/unauthorized', (req, res) => {

	console.log("INSIDE UNAUTHORIZED: req.session :" , req.session);

	// ***** WE HAVE TO VERIFY AT THIS POINT THAT SESSION IS DESTROYED

	return res.status(401).json({
		error: createError(401, 'UNAUTHORIZED'),
		ok: false,
		status: 401,
		message: 'UNAUTHORIZED',
		data: null
	});

});

module.exports = {
	router,
	passportAuth
};
