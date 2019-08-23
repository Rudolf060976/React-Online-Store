const express = require('express');

const createError = require('http-errors');

const crudCategories  = require('../db/crud_operations/crudCategories');

const crudSubcategories  = require('../db/crud_operations/crudSubcategories');

const router = express.Router();

const secureAdmin = require('../middleware/secureAdmin');

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


module.exports = router;