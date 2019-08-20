const config = require('../config/config');

const secureAdmin = () => {

	return (req, res, next) => {

		if (req.isAuthenticated()) {

			if(req.user.username === config.user.User_Admin_Username ) {

				return next();

			} else {

				return res.redirect('/api/unauthorized');

			}
			
		}		

		res.redirect('/api/login');
		
	};

};

module.exports = secureAdmin;
