
const secureAdmin = () => {

	return (req, res, next) => {
				
		if (req.isAuthenticated()) {
			
			if(req.user.isAdmin) {
				
				return next();

			} else {

				req.flash('error', 'ADMIN USER REQUIRED');

				return res.redirect('/api/unauthorized');

			}
			
		}		

		res.redirect('/api/login');
		
	};

};

module.exports = secureAdmin;
