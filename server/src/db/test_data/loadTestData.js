const { mongoose } = require('../mongoose');
const MongoGridFSStore = require('mongo-gridfs-storage');
const fs = require('fs');
const ObjectID = require('mongodb').ObjectID;

const categories = require('./data/categories');
const subcategories = require('./data/subcategories');
const items = require('./data/items');

const crudCategories = require('../crud_operations/crudCategories');
const crudSubcategories = require('../crud_operations/crudSubcategories');
const crudItems = require('../crud_operations/crudItems');
const crudCodes = require('../crud_operations/crudCodes');
const crudItemSpecials = require('../crud_operations/crudItemSpecials');

let countSUBDEPARTMENTS = 0;

function checkDone() {

	countSUBDEPARTMENTS++;

	if(countSUBDEPARTMENTS===36) {
		console.log('DONE......EXIT PROCESS..')
		process.exit(0); // THERE ARE NOW 36 SUBCATEGORIES
	}

}

async function CreateCodes() {

	console.log('CREATING CODES...');

	await crudCodes.createCodes();

	console.log('DONE...');

}

async function CreateItemSpecials() {

	console.log('CREATING ITEM SPECIALS...');

	const filter = {
		dealOfTheDayItems: [],
		bestSellerItems: [],
		seasonDealItems: [],
		mustHaveItems: [],
		freeShippingItems: [],
		familyEntertainment: [],
		learningForKids: [],
		workoutAtHome: [],
		healthCare: []
	}

	await crudItemSpecials.addNewSpecialWithFilter(filter);

	console.log('DONE...');

}


async function DeleteAll() {

	// *** WE HAVE TO DELETE ALL THE DATA ***
	try {
		
		console.log('DELETING ITEMS...');
	
		await crudItems.deleteAllItems();	

		console.log('DELETING SUBCATEGORIES...');

		await crudSubcategories.deleteAllSubCategories();
	
		console.log('DELETING CATEGORIES...');

		await crudCategories.deleteAllCategories();

		console.log('DELETING ITEM SPECIALS...');

		await crudItemSpecials.deleteAllItemSpecials();
		

	} catch (error) {
		
		console.log('ERROR DELETING DATA...CONTINUE..');

	}
	

}

async function InsertCategories() {

	console.log('INSERTING CATEGORIES...');

	for( let i=0; i < categories.length; i++) {

		await crudCategories.addCategory(categories[i].code,categories[i].name);
	
	}

}


