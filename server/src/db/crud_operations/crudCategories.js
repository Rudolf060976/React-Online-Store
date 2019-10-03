const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose } = require('../mongoose');

const MongoGridFsStorage = require('mongo-gridfs-storage'); /* WE USE THIS MODULE JUST FOR READ FILES FROM THE GRIDFSBUCKET */

const Category = require('../models/Category');

const Subcategory = require('../models/Subcategory');

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
			
			let deletedDoc = null;

			Category.findByIdAndDelete(categoryId).then(res => {

				if (!res) {
					
					throw createError(404, 'ID NOT FOUND');
					
				}

				deletedDoc = res;

				return Subcategory.deleteMany({ category: ObjectID.createFromHexString(categoryId)});

			}).then(() => {

				return resolve(deletedDoc);

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

			
			Category.find({}).sort('name').exec().then(res => {

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

const updateCategory = (categoryId, filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(categoryId)) {
				
				throw createError(400, 'INVALID ID');
					
			}
				
			if (filter) {

				if (typeof filter === 'object') {

					let result = 0;

					const filterParamsCount = Object.keys(filter).length;
	
					Object.keys(filter).forEach(item => {
									
						Category.schema.eachPath(pathname => {
	
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

			Category.findByIdAndUpdate(categoryId, filter, { new: true }).then(res => {

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


const addCategoryImage = (categoryId, imageId ) => {

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

const getCategoryImages = (categoryId) => {

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

const deleteCategoryImage = (categoryId, imageId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Category.findById(categoryId).then(res => {

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

const deleteAllCategoryImages = (categoryId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Category.findById(categoryId).then(res => {

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

const updateCategoryImages = (categoryId, imagesArray) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
			
			Category.findById(categoryId).then(res => {

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


module.exports = {
	addCategory,
	deleteCategory,
	getCategoryById,
	getCategoryByName,
	getAllCategories,
	updateCategory,
	addCategoryImage,
	getCategoryImages,
	deleteCategoryImage,
	deleteAllCategoryImages,
	updateCategoryImages,
	getImageFromStore,
	deleteImageFromStore
};