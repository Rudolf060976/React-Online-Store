const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const config = require('../config/config');
const conn = require('mongoose').connection;
const ObjectID = require('mongodb').ObjectID;
const crudCategories = require('../db/crud_operations/crudCategories');


const generateImageFileId = function(categoryId) {
	
	const id = new ObjectID();
	
	crudCategories.addCategoryImage(categoryId, id); // EACH TIME WE STORE AN IMAGE FILE, GENERATE AN IMAGE ID AND
	// STORE THAT ID in THE images ARRAY FIELD OF THE item DOC.
	
	return id;
};

const gfsStorageImageFiles = new GridFSStorage({
	db: conn,
	file: function(req, file) {

		const { categoryId } = req.params;  /* EVERY TIME WE USE UPLOAD MIDDLEWARE WE HAVE TO RECEIVE THE itemId PARAMETER FROM THE REQUEST, SO THAT generateFileId Function CAN SAVE THE imageId IN THE USERS COLLECTION. */
		
		return new Promise((resolve, reject) => {


			crudCategories.getCategoryById(categoryId).then(item => {

				// WE HAVE TO VERIFY IF THE ITEM HAS REACHED THE MAXIMUM ALLOWED IMAGE FILES PER ITEM.
				// IN THAT CASE WE DON'T SAVE THE FILE.
				
				if(item.images.length < config.app.items.CATEGORIES_IMAGES_MAX_COUNT) {
					
					if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {	//ONLY IMAGES ARE PERMITTED

						resolve({
							id: generateImageFileId(categoryId),
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

	/*
		MULTER WILL PUT THE FILE INFO IN req.file:

	{
		fieldname: 'image',
		originalname: 'christmas.jpg',
		encoding: '7bit',
		mimetype: 'image/jpeg',
		destination: 'xxxx',
		filename: '123443klj3422434234342',
		path: 'xxxxcxxx',
		size: 84201
	}

	IF YOU WANT TO reject a File, call cb(null, false)

	*/


};


let uploadImageFiles = multer({
	storage: gfsStorageImageFiles,
	limits: limitsFileImage,
	fileFilter: fileFilterImages
});

module.exports = {
	uploadImageFiles
};