async function loadData() {

	try {

		console.log('**** STARTING SCRIPT FOR INSERTING TESTING DATA ON THE DATABASE ******');

		// *** WE HAVE TO DELETE ALL THE DATA ***

		await CreateCodes();		

		await DeleteAll();

		await CreateItemSpecials();
		
		await InsertCategories();
	
		const allCategories = await crudCategories.getAllCategories();

		if(allCategories.length > 0) {

			// *** NOW WE LOAD CATEGORY IMAGES

			allCategories.forEach(categObj => {
				

				switch (categObj.name) {
				
				case 'Beauty & Health':  // ******* CATEGORY BEAUTY & HEALTH
					
					(async function () {

						console.log('INSERTING IMAGES FOR CATEGORY BEAUTY & HEALTH...');

						const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

						const stream1 = fs.createReadStream(__dirname + '/data/images/categories/beauty & health/5.jpg');

						const stream2 = fs.createReadStream(__dirname + '/data/images/categories/beauty & health/7.png');

						const stream3 = fs.createReadStream(__dirname + '/data/images/categories/beauty & health/8.png');

						const stream4 = fs.createReadStream(__dirname + '/data/images/categories/beauty & health/3.jpg');

						const stream5 = fs.createReadStream(__dirname + '/data/images/categories/beauty & health/4.jpg');

						const id1 = new ObjectID();
						const id2 = new ObjectID();
						const id3 = new ObjectID();
						const id4 = new ObjectID();
						const id5 = new ObjectID();
				
						await gfs.write(stream1, { id: id1, filename: 'file1' });
						await gfs.write(stream2, { id: id2, filename: 'file2' });
						await gfs.write(stream3, { id: id3, filename: 'file3' });
						await gfs.write(stream4, { id: id4, filename: 'file4' });
						await gfs.write(stream5, { id: id5, filename: 'file5' });
	
						await crudCategories.addCategoryImage(categObj._id,id1);
						await crudCategories.addCategoryImage(categObj._id,id2);
						await crudCategories.addCategoryImage(categObj._id,id3);
						await crudCategories.addCategoryImage(categObj._id,id4);
						await crudCategories.addCategoryImage(categObj._id,id5);

						console.log('INSERTING SUBCATEGORIES FOR BEAUTY & HEALTH...');

						const subcatArray = subcategories.filter(item => (

							item.categoryName === 'Beauty & Health'

						));
						
							
						for( let j=0; j < subcatArray.length; j++) {

							await crudSubcategories.addSubcategory(subcatArray[j].code, categObj._id.toString(), subcatArray[j].name);
						}
				
						const allSubcategories = await crudSubcategories.getSubcategories(categObj._id.toString());

						console.log('INSERTING IMAGES FOR SUBCATEGORIES OF BEAUTY & HEALTH...');

						if(allSubcategories.length > 0) {


							allSubcategories.forEach(subCategObj => {

								switch (subCategObj.name) {
								case 'Baby & Child Care':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY BABY & CHILD CARE...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/beauty & health/Baby & Child Care/3.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file1' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();
								
									break;
								case 'Luxury Beauty':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY LUXURY BEAUTY...');
	
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/beauty & health/Luxury Beauty/1.jpg');
	
										const id5 = new ObjectID();
	
										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file2' });
	
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
	
									})();	
								
									break;

								case 'Medical Supplies':
								
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY MEDICAL SUPPLIES...');
		
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/beauty & health/Medical Supplies/1.png');
		
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

		
										await gfs.write(stream5, { _id: id5, filename: 'file3' });
		
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
		
									})();	

									break;
								case 'Salon & Spa':
								
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY SALON & SPA...');
			
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/beauty & health/Salon & Spa/1.png');
			
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
			
										await gfs.write(stream5, { _id: id5, filename: 'file4' });
			
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
			
									})();	

									break;
								case 'Skin Care':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY SKIN CARE...');
				
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/beauty & health/Skin Care/2.jpg');
				
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
				
										await gfs.write(stream5, { _id: id5, filename: 'file5' });
				
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
				
									})();	
								
									break;
								case 'Vitamins & Dietary Supplements':								
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY VITAMINS & DIETARY SUPPLEMENTS...');
			
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/beauty & health/Vitamins & Dietary Supplements/2.jpg');
			
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
			
										await gfs.write(stream5, { _id: id5, filename: 'file6' });
			
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
			
									})();	

									break;								
								default:
									break;
								}

							})

						}

					})();
					
					break;		
				
				case 'Electronics':    // ********** CATEGORY ELECTRONICS *********

					(async function () {

						console.log('INSERTING IMAGES FOR CATEGORY ELECTRONICS...');

						const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

						const stream1 = fs.createReadStream(__dirname + '/data/images/categories/electronics/main.jpg');

						const stream2 = fs.createReadStream(__dirname + '/data/images/categories/electronics/1.jpg');

						const stream3 = fs.createReadStream(__dirname + '/data/images/categories/electronics/2.png');

						const stream4 = fs.createReadStream(__dirname + '/data/images/categories/electronics/6.jpg');

						const stream5 = fs.createReadStream(__dirname + '/data/images/categories/electronics/4.jpg');

						const id1 = new ObjectID();
						const id2 = new ObjectID();	
						const id3 = new ObjectID();
						const id4 = new ObjectID();
						const id5 = new ObjectID();
			
						await gfs.write(stream1, { id: id1, filename: 'file1' });
						await gfs.write(stream2, { id: id2, filename: 'file2' });
						await gfs.write(stream3, { id: id3, filename: 'file3' });
						await gfs.write(stream4, { id: id4, filename: 'file4' });
						await gfs.write(stream5, { id: id5, filename: 'file5' });

						await crudCategories.addCategoryImage(categObj._id,id1);
						await crudCategories.addCategoryImage(categObj._id,id2);
						await crudCategories.addCategoryImage(categObj._id,id3);
						await crudCategories.addCategoryImage(categObj._id,id4);
						await crudCategories.addCategoryImage(categObj._id,id5);

						console.log('INSERTING SUBCATEGORIES FOR ELECTRONICS...');

						const subcatArray = subcategories.filter(item => (

							item.categoryName === 'Electronics'

						));
					
						
						for( let j=0; j < subcatArray.length; j++) {

							await crudSubcategories.addSubcategory(subcatArray[j].code, categObj._id.toString(), subcatArray[j].name);
						}
			
						const allSubcategories = await crudSubcategories.getSubcategories(categObj._id.toString());

						console.log('INSERTING IMAGES FOR SUBCATEGORIES OF ELECTRONICS...');

						if(allSubcategories.length > 0) {


							allSubcategories.forEach(subCategObj => {

								switch (subCategObj.name) {
								
								case 'Car Electronics':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY CAR ELECTRONICS...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/electronics/Car/2.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file1' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();
							
									break;

								case 'Cell Phones':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY CELL PHONES...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/electronics/Cell Phones/1.webp');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file2' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	
							
									break;

								case 'Computers':
							
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY COMPUTERS...');
	
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/electronics/Computers/2.png');
	
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

	
										await gfs.write(stream5, { _id: id5, filename: 'file3' });
	
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
	
									})();	

									break;

								case 'Home Audio':
							
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY HOME AUDIO...');
		
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/electronics/Home Audio/1.jpg');
										
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
		
										await gfs.write(stream5, { _id: id5, filename: 'file4' });
		
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
		
									})();	

									break;

								case 'TV & Video':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY TV & VIDEO...');
			
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/electronics/TV & Video/1.png');
			
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
			
										await gfs.write(stream5, { _id: id5, filename: 'file5' });
			
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
			
									})();	
							
									break;

								case 'Video Games':								
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY VIDEO GAMES...');
		
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/electronics/Video Games/1.jpg');
		
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
		
										await gfs.write(stream5, { _id: id5, filename: 'file6' });
		
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
		
									})();	

									break;	

								default:

									break;

								}

							})

						}

					})();

					break;

				case 'Food & Grocery':  // ************* CATEGORY FOOD & GROCERY ***********

					(async function () {

						console.log('INSERTING IMAGES FOR CATEGORY FOOD & GROCERY...');

						const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

						const stream1 = fs.createReadStream(__dirname + '/data/images/categories/food/main.png');

						const stream2 = fs.createReadStream(__dirname + '/data/images/categories/food/2.jpg');

						const stream3 = fs.createReadStream(__dirname + '/data/images/categories/food/4.jpeg');

						const stream4 = fs.createReadStream(__dirname + '/data/images/categories/food/1.jpg');

						const stream5 = fs.createReadStream(__dirname + '/data/images/categories/food/3.jpg');

						const id1 = new ObjectID();
						const id2 = new ObjectID();	
						const id3 = new ObjectID();
						const id4 = new ObjectID();
						const id5 = new ObjectID();
		
						await gfs.write(stream1, { id: id1, filename: 'file1' });
						await gfs.write(stream2, { id: id2, filename: 'file2' });
						await gfs.write(stream3, { id: id3, filename: 'file3' });
						await gfs.write(stream4, { id: id4, filename: 'file4' });
						await gfs.write(stream5, { id: id5, filename: 'file5' });


						await crudCategories.addCategoryImage(categObj._id,id1);
						await crudCategories.addCategoryImage(categObj._id,id2);
						await crudCategories.addCategoryImage(categObj._id,id3);
						await crudCategories.addCategoryImage(categObj._id,id4);
						await crudCategories.addCategoryImage(categObj._id,id5);

						console.log('INSERTING SUBCATEGORIES FOR FOOD & GROCERY...');

						const subcatArray = subcategories.filter(item => (

							item.categoryName === 'Food & Grocery'

						));
				
					
						for( let j=0; j < subcatArray.length; j++) {

							await crudSubcategories.addSubcategory(subcatArray[j].code, categObj._id.toString(), subcatArray[j].name);
						}
		
						const allSubcategories = await crudSubcategories.getSubcategories(categObj._id.toString());

						console.log('INSERTING IMAGES FOR SUBCATEGORIES OF FOOD & GROCERY...');

						if(allSubcategories.length > 0) {


							allSubcategories.forEach(subCategObj => {

								switch (subCategObj.name) {
							
								case 'Fresh Food':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY FRESH FOOD...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/food/Fresh Food/2.png');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file1' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();
						
									break;

								case 'Grocery & Gourmet':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY GROCERY & GOURMET...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/food/Grocery & Gourmet/2.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file2' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	
						
									break;
							
								default:
									break;
								}

							})

						}

					})();

					break;
				case 'Home':   // ************* CATEGORY HOME *******************************

					(async function () {

						console.log('INSERTING IMAGES FOR CATEGORY HOME...');

						const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

						const stream1 = fs.createReadStream(__dirname + '/data/images/categories/home/main.jpg');

						const stream2 = fs.createReadStream(__dirname + '/data/images/categories/home/1.jpg');

						const stream3 = fs.createReadStream(__dirname + '/data/images/categories/home/3.jpg');

						const stream4 = fs.createReadStream(__dirname + '/data/images/categories/home/2.jpg');

						const stream5 = fs.createReadStream(__dirname + '/data/images/categories/home/6.jpg');

						const id1 = new ObjectID();
						const id2 = new ObjectID();	
						const id3 = new ObjectID();
						const id4 = new ObjectID();
						const id5 = new ObjectID();
		
						await gfs.write(stream1, { id: id1, filename: 'file1' });
						await gfs.write(stream2, { id: id2, filename: 'file2' });
						await gfs.write(stream3, { id: id3, filename: 'file3' });
						await gfs.write(stream4, { id: id4, filename: 'file4' });
						await gfs.write(stream5, { id: id5, filename: 'file5' });

						await crudCategories.addCategoryImage(categObj._id,id1);
						await crudCategories.addCategoryImage(categObj._id,id2);
						await crudCategories.addCategoryImage(categObj._id,id3);
						await crudCategories.addCategoryImage(categObj._id,id4);
						await crudCategories.addCategoryImage(categObj._id,id5);

						console.log('INSERTING SUBCATEGORIES FOR HOME...');

						const subcatArray = subcategories.filter(item => (

							item.categoryName === 'Home'

						));
				
					
						for( let j=0; j < subcatArray.length; j++) {

							await crudSubcategories.addSubcategory(subcatArray[j].code, categObj._id.toString(), subcatArray[j].name);
						}
		
						const allSubcategories = await crudSubcategories.getSubcategories(categObj._id.toString());

						console.log('INSERTING IMAGES FOR SUBCATEGORIES OF HOME...');

						if(allSubcategories.length > 0) {


							allSubcategories.forEach(subCategObj => {

								switch (subCategObj.name) {
							
								case 'Cameras':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY CAMERAS...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/home/Cameras/1.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file1' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();
						
									break;

								case 'Kitchen':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY KITCHEN...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/home/Kitchen/1.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file2' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	
						
									break;

								case 'Lighting':
						
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY LIGHTING...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/home/Lighting/1.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });


										await gfs.write(stream5, { _id: id5, filename: 'file3' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	

									break;

								case 'Security Systems':
						
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY SECURITY SYSTEMS...');
	
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/home/Security Systems/2.png');
									
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
	
										await gfs.write(stream5, { _id: id5, filename: 'file4' });
	
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
	
									})();	

									break;

								case 'Tools':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY TOOLS...');
		
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/home/Tools/2.png');
		
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
		
										await gfs.write(stream5, { _id: id5, filename: 'file5' });
		
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
		
									})();	
						
									break;
							
								default:

									break;
								
								}

							})

						}

					})();


					break;
				
				case 'Pet Supplies': // *********** CATEGORY PET SUPPLIES **********************

					(async function () {

						console.log('INSERTING IMAGES FOR CATEGORY PET SUPPLIES...');

						const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

						const stream1 = fs.createReadStream(__dirname + '/data/images/categories/pet supplies/main.png');

						const stream2 = fs.createReadStream(__dirname + '/data/images/categories/pet supplies/1.jpg');

						const stream3 = fs.createReadStream(__dirname + '/data/images/categories/pet supplies/3.png');

						const stream4 = fs.createReadStream(__dirname + '/data/images/categories/pet supplies/4.png');

						const stream5 = fs.createReadStream(__dirname + '/data/images/categories/pet supplies/2.jpg');

						const id1 = new ObjectID();
						const id2 = new ObjectID();	
						const id3 = new ObjectID();
						const id4 = new ObjectID();
						const id5 = new ObjectID();
	
						await gfs.write(stream1, { id: id1, filename: 'file1' });
						await gfs.write(stream2, { id: id2, filename: 'file2' });
						await gfs.write(stream3, { id: id3, filename: 'file3' });
						await gfs.write(stream4, { id: id4, filename: 'file4' });
						await gfs.write(stream5, { id: id5, filename: 'file5' });

						await crudCategories.addCategoryImage(categObj._id,id1);
						await crudCategories.addCategoryImage(categObj._id,id2);
						await crudCategories.addCategoryImage(categObj._id,id3);
						await crudCategories.addCategoryImage(categObj._id,id4);
						await crudCategories.addCategoryImage(categObj._id,id5);

						console.log('INSERTING SUBCATEGORIES FOR PET SUPPLIES...');

						const subcatArray = subcategories.filter(item => (

							item.categoryName === 'Pet Supplies'

						));
			
				
						for( let j=0; j < subcatArray.length; j++) {

							await crudSubcategories.addSubcategory(subcatArray[j].code, categObj._id.toString(), subcatArray[j].name);
						}
	
						const allSubcategories = await crudSubcategories.getSubcategories(categObj._id.toString());

						console.log('INSERTING IMAGES FOR SUBCATEGORIES OF PET SUPPLIES...');

						if(allSubcategories.length > 0) {


							allSubcategories.forEach(subCategObj => {

								switch (subCategObj.name) {
						
								case 'Birds':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY BIRDS...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/pet supplies/Birds/1.webp');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file1' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();
					
									break;

								case 'Cat Food':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY CAT FOOD...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/pet supplies/Cat Food/1.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file2' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	
					
									break;

								case 'Cat Supplies':
					
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY LIGHTING...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/pet supplies/Cat Supplies/1.png');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });


										await gfs.write(stream5, { _id: id5, filename: 'file3' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	

									break;

								case 'Dog Food':
					
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY SECURITY SYSTEMS...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/pet supplies/Dog Food/1.jpg');
								
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file4' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	

									break;

								case 'Dog Supplies':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY DOG SUPPLIES...');
	
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/pet supplies/Dog Supplies/2.jpg');
	
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
	
										await gfs.write(stream5, { _id: id5, filename: 'file5' });
	
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
	
									})();	
					
									break;

								case 'Fish & Aquatic Pets':

									(async function () {
		
										console.log('INSERTING IMAGES FOR SUBCATEGORY FISH & AQUATIC PETS...');
			
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/pet supplies/Fish & Aquatic Pets/1.jpg');
			
										const id5 = new ObjectID();
		
										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
			
										await gfs.write(stream5, { _id: id5, filename: 'file5' });
			
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
			
									})();	
							
									break;

								case 'Small Animals':

									(async function () {
		
										console.log('INSERTING IMAGES FOR SUBCATEGORY SMALL ANIMALS...');
			
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/pet supplies/Small Animals/1.webp');
			
										const id5 = new ObjectID();
		
										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
			
										await gfs.write(stream5, { _id: id5, filename: 'file5' });
			
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
			
									})();	
							
									break;
						
								default:

									break;
							
								}

							})

						}

					})();

					break;

				case 'Sports & Outdoors':  // *********** CATEGORY SPORTS & OUTDOORS *****************

					(async function () {

						console.log('INSERTING IMAGES FOR CATEGORY SPORTS & OUTDOORS...');

						const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

						const stream1 = fs.createReadStream(__dirname + '/data/images/categories/sports & outdoors/main2.jpg');

						const stream2 = fs.createReadStream(__dirname + '/data/images/categories/sports & outdoors/1.jpg');

						const stream3 = fs.createReadStream(__dirname + '/data/images/categories/sports & outdoors/2.jpg');

						const stream4 = fs.createReadStream(__dirname + '/data/images/categories/sports & outdoors/3.jpg');

						const stream5 = fs.createReadStream(__dirname + '/data/images/categories/sports & outdoors/5.jpg');

						const id1 = new ObjectID();
						const id2 = new ObjectID();	
						const id3 = new ObjectID();
						const id4 = new ObjectID();
						const id5 = new ObjectID();

						await gfs.write(stream1, { id: id1, filename: 'file1' });
						await gfs.write(stream2, { id: id2, filename: 'file2' });
						await gfs.write(stream3, { id: id3, filename: 'file3' });
						await gfs.write(stream4, { id: id4, filename: 'file4' });
						await gfs.write(stream5, { id: id5, filename: 'file5' });

						await crudCategories.addCategoryImage(categObj._id,id1);
						await crudCategories.addCategoryImage(categObj._id,id2);
						await crudCategories.addCategoryImage(categObj._id,id3);
						await crudCategories.addCategoryImage(categObj._id,id4);
						await crudCategories.addCategoryImage(categObj._id,id5);

						console.log('INSERTING SUBCATEGORIES FOR SPORTS & OUTDOORS...');

						const subcatArray = subcategories.filter(item => (

							item.categoryName === 'Sports & Outdoors'

						));
		
			
						for( let j=0; j < subcatArray.length; j++) {

							await crudSubcategories.addSubcategory(subcatArray[j].code, categObj._id.toString(), subcatArray[j].name);
						}

						const allSubcategories = await crudSubcategories.getSubcategories(categObj._id.toString());

						console.log('INSERTING IMAGES FOR SUBCATEGORIES OF SPORTS & OUTDOORS...');

						if(allSubcategories.length > 0) {


							allSubcategories.forEach(subCategObj => {

								switch (subCategObj.name) {
					
								case 'Camping & Hiking':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY CAMPING & HIKING...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/sports & outdoors/Camping & Hiking/1.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
										
										await gfs.write(stream5, { _id: id5, filename: 'file1' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();
				
									break;

								case 'Cycling':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY CYCLING...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/sports & outdoors/Cycling/1.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file2' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	
				
									break;

								case 'Exercise & Fitness':
				
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY EXERCISE & FITNESS...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/sports & outdoors/Exercise & Fitness/1.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });


										await gfs.write(stream5, { _id: id5, filename: 'file3' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	

									break;

								case 'Hunting & Fishing':
				
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY HUNTING & FISHING...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/sports & outdoors/Hunting & Fishing/1.jpg');
							
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file4' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	

									break;

								case 'Team Sports':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY TEAM SPORTS...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/sports & outdoors/Team Sports/1.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file5' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	
				
									break;

								case 'Water Sports':

									(async function () {
	
										console.log('INSERTING IMAGES FOR SUBCATEGORY WATER SPORTS...');
		
										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/sports & outdoors/Water Sports/1.png');
		
										const id5 = new ObjectID();
	
										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
		
										await gfs.write(stream5, { _id: id5, filename: 'file5' });
		
										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();
		
									})();	
						
									break;							
					
								default:

									break;
						
								}

							})

						}

					})();


					break;
				case 'Toys':  // ************** CATEGORY TOYS *******************

					(async function () {

						console.log('INSERTING IMAGES FOR CATEGORY TOYS...');

						const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

						const stream1 = fs.createReadStream(__dirname + '/data/images/categories/toys/main2.jpg');

						const stream2 = fs.createReadStream(__dirname + '/data/images/categories/toys/1.jpeg');

						const stream3 = fs.createReadStream(__dirname + '/data/images/categories/toys/2.png');

						const stream4 = fs.createReadStream(__dirname + '/data/images/categories/toys/3.jpg');

						const stream5 = fs.createReadStream(__dirname + '/data/images/categories/toys/4.jpg');

						const id1 = new ObjectID();
						const id2 = new ObjectID();	
						const id3 = new ObjectID();
						const id4 = new ObjectID();
						const id5 = new ObjectID();

						await gfs.write(stream1, { id: id1, filename: 'file1' });
						await gfs.write(stream2, { id: id2, filename: 'file2' });
						await gfs.write(stream3, { id: id3, filename: 'file3' });
						await gfs.write(stream4, { id: id4, filename: 'file4' });
						await gfs.write(stream5, { id: id5, filename: 'file5' });

						await crudCategories.addCategoryImage(categObj._id,id1);
						await crudCategories.addCategoryImage(categObj._id,id2);
						await crudCategories.addCategoryImage(categObj._id,id3);
						await crudCategories.addCategoryImage(categObj._id,id4);
						await crudCategories.addCategoryImage(categObj._id,id5);

						console.log('INSERTING SUBCATEGORIES FOR TOYS...');

						const subcatArray = subcategories.filter(item => (

							item.categoryName === 'Toys'

						));
	
		
						for( let j=0; j < subcatArray.length; j++) {

							await crudSubcategories.addSubcategory(subcatArray[j].code, categObj._id.toString(), subcatArray[j].name);
						}

						const allSubcategories = await crudSubcategories.getSubcategories(categObj._id.toString());

						console.log('INSERTING IMAGES FOR SUBCATEGORIES OF TOYS...');

						if(allSubcategories.length > 0) {


							allSubcategories.forEach(subCategObj => {

								switch (subCategObj.name) {
				
								case 'Babies':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY BABIES...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/toys/Babies/1.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
									
										await gfs.write(stream5, { _id: id5, filename: 'file1' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();
			
									break;

								case 'Girls':

									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY CYCLING...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/toys/Girls/1.jpg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file2' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	
			
									break;

								case 'Kids':
			
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY KIDS...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/toys/Kids/1.jpeg');

										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });


										await gfs.write(stream5, { _id: id5, filename: 'file3' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	

									break;

								case 'Teens':
			
									(async function () {

										console.log('INSERTING IMAGES FOR SUBCATEGORY TEENS...');

										const stream5 = fs.createReadStream(__dirname + '/data/images/subcategories/toys/Teens/3.jpg');
						
										const id5 = new ObjectID();

										const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });

										await gfs.write(stream5, { _id: id5, filename: 'file4' });

										await crudSubcategories.addSubcategoryImage(subCategObj._id,id5);

										checkDone();

									})();	

									break;
				
								default:

									break;
					
								}

							})

						}

					})();

					break;

				default:

					break;
				}

			});

		}
			

	} catch (error) {
		
		console.log('ERROR!!', JSON.stringify(error, null, 2));

	}
	

}


loadData();

