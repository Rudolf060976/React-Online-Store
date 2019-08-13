const { ObjectID } = require('mongodb');

const createError = require('http-errors');

const { mongoose } = require('../mongoose');

const User = require('../models/Users');

const db = mongoose.connection;


const addUser = function (username, password, fullname) {

	
	return new Promise((resolve, reject) => {
		

		if (db.readyState === 1 || db.readyState === 2) {


			const doc = new User({
				username,
				password,
				fullname
			});

			doc.save().then((res) => {

				return resolve(res);

			}).catch((err) => {

				reject(err);
			});


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');
		}


	});

};

const deleteUser = function (userId) {

	return new Promise((resolve, reject) => { // Case No. 1 : Disconnected from the Database

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(userId)) {
				
				throw createError(400, 'INVALID ID');
				
			} 

			User.findById(userId).then((res) => {

				if (!res) {
					
					throw createError(404, 'ID NOT FOUND');
					
				}

				if (res.items) {

					if (res.items.length > 0) {

						throw createError(401, 'CANNOT DELETE AN USER WITH ITEMS');
					}
				}

				return User.deleteOne({ _id: userId });

			}).then(() => {

				resolve();
						
			}).catch((err) => {

				reject(err);

			});

		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const updateUserPassword = function (userId, newPassword) {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(userId)) {
				
				throw createError(400, 'INVALID ID');
				
			} 

			User.findByIdAndUpdate(userId, { password: newPassword, lastModified: new Date() }, { new: true }).then((res) => {

				if (!res) {

					throw createError(404, 'ID NOT FOUND');
					
				}

				return resolve(res);

			}).catch((err) => {

				reject(err);

			});


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}


	});


};

const getUser = function (userId) {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(userId)) {
				
				throw createError(400, 'INVALID ID');
					
			} 

			User.findById(userId).then((res) => {

				if (!res) {

					throw createError(404, 'ID NOT FOUND');

				}

				return resolve(res);

			}).catch((err) => {

				reject(err);

			});


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};


const getUserbyName = function (username) {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			
			User.findOne({ username }).then((res) => {
				
				if (!res) {

					throw createError(404, 'USER NOT FOUND');

				}

				return resolve(res);

			}).catch((err) => {

				reject(err);

			});


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const addUserItem = function (userId, item) {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(userId)) {
				
				throw createError(400, 'INVALID ID');
					
			} 

			User.findById(userId).then((res) => {

				if (!res) {
					
					throw createError(404, 'ID NOT FOUND');
					
				}

				res.items.push(item);
								
				return res.save();

			}).then((res) => {

				return resolve(res);			

			}).catch((err) => {

				reject(err);

			});


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const deleteUserItem = function (userId, passwordId) {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(userId)) {
				
				throw createError(400, 'INVALID ID');
					
			} 

			User.findById(userId).then((res) => {

				if (!res) {
					
					throw createError(404, 'ID NOT FOUND');
					
				}

				const filteredItems = res.items.filter((item) => {

					return item._id !== passwordId;

				});

				res.items = filteredItems;
							
				return res.save();

			}).then((res) => {

				return resolve(res);			

			}).catch((err) => {

				reject(err);

			});


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});


};

const suspendUser = function (userId) {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(userId)) {
				
				throw createError(400, 'INVALID ID');
	
			} 

			User.findByIdAndUpdate(userId, { suspended: true, lastModified: new Date() }, { new: true }).then((res) => {

				if (!res) {

					throw createError(404, 'ID NOT FOUND');
				}

				return resolve(res);

			}).catch((err) => {

				reject(err);

			});


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');
		}


	});


};

const activateUser = function (userId) {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(userId)) {
				
				throw createError(400, 'INVALID ID');
	
			} 

			User.findByIdAndUpdate(userId, { suspended: false, lastModified: new Date() }, { new: true }).then((res) => {

				if (!res) {

					throw createError(404, 'ID NOT FOUND');
				
				}

				return resolve(res);

			}).catch((err) => {

				reject(err);

			});


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

module.exports = {
	addUser,
	deleteUser,
	updateUserPassword,
	getUser,
	addUserItem,
	deleteUserItem,
	suspendUser,
	activateUser,
	getUserbyName
};
