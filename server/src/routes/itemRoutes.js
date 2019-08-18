const express = require('express');

const createError = require('http-errors');

const Item = require('../db/models/Item');

const crudItems = require('../db/crud_operations/crudItems');

const router = express.Router();


router.get('/', (req, res) => {
	// RESPONSES all items OR items by filter (query string)
	
	if(!req.query) {
		crudItems.g
	}
		
});
	
router.get('/:itemId', (req, res) => {
	// REQUEST an item Document by Id
	
	
});
	
router.get('/:itemId/images/:imageId', (req, res) => {
	// REQUEST an image FROM GRIDfs
	
	
});

router.post('/', (req, res) => {
	// RECEIVES A NEW item OBJECT AS JSON AND SAVES IT IN THE DB


});

router.post('/:itemId/images', (req, res) => {
// RECEIVES IMAGES FROM MULTER IN FORM DATA FORMAT AND SAVE THEM IN GRIDFS


});

router.delete('/:itemId/images/:imageId', (req, res) => {
// DELETES AN IMAGE FROM item OBJECT AND GRIDFS

});

router.put('/:itemId', (req, res) => {
// RECEIVES item OBJECT AS JSON AND SAVES IT ON THE DB


});

module.exports = router;
