const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose, gfs } = require('../mongoose');

const Item = require('../models/Item');

const db = mongoose.connection;


const addNewItem = (code, name, price) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Item.findOne({ code }).then(res => {

				if(res) {

					throw createError(409, 'ITEM ALREADY EXISTS');
					
				}

				const doc = new Item({
					code,
					name,
					price
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

const saveItemImage = (itemId, imageId ) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(itemId)) {
				
				throw createError(400, 'INVALID ID');
				
			} 

			Item.findById(itemId).then(res => {


				if (!res) {
					
					throw createError(404, 'ID NOT FOUND');
					
				}

				res.images.push(imageId);

				return res.save();


			}).then(res => {

				resolve(res);


			}).catch(err => {

				reject(err);
			})

		
		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const getItemImages = (itemId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(itemId)) {
				
				throw createError(400, 'INVALID ID');
					
			} 


			Item.findById(itemId).then(res => {

				if (!res) {
					
					throw createError(404, 'ID NOT FOUND');
					
				}

				return resolve(res.images);

			}).catch(err => {

				reject(err);
			})


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const deleteItemImage = (itemId, imageId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Item.findById(itemId).then(res => {

				if (!res) {
					
					throw createError(404, 'ITEM ID NOT FOUND');
					
				}
				
				const img = res.images.find(item => {
					item === imageId;
				})

				if(!img) {

					throw createError(404, 'IMAGE ID NOT FOUND');

				}

				const images = res.images.filter(item => {

					item !== imageId;

				});

				res.images = images;

				return res.save();

			}).then(res => {

				gfs.remove( { _id: imageId });

				resolve(res);					

			}).catch(err => {

				reject(err);
			})
		
		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const deleteAllItemImages = (itemId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Item.findById(itemId).then(res => {

				if (!res) {
					
					throw createError(404, 'ITEM ID NOT FOUND');
					
				}				
			
				const images = res.images.slice(0);

				for (let i = 0; i < images.length; i++) {

					gfs.remove( { _id: images[i] });

				}

				res.images = [];

				return res.save();

			}).then(res => {				

				resolve(res);					

			}).catch(err => {

				reject(err);
			})
		
		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};


const setItemImagesOrder = (itemId, imagesArray) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
			
			Item.findById(itemId).then(res => {

				if (!res) {
					
					throw createError(404, 'ITEM ID NOT FOUND');
					
				}	

				res.images = imagesArray;

				return res.save();

			}).then(res => {

				resolve(res);

			}).catch(err => {

				reject(err);
			})

		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}
	});

};

const getAllItemsByFilter = (filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			if(!filter) {

				filter = {};

			}

			Item.find(filter).then(res => {

				resolve(res);

			}).catch(err => {

				reject(err);

			});


		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}	
	});
};

module.exports =  {
	addNewItem,
	saveItemImage,
	deleteItemImage,
	deleteAllItemImages,
	getItemImages,
	setItemImagesOrder,
	getAllItemsByFilter
}