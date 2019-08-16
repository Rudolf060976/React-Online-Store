const sendEmail = require('./sendEmail');
const path = require('path');
const config = require('../../config/config');

let ejs = require('ejs');

const sendVerificationEmail = async function (to) {

	const user = {
		firstname: 'Rafael',
		lastname: 'Urbina'
	};

	const verifyLink = "http://localhost:3000/users/passwordchange";

	const data = {
		user,
		company: config.company,
		verifyLink
	};

	try {

		const html = await ejs.renderFile(path.join(__dirname, './templates', 'verificationEmail.ejs'), data , {} );

		const response = await sendEmail(to, "Please verify your email address", html);

		return Promise.resolve(response);
		
	} catch (error) {
		
		return Promise.reject(error);
	}

};

const sendForgotPasswordEmail = async function (to) {

	const data = {
		message: "Ejemplo de data message FORGOT PASSWORD!!"
	}

	try {

		const html = await ejs.renderFile(path.join(__dirname, './templates', 'forgotPasswordEmail.ejs'), data , {} );

		const response = await sendEmail(to, "Reset Your Password", html);

		return Promise.resolve(response);
		
	} catch (error) {
		
		return Promise.reject(error);
	}

};


module.exports = {
	sendVerificationEmail,
	sendForgotPasswordEmail
}