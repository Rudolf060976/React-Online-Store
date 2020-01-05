const express = require('express');

const createError = require('http-errors');

const secure = require('../middleware/secure');

const ObjectID = require('mongodb').ObjectID;

const crudCart = require('../db/crud_operations/crudCart');

const router = express.Router();

router.get('/totals/:userId', secure(), (req, res) => {

	if(req.params.userId) {

		const { userId } = req.params;


		if(ObjectID.isValid(userId)) {


			crudCart.getCartTotals(userId).then(result => {

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
				message: 'INVALID USER ID',
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

router.get('/:userId', secure(), (req, res) => {

	if(req.params.userId) {

		const { userId } = req.params;

		if(ObjectID.isValid(userId)) {

			crudCart.getCart(userId).then(result => {

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
				message: 'INVALID USER ID',
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

router.post('/', secure(), (req, res) => {

	if(req.body && req.body.userId && req.body.itemId && req.body.qty) {

		const { userId, itemId, qty } = req.body;

		let intQty = Number.parseInt(qty);

		if(Number.isNaN(intQty)) {
			intQty = 1;
		}

		crudCart.addCartLine(userId, itemId,intQty).then(result => {

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
			message: 'MISSING DATA',
			data: null
		});

	}


});

router.delete('/:lineId', secure(), (req, res) => {

	if(req.params.lineId) {

		const { lineId } = req.params;

		if(ObjectID.isValid(lineId)) {

			crudCart.deleteCartLine(lineId).then(() => {

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
				message: 'INVALID LINE ID',
				data: null
			});

		}


	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'INVALID USER ID',
			data: null
		});

	}

});

router.put('/:lineId', secure(), (req, res) => {

	if(req.params.lineId && req.body && req.body.qty) {

		const { lineId } = req.params;

		const { qty } = req.body;

		let intQty = Number.parseInt(qty);

		if(Number.isNaN(intQty)) {
			intQty = 1;
		}

		crudCart.updateCartLine(lineId, intQty).then(result => {

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


		})

	} else {

		return res.status(400).json({
			error: createError(400, 'BAD REQUEST'),
			ok: false,
			status: 400,
			message: 'INVALID USER ID',
			data: null
		});

	}

});


module.exports = router;