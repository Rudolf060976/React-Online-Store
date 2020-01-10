require('custom-env').env(true,__dirname + './../../');
const randomstring = require('randomstring');
const path = require('path');

const nconf = require('nconf');


nconf.argv()
	.env()
	.file( { file: path.join(__dirname,'..','..','config.json')});
	//.file( { file: path.join(__dirname + './../../' + 'config.json')});

nconf.set('USER_JWT_SECRET','32KJKK44/*/*--DF44T3AFSDAS');
nconf.set('RANDOM_STRING',randomstring.generate(10));

nconf.defaults({
	
	User_Block_Duration_Minutes: 10,
	User_Max_Failed_Login_Attemps: 5,
	User_Session_Duration_Minutes: 30,
	User_Validation_Token_Duration_Minutes: 60,
	App_Email_Address: "onlinestoreintelligentzona@gmail.com",
	Email_Account_Port: 587,
	Email_Account_Host: "smtp.gmail.com",
	Email_Account_User: "onlinestoreintelligentzona@gmail.com",
	Email_Account_Password: "pelalo2018",
	Company_Name: "ONLINE STORE",
	Company_Address: "Venezuela",
	Company_Phone: "+58-291-3150121",
	Company_Logo_Link: "https://www.designevo.com/res/templates/thumb_small/store-and-black-shopping-trolley.png",
	App_Base_Url: "http://localhost:3000",
	Items_Image_Max_Size_MBytes: 16,
	Categories_Images_Max_Count: 8,
	Subcategories_Images_Max_Count: 8,
	Items_Images_Max_Count: 8
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
		RANDOM_STRING: nconf.get('RANDOM_STRING'),
		APP_EMAIL_ADDRESS: nconf.get('App_Email_Address'),
		EMAIL_ACCOUNT_PORT: nconf.get('Email_Account_Port'),
		EMAIL_ACCOUNT_HOST: nconf.get('Email_Account_Host'),
		EMAIL_ACCOUNT_USER: nconf.get('Email_Account_User'),
		EMAIL_ACCOUNT_PASSWORD: nconf.get('Email_Account_Password')
	},
	user: {
		USER_BLOCK_DURATION_MINUTES: nconf.get('User_Block_Duration_Minutes'),
		USER_MAX_FAILED_LOGIN_ATTEMPS: nconf.get('User_Max_Failed_Login_Attemps'),
		USER_SESSION_DURATION_MINUTES: nconf.get('User_Session_Duration_Minutes'),
		USER_JWT_SECRET: nconf.get('USER_JWT_SECRET'),
		USER_VALIDATION_TOKEN_DURATION_MINUTES: nconf.get('User_Validation_Token_Duration_Minutes')
	},
	company: {
		name: nconf.get('Company_Name'),
		address: nconf.get('Company_Address'),
		phone: nconf.get('Company_Phone'),
		logo_link: nconf.get('Company_Logo_Link')
	},
	app: {
		base_url: nconf.get('App_Base_Url'),
		items: {
			ITEMS_IMAGE_MAX_SIZE_MBYTES: nconf.get('Items_Image_Max_Size_MBytes'),
			ITEMS_IMAGES_MAX_COUNT: nconf.get('Items_Images_Max_Count'),
			CATEGORIES_IMAGES_MAX_COUNT: nconf.get('Categories_Images_Max_Count'),
			SUBCATEGORIES_IMAGES_MAX_COUNT: nconf.get('Subcategories_Images_Max_Count')
		}
	},
	
};