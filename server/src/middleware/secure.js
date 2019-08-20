
const secure = () => {

	return (req, res, next) => {

		if (req.isAuthenticated()) return next();

		/* req.session.returnTo = req.originalUrl; */

		res.redirect('/api/login');
		
	};

};

module.exports = secure;
