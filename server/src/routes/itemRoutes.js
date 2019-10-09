const express = require('express');

const paginate = require('express-paginate');

const createError = require('http-errors');

const { uploadImageFiles } = require('../middleware/multerItemImageFiles');

const ObjectID = require('mongodb').ObjectID;

const config = require('../config/config');

const crudItems = require('../db/crud_operations/crudItems');

const secureAdmin = require('../middleware/secureAdmin');

const router = express.Router();


router.use((req, res, next) => {  // PLEASE READ  https://javascript.info/fetch-crossorigin

	const origin = req.get('Origin');
	res.set('Access-Control-Allow-Origin', origin);
	res.set('Access-Control-Allow-Credentials', 'true');

	next();
});

router.options('*', (req, res) => {  // PLEASE READ  https://javascript.info/fetch-crossorigin
		
	res.set('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DEL');
	res.set('Access-Control-Allow-Credentials', 'true');
	res.set('Access-Control-Allow-Headers','Content-Type');	
	res.set('Access-Control-Max-Age', 86400);
		
	res.status(200).send();
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
	
router.get('/:itemId/images/:imageId', (req, res) => {
	// REQUEST an image FROM GRIDfs *** SENDS 1 IMAGE FILE ****
	if(req.params.itemId && req.params.imageId) {

		const { itemId, imageId } = req.params; 

		if (ObjectID.isValid(imageId)) {
				
			crudItems.getImageFromStore(imageId).then(fileBuffer => {

				res.status(200)
					.set({
						'content-type':'image/jpeg',
						'item-url': '/api/items/',
						'item-id': `${itemId}`
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


router.get('/category/:categoryId', paginate.middleware(10, 50), (req, res) => {
	
	const { page, limit } = req.query; // IF QUERYSTRING DOES NOT SUPPLY page and limit parameters, express-paginate will give default values.
		

	if(req.params.categoryId) {

		const { categoryId } = req.params;

		crudItems.getItemsByCategory(categoryId, page, limit).then(docs => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					items: docs
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


router.get('/subcategory/:subcategoryId', paginate.middleware(10, 50), (req, res) => {
	
	const { page, limit } = req.query; // IF QUERYSTRING DOES NOT SUPPLY page and limit parameters, express-paginate will give default values.
		
	if(req.params.subcategoryId) {

		const { subcategoryId } = req.params;

		crudItems.getItemsBySubcategory(subcategoryId, page, limit).then(docs => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					items: docs
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


router.get('/', paginate.middleware(10, 50), (req, res) => {
	// RESPONSES all items OR items by filter (query string)
	
	const { page, limit, ...rest } = req.query; // IF QUERYSTRING DOES NOT SUPPLY page and limit parameters, express-paginate will give default values.
	
	let filter = {};

	if(rest) {

		filter = { ...rest };

	}

	console.log('filter: ', JSON.stringify(filter, null, 2));

	crudItems.getItems(filter, page, limit).then(docs => {

		res.status(200).json({
			error: null,
			ok: true,
			status: 200,
			message: 'OK',
			data: {
				items: docs
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

router.post('/', secureAdmin(), (req, res) => {
	// RECEIVES A NEW item OBJECT AS JSON AND SAVES IT IN THE DB
	if( req.body && req.body.category && req.body.subcategory && req.body.code && req.body.name && req.body.price) {

		const { category, subcategory, code, name, price } = req.body;

		crudItems.addNewItem(category, subcategory, code, name, price).then(item => {

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


router.post('/byfilter', secureAdmin(), (req, res) => {
	// RECEIVES A NEW item OBJECT AS JSON AND SAVES IT IN THE DB
	if( req.body && req.body.filter) {

		const { filter } = req.body;

		crudItems.addNewItemByFilter(filter).then(item => {

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

router.post('/:itemId/images/all', secureAdmin, uploadImageFiles.array('images', config.app.items.ITEMS_IMAGES_MAX_COUNT),
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


router.post('/:itemId/images/one', secureAdmin, uploadImageFiles.single('image'),
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
	

router.put('/:itemId', secureAdmin(), (req, res) => {
// 
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
