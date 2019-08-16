const nodemailer = require('nodemailer');
const config = require('../../config/config');

const options = {
	port: config.general.EMAIL_ACCOUNT_PORT,
	host: config.general.EMAIL_ACCOUNT_HOST,
	auth: {
		user: config.general.EMAIL_ACCOUNT_USER,
		pass: config.general.EMAIL_ACCOUNT_PASSWORD
	},
	logger: true,
	pool: true,
	secure: false
};

let transporter = nodemailer.createTransport(options);

/* transporter.verify((error) => {

	if(error) {
		console.log(error);
	} else {
		console.log("Server is ready to take our messages!!");
	}

}); */

module.exports= transporter;
