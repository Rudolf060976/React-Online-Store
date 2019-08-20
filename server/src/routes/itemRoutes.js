const express = require('express');

const createError = require('http-errors');

const { uploadImageFiles } = require('../middleware/multerImageFiles');

const ObjectID = require('mongodb').ObjectID;

const config = require('../config/config');

const crudItems = require('../db/crud_operations/crudItems');

const secureAdmin = require('../middleware/secureAdmin');

const router = express.Router();

	
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

				res.status(200).set('content-type','image/jpeg').send(fileBuffer);

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


router.get('/category/:categoryId', (req, res) => {
	
	if(req.params.categoryId) {

		const { categoryId } = req.params;

		crudItems.getItemsByCategory(categoryId).then(docs => {

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


router.get('/', (req, res) => {
	// RESPONSES all items OR items by filter (query string)
		
	crudItems.getAllItemsByFilter().then(docs => {

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
	if( req.body && req.body.category && req.body.code && req.body.name && req.body.price) {

		const { category, code, name, price } = req.body;

		crudItems.addNewItem(category, code, name, price).then(item => {

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

			
			return crudItems.deleteItemImage(itemId, imageId);

		
		}).then( item => {

			itemObj = item;

			return crudItems.deleteImageFromStore(imageId);

			
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

		let itemImages = null;
	
		crudItems.getItemById(itemId).then(item => {
	
			itemImages = item.images.slice(0);

			return crudItems.deleteAllItemImages(itemId);
		
		}).then(item => {
			
			(async () => {

				try {
					
					for(let i = 0; i < itemImages.length; i ++) {
				
						await crudItems.deleteImageFromStore(itemImages[i].toString());
					}	
					
					res.status(200).json({
						error: null,
						ok: true,
						status: 200,
						message: 'ALL IMAGES DELETED SUCCESSFULLY',
						data: null
					});	

				} catch (err) {
					
					const error = {
						...err,
						status: 500,
						message: err.message
					};

					res.status(error.status).json({
						error,
						ok: false,
						status: error.status,
						message: error.message,
						data: null
					});

				}			

			})();
			
	
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
	if(req.params.itemId && req.body.itemdata) {

		const { itemId } = req.params;
		const { itemdata } = req.body;

		crudItems.updateItemByDataObject(itemId, itemdata).then(item => {

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

module.exports = router;
