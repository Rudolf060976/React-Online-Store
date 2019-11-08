const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
		maxlength: 100
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
		maxlength: 100
	},
	firstname: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 50
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 50
	},
	phone: {
		home: {
			type: String,
			trim: true,
			maxlength: 50
		},
		work: {
			type: String,
			trim: true,
			maxlength: 50
		},
		mobil: {
			type: String,
			trim: true,
			maxlength: 50
		}
	},
	email: {
		type: String,
		required: true,
		trim: true,
		maxlength: 100
	},
	address: {
		type: String,
		trim: true,
		maxlength: 300
	},
	city: {
		type: String,
		trim: true,
		maxlength: 100
	},
	state: {
		type: String,
		trim: true,
		maxlength: 50
	},
	country: {
		type: String,
		trim: true,
		maxlength: 100
	},
	isValidated: {
		type: Boolean,
		default: false
	},
	failedLoginAttemps: {
		type: Number,
		default: 0
	},
	isSuspended: {
		type: Boolean,
		default: false
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	suspendedAt: {
		type: Date,
		default: Date.now
	},
	lastLogin: {
		type: Date,
		default: Date.now	
	},
	lastModified: {
		type: Date,
		default: Date.now
	}

})

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);


module.exports = User;