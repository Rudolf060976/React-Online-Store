const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const Options = { // **** OPTIONS FOR GENERATED TOKENS	
	algorithm: 'HS256',
	expiresIn: config.user.USER_VALIDATION_TOKEN_DURATION_MINUTES * 60
};

const secretOrKey = config.user.USER_JWT_SECRET;

const generateUserToken = id => {

	const payload = {
		sub: id
	};	

	const token = jwt.sign(payload, secretOrKey, Options);

	return token;

};

const verifyUserToken = token => {

	const output = {
		isValid: false,
		id: null
	};

	try {
		
		const payload = jwt.verify(token, secretOrKey, Options);

		if(payload) {
			
			const { sub: id } = payload;

			return {
				isValid: true,
				id
			}
		}

	} catch (error) {
		
		return output;

	}

};


module.exports = { 
	generateUserToken,
	verifyUserToken
}