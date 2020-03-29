const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose } = require('../mongoose');

const ItemSpecials = require('../models/ItemSpecials');

const db = mongoose.connection;

const addNewSpecialWithFilter = filter => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			ItemSpecials.create({
				...filter,
				_id: new ObjectID(),
				code: '001'					

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


const getItemsSpecialsAdmin = (filter, page, limit, sort) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
					
			const options = {
				page,
				limit,
				sort
			};
			
			ItemSpecials.paginate(filter, options).then(result => {

				/* result is an Object with the following properties:

			- docs {Array} - Array of documents
			- totalDocs {Number} - Total number of documents in collection that match a query
			- limit {Number} - Limit that was used
			- hasPrevPage {Bool} - Availability of prev page.
			- hasNextPage {Bool} - Availability of next page.
			- page {Number} - Current page number
			- totalPages {Number} - Total number of pages.
			- offset {Number} - Only if specified or default page/offset values were used
			- prevPage {Number} - Previous page number if available or NULL
			- nextPage {Number} - Next page number if available or NULL
			- pagingCounter {Number} - The starting sl. number of first document.
			- meta {Object} - Object of pagination meta data (Default false). 
			
			*/					

				resolve(result);

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

const updateItemSpecials = (id, filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {


			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(id)) {
				
				throw createError(400, 'INVALID ID');
					
			}

			const { bestSellerItems, dealOfTheDayItems, freeShippingItems, mustHaveItems, seasonDealItems, familyEntertainment, learningForKids, workoutAtHome, healthCare} = filter;

			const data = {
				bestSellerItems,
				dealOfTheDayItems,
				freeShippingItems,
				mustHaveItems,
				seasonDealItems,
				familyEntertainment,
				learningForKids,
				workoutAtHome,
				healthCare
			};

			
			ItemSpecials.findByIdAndUpdate(id, data, { new: true }).then(res => {
				
				if (!res) {
					
					throw createError(404, 'ITEM ID NOT FOUND');
					
				}

				return resolve(res);

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

const getItemsSpecials = () => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
								
			
			ItemSpecials.find({}).then(docs => {
			
				resolve(docs);

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

const getItemSpecialById = (id) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(id)) {
				
				throw createError(400, 'INVALID ID');
					
			}
						

			ItemSpecials.findById(id).then(res => {

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

const deleteAllItemSpecials = async () => {

	try {

		if (db.readyState === 1 || db.readyState === 2) {

			await ItemSpecials.deleteMany({});

		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

		
	} catch (error) {

		if (!error.status) {

			error.status = 500;

		}

		throw createError(500, error.message);
		
	}


};


module.exports = {
	addNewSpecialWithFilter,
	getItemsSpecialsAdmin,
	getItemsSpecials,
	updateItemSpecials,
	getItemSpecialById,
	deleteAllItemSpecials
};