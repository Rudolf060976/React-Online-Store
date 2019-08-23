const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose } = require('../mongoose');

const Subcategory = require('../models/Subcategory');

const Category = require('../models/Category');

const db = mongoose.connection;


const addSubcategory = (code, categoryId, name, description) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Subcategory.findOne({ code }).then(res => {

				if(res) {

					throw createError(409, 'CODE ALREADY EXISTS');

				}

				if (!ObjectID.isValid(categoryId)) {
				
					throw createError(400, 'INVALID ID');
						
				}

				if(!description) {
					description = null;
				}

				return Category.findById(categoryId);

			}).then(res => {

				if (!res) {
					
					throw createError(404, 'ID NOT FOUND');
					
				}

				return Subcategory.create({
					_id: new ObjectID(),
					code,
					category: ObjectID.createFromHexString(categoryId),
					name,
					description					
				})

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


const deleteSubcategory = subcategoryId => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(subcategoryId)) {
				
				throw createError(400, 'INVALID ID');
					
			}						

			Subcategory.findByIdAndDelete(subcategoryId).then(res => {

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



}

const updateSubcategory = (subcategoryId, filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(subcategoryId)) {
				
				throw createError(400, 'INVALID ID');
					
			}
				
			if (filter) {

				if (typeof filter === 'object') {

					let result = 0;

					const filterParamsCount = Object.keys(filter).length;
	
					Object.keys(filter).forEach(item => {
									
						Subcategory.schema.eachPath(pathname => {
	
							if (item === pathname) result +=1;
	
						});
	
					});
	
					if (result < filterParamsCount) {
	
						throw createError(400, 'BAD FILTER PARAMETERS');
					
					}


				} else {

					throw createError(400, 'FILTER MUST BE AN OBJECT');

				}				

			} else {

				throw createError(400, 'MISSING FILTER');

			}

			Subcategory.findByIdAndUpdate(subcategoryId, filter, { new: true }).then(res => {

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

}

const getSubcategories = categoryId => {

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

				return Subcategory.find({ category: categoryId }).populate({ path: 'category', select: 'name' }).sort('name').exec();

			}).then(subcategories => {
				
				return resolve(subcategories);

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
	addSubcategory,
	deleteSubcategory,
	updateSubcategory,
	getSubcategories
};

