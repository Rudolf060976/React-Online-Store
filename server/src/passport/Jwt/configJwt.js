const passport = require('passport');

const passportJWT = require('passport-jwt');

const User = require('../../db/models/User');

const config = require('../../config/config');


const { ExtractJwt } = passportJWT; // Extracting function for passport

const JwtStrategy = passportJWT.Strategy; // JWT Strategy por passport

const jwtOptions = {

	secretOrKey: config.general.RANDOM_STRING,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	jsonWebTokenOptions: {
		algorithm: 'HS256',
		expiresIn: config.user.USER_SESSION_DURATION_MINUTES * 60 // Expires in Seconds
	}
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {

	console.log('Inside JSON WEB TOKEN Strategy callback!');

	if (jwtPayload.sub) {

		User.findById(jwtPayload.sub).then((user) => {

			if (!user) {
				return done(null, false);
			}

			return done(null, user);

		}).catch(err => {

			done(err, false);
		
		});

	} else {
		done(null, false);
	}

}));

// serializeUser and deserializeUser are only needed when using Sessions

/* passport.serializeUser((user, done) => {

	console.log('Inside serializeUser callback. User id is saved to the session at req.session.passport.user and user object is saved on the connect-mongo store'); 
		
	done(null, user._id);
	
});
	
passport.deserializeUser((id, done) => {
	
	console.log('Inside deserializeUser callback. On any request, take the userid from the session cookie, get the user object from the store and make it available on req.user'); 
	
	done(null, false); // We Don't take anything from the Session Cookie because passport-jwt strategy does that.
	
}); */


module.exports = passport;
