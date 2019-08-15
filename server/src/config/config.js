require('custom-env').env(true);
const randomstring = require('randomstring');
const path = require('path');

const nconf = require('nconf');


nconf.argv()
	.env()
	.file( { file: path.join(__dirname + './../../' + 'config.json')});

nconf.set('USER_JWT_SECRET','32KJKK44/*/*--DF44T3AFSDAS');
nconf.set('RANDOM_STRING',randomstring.generate(10));

nconf.defaults({
	
	User_Block_Duration_Minutes: 10,
	User_Max_Failed_Login_Attemps: 5,
	User_Session_Duration_Minutes: 30,
	User_Validation_Token_Duration_Minutes: 60

});

const env = nconf.get('NODE_ENV') || 'development';

let mongoUri = nconf.get('MONGODB_URI');

if (env === 'development') {
	mongoUri = nconf.get('MONGODB_URI') + '/' + nconf.get('DB_NAME');
} else if (env === 'test') {
	mongoUri = nconf.get('MONGODB_URI') + '/' + nconf.get('DB_NAME') + '-Test';
}

console.log('env *****', env);
console.log('PORT = ', nconf.get('PORT'));
console.log('MONGODB_URI = ', mongoUri);

module.exports = {

	env: {
		NODE_ENV: env,
		MONGODB_URI: mongoUri,
		PORT: nconf.get('PORT'),
	},
	general: {
		RANDOM_STRING: nconf.get('RANDOM_STRING')
	},
	user: {
		USER_BLOCK_DURATION_MINUTES: nconf.get('User_Block_Duration_Minutes'),
		USER_MAX_FAILED_LOGIN_ATTEMPS: nconf.get('User_Max_Failed_Login_Attemps'),
		USER_SESSION_DURATION_MINUTES: nconf.get('User_Session_Duration_Minutes'),
		USER_JWT_SECRET: nconf.get('USER_JWT_SECRET'),
		USER_VALIDATION_TOKEN_DURATION_MINUTES: nconf.get('User_Validation_Token_Duration_Minutes')
	}
};