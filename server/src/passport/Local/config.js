const passport = require('passport');

const bcrypt = require('bcryptjs');

const moment = require('moment');

const LocalStrategy = require('passport-local').Strategy;

const config = require('../../config/config');

const User = require('../../db/models/User');

// serializeUser and deserializeUser are only needed when using Sessions

passport.serializeUser((user, done) => {

	console.log('Inside serializeUser callback. User id is saved to the session at req.session.passport.user and user object is saved on the connect-mongo store'); 
		
	done(null, user._id);
	
});
	
passport.deserializeUser((id, done) => {
	
	console.log('Inside deserializeUser callback. On any request, take the userid from the session cookie, get the user object from the store and make it available on req.user'); 
	
	User.findById(id).then(user => {
	
		if (!user) {
			return done(null, false);
		}
	
		return done(null, user);
	
	}).catch((err) => {
	
		return done(err);
	
	});
	
});

// let isStragegySetup = false;

const passport_Setup_Strategy = function() {   // INSTEAD OF SETTING UP STRATEGY WHEN THE APPLICATION STARTS, WE SETUP WHEN THERE IS A REQUEST, SO WE CAN HAVE ACCESS TO
	// req and res OBJECTS

	return (req, res, next) => {

		//	if(!isStragegySetup) {

			
		passport.use(new LocalStrategy((username, password, done) => {

			(async () => {

				try {
						
					let user = await User.findOne({ username });

					if (!user) {

						return done(null, false, { message: 'INCORRECT USERNAME' });

					}

					// CHECK IF USER IS SUSPENDED AND CHECK THE RESTING TIME TO FREE USER
								
					if (user.isSuspended) {
				
						const now = moment();
						const suspendedTime = moment(user.suspendedAt);
		
						const durationConfig = config.user.USER_BLOCK_DURATION_MINUTES;
			
						const duration = moment.duration(now.diff(suspendedTime)).minutes();
							
						if (duration < durationConfig) {
															
							return done(null, false, { message: 'USER IS SUSPENDED' });
			
						} else {	// IF USER IS SUSPENDED BUT REACHED THE WAITING TIME, WE UNLOCKED THE USER
			
							user.isSuspended = false;
							user.failedLoginAttemps = 0;
			
							user = await user.save();
			
						}
			
					}

					if (!bcrypt.compareSync(password, user.password)) {
			
						let failedAttemps = user.failedLoginAttemps;
				
						const maxAttemps = config.user.USER_MAX_FAILED_LOGIN_ATTEMPS;
				
						failedAttemps +=1;
							
						if (failedAttemps >= maxAttemps) {
								
							user.isSuspended = true;
							user.suspendedAt = Date.now();
							user.failedLoginAttemps = 0;
				
						} else {
				
							user.failedLoginAttemps = failedAttemps;
				
						}
				
						user = await user.save();
							
						return done(null, false, { message: 'INCORRECT PASSWORD' });
							
					}

					user.failedLoginAttemps = 0;
					user.lastLogin = Date.now();
			
					user = await user.save();
				
					return done(null, user);

				} catch (error) {

					return done(error);
								
						
				}

			})();

				
		}));

		//	isStragegySetup = true;
		//	}

		return next();

	};

};	


const passport_Setup_Strategy_Admin = function() {   // INSTEAD OF SETTING UP STRATEGY WHEN THE APPLICATION STARTS, WE SETUP WHEN THERE IS A REQUEST, SO WE CAN HAVE ACCESS TO
	// req and res OBJECTS

	return (req, res, next) => {

		// if(!isStragegySetup) {

			
		passport.use(new LocalStrategy((username, password, done) => {

			(async () => {

				try {
						
					let user = await User.findOne({ username });

					if (!user) {

						return done(null, false, { message: 'INCORRECT USERNAME' });

					}

					// CHECK IF USER IS SUSPENDED AND CHECK THE RESTING TIME TO FREE USER
								
					if (user.isSuspended) {
			
						const now = moment();
						const suspendedTime = moment(user.suspendedAt);
		
						const durationConfig = config.user.USER_BLOCK_DURATION_MINUTES;
			
						const duration = moment.duration(now.diff(suspendedTime)).minutes();
							
						if (duration < durationConfig) {
															
							return done(null, false, { message: 'USER IS SUSPENDED' });
			
						} else {	// IF USER IS SUSPENDED BUT REACHED THE WAITING TIME, WE UNLOCKED THE USER
			
							user.isSuspended = false;
							user.failedLoginAttemps = 0;
			
							user = await user.save();
			
						}
			
					}
						
					if (!bcrypt.compareSync(password, user.password)) {
							
						let failedAttemps = user.failedLoginAttemps;
				
						const maxAttemps = config.user.USER_MAX_FAILED_LOGIN_ATTEMPS;
				
						failedAttemps +=1;
							
						if (failedAttemps >= maxAttemps) {
								
							user.isSuspended = true;
							user.suspendedAt = Date.now();
							user.failedLoginAttemps = 0;
				
						} else {
				
							user.failedLoginAttemps = failedAttemps;
				
						}
				
						user = await user.save();
							
						return done(null, false, { message: 'INCORRECT PASSWORD' });
							
					}
							

					if (!user.isAdmin) {

						return done(null, false, { message: 'THAT USER IS NOT AN ADMINISTRATOR' });

					}
				
					user.failedLoginAttemps = 0;
					user.lastLogin = Date.now();
		
					user = await user.save();

					return done(null, user);

				} catch (error) {

					return done(error);
								
						
				}

			})();

				
		}));

		//	isStragegySetup = true;
		//	}

		return next();

	};

};	
	

module.exports = { passport, passport_Setup_Strategy, passport_Setup_Strategy_Admin };

