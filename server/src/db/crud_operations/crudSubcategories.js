const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose } = require('../mongoose');

const MongoGridFsStorage = require('mongo-gridfs-storage'); /* WE USE THIS MODULE JUST FOR READ FILES FROM THE GRIDFSBUCKET */

const Subcategory = require('../models/Subcategory');

const Category = require('../models/Category');

const db = mongoose.connection;

const crudCodes = require('./crudCodes');


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


const addSubcategoryWithFilter = (categoryId, filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			const { name } = filter;

			let { description } = filter;

			let subcatCode = null;

			crudCodes.getNewSubcategoryCode().then(newCode => {

				subcatCode = newCode;

				if(!description) {
					description = null;
				}

				return Subcategory.create({
					_id: new ObjectID(),
					code: subcatCode,
					name,
					description,
					category: ObjectID.createFromHexString(categoryId)
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
				
				const images = res.images;

				if(images.length > 0) {

					deleteManyImagesFromStore({ ids: images });

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


const deleteAllSubCategories = () => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
			
			Subcategory.find({}).then(all => {
							
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

					});

					deleteManyImagesFromStore({ ids: allImagesIdArray });

				}
				
				return Subcategory.deleteMany({});

			}).then(() => {

			
				resolve();


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


const deleteManySubCategories = (filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			const { ids } = filter;
			
			Subcategory.find({ _id: { $in: ids } }).then(all => {
							
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

					});

					deleteManyImagesFromStore({ ids: allImagesIdArray });

				}
				
				return Subcategory.deleteMany({ _id: { $in: ids } });

			}).then(() => {
			
				resolve();

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


const updateSubcategory = (subcategoryId, filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(subcategoryId)) {
				
				throw createError(400, 'INVALID ID');
					
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


const getSubcategoryById = subcategoryId => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(subcategoryId)) {
				
				throw createError(400, 'INVALID ID');
					
			}
						

			Subcategory.findById(subcategoryId).then(res => {

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


const getAllSubcategories = () => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

					
			Subcategory.find({}).populate({ path: 'category', select: 'name' }).sort('name').exec().then(subcategories => {
				
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


const getManySubcategories = (filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			const { ids } = filter;

			const ids2 = ids.map(item => ObjectID.createFromHexString(item));
					
			Subcategory.find({ _id: { $in: ids2 }}).sort('name').exec().then(subcategories => {
				
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


const getAllSubcategoriesAdmin = (filter, page, limit, sort) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			const options = {
				page,
				limit,
				sort
			};
			
					
			Subcategory.paginate(filter, options).then(result => {
				
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


const addSubcategoryImage = (subcategoryId, imageId ) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(subcategoryId)) {
				
				throw createError(400, 'INVALID ID');
				
			} 

			Subcategory.findById(subcategoryId).then(res => {


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


const getSubcategoryImages = (subcategoryId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(subcategoryId)) {
				
				throw createError(400, 'INVALID ID');
					
			} 


			Subcategory.findById(subcategoryId).then(res => {

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


const deleteSubcategoryImage = (subcategoryId, imageId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Subcategory.findById(subcategoryId).then(res => {

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


const deleteAllSubcategoryImages = (subcategoryId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Subcategory.findById(subcategoryId).then(res => {

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


const updateSubcategoryImages = (subcategoryId, imagesArray) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
			
			Subcategory.findById(subcategoryId).then(res => {

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


const deleteManySubcategoryImages = (subcategoryId, filter) => {

	// filter = { ids: [xxxx, xxxx, xxxx]}


	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Subcategory.findById(subcategoryId).then(res => {

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
	addSubcategory,
	deleteSubcategory,
	deleteAllSubCategories,
	getManySubcategories,
	updateSubcategory,
	getSubcategories,
	getSubcategoryById,
	addSubcategoryImage,
	getSubcategoryImages,
	deleteSubcategoryImage,
	deleteAllSubcategoryImages,
	updateSubcategoryImages,
	getImageFromStore,
	deleteImageFromStore,
	getAllSubcategories,
	getAllSubcategoriesAdmin,
	deleteManySubcategoryImages,
	addSubcategoryWithFilter,
	deleteManySubCategories
};

