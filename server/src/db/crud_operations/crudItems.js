const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose } = require('../mongoose');

const Category = require('../models/Category');

const Subcategory = require('../models/Subcategory');

const MongoGridFsStorage = require('mongo-gridfs-storage'); /* WE USE THIS MODULE JUST FOR READ FILES FROM THE GRIDFSBUCKET */

const Item = require('../models/Item');

const db = mongoose.connection;


const addNewItem = (categoryId, subcategoryId, code, name, price) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			let categId = '';

			Item.findOne({ code }).then(res => {

				if(res) {

					throw createError(409, 'ITEM ALREADY EXISTS');
					
				}

				if (!ObjectID.isValid(categoryId)) {
				
					throw createError(400, 'INVALID CATEGORY ID');
						
				}

				if (!ObjectID.isValid(subcategoryId)) {
				
					throw createError(400, 'INVALID SUBCATEGORY ID');
						
				}

				return Category.findById(categoryId);

			}).then(category => {

				if(!category) {
										
					throw createError(404, 'CATEGORY NOT FOUND');				

				}

				categId = category._id.toString();
				
				return Subcategory.findById(subcategoryId);

			}).then(subcategory => {

				if(!subcategory) {

					throw createError(404, 'SUBCATEGORY NOT FOUND');	

				}

				if(subcategory.category.toString() !== categId) {

					throw createError(400, 'SUBCATEGORY ID MUST BE RELATED TO CATEGORY ID');

				}
				
				return Item.create({
					_id: new ObjectID(),
					category: ObjectID.createFromHexString(categoryId),
					subcategory: ObjectID.createFromHexString(subcategoryId),
					code,
					name,
					price
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

const addNewItemByFilter = (filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {


			if (filter) {

				if (typeof filter === 'object') {

					let result = 0;

					const filterParamsCount = Object.keys(filter).length;
	
					Object.keys(filter).forEach(item => {
									
						Item.schema.eachPath(pathname => {
	
							if (item === pathname) result +=1;
	
						});
	
					});
	
					if (result < filterParamsCount) {
	
						throw createError(400, 'BAD FILTER PARAMETERS');
					
					}

					if(!filter.category || !filter.subcategory || !filter.code || !filter.name || !filter.price) {

						throw createError(400, 'BAD FILTER PARAMETERS');

					}


				} else {

					throw createError(400, 'FILTER MUST BE AN OBJECT');

				}				

			} else {

				throw createError(400, 'MISSING FILTER');

			}

			const { category, subcategory, code, name, price } = filter;

			let categId = '';

			Item.findOne({ code }).then(res => {

				if(res) {

					throw createError(409, 'ITEM ALREADY EXISTS');
					
				}

				if (!ObjectID.isValid(category)) {
				
					throw createError(400, 'INVALID CATEGORY ID');
						
				}

				if (!ObjectID.isValid(subcategory)) {
				
					throw createError(400, 'INVALID SUBCATEGORY ID');
						
				}

				return Category.findById(category);

			}).then(categ => {

				if(!categ) {
										
					throw createError(404, 'CATEGORY NOT FOUND');				

				}

				categId = categ._id.toString();
				
				return Subcategory.findById(subcategory);

			}).then(subcateg => {

				if(!subcateg) {

					throw createError(404, 'SUBCATEGORY NOT FOUND');	

				}

				if(subcateg.category.toString() !== categId) {

					throw createError(400, 'SUBCATEGORY ID MUST BE RELATED TO CATEGORY ID');

				}
				
				return Item.create({
					_id: new ObjectID(),
					category: ObjectID.createFromHexString(category),
					subcategory: ObjectID.createFromHexString(subcategory),
					code,
					name,
					price
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


const addItemImage = (itemId, imageId ) => {

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


const getItemById = (itemId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(itemId)) {
				
				throw createError(400, 'INVALID ID');
					
			}
						

			Item.findById(itemId).populate({ path: 'category', select:'name' }).exec().then(res => {

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

const deleteItemImage = (itemId, imageId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Item.findById(itemId).then(res => {

				if (!res) {
					
					throw createError(404, 'ITEM ID NOT FOUND');
					
				}
				
				const img = res.images.find(item => item.toString() === imageId.toString())
				
				if(!img) {

					throw createError(404, 'IMAGE ID NOT FOUND');

				}

				const images = res.images.filter(item => item.toString() !== imageId.toString());
				
				res.images = images;

				return res.save();

			}).then(res => {
				
				resolve(res);					

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

const deleteAllItemImages = (itemId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Item.findById(itemId).then(res => {

				if (!res) {
					
					throw createError(404, 'ITEM ID NOT FOUND');
					
				}				
				
				res.images = [];

				return res.save();

			}).then(res => {				

				resolve(res);					

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


const updateItemImages = (itemId, imagesArray) => {

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

const getItems = filter => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			if(!filter) {

				filter = {};

			} else {


				if (typeof filter === 'object') {

					let result = 0;

					const filterParamsCount = Object.keys(filter).length;
	
					Object.keys(filter).forEach(item => {
									
						Item.schema.eachPath(pathname => {
	
							if (item === pathname) result +=1;
	
						});
	
					});
	
					if (result < filterParamsCount) {
	
						throw createError(400, 'BAD FILTER PARAMETERS');
					
					}
	

				} else {

					throw createError(400, 'FILTER MUST BE AN OBJECT');

				}

			}

		
			Item.find(filter).populate({ path: 'category', select:'name' }).sort('name').exec().then(res => {

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

const updateItem = (itemId, filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {


			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(itemId)) {
				
				throw createError(400, 'INVALID ID');
					
			}

			if (filter) {

				if (typeof filter === 'object') {

					let result = 0;

					const filterParamsCount = Object.keys(filter).length;
	
					Object.keys(filter).forEach(item => {
									
						Item.schema.eachPath(pathname => {
	
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
		

			Item.findByIdAndUpdate(itemId, filter, { new: true }).then(res => {

				if (!res) {
					
					throw createError(404, 'ITEM ID NOT FOUND');
					
				}

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

const getImageFromStore = imageId => {  // IMPORTANT  argument: imageId is STRING AND NOT ObjectID(String) SO IT WILL BE CONVERTED TO ObjectdID LATER

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(imageId)) {
				
				throw createError(400, 'INVALID ID');
						
			} 

			let gfs = new MongoGridFsStorage(mongoose.connection.db, { bucketName: 'images' });

			const filter = {
				_id: ObjectID.createFromHexString(imageId)
			};
			
			gfs.read(filter).then(fileBuffer => {

				resolve(fileBuffer);

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


const deleteImageFromStore = imageId => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(imageId)) {
				
				throw createError(400, 'INVALID ID');
						
			} 

			let gfs = new MongoGridFsStorage(mongoose.connection.db, { bucketName: 'images' });

			const filter = {
				id: ObjectID.createFromHexString(imageId)
			};
			
			gfs.delete(filter).then(() => {

				resolve();

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

const getItemsByCategory = categoryId => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(categoryId)) {
				
				throw createError(400, 'INVALID ID');
						
			}

			Item.find({ category: ObjectID.createFromHexString(categoryId) })
				.populate({ path: 'category', select:'name' }).populate({ path: 'subcategory', select: 'name' }).exec().then(res => {
					
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


const getItemsBySubcategory = subcategoryId => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(subcategoryId)) {
				
				throw createError(400, 'INVALID ID');
						
			}

			Item.find({ subcategory: ObjectID.createFromHexString(subcategoryId) })
				.populate({ path: 'category', select:'name' }).populate({ path: 'subcategory', select: 'name' }).exec().then(res => {
					
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

module.exports =  {
	addNewItem,
	addNewItemByFilter,
	addItemImage,
	deleteItemImage,
	deleteAllItemImages,
	getItemImages,
	updateItemImages,
	getItems,
	getItemById,
	updateItem,
	getImageFromStore,
	deleteImageFromStore,
	getItemsByCategory,
	getItemsBySubcategory
};