const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');

const types = mongoose.SchemaTypes;

const specialsSchema = new mongoose.Schema({
	_id: types.ObjectId,
	code: { 
		type: String,
		required: true
	},
	dealOfTheDayItems: [types.ObjectId],
	bestSellerItems: [types.ObjectId],
	seasonDealItems: [types.ObjectId],
	mustHaveItems: [types.ObjectId],
	freeShippingItems: [types.ObjectId]
});

specialsSchema.plugin(mongoosePaginate);

const ItemSpecials = mongoose.model('ItemSpecials', specialsSchema);

module.exports = ItemSpecials;