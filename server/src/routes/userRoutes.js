const express = require('express');

const createError = require('http-errors');

const bcrypt = require('bcryptjs');

const crudUsers = require('../db/crud_operations/crudUsers');

const User = require('../db/models/User');

const { generateUserToken, verifyUserToken } = require('../modules/JWT/userTokens');

const { sendVerificationEmail, sendForgotPasswordEmail, sendChangedPasswordEmail } = require('../modules/Nodemailer/sendTemplates');

const router = express.Router();

// ************* REGISTER USER ****************

router.post('/register', (req, res) => {

	if (req.body && req.body.username && req.body.password && req.body.firstname && req.body.lastname && req.body.email) {
		
		const { username, password, firstname, lastname, email } = req.body;

		crudUsers.registerUser(username, password, firstname, lastname, email).then(user => {

			// GENERATE THE USER TOKEN HOLDING THE USER id

			const { _id } = user;
			
			const token = generateUserToken(_id);
						
			// ******* SEND A VERIFICATION EMAIL TO THE REGISTERED EMAIL, WITH THE LINK http://localhost:3000/users/validate?id=xxxx&token=token ******** 

			const link = `/users/validate?id=${_id}&token=${token}`;

			sendVerificationEmail(user, link);
			
			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'REGISTRATION SUCCESSFULL!!',
				data: {
					username: user.username,
					fullname: `${user.firstname} ${user.lastname}`	
				}
			});
			

		}).catch(err => {
			
			res.status(err.status).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});

		});

	} else {
		
		res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING CREDENTIALS',
			data: null
		});
	}

});


// ************** VALIDATE REGISTER

