const transporter = require('./transporter');
const config = require('../../config/config');


// Consult Message format in:  https://nodemailer.com/message/

/* 
from - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted ’“Sender Name” sender@server.com‘, see Address object for details
to - Comma separated list or an array of recipients email addresses that will appear on the To: field
cc - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
bcc - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
subject - The subject of the email
text - The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…’})
html - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…‘})
attachments - An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well.  */

const sendEmail = ( to, subject, html ) => {

	const message = {
		from: config.general.APP_EMAIL_ADDRESS,
		to,
		subject,
		html,
		attachments: []
	};

	return transporter.sendMail(message);

};


module.exports = sendEmail;