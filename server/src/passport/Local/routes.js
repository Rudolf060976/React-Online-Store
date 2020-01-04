const express = require('express');

const createError = require('http-errors');

const secure = require('../../middleware/secure');

const { passport, passport_Setup_Strategy, passport_Setup_Strategy_Admin } = require('./config');

const router = express.Router();

const crudUsers = require('../../db/crud_operations/crudUsers');


router.use((req, res, next) => {  // PLEASE READ  https://javascript.info/fetch-crossorigin

	const origin = req.get('Origin');
	res.set('Access-Control-Allow-Origin', origin);
	res.set('Access-Control-Allow-Credentials', true);

	next();
});

router.options('*', (req, res) => {  // PLEASE READ  https://javascript.info/fetch-crossorigin
		
	res.set('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DEL');
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Access-Control-Allow-Headers','Content-Type');	
	res.set('Access-Control-Max-Age', 86400);
		
	res.status(200).send();
});

router.post('/login/admin', passport_Setup_Strategy_Admin(), 
	passport.authenticate('local',
		{
			failureRedirect: '/api/unauthorized',
			failureFlash: true
		}),
	(req, res) => { // IF USER AUTHENTICATION IS ACCEPTED, THIS MIDDLEWARE WILL GET CALLED

		/* console.log('Inside POST / Login callback function');
	console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
	console.log(`req.user: ${JSON.stringify(req.user)}`); */

		(async () => {

			const user = await crudUsers.getUserById(req.user._id);


			// CHECK IF USER HAS BEEN VALIDATED....

			if (!user.isValidated) {

				req.logout();

				return res.status(423).json({
					error: createError(423, 'LOCKED'),
					ok: false,
					status: 423,
					message: 'USER IS NOT VALIDATED',
					data: {
						_id: user._id,
						username: user.username
					}
				});

			}

			// IF USER PASSES ALL CONDITIONS ABOVE, THEN LOGIN
			
			const { _id, username, firstname, lastname } = user;
			
			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'AUTHENTICATION ACCEPTED',
				data: {

					user: {
						_id,
						username,
						firstname,
						lastname
					}
					
				}
			});

		})();
	
	}	
);

router.post('/login', passport_Setup_Strategy(), 
	passport.authenticate('local',
		{
			failureRedirect: '/api/unauthorized',
			failureFlash: true
		}),
	(req, res) => { // IF USER AUTHENTICATION IS ACCEPTED, THIS MIDDLEWARE WILL GET CALLED

		/* console.log('Inside POST / Login callback function');
	console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
	console.log(`req.user: ${JSON.stringify(req.user)}`); */

		(async () => {

			const user = await crudUsers.getUserById(req.user._id);


			// CHECK IF USER HAS BEEN VALIDATED....

			if (!user.isValidated) {

				req.logout();

				return res.status(423).json({
					error: createError(423, 'LOCKED'),
					ok: false,
					status: 423,
					message: 'USER IS NOT VALIDATED',
					data: {
						_id: user._id,
						username: user.username
					}
				});

			}

			// IF USER PASSES ALL CONDITIONS ABOVE, THEN LOGIN
			
			const { _id, username, firstname, lastname } = user;
			
			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'AUTHENTICATION ACCEPTED',
				data: {

					user: {
						_id,
						username,
						firstname,
						lastname
					}
					
				}
			});

		})();
	
	}	
);

router.get('/logout', secure(), (req, res) => {

	const user = req.user;

	req.logout();

	/* console.log(`req.user: ${JSON.stringify(req.user)}`);
	console.log(`req.sessionID: ${JSON.stringify(req.sessionID)}`); */
		
	res.status(200).json({
		error: null,
		ok: true,
		status: 200,
		message: 'LOGGED OUT USER!',
		data: {
			username: user.username,
			fullname: `${user.firstname} ${user.lastname}`
		}
	});	

});


router.get('/unauthorized', (req, res) => {
	
	
	if (req.session.flash && req.session.flash.error.length > 0) {

		const i = req.session.flash.error.length - 1; //always use the last message in flash
		
		const errorMessage = req.session.flash.error[i];
		
		switch(errorMessage) {

		case 'INCORRECT USERNAME':

			return res.status(401).json({
				error: createError(401,errorMessage),
				ok: false,
				status: 401,
				message: 'UNAUTHORIZED',
				data: null
			});

		case 'INCORRECT PASSWORD':

			return res.status(401).json({
				error: createError(401,errorMessage),
				ok: false,
				status: 401,
				message: 'UNAUTHORIZED',
				data: null
			});
			
		case 'USER IS SUSPENDED':
			return res.status(423).json({
				error: createError(423,errorMessage),
				ok: false,
				status: 423,
				message: 'USER IS SUSPENDED',
				data: null
			});	

		case 'THAT USER IS NOT AN ADMINISTRATOR':
			return res.status(423).json({
				error: createError(423,errorMessage),
				ok: false,
				status: 423,
				message: 'UNAUTHORIZED',
				data: null
			});	

		}


	}

	return res.status(401).json({
		error: createError(401, 'UNAUTHORIZED'),
		ok: false,
		status: 401,
		message: 'UNAUTHORIZED',
		data: null
	});


});


router.get('/login', (req, res) => {

	if (!req.isAuthenticated()) {

		return res.status(511).json({
			error: createError(511, 'Network Authentication Required'),
			ok: false,
			status: 511,
			message: 'AUTHENTICATION REQUIRED',
			data: null
		});
	
	}

	const { _id, username, firstname, lastname } = req.user;

	res.status(200).json({
		error: null,
		ok: true,
		status: 200,
		message: 'AUTHENTICATION ACCEPTED',
		data: {
			user: {
				_id,
				username,
				firstname,
				lastname			
			}			
		}
	});

});


router.get('/protectedRoute', secure(), (req, res) => {

	return res.status(200).json({
		error: null,
		ok: true,
		status: 200,
		message: 'YOU ENTERED PROTECTED ROUTE!!',
		data: {
			username: req.user.username,
			fullname: `${req.user.firstname} ${req.user.lastname}`
		}
	});

});


module.exports = router;

