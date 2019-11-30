const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose } = require('../mongoose');

const MongoGridFsStorage = require('mongo-gridfs-storage'); /* WE USE THIS MODULE JUST FOR READ FILES FROM THE GRIDFSBUCKET */

const Category = require('../models/Category');

const Subcategory = require('../models/Subcategory');

const crudSubcategories = require('./crudSubcategories');

const db = mongoose.connection;

const crudCodes = require('./crudCodes');

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


const addCategoryWithFilter = (filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			const { name } = filter;

			let { description } = filter;

			let catCode = null;

			crudCodes.getNewCategoryCode().then(newCode => {

				catCode = newCode;
				
				if(!description) {
					description = null;
				}

				return Category.create({
					_id: new ObjectID(),
					name,
					description,
					code: catCode
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

				const images = res.images;

				if(images.length > 0) {

					deleteManyImagesFromStore({ ids: images })

				}

				return Subcategory.find({ category: ObjectID.createFromHexString(categoryId)});


			}).then(docs =>{
			

				if(docs.length > 0) {

					docs.forEach(doc => {

						const subcat = doc;

						crudSubcategories.deleteSubcategory(subcat._id);

					})				

				}			
		
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


const deleteAllCategories = () => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID
						
			Category.find({}).then(all => {

				const docs = all;

				if(docs.length > 0) {

					const allImagesIdArray = [];

					docs.forEach(doc => {

						const images = doc.images;

						if(images.length > 0) {

							images.forEach(id => {

								allImagesIdArray.push(id);

							});

						}

					})

					deleteManyImagesFromStore({ ids: allImagesIdArray });

				}


				return Category.deleteMany({});

			}).then(() => {

							
				return crudSubcategories.deleteAllSubCategories;


			}).then(() =>{
					
				return resolve();

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


const deleteManyCategories = (filter) => {

	// filter = { ids: [xxxxx, xxxxx, ....] }

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			const { ids } = filter;

			Category.find({ _id: { $in: ids } }).then(all => {

				const docs = all;

				if(docs.length > 0) {

					const allImagesIdArray = [];

					docs.forEach(doc => {

						const images = doc.images;

						if(images.length > 0) {

							images.forEach(id => {

								allImagesIdArray.push(id);

							});

						}

					})

					deleteManyImagesFromStore({ ids: allImagesIdArray });

				}


				return Category.deleteMany({ _id: { $in: ids } });

			}).then(() => {


				return Subcategory.find({ category: { $in: ids }});

			}).then(subcategories => {
					
				const subcatIdArray = subcategories.map(item => item._id);

				return crudSubcategories.deleteManySubCategories({ ids: subcatIdArray });

			}).then(() =>{
					
				return resolve();

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


const getAllCategoriesAdmin = (filter, page, limit, sort) => {
	
	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
						
			const options = {
				page,
				limit,
				sort 
			};
			

			Category.paginate(filter, options).then(result => {
				
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

				return resolve(result);

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


const getManyCategories = (filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
			
			const { ids } = filter;
			
			Category.find({ _id: { $in: ids } }).sort('name').exec().then(res => {

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
				
				deleteImageFromStore(imageId.toString());

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
				
				deleteManyImagesFromStore({ ids: res.images });

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


const deleteManyCategoryImages = (categoryId, filter) => {

	// filter = { ids: [xxxx, xxxx, xxxx]}


	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Category.findById(categoryId).then(res => {

				if (!res) {
					
					throw createError(404, 'ITEM ID NOT FOUND');
					
				}
						
				deleteManyImagesFromStore(filter);

				const { ids } = filter;

				const images = res.images.filter(item => !ids.includes(item.toString()));
				
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


const getManyImagesFromStore = filter => {  

	// filter = { ids: [id1, id2, id3, id4.....] }
	
	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {


			let gfs = new MongoGridFsStorage(mongoose.connection.db, { bucketName: 'images' });
			

			const { ids } = filter;			

			const files = ids.map(id => {

				return gfs.read({ _id: ObjectID.createFromHexString(id) });

			});
		

			Promise.all(files).then(dataArray => {

				const outputArray = [];

				for( let i = 0; i < ids.length; i++) {

					outputArray.push({
						_id: ids[i],
						image: dataArray[i]
					});

				}
				
				resolve(outputArray);

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


const deleteManyImagesFromStore = filter => {  

	// filter = { ids: [id1, id2, id3, id4.....] }
	
	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {


			let gfs = new MongoGridFsStorage(mongoose.connection.db, { bucketName: 'images' });
			

			const { ids } = filter;			

			const files = ids.map(id => {

				return gfs.delete({ _id: ObjectID.createFromHexString(id) });

			});
		

			Promise.all(files).then(() => {

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
	deleteAllCategories,
	getCategoryById,
	getCategoryByName,
	getAllCategories,
	getManyCategories,
	getAllCategoriesAdmin,
	updateCategory,
	addCategoryImage,
	getCategoryImages,
	deleteCategoryImage,
	deleteAllCategoryImages,
	updateCategoryImages,
	getImageFromStore,
	deleteImageFromStore,
	getManyImagesFromStore,
	addCategoryWithFilter,
	deleteManyImagesFromStore,
	deleteManyCategoryImages,
	deleteManyCategories
};