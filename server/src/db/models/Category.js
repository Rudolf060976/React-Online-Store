const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');

const types = mongoose.SchemaTypes;

const categorySchema = new mongoose.Schema({
	_id: types.ObjectId,
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
		maxlength: 50
	},
	description: {
		type: String,
		trim: true,			//REQUIRED
		maxlength: 200
	},
	images: [types.ObjectId]
});

categorySchema.plugin(mongoosePaginate);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;