router.post('/validate', (req, res) => {    // RECEIVES USER id AND THE TOKEN AN VERIFY THE TOKEN, IF VALIDATES, EXTRACTS THE ID FROM THE TOKEN.

	if(req.body && req.body.id && req.body.token) {

		const { id, token } = req.body;
	

		// FIRST WE HAVE TO FIND THE USER A CHECK IF ITS NOT VALIDATED.

		crudUsers.getUserById(id).then(user => {

			if (user.isValidated) {

				return res.status(409).json({
					error: createError(409, 'CONFLICT'),
					ok: false,
					status: 409,
					message: 'USER IS ALREADY VALIDATED',
					data: null
				});

			}

			// NOW WE VERIFY THE TOKEN VALIDITY

			const obj = verifyUserToken(token);

			if(!obj.isValid) {  // IF THE TOKEN IS NOT VALID ITS BECAUSE IT REACHED THE LIMIT DURATION TIME, SO WE HAVE TO GENERATE A NEW TOKEN AND RESEND..

				const token2 = generateUserToken(user._id);

							
				// ******* SEND A VERIFICATION EMAIL TO THE REGISTERED EMAIL, WITH THE LINK http://localhost:3000/users/validate?id=xxxx&token=token ********

				const link = `/users/validate?id=${user._id}&token=${token2}`;

				sendVerificationEmail(user, link);

				return res.status(401).json({
					error: createError(401, 'UNAUTHORIZED'),
					ok: false,
					status: 401,
					message: 'INVALID TOKEN',
					data: null
				});

			}


			if(id === obj.id) {  // IF THE TOKEN IS VALID AND ID === ID IN THE TOKEN...CONTINUES
					
				user.isValidated = true;
	
				user.save();
		
				res.status(200).json({
					error: null,
					ok: true,
					status: 200,
					message: 'USER VALIDATED SUCCESSFULLY',
					data: {
						username: user.username,
						fullname: `${user.firstname} ${user.lastname}`	
					}
				
				});
	
			
			} else {

				return res.status(401).json({
					error: createError(401, 'UNAUTHORIZED'),
					ok: false,
					status: 401,
					message: 'USER ID IS DIFFERENT TO ID IN THE TOKEN',
					data: null
				});

			}

		}).catch(err => {

			return res.status(err.status).json({
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


// ******* FORGOT PASSWORD

router.post('/forgotpassword', (req, res) => {

	if (req.body && req.body.username) {

		const { username } = req.body;

		User.findOne({ username }).then(user => {

			if(!user) {
				
				return res.status(404).json({
					error: createError(404, 'NOT FOUND'),
					ok: false,
					status: 404,
					message: 'USER NOT FOUND',
					data: null
				});

			}

			const { _id } = user;

			const token = generateUserToken(_id);
			
			// SEND AN EMAIL WITH THE USERNAME AND PASSWORD AS DATA, AND A LINK TO CHANGE PASSWORD PAGE....

			// ******* SEND A CHANGE PASSWORD EMAIL TO THE REGISTERED EMAIL, WITH THE LINK http://localhost:3000/users/resetpassword?id=xxxx&token=token ******** 

			const link = `/users/resetpassword?id=${_id}&token=${token}`;

			sendForgotPasswordEmail(user, link);


			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'EMAIL SENT TO USER',
				data: null
			});

		}).catch(err => {

			res.status(500).json({
				error: err,
				ok: false,
				status: 500,
				message: 'INTERNAL SERVER ERROR',
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


router.post('/resetpassword', (req, res) => {

	if(req.body && req.body.id && req.body.password && req.body.token) {

		const { id, token, password: newPassword } = req.body;

		const obj = verifyUserToken(token);

		if(!obj.isValid) {  // IF THE TOKEN IS NOT VALID ITS BECAUSE IT REACHED THE LIMIT DURATION TIME, SO WE HAVE TO GENERATE A NEW TOKEN AND RESEND..
			
			return res.status(401).json({
				error: createError(401, 'UNAUTHORIZED'),
				ok: false,
				status: 401,
				message: 'INVALID TOKEN',
				data: null
			});
		}

		if(id === obj.id) {  // IF THE TOKEN IS VALID AND ID === ID IN THE TOKEN...CONTINUES


			User.findById(id).then(user => {

				// ENCRYPTS THE PASSWORD AND STORE THE USER IN THE DB

				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(newPassword, salt);

				user.password = hash;

				return user.save();

			}).then(user => {

				const link = `/login`;

				sendChangedPasswordEmail(user, link);

				req.logout();				

				res.status(200).json({
					error: null,
					ok: true,
					status: 200,
					message: 'PASSWORD CHANGED SUCCESSFULLY',
					data: {
						username: user.username,
						fullname: `${user.firstname} ${user.lastname}`
					}
				});

			}).catch(err => {

				res.status(500).json({
					error: err,
					ok: false,
					status: 500,
					message: 'INTERNAL SERVER ERROR',
					data: null
				});

			});


		} else {

			return res.status(401).json({
				error: createError(401, 'UNAUTHORIZED'),
				ok: false,
				status: 401,
				message: 'USER ID IS DIFFERENT TO ID IN THE TOKEN',
				data: null
			});

		}

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


router.post('/passwordchange', (req, res) => {

	if(req.body && req.body.username && req.body.password && req.body.newPassword) {

		const { username, password, newPassword } = req.body;

		crudUsers.getUserByUsername(username).then( user => {

			if(!user) {

				return res.status(404).json({
					error: createError(404, 'NOT FOUND'),
					ok: false,
					status: 404,
					message: 'USER NOT FOUND',
					data: null
				});

			}

			if(!bcrypt.compareSync(password, user.password)) {

				return res.status(401).json({
					error: createError(401, 'UNAUTHORIZED'),
					ok: false,
					status: 401,
					message: 'INCORRECT PASSWORD',
					data: null
				});

			}

			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(newPassword, salt);
			
			user.password = hash;

			return user.save();
			
		}).then(user => {

			const link = `/login`;

			sendChangedPasswordEmail(user, link);

			req.logout();

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'PASSWORD CHANGED SUCCESSFULLY',
				data: {
					username: user.username,
					fullname: `${user.firstname} ${user.lastname}`
				}
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

module.exports = router;