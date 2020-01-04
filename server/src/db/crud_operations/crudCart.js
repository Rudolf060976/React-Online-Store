const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose } = require('../mongoose');

const Item = require('../models/Item');

const Cart = require('../models/Cart');

const db = mongoose.connection;


const addCartLine = async (userId, itemId, qty) => {

	if (db.readyState === 1 || db.readyState === 2) {
		
		const item = await Item.findById(itemId);

		const { tax, price } = item;

		return Cart.create({
			_id: new ObjectID(),
			user: ObjectID.createFromHexString(userId),
			item: ObjectID.createFromHexString(itemId),
			quantity: qty,
			tax,
			price
		});

	} else {

		throw createError(500, 'DB CONNECTION ERROR!!');

	}

};

const deleteCartLine = async (id) => {

	if (db.readyState === 1 || db.readyState === 2) {
		
		if(!ObjectID.isValid(id)) {
			throw createError(400, 'INVALID ID');
		}

		return Cart.findByIdAndDelete(id);

	} else {

		throw createError(500, 'DB CONNECTION ERROR!!');

	}


};

const updateCartLine = async (id, qty) => {

	if (db.readyState === 1 || db.readyState === 2) {
		
		if(!ObjectID.isValid(id)) {
			throw createError(400, 'INVALID ID');
		}

		return Cart.findByIdAndUpdate(id,{ quantity: qty }, { new: true });

	} else {

		throw createError(500, 'DB CONNECTION ERROR!!');

	}

};

const getCart = async (userId) => {

	if (db.readyState === 1 || db.readyState === 2) {
		
		if(!ObjectID.isValid(userId)) {
			throw createError(400, 'INVALID ID');
		}

		return Cart.find({ user: userId }).populate({ path: 'item', select: 'shortName' }).sort({ createdAt: 1 }).exec();

	} else {

		throw createError(500, 'DB CONNECTION ERROR!!');

	}

}




module.exports = {
	addCartLine,
	deleteCartLine,
	updateCartLine,
	getCart
};