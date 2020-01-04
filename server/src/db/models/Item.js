const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');
const mongoosePaginate = require('mongoose-paginate-v2');


const types = mongoose.SchemaTypes;

const itemsSchema = new mongoose.Schema({
	_id: types.ObjectId,
	category: {
		type: types.ObjectId,
		ref: 'Category',     // REQUIRED
		required: true
	},
	subcategory: {
		type: types.ObjectId,
		ref: 'Subcategory',
		required: true
	},
	code: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,		// REQUIRED
		maxlength: 30,
		unique: true
	},
	name: {
		type: String,
		required: true,
		trim: true,			//REQUIRED
		minlength: 1,
		maxlength: 300
	},
	shortName: {
		type: String,
		required: true,
		trim: true,			//REQUIRED
		minlength: 1,
		maxlength: 100
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
	keyFeatures: [{ title: String, description: String }],
	target: {
		type: String,
		enum: ['Everyone','Men','Women','Girls','Boys','Children','Babies'],
		required: true,
		default: 'Everyone'
	},
	price: {
		type: types.Decimal128,
		default: 0
	},
	currency: {
		type: String,
		required: true,
		enum: ['$','Bs'],
		default: '$'
	},
	model: {
		type: String,
		trim: true,
		maxlength: 30
	},
	manufacturer: {
		type: types.ObjectId,
		ref: 'Manufacturer'
	},
	brand: {
		type: String	
	},
	isFreeShipping: {
		type: Boolean,
		default: false
	},
	condition: {
		type: String,
		required: true,
		enum: ['New','Used'],
		default: 'New'		
	},
	inStock: {
		type: Boolean,
		default: true		
	},
	stock: {
		type: Int32,
		required: true,
		default: 0,
		min: -2147483647,
		max: 2147483647		
	},
	isActive: {
		type: Boolean,
		default: true
	},
	images: [types.ObjectId],
	cost: {
		type: types.Decimal128,
		default: 0
	},
	tax: {
		type: types.Decimal128,
		default: 10
	}
});

itemsSchema.plugin(mongoosePaginate);

const Item = mongoose.model('Item', itemsSchema);

module.exports = Item;
