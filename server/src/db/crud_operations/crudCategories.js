const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose } = require('../mongoose');


const Category = require('../models/Category');

const db = mongoose.connection;

const addCategory = (code, name, description) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Category.findOne({ code }).then(res => {

				if(res) {

					throw createError(409, 'CODE ALREADY EXISTS');
					
				}

				if(!description) {
					description = null;
				}

				return Category.create({
					_id: new ObjectID(),
					code,
					name,
					description
				});
		

			}).then(res => {

				resolve(res);

			}).catch(err => {

				if (!err.status) {

					err.status = 500;

				}

				reject(err);

			});

		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const deleteCategory = categoryId => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(categoryId)) {
				
				throw createError(400, 'INVALID ID');
					
			}						

			Category.findByIdAndDelete(categoryId).then(res => {

				if (!res) {
					
					throw createError(404, 'ID NOT FOUND');
					
				}

				return resolve(res);

			}).catch(err => {
				
				if (!err.status) {

					err.status = 500;

				}

				reject(err);
			})


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const getCategoryById = categoryId => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(categoryId)) {
				
				throw createError(400, 'INVALID ID');
					
			}
						

			Category.findById(categoryId).then(res => {

				if (!res) {
					
					throw createError(404, 'ID NOT FOUND');
					
				}

				return resolve(res);

			}).catch(err => {

				if (!err.status) {

					err.status = 500;

				}

				reject(err);
			})


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};


const getCategoryByName = name => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			
			Category.findOne({ name }).then(res => {

				if (!res) {
					
					throw createError(404, 'CATEGORY NOT FOUND');
					
				}

				return resolve(res);

			}).catch(err => {

				if (!err.status) {

					err.status = 500;

				}

				reject(err);
			})


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const getAllCategories = () => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			
			Category.find({}).then(res => {

				return resolve(res);

			}).catch(err => {

				if (!err.status) {

					err.status = 500;

				}

				reject(err);
			})


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

module.exports = {
	addCategory,
	deleteCategory,
	getCategoryById,
	getCategoryByName,
	getAllCategories
};