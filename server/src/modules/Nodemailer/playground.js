const { sendForgotPasswordEmail, sendVerificationEmail } = require('./sendTemplates');


(async () => {

	await sendVerificationEmail("rafaelurbinan@hotmail.com");

})();