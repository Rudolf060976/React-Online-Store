/**
 * Module dependencies.
 */

const http = require('http');

require('./config/config'); // Set Environment Variables 

// HERE WE DECIDE WHAT TYPE OF AUTHENTICATION WE'LL BE USING, LOCAL OR JSON WEB TOKEN (JWT)

const app = require('./app');

/* const app = require('./appJwt'); */

/* const app = require('./appAuth0'); */

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT;

app.set('port', port);


/**
 * Event listener for HTTP server "error" event.
 */

/* function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
  
	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;
  
	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	default:
		throw error;
	}
}  */

/**
 * Create HTTP server.
 */

const server = http.createServer(app);


/* *
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	console.log('SERVER RUNNING AND LISTENING ON PORT : ' + port);
} 


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
// server.on('error', onError);
server.on('listening', onListening);
