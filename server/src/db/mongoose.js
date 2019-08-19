const mongoose = require('mongoose');

const config = require('../config/config');

const url = config.env.MONGODB_URI;

mongoose.Promise = global.Promise;

mongoose.connect(url, { useNewUrlParser: true });

const conn = mongoose.connection; // The Default connection of the Mongoose Module, the same as mongoose.connections[0]


conn.on('error', () => {
	
	console.log('Unable to connect to the Database')

});


conn.once('open',() => {
	console.log("CONNECTED TO MONGODB!!");	

});

module.exports = {
	mongoose
};
