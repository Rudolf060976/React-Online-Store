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

		return Cart.aggregate([
			{ $match: { user: ObjectID.createFromHexString(userId) } },	
			{ $lookup: {
				from: "items",  // ES EL NOMBRE DE LA COLECCIÓN EL QUE SE COLOCA AQUÍ, QUE ES "items"
				localField: "item",
				foreignField: "_id",				
				as: "item"
			}},						
			{ $project: {
				item: { _id: 1, shortName: 1, images: 1 },
				createdAt: 1,
				updateAt: 1,
				quantity: 1,
				price: 1,
				tax: 1,
				itemTotal: { $multiply: ["$price","$quantity"] }
			}},			
			{ $sort: { createdAt: 1 } }	 
		]).exec();	

	} else {

		throw createError(500, 'DB CONNECTION ERROR!!');

	}

}

const getCartTotals = async (userId) => {

	if (db.readyState === 1 || db.readyState === 2) {


		if(!ObjectID.isValid(userId)) {
			throw createError(400, 'INVALID ID');
		}

		return Cart.aggregate([
			{ $match: { user: ObjectID.createFromHexString(userId) } },
			{ $group: {
				_id: null,
				count: { $sum: "$quantity" },
				subtotal: { $sum: { $multiply: ["$price", "$quantity"] } },
				tax: { $sum: { $divide: [ { $multiply: ["$price", "$quantity", "$tax"] }, 100 ] } },
				total: { $sum: { $multiply: [ "$price", "$quantity", { $add: [ 1, { $divide: [ "$tax", 100 ] } ] } ] } }
			}}
		]);
	

	} else {

		throw createError(500, 'DB CONNECTION ERROR!!');

	}

};


module.exports = {
	addCartLine,
	deleteCartLine,
	updateCartLine,
	getCart,
	getCartTotals
};