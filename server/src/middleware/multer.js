const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const conn = require('mongoose').connection;
const ObjectID = require('mongodb').ObjectID;

const generatedFilesIds = [];

const generateFileId = function() {
	const id = new ObjectID();
	
	generatedFilesIds.push(id);

	return id;
};

const gfsStorage = new GridFSStorage({
	db: conn,
	file: function(req, file) {
		if (file.mimetype === 'image/jpeg') {

			return {
				id: generateFileId()
			}

		} else {
			return null;
		}
	}
});

const limits = {
	fieldNameSize: 100,	// MAX 100 CHARS PER FILE NAME
	fileSize: 20971520, // MAX 20MB PER FILE
	files: 6			// MAX OF 6 FILES PER REQUEST
};

const fileFilter = (req, file, cb) => {

	// SELECT HERE WICH FILES TO IGNORE CALLING cb(null, false) or cb(new Error())

	cb(null, true);

};


let upload = multer({
	gfsStorage,
	limits,
	fileFilter
});

module.exports = {
	upload,
	generatedFilesIds
};