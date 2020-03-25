const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose } = require('../mongoose');

const Category = require('../models/Category');

const Subcategory = require('../models/Subcategory');

const MongoGridFsStorage = require('mongo-gridfs-storage'); /* WE USE THIS MODULE JUST FOR READ FILES FROM THE GRIDFSBUCKET */

const Item = require('../models/Item');

const db = mongoose.connection;

const crudCodes = require('./crudCodes');

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


const addNewItemWithFilter = filter => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			const { subcategory } = filter;

			let itemCode = null;
			
			crudCodes.getNewItemCode().then(newCode => {
				
				itemCode = newCode;

				return Subcategory.findById(subcategory);

			}).then(subcat => {
		
				return Item.create({
					...filter,
					_id: new ObjectID(),
					category: subcat.category,
					code: itemCode
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


const deleteItem = itemId => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(itemId)) {
				
				throw createError(400, 'INVALID ID');
					
			}	
			

			Category.findByIdAndDelete(itemId).then(res => {

				if (!res) {
					
					throw createError(404, 'ID NOT FOUND');
					
				}			

				const images = res.images;

				if(images.length > 0) {

					deleteManyImagesFromStore({ ids: images })

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


const deleteAllItems = () => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
			
			Item.find({}).then(all => {
							
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
				
				return Item.deleteMany({});

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


const deleteManyItems = (filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			const { ids } = filter;
			
			Item.find({ _id: { $in: ids } }).then(all => {
							
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
				
				return Item.deleteMany({ _id: { $in: ids } });

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


const updateItem = (itemId, filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {


			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(itemId)) {
				
				throw createError(400, 'INVALID ID');
					
			}

			
			Item.findByIdAndUpdate(itemId, filter, { new: true }).then(res => {

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

/*

const getItemsByCategory = (categoryId, page, limit, sort) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(categoryId)) {
				
				throw createError(400, 'INVALID ID');
						
			}

			let field, order;


			if(sort) {

				field = sort.field;
				order = sort.order;

			} else {

				field = 'name';
				order = 'ASC';
			}


			const options = {
				page,
				limit,
				populate: [
					{ path: 'category', select:'name' },
					{ path: 'subcategory', select: 'name' }
				],
				sort: { [field]: order  }
			};

			Item.paginate({ category: ObjectID.createFromHexString(categoryId) }, options).then(result => {
			
				 result is an Object with the following properties:

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


const getItemsBySubcategory = (subcategoryId, page, limit, sort) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			// Case No. 2 : Invalid ID

			if (!ObjectID.isValid(subcategoryId)) {
				
				throw createError(400, 'INVALID ID');
						
			}

			let field, order;


			if(sort) {

				field = sort.field;
				order = sort.order;

			} else {

				field = 'name';
				order = 'ASC';
			}


			const options = {
				page,
				limit,
				populate: [
					{ path: 'category', select:'name' },
					{ path: 'subcategory', select: 'name' }
				],
				sort: { [field]: order  }
			};


			Item.paginate({ subcategory: ObjectID.createFromHexString(subcategoryId) }, options).then(result => {

				 result is an Object with the following properties:

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

*/

const getItems = (filter, page, limit, sort) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
					
			const options = {
				page,
				limit,
				populate: [
					{ path: 'category', select:'name' },
					{ path: 'subcategory', select: 'name' }
				],
				sort
			};
			
			Item.paginate(filter, options).then(result => {

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


const getItemsAdmin = (filter, page, limit, sort) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {
					
			const options = {
				page,
				limit,
				sort
			};
			
			Item.paginate(filter, options).then(result => {

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


const getManyItems = (filter) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			const { ids } = filter;

			Item.find({ _id: { $in: ids } }).sort('name').exec().then(res => {
				
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

const deleteAllItemImages = (itemId) => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Item.findById(itemId).then(res => {

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


const deleteManyItemImages = (itemId, filter) => {

	// filter = { ids: [xxxx, xxxx, xxxx]}


	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			Item.findById(itemId).then(res => {

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



module.exports =  {
	addNewItem,
	addNewItemWithFilter,
	addItemImage,
	deleteItemImage,
	deleteAllItemImages,
	getItemImages,
	updateItemImages,
	getItems,
	getItemsAdmin,
	getItemById,
	getManyItems,
	updateItem,
	getImageFromStore,
	deleteImageFromStore,
	deleteAllItems,
	deleteItem,
	deleteManyItemImages,
	deleteManyImagesFromStore,
	deleteManyItems,
	getManyImagesFromStore
};