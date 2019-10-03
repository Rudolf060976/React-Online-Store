const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const config = require('../config/config');
const conn = require('mongoose').connection;
const ObjectID = require('mongodb').ObjectID;
const crudItems = require('../db/crud_operations/crudItems');


const generateImageFileId = function(itemId) {
	console.log('INSIDE generateImageFileId!!!');
	const id = new ObjectID();
	
	crudItems.addItemImage(itemId, id); // EACH TIME WE STORE AN IMAGE FILE, GENERATE AN IMAGE ID AND
	// STORE THAT ID in THE images ARRAY FIELD OF THE item DOC.
	
	return id;
};

const gfsStorageImageFiles = new GridFSStorage({
	db: conn,
	file: function(req, file) {

		const { itemId } = req.params;  /* EVERY TIME WE USE UPLOAD MIDDLEWARE WE HAVE TO RECEIVE THE itemId PARAMETER FROM THE REQUEST, SO THAT generateFileId Function CAN SAVE THE imageId IN THE USERS COLLECTION. */
		
		return new Promise((resolve, reject) => {


			crudItems.getItemById(itemId).then(item => {

				// WE HAVE TO VERIFY IF THE ITEM HAS REACHED THE MAXIMUM ALLOWED IMAGE FILES PER ITEM.
				// IN THAT CASE WE DON'T SAVE THE FILE.
				
				if(item.images.length < config.app.items.ITEMS_IMAGES_MAX_COUNT) {

					if (file.mimetype === 'image/jpeg') {	//ONLY IMAGES ARE PERMITTED

						resolve({
							id: generateImageFileId(itemId),
							bucketName: 'images'  // STORED IN THE images COLLECTIONS.
						});
			
					} else {

						return reject(null);

					}
		

				} else {

					return reject(null);

				}


			}).catch(err => {

				return reject(err);

			});


		});


	}
});

const limitsFileImage = {
	fieldNameSize: 100,	// MAX 100 CHARS PER FILE NAME
	fileSize: config.app.items.ITEMS_IMAGE_MAX_SIZE_MBYTES * 1024 * 1024, // MAX 20MB PER FILE
	files: config.app.items.ITEMS_IMAGES_MAX_COUNT		// MAX FILES PER REQUEST
};

const fileFilterImages = (req, file, cb) => {

	// SELECT HERE WICH FILES TO IGNORE CALLING cb(null, false) or cb(new Error())

	cb(null, true);

};


let uploadImageFiles = multer({
	storage: gfsStorageImageFiles,
	limits: limitsFileImage,
	fileFilter: fileFilterImages
});

module.exports = {
	uploadImageFiles
};