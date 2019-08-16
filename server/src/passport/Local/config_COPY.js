const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../../config/config');

const User = require('../../db/models/User');

passport.use(new LocalStrategy((username, password, done) => {

	User.findOne({ username }).then( user => {

		if (!user) {
			return done(null, false, { message: 'Incorrect username!' });
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

			user.save();
			
			return done(null, false, { message: 'Incorrect Password!!' });
			
		}

		user.failedLoginAttemps = 0;

		user.save();

		return done(null, user);

	}).catch(err => {

		if(err) return done(err);

		return err;

	});

}));

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
	
	
module.exports = passport;

