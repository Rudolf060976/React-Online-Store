const mongoose = require('mongoose');

const types = mongoose.SchemaTypes;

const itemsSchema = new mongoose.Schema({

	code: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 30,
		unique: true
	},
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 6,
		maxlength: 150
	},
	shortDescription: {
		type: String,
		trim: true,
		maxlength: 500
	},
	longDescription: {
		type: String,
		trim: true,
		maxlength: 2000
	},
	price: {
		type: Number,
		default: 0
	},
	images: [types.ObjectId]
});


const Item = mongoose.model('Item', itemsSchema);

module.exports = Item;
