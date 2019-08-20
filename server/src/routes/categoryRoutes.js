const express = require('express');

const createError = require('http-errors');

const crudCategories  = require('../db/crud_operations/crudCategories');

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


module.exports = router;