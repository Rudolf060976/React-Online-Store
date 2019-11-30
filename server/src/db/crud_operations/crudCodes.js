const createError = require('http-errors');

const { ObjectID } = require('mongodb');

const { mongoose } = require('../mongoose');

const Code = require('../models/Codes');

const db = mongoose.connection;


const createCodes = () => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {


			Code.deleteMany({}).then(res => {
				

				return Code.create({
					_id: new ObjectID(),
					name: 'Categories',
					codeLength: 4,
					lastCodeNumber: 0
				});
			
			}).then(res => {


				return Code.create({
					_id: new ObjectID(),
					name: 'Subcategories',
					codeLength: 4,
					lastCodeNumber: 0
				});

			}).then(res => {

				return Code.create({
					_id: new ObjectID(),
					name: 'Items',
					codeLength: 8,
					lastCodeNumber: 0
				});

			}).then(res => {

				resolve();

			}).catch(err => {

				if (!err.status) {

					err.status = 500;

				}

				reject(err);

			});
		
		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const getNewCategoryCode = () => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			let newCode = null;

			Code.findOne({ name: 'Categories' }).then(res => {
				
				const length = res.codeLength;
				const lastCode = res.lastCodeNumber;

				newCode = getCodeFromValues(length, lastCode + 1);

				res.lastCodeNumber +=1;
				
				return res.save();
				
			}).then(res => {

				resolve(newCode);

			}).catch(err => {

				if (!err.status) {

					err.status = 500;

				}

				reject(err);

			});
		
		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const getNewSubcategoryCode = () => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			let newCode = null;

			Code.findOne({ name: 'Subcategories' }).then(res => {
				
				const length = res.codeLength;
				const lastCode = res.lastCodeNumber;

				newCode = getCodeFromValues(length, lastCode + 1);

				res.lastCodeNumber +=1;
				
				return res.save();
				
			}).then(res => {

				resolve(newCode);

			}).catch(err => {

				if (!err.status) {

					err.status = 500;

				}

				reject(err);

			});
		
		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};

const getNewItemCode = () => {

	return new Promise((resolve, reject) => {

		if (db.readyState === 1 || db.readyState === 2) {

			let newCode = null;
			
			Code.findOne({ name: 'Items' }).then(res => {
				
				const length = res.codeLength;
				const lastCode = res.lastCodeNumber;

				newCode = getCodeFromValues(length, lastCode + 1);
				
				res.lastCodeNumber += 1;
				
				return res.save();
				
			}).then(res => {

				resolve(newCode);

			}).catch(err => {

				if (!err.status) {

					err.status = 500;

				}

				reject(err);

			});
		
		} else {

			throw createError(500, 'DB CONNECTION ERROR!!');

		}

	});

};


const getCodeFromValues = (codeLength, codeNumber) => {

	let outputString = null;
	
	outputString = codeNumber.toString();
	
	for (let i = outputString.length; i < codeLength; i++ ) {

		outputString = '0' + outputString;
	}

	return outputString;

};


module.exports = {
	createCodes,
	getNewCategoryCode,
	getNewSubcategoryCode,
	getNewItemCode
};