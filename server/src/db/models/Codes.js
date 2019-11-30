const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');

const types = mongoose.SchemaTypes;

const codesSchema = new mongoose.Schema({
	_id: types.ObjectId,
	name: {
		type: String,
		required: true,
		trim: true
	},
	codeLength: {
		type: Number,
		required: true
	},
	lastCodeNumber: {
		type: Int32,
		required: true
	}
});

const Code = mongoose.model('Code', codesSchema);

module.exports = Code;