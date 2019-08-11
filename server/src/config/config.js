require('custom-env').env(true, './../../');
const randomstring = require('randomstring');
const path = require('path');

const nconf = require('nconf');


nconf.argv()
    .env()
    .file( { file: path.join(__dirname + './../../' + 'config.json')});

nconf.set('RANDOM_STRING10', randomstring.generate(10));

nconf.defaults({

        DB_USER: "root",
        DB_PASS: null,
        User_Block_Duration_Minutes: 10,
        User_Wrong_Passwords_Attemps: 5

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
console.log('RANDOM_STRING = ', nconf.get('RANDOM_STRING10'));
console.log('USER_BLOCK_DURATION_MINUTES = ', nconf.get('User_Block_Duration_Minutes'));
console.log('USER_WRONG_PASSWORDS_ATTEMPS = ', nconf.get('User_Wrong_Passwords_Attemps'));

module.exports = {

    env: {
        NODE_ENV: env,
        MONGODB_URI: mongoUri,
        PORT: nconf.get('PORT'),
    },
    general: {

    }, 
    db: {
        DB_USER: nconf.get('DB_USER'),
        DB_PASS: nconf.get('DB_PASS')        
    },
    user: {
        USER_BLOCK_DURATION_MINUTES: nconf.get('User_Block_Duration_Minutes'),
        USER_WRONG_PASSWORDS_ATTEMPS: nconf.get('User_Wrong_Passwords_Attemps')
    }
};