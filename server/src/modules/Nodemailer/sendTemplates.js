const sendEmail = require('./sendEmail');
const path = require('path');
const config = require('../../config/config');

let ejs = require('ejs');

const sendVerificationEmail = async function (user, verifyLink) {
	
	const images = {
		link1: config.app.base_url + config.company.logo_link
	}

	const data = {
		user,
		company: config.company,
		verifyLink: config.app.base_url + verifyLink,
		images
	};

	const { email: to } = user;

	try {

		const html = await ejs.renderFile(path.join(__dirname, './templates', 'verificationEmail.ejs'), data , {} );

		const response = await sendEmail(to, "Please verify your email address", html);

		return Promise.resolve(response);
		
	} catch (error) {
		
		return Promise.reject(error);
	}

};

const sendForgotPasswordEmail = async function (user, resetLink) {

	const images = {
		link1: config.app.base_url + config.company.logo_link
	}

	const data = {
		user,
		company: config.company,
		resetLink: config.app.base_url + resetLink,
		images
	};

	const { email: to } = user;

	try {

		const html = await ejs.renderFile(path.join(__dirname, './templates', 'forgotPasswordEmail.ejs'), data , {} );

		const response = await sendEmail(to, "Reset Your Password", html);

		return Promise.resolve(response);
		
	} catch (error) {
		
		return Promise.reject(error);
	}

};

const sendChangedPasswordEmail = async function (user, loginLink) {

	const images = {
		link1: config.app.base_url + config.company.logo_link
	}

	const data = {
		user,
		company: config.company,
		loginLink: config.app.base_url + loginLink,
		images
	};

	const { email: to } = user;

	try {

		const html = await ejs.renderFile(path.join(__dirname, './templates', 'passwordChangedEmail.ejs'), data , {} );

		const response = await sendEmail(to, "Your Password has been Changed", html);

		return Promise.resolve(response);
		
	} catch (error) {
		
		return Promise.reject(error);
	}

};


module.exports = {
	sendVerificationEmail,
	sendForgotPasswordEmail,
	sendChangedPasswordEmail
}