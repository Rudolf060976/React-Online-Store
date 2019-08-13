const http = require('http');
const config = require('./config/config');

const app = require('./app');


const port = config.env.PORT;

const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {

	console.log('Server Running and Listening on Port : ', port);

});