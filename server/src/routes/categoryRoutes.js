const express = require('express');

const createError = require('http-errors');

const paginate = require('express-paginate');

const { uploadImageFiles: uploadCategoryImages } = require('../middleware/multerCategoryImageFiles');

const { uploadImageFiles: uploadSubcategoryImages } = require('../middleware/multerSubcategoryImageFiles');

const ObjectID = require('mongodb').ObjectID;

const config = require('../config/config');

const crudCategories  = require('../db/crud_operations/crudCategories');

const crudSubcategories  = require('../db/crud_operations/crudSubcategories');

const router = express.Router();

const secureAdmin = require('../middleware/secureAdmin');

const getObjectParamsFromQS1 = require('../modules/General/getObjectParamsFromQS1');
const getObjectParamsFromQS2 = require('../modules/General/getObjectParamsFromQS2');


router.get('/admin', paginate.middleware(10, 50), (req, res) => {
	// RESPONSES ALL CATEGORIES ACCORDING TO A FILTER, PAGE, LIMIT AND SORT

	const { page, limit, sort, filter } = getObjectParamsFromQS1(req);

	// sort example:     sort = { field:'name', order: 'ASC' }      sort = { field: 'age', order: 'DESC'}
	
	crudCategories.getAllCategoriesAdmin(filter, page, limit, sort).then(results => {

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
		
		res.set('Content-Range',`${results.totalDocs}`).status(200).json({
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


router.get('/sub/admin', paginate.middleware(10, 50), (req, res) => {

	const { page, limit, sort, filter } = getObjectParamsFromQS1(req);
	
	// sort example:     sort = { field:'name', order: 'ASC' }      sort = { field: 'age', order: 'DESC'}
	
	crudSubcategories.getAllSubcategoriesAdmin(filter, page, limit, sort).then(results => {

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

		res.set('Content-Range',`${results.totalDocs}`).status(200).json({
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


router.get('/sub/many', (req, res) => {
	
	const filter = getObjectParamsFromQS2(req);
	
	crudSubcategories.getManySubcategories(filter).then(results => {

		res.status(200).json({
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


router.get('/sub/:subcategoryId', (req, res) => {

	if(req.params.subcategoryId) {

		const { subcategoryId } = req.params;

		crudSubcategories.getSubcategoryById(subcategoryId).then(subcategory => {

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
			message: 'MISSING ID',
			data: null
		});
	}


});


router.get('/sub', (req, res) => {
	
	crudSubcategories.getAllSubcategories().then(subcategories => {

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
	
});


router.get('/many', (req, res) => {

	const filter = getObjectParamsFromQS2(req);
	
	crudCategories.getManyCategories(filter).then(results => {

		res.status(200).json({
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

	if(req.body && req.body.filter) {

		const { filter } = req.body;

		crudCategories.addCategoryWithFilter(filter).then(category => {

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
	
	if(req.params.categoryId && req.body && req.body.filter) {

		const { categoryId } = req.params;
		const { filter } = req.body;

		crudSubcategories.addSubcategoryWithFilter(categoryId, filter).then(subcategory => { 

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

router.get('/:categoryId/sub', (req, res) => {

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

	
router.get('/images/many', (req, res) => {
	
	// WE RECEIVE A FILTER PARAM FROM QUERY STRING

	const filter = getObjectParamsFromQS2(req);

				
	crudCategories.getManyImagesFromStore(filter).then(outputArray => {
					
		res.status(200)
			.set({
				'content-type':'image/jpeg',
				'api-url': '/api/categories/images/'						
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
				
			crudCategories.getImageFromStore(imageId).then(fileBuffer => {

				res.status(200)
					.set({
						'content-type':'image/jpeg',
						'api-url': '/api/categories/images/'						
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


router.post('/:categoryId/images/all', secureAdmin(), uploadCategoryImages.array('images', config.app.items.CATEGORIES_IMAGES_MAX_COUNT),
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


router.post('/:categoryId/images/one', secureAdmin(), uploadCategoryImages.single('image'),
	(req, res) => {
	// RECEIVES ONE IMAGE FROM MULTER IN FORM DATA FORMAT AND SAVE THEM IN GRIDFS
	// uploadImageFiles SAVES THE FILE ON GFS AND SAVES THE ID ON images FIELD IN THE ITEM DOCUMENT

	/*
		MULTER WILL PUT THE FILE INFO IN req.file:

		{
			fieldname: 'image',
			originalname: 'christmas.jpg',
			encoding: '7bit',
			mimetype: 'image/jpeg',
			destination: 'xxxx',
			filename: '123443klj3422434234342',
			path: 'xxxxcxxx',
			size: 84201
		}

	*/

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

router.post('/sub/:subcategoryId/images/all', secureAdmin(), uploadSubcategoryImages.array('images', config.app.items.SUBCATEGORIES_IMAGES_MAX_COUNT),
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


router.post('/sub/:subcategoryId/images/one', secureAdmin(), uploadSubcategoryImages.single('image'),
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

router.delete('/sub/many', secureAdmin(), (req, res) => {

	const filter = getObjectParamsFromQS2(req);

	// filter = { ids: [xxxxx, xxxxx, .... ] }

	if(filter.ids.length > 0) {

		crudSubcategories.deleteManySubCategories(filter).then(() => {

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

router.delete('/sub/:subcategoryId/images/one/:imageId', secureAdmin(), (req, res) => {
	// DELETES AN IMAGE FROM item OBJECT AND GRIDFS
		
	if(req.params.subcategoryId && req.params.imageId) {
		
		const { subcategoryId, imageId } = req.params;
				
	
		crudSubcategories.getSubcategoryById(subcategoryId).then(item => {
		
							
			return crudSubcategories.deleteSubcategoryImage(subcategoryId, imageId);			
					
		}).then((result) =>{
		
			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					subcategory: result
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
		
	
		crudSubcategories.getSubcategoryById(subcategoryId).then(item => {
	
			return crudSubcategories.deleteAllSubcategoryImages(subcategoryId);
		
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

	
router.delete('/sub/:subcategoryId/images/many', (req, res) => {
	
	// WE RECEIVE A FILTER PARAM FROM QUERY STRING

	if (req.params.subcategoryId) {

		const { subcategoryId } = req.params;
	
		const filter = getObjectParamsFromQS2(req);

		if(filter.ids.length > 0) {
				
			crudSubcategories.deleteManySubcategoryImages(subcategoryId, filter).then(() => {
						
				res.json({
					error: null,
					ok: true,
					status: 200,
					message: 'OK'
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


router.delete('/many', secureAdmin(), (req, res) => {

	const filter = getObjectParamsFromQS2(req);

	// filter = { ids: [xxxxx, xxxxx, .... ] }

	if(filter.ids.length > 0) {

		crudCategories.deleteManyCategories(filter).then(() => {

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


router.delete('/:categoryId/images/one/:imageId', secureAdmin(), (req, res) => {
	// DELETES AN IMAGE FROM item OBJECT AND GRIDFS
		
	if(req.params.categoryId && req.params.imageId) {
		
		const { categoryId, imageId } = req.params;
			
	
		crudCategories.getCategoryById(categoryId).then(item => {
				
					
			return crudCategories.deleteCategoryImage(categoryId, imageId);				

		}).then(result =>{
		
			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					category: result
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
		
		crudCategories.getCategoryById(categoryId).then(item => {
	
			return crudCategories.deleteAllCategoryImages(categoryId);
		
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

	
router.delete('/:categoryId/images/many', (req, res) => {
	
	// WE RECEIVE A FILTER PARAM FROM QUERY STRING

	if (req.params.categoryId) {

		const { categoryId } = req.params;
	
		const filter = getObjectParamsFromQS2(req);

		if(filter.ids.length > 0) {
				
			crudCategories.deleteManyCategoryImages(categoryId, filter).then(() => {
						
				res.json({
					error: null,
					ok: true,
					status: 200,
					message: 'OK'
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


module.exports = router;