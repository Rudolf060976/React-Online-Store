const express = require('express');

const paginate = require('express-paginate');

const createError = require('http-errors');

const { uploadImageFiles } = require('../middleware/multerItemImageFiles');

const ObjectID = require('mongodb').ObjectID;

const config = require('../config/config');

const crudItems = require('../db/crud_operations/crudItems');

const secureAdmin = require('../middleware/secureAdmin');

const router = express.Router();

const getObjectParamsFromQS1 = require('../modules/General/getObjectParamsFromQS1');
const getObjectParamsFromQS2 = require('../modules/General/getObjectParamsFromQS2');

	
router.get('/images/many', (req, res) => {
	
	// WE RECEIVE A FILTER PARAM FROM QUERY STRING

	const filter = getObjectParamsFromQS2(req);
				
	crudItems.getManyImagesFromStore(filter).then(outputArray => {
						
		res.status(200)
			.set({
				'content-type':'image/jpeg',
				'api-url': '/api/items/images/'						
			})
			.json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: outputArray
			});
	}).catch(err => {

		res.status(err.status).json({
			error: err,
			ok: false,
			status: err.status,
			message: err.message,
			data: null
		});

	});
			

});

	
router.get('/images/:imageId', (req, res) => {
	// REQUEST an image FROM GRIDfs *** SENDS 1 IMAGE FILE ****
	if(req.params.imageId) {

		const { imageId } = req.params; 

		if (ObjectID.isValid(imageId)) {
				
			crudItems.getImageFromStore(imageId).then(fileBuffer => {

				res.status(200)
					.set({
						'content-type':'image/jpeg',
						'api-url': '/api/items/images/'					
					})
					.send(fileBuffer);
			}).catch(err => {

				res.status(err.status).json({
					error: err,
					ok: false,
					status: err.status,
					message: err.message,
					data: null
				});

			});
					

		} else {

			return res.status(400).json({
				error: createError(400, 'BAD REQUEST'),
				ok: false,
				status: 400,
				message: 'INVALID IMAGE ID',
				data: null
			});

		}

	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING DATA',
			data: null
		});

	}
	
});

/*

router.get('/category/:categoryId', paginate.middleware(20, 50), (req, res) => {
	
	const { page, limit, sort } = req.query; // IF QUERYSTRING DOES NOT SUPPLY page and limit parameters, express-paginate will give default values.
	// sort example:     sort = { field:'name', order: 'ASC' }      sort = { field: 'age', order: 'DESC'}

	if(req.params.categoryId) {

		const { categoryId } = req.params;

		crudItems.getItemsByCategory(categoryId, page, limit, sort).then(result => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					result
				}
			});
	
		}).catch(err => {
	
			res.status(err.status).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});
	
		});		


	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING ID',
			data: null
		});

	}
		
			
});


router.get('/subcategory/:subcategoryId', paginate.middleware(20, 50), (req, res) => {
	
	const { page, limit, sort } = req.query; // IF QUERYSTRING DOES NOT SUPPLY page and limit parameters, express-paginate will give default values.
	
	// sort example:     sort = { field:'name', order: 'ASC' }      sort = { field: 'age', order: 'DESC'}

	if(req.params.subcategoryId) {

		const { subcategoryId } = req.params;

		crudItems.getItemsBySubcategory(subcategoryId, page, limit, sort).then(result => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					result
				}
			});
	
		}).catch(err => {
	
			res.status(err.status).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});
	
		});		


	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING ID',
			data: null
		});

	}
		
			
});

*/

router.get('/many', (req, res) => {
	
	
	const filter = getObjectParamsFromQS2(req);

	
	crudItems.getManyItems(filter).then(results => {
		
		res.set('Content-Range',`${results.totalDocs}`).json({
			error: null,
			ok: true,
			status: 200,
			message: 'OK',
			data: {
				results
			}
		});

	}).catch(err => {
		
		res.status(err.status).json({
			error: err,
			ok: false,
			status: err.status,
			message: err.message,
			data: null
		});

	});
	
		
});

