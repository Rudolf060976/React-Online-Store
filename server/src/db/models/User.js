const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
		maxlength: 50
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
		maxlength: 20
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
	isSuspended: {
		type: Boolean,
		default: false
	},
	SuspendedAt: {
		type: Date,
		default: Date.now
	},
	isTempPassword: {
		type: Boolean,
		default: false	
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

const User = mongoose.model('User', userSchema);


module.exports = User;