const { sendForgotPasswordEmail, sendVerificationEmail } = require('./sendTemplates');


(async () => {

	const user = {
		firstname: 'Rafael',
		lastname: 'Urbina',
		email: 'rafaelurbinan@hotmail.com'
	};

	const verifyLink = '/users/validate';
	const resetLink = '/users/forgotpasswordchange'

	await sendVerificationEmail(user,verifyLink);
	await sendForgotPasswordEmail(user, resetLink);

})();