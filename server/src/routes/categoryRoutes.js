const express = require('express');

const createError = require('http-errors');

const { uploadImageFiles: uploadCategoryImages } = require('../middleware/multerCategoryImageFiles');

const { uploadImageFiles: uploadSubcategoryImages } = require('../middleware/multerSubcategoryImageFiles');

const ObjectID = require('mongodb').ObjectID;

const config = require('../config/config');

const crudCategories  = require('../db/crud_operations/crudCategories');

const crudSubcategories  = require('../db/crud_operations/crudSubcategories');

const router = express.Router();

const secureAdmin = require('../middleware/secureAdmin');


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


router.get('/:categoryId', (req, res) => {

	if(req.params.categoryId) {

		const { categoryId } = req.params;

		crudCategories.getCategoryById(categoryId).then(category => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					category
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

	crudCategories.getAllCategories().then(categories => {

		res.status(200).json({
			error: null,
			ok: true,
			status: 200,
			message: 'OK',
			data: {
				categories
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

	if(req.body && req.body.code && req.body.name) {

		const { code, name, description } = req.body;

		crudCategories.addCategory(code, name, description).then(category => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					category
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
			message: 'MISSING PARAMETERS',
			data: null
		});

	}


});

router.delete('/:categoryId', secureAdmin(), (req, res) => {

	if(req.params.categoryId) {

		const { categoryId } = req.params;

		crudCategories.deleteCategory(categoryId).then(category => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					category
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


router.put('/:categoryId', secureAdmin(), (req, res) => {

	if (req.params.categoryId && req.body && req.body.filter) {

		const { categoryId } = req.params;
		const { filter } = req.body;

		crudCategories.updateCategory(categoryId, filter).then(category => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					category
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


router.post('/:categoryId/sub', secureAdmin(), (req, res) => {

	if(req.params.categoryId && req.body && req.body.code && req.body.name) {

		const { categoryId } = req.params;
		const { code, name, description } = req.body;

		crudSubcategories.addSubcategory(code, categoryId, name, description).then(subcategory => { 

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					subcategory
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
			message: 'MISSING PARAMETERS',
			data: null
		});

	}


});

router.delete('/sub/:subcategoryId', secureAdmin(), (req, res) => {

	if(req.params.subcategoryId) {

		const { subcategoryId } = req.params;

		crudSubcategories.deleteSubcategory(subcategoryId).then(subcategory => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					subcategory
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
			message: 'MISSING PARAMETERS',
			data: null
		});

	}

});

router.put('/sub/:subcategoryId', secureAdmin(), (req, res) => {

	if(req.params.subcategoryId && req.body && req.body.filter) {

		const { subcategoryId } = req.params;
		const { filter } = req.body;

		crudSubcategories.updateSubcategory(subcategoryId, filter).then(subcategory => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					subcategory
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
			message: 'MISSING PARAMETERS',
			data: null
		});

	}

});

router.get('/:categoryId/sub', secureAdmin(), (req, res) => {

	if(req.params.categoryId) {

		const { categoryId } = req.params;

		crudSubcategories.getSubcategories(categoryId).then(subcategories => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					subcategories
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
			message: 'MISSING PARAMETERS',
			data: null
		});

	}

});

	
router.get('/:categoryId/images/:imageId', (req, res) => {
	// REQUEST an image FROM GRIDfs *** SENDS 1 IMAGE FILE ****
	if(req.params.categoryId && req.params.imageId) {

		const { categoryId, imageId } = req.params; 

		if (ObjectID.isValid(imageId)) {
				
			crudCategories.getImageFromStore(imageId).then(fileBuffer => {

				res.status(200)
					.set({
						'content-type':'image/jpeg',
						'category-url': '/api/categories/',
						'category-id': `${categoryId}`
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


router.post('/:categoryId/images/all', secureAdmin, uploadCategoryImages.array('images', config.app.items.CATEGORIES_IMAGES_MAX_COUNT),
	(req, res) => {
	// RECEIVES IMAGES FROM MULTER IN FORM DATA FORMAT AND SAVE THEM IN GRIDFS
	// uploadImageFiles SAVES THE FILES ON GFS AND SAVES THE ID ON images FIELD IN THE ITEM DOCUMENT

		if(req.params.categoryId) {

			const { categoryId } = req.params;

			crudCategories.getCategoryById(categoryId).then(item => {

				res.status(200).json({
					error: null,
					ok: true,
					status: 200,
					message: 'OK',
					data: {
						category: item
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


router.post('/:categoryId/images/one', secureAdmin, uploadCategoryImages.single('image'),
	(req, res) => {
	// RECEIVES ONE IMAGES FROM MULTER IN FORM DATA FORMAT AND SAVE THEM IN GRIDFS
	// uploadImageFiles SAVES THE FILE ON GFS AND SAVES THE ID ON images FIELD IN THE ITEM DOCUMENT

		if(req.params.categoryId) {

			const { categoryId } = req.params;

			crudCategories.getCategoryById(categoryId).then(item => {

				res.status(200).json({
					error: null,
					ok: true,
					status: 200,
					message: 'OK',
					data: {
						category: item
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


router.delete('/:categoryId/images/one/:imageId', secureAdmin(), (req, res) => {
	// DELETES AN IMAGE FROM item OBJECT AND GRIDFS
		
	if(req.params.categoryId && req.params.imageId) {
		
		const { categoryId, imageId } = req.params;
		
		let itemObj = null; 
	
		crudCategories.getCategoryById(categoryId).then(item => {
		
					
			return crudCategories.deleteCategoryImage(categoryId, imageId);
		
				
		}).then( item => {
		
			itemObj = item;
		
			return crudCategories.deleteImageFromStore(imageId);
		
					
		}).then(() =>{
		
			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					category: itemObj
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


router.delete('/:categoryId/images/all', secureAdmin(), (req, res) => {
	// DELETES AN IMAGE FROM item OBJECT AND GRIDFS
	
	if(req.params.categoryId) {
	
		const { categoryId } = req.params;

		let itemImages = null;
	
		crudCategories.getCategoryById(categoryId).then(item => {
	
			itemImages = item.images.slice(0);

			return crudCategories.deleteAllCategoryImages(categoryId);
		
		}).then(item => {
			
			(async () => {

				try {
					
					for(let i = 0; i < itemImages.length; i ++) {
				
						await crudCategories.deleteImageFromStore(itemImages[i].toString());
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

router.get('/sub/:subcategoryId/images/:imageId', (req, res) => {
	// REQUEST an image FROM GRIDfs *** SENDS 1 IMAGE FILE ****
	if(req.params.subcategoryId && req.params.imageId) {

		const { subcategoryId, imageId } = req.params; 

		if (ObjectID.isValid(imageId)) {
				
			crudSubcategories.getImageFromStore(imageId).then(fileBuffer => {

				res.status(200)
					.set({
						'content-type':'image/jpeg',
						'subcategory-url': '/api/categories/sub/',
						'subcategory-id': `${subcategoryId}`
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


router.post('/sub/:subcategoryId/images/all', secureAdmin, uploadSubcategoryImages.array('images', config.app.items.SUBCATEGORIES_IMAGES_MAX_COUNT),
	(req, res) => {
	// RECEIVES IMAGES FROM MULTER IN FORM DATA FORMAT AND SAVE THEM IN GRIDFS
	// uploadImageFiles SAVES THE FILES ON GFS AND SAVES THE ID ON images FIELD IN THE ITEM DOCUMENT

		if(req.params.subcategoryId) {

			const { subcategoryId } = req.params;

			crudSubcategories.getSubcategoryById(subcategoryId).then(item => {

				res.status(200).json({
					error: null,
					ok: true,
					status: 200,
					message: 'OK',
					data: {
						subcategory: item
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


router.post('/sub/:subcategoryId/images/one', secureAdmin, uploadSubcategoryImages.single('image'),
	(req, res) => {
	// RECEIVES ONE IMAGES FROM MULTER IN FORM DATA FORMAT AND SAVE THEM IN GRIDFS
	// uploadImageFiles SAVES THE FILE ON GFS AND SAVES THE ID ON images FIELD IN THE ITEM DOCUMENT

		if(req.params.subcategoryId) {

			const { subcategoryId } = req.params;

			crudSubcategories.getSubcategoryById(subcategoryId).then(item => {

				res.status(200).json({
					error: null,
					ok: true,
					status: 200,
					message: 'OK',
					data: {
						subcategory: item
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


router.delete('/sub/:subcategoryId/images/one/:imageId', secureAdmin(), (req, res) => {
	// DELETES AN IMAGE FROM item OBJECT AND GRIDFS
		
	if(req.params.subcategoryId && req.params.imageId) {
		
		const { subcategoryId, imageId } = req.params;
		
		let itemObj = null; 
	
		crudSubcategories.getSubcategoryById(subcategoryId).then(item => {
		
					
			return crudSubcategories.deleteSubcategoryImage(subcategoryId, imageId);
		
				
		}).then( item => {
		
			itemObj = item;
		
			return crudSubcategories.deleteImageFromStore(imageId);
		
					
		}).then(() =>{
		
			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					subcategory: itemObj
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


router.delete('/sub/:subcategoryId/images/all', secureAdmin(), (req, res) => {
	// DELETES AN IMAGE FROM item OBJECT AND GRIDFS
	
	if(req.params.subcategoryId) {
	
		const { subcategoryId } = req.params;

		let itemImages = null;
	
		crudSubcategories.getSubcategoryById(subcategoryId).then(item => {
	
			itemImages = item.images.slice(0);

			return crudSubcategories.deleteAllSubcategoryImages(subcategoryId);
		
		}).then(item => {
			
			(async () => {

				try {
					
					for(let i = 0; i < itemImages.length; i ++) {
				
						await crudSubcategories.deleteImageFromStore(itemImages[i].toString());
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
	

module.exports = router;