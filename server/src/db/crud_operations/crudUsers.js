const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const mongoose = require('../mongoose');

const User = require('../models/User');

const db = mongoose.connection;

const getUserById = (userId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(userId)) {
				
				throw createError(400, 'INVALID ID');
					
			} 

			User.findById(userId).then(res => {

				if(!res) {

					throw createError(404, 'ID NOT FOUND');

				}

				return resolve(res);

			}).catch(err => {

				reject(err);

			});

		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	})	

};


const getUserByUsername = (username) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			
			User.findOne({ username }).then(res => {

				if(!res) {

					throw createError(404, 'USER NOT FOUND');

				}

				return resolve(res);

			}).catch(err => {

				reject(err);

			});

		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	})	

};


const registerUser = (username, password, firstname, lastname, email) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {


			User.findOne({ username }).then(res => {

				if(res) {

					throw createError(409, 'USERNAME ALREADY EXISTS');

				}

				return User.findOne({ email });

			}).then(res => {

				if(res) {

					throw createError(409, 'EMAIL ALREADY EXISTS');

				}

				const doc = new User({
					username,
					password,
					firstname,
					lastname,
					email
				});

				return doc.save();

			}).then(res => {

				resolve(res);

			}).catch(err => {

				reject(err);

			});

		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

module.exports = {
	getUserById,
	getUserByUsername,
	registerUser
}