router.get('/admin', paginate.middleware(10, 50), (req, res) => {
	// RESPONSES all items OR items by filter (query string)
	
	const { page, limit, sort, filter } = getObjectParamsFromQS1(req);

	// sort example:     sort = { field:'name', order: 'ASC' }      sort = { field: 'age', order: 'DESC'}

	crudItems.getItemsAdmin(filter, page, limit, sort).then(results => {

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

		res.set('Content-Range',`${results.totalDocs}`).json({
			error: null,
			ok: true,
			status: 200,
			message: 'OK',
			data: {
				results
			}
		});

	}).catch(err => {
		
		res.status(err.status).json({
			error: err,
			ok: false,
			status: err.status,
			message: err.message,
			data: null
		});

	});
	
		
});
	
router.get('/:itemId', (req, res) => {
	// REQUEST an item Document by Id
	if (req.params.itemId) {
		
		const { itemId } = req.params;
		
		crudItems.getItemById(itemId).then(item => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					item
				}
			});

		}).catch(err => {

			res.status(err.status).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});


		});


	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING ID',
			data: null
		});

	}
	
});

router.get('/', paginate.middleware(20, 50), (req, res) => {
	// RESPONSES all items OR items by filter (query string)
	
	const { page, limit, sort, filter } = getObjectParamsFromQS1(req);

	// sort example:     sort = { field:'name', order: 'ASC' }      sort = { field: 'age', order: 'DESC'}

	crudItems.getItems(filter, page, limit, sort).then(results => {

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

		res.set('Content-Range',`${results.totalDocs}`).json({
			error: null,
			ok: true,
			status: 200,
			message: 'OK',
			data: {
				results
			}
		});

	}).catch(err => {
		
		res.status(err.status).json({
			error: err,
			ok: false,
			status: err.status,
			message: err.message,
			data: null
		});

	});
	
		
});

router.post('/:itemId/images/all', secureAdmin(), uploadImageFiles.array('images', config.app.items.ITEMS_IMAGES_MAX_COUNT),
	(req, res) => {
	// RECEIVES IMAGES FROM MULTER IN FORM DATA FORMAT AND SAVE THEM IN GRIDFS
	// uploadImageFiles SAVES THE FILES ON GFS AND SAVES THE ID ON images FIELD IN THE ITEM DOCUMENT

		if(req.params.itemId) {

			const { itemId } = req.params;

			crudItems.getItemById(itemId).then(item => {

				res.status(200).json({
					error: null,
					ok: true,
					status: 200,
					message: 'OK',
					data: {
						item
					}
				});	


			}).catch( err => {

				res.status(err.status).json({
					error: err,
					ok: false,
					status: err.status,
					message: err.message,
					data: null
				});

			});

		} else {

			return res.status(400).json({
				error: createError(400, 'BAD REQUEST'),
				ok: false,
				status: 400,
				message: 'MISSING ITEM ID',
				data: null
			});

		}	

	});


router.post('/:itemId/images/one', secureAdmin(), uploadImageFiles.single('image'),
	(req, res) => {
	// RECEIVES ONE IMAGES FROM MULTER IN FORM DATA FORMAT AND SAVE THEM IN GRIDFS
	// uploadImageFiles SAVES THE FILE ON GFS AND SAVES THE ID ON images FIELD IN THE ITEM DOCUMENT

		if(req.params.itemId) {

			const { itemId } = req.params;

			crudItems.getItemById(itemId).then(item => {

				res.status(200).json({
					error: null,
					ok: true,
					status: 200,
					message: 'OK',
					data: {
						item
					}
				});	


			}).catch( err => {

				res.status(err.status).json({
					error: err,
					ok: false,
					status: err.status,
					message: err.message,
					data: null
				});

			});

		} else {

			return res.status(400).json({
				error: createError(400, 'BAD REQUEST'),
				ok: false,
				status: 400,
				message: 'MISSING ITEM ID',
				data: null
			});

		}	

	});

	
