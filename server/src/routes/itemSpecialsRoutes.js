const express = require('express');

const secureAdmin = require('../middleware/secureAdmin');

const paginate = require('express-paginate');

const createError = require('http-errors');

const getObjectParamsFromQS1 = require('../modules/General/getObjectParamsFromQS1');

const crudItemSpecials = require('../db/crud_operations/crudItemSpecials');

const router = express.Router();


router.get('/admin', paginate.middleware(10, 50), (req, res) => {
	// RESPONSES all items OR items by filter (query string)
	
	const { page, limit, sort, filter } = getObjectParamsFromQS1(req);

	// sort example:     sort = { field:'name', order: 'ASC' }      sort = { field: 'age', order: 'DESC'}

	crudItemSpecials.getItemsSpecialsAdmin(filter, page, limit, sort).then(results => {

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
	
router.get('/:id', (req, res) => {
	// REQUEST an item Document by Id
	if (req.params.id) {
		
		const { id } = req.params;
		
		crudItemSpecials.getItemSpecialById(id).then(special => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					special
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
	
	crudItemSpecials.getItemsSpecials().then(docs => {
	

		res.json({
			error: null,
			ok: true,
			status: 200,
			message: 'OK',
			data: {
				specials: docs
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
	if( req.body && req.body.filter) {

		const { filter } = req.body;

		crudItemSpecials.addNewSpecialWithFilter(filter).then(special => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					special
				}
			});

		}).catch(err => {

			if (!err.status) {
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

router.put('/:id', secureAdmin(), (req, res) => {
	
	if(req.params.id && req.body && req.body.filter) {
		
		const { id } = req.params;
		const { filter } = req.body;

		crudItemSpecials.updateItemSpecials(id, filter).then(special => {

			res.status(200).json({
				error: null,
				ok: true,
				status: 200,
				message: 'OK',
				data: {
					special
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