router.post('/', secureAdmin(), (req, res) => {
	
	// RECEIVES A NEW item OBJECT AS JSON AND SAVES IT IN THE DB
	if( req.body && req.body.filter) {
		
		const { filter } = req.body;
		
		crudItems.addNewItemWithFilter(filter).then(item => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					item
				}
			});

		}).catch(err => {

			res.status(err.status).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});

		});


	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING DATA',
			data: null
		});

	}

});


router.delete('/many', secureAdmin(), (req, res) => {

	const filter = getObjectParamsFromQS2(req);

	// filter = { ids: [xxxxx, xxxxx, .... ] }

	if(filter.ids.length > 0) {

		crudItems.deleteManyItems(filter).then(() => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: null
			});


		}).catch(err => {

			res.status(err.status).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});

		});


	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING ID',
			data: null
		});
	}

});

router.delete('/:itemId/images/one/:imageId', secureAdmin(), (req, res) => {
// DELETES AN IMAGE FROM item OBJECT AND GRIDFS

	if(req.params.itemId && req.params.imageId) {

		const { itemId, imageId } = req.params;

		let itemObj = null; 

		crudItems.getItemById(itemId).then(item => {

			itemObj = item;
			
			return crudItems.deleteItemImage(itemId, imageId);
			
		}).then(() =>{

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					item: itemObj
				}
			});	


		}).catch( err => {

			res.status(err.status).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});

		});

	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING ITEM ID',
			data: null
		});

	}	

});


router.delete('/:itemId/images/all', secureAdmin(), (req, res) => {
	// DELETES AN IMAGE FROM item OBJECT AND GRIDFS
	
	if(req.params.itemId) {
	
		const { itemId } = req.params;

	
		crudItems.getItemById(itemId).then(item => {
				

			return crudItems.deleteAllItemImages(itemId);
		
		}).then(() => {
			
			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'ALL IMAGES DELETED SUCCESSFULLY',
				data: null
			});	
			
	
		}).catch( err => {
	
			res.status(err.status).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});
	
		});
	
	} else {
	
		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING ITEM ID',
			data: null
		});
	
	}	
	
});
	
	
router.delete('/:itemId/images/many', (req, res) => {
	
	// WE RECEIVE A FILTER PARAM FROM QUERY STRING

	if (req.params.itemId) {

		const { itemId } = req.params;
	
		const filter = getObjectParamsFromQS2(req);

		if(filter.ids.length > 0) {
				
			crudItems.deleteManyItemImages(itemId, filter).then((item) => {
						
				res.json({
					error: null,
					ok: true,
					status: 200,
					message: 'OK',
					data: {
						item
					}
				});
			}).catch(err => {
			
				res.status(err.status).json({
					error: err,
					ok: false,
					status: err.status,
					message: err.message,
					data: null
				});

			});
				

		} else {

			return res.status(400).json({
				error: createError(400, 'BAD REQUEST'),
				ok: false,
				status: 400,
				message: 'MISSING DATA',
				data: null
			});

		}


	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING DATA',
			data: null
		});

	}

});


router.delete('/:itemId', secureAdmin(), (req, res) => {

	if(req.params.itemId) {

		const { itemId } = req.params;

		crudItems.deleteItem(itemId).then(item => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					item
				}
			});

		}).catch(err => {

			res.status(err.status).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});

		});

	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING ID',
			data: null
		});
	}

});
	

router.put('/:itemId', secureAdmin(), (req, res) => {
 
	if(req.params.itemId && req.body && req.body.filter) {

		const { itemId } = req.params;
		const { filter } = req.body;

		crudItems.updateItem(itemId, filter).then(item => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					item
				}
			});

		}).catch(err => {

			if(!err.status) {

				err.status = 500;

			}

			res.status(err.status).json({
				error: err,
				ok: false,
				status: err.status,
				message: err.message,
				data: null
			});
	

		});

	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'MISSING DATA',
			data: null
		});

	}

});

module.exports = router;
