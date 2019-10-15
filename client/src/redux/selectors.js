// import { createSelector } from 'reselect';

// ***** USERS ***********

export const getIsLoggedUser = state => {

	return state.loggedUser.isLogged;

};

export const getUserProfile = state => {

	return state.loggedUser.userProfile;

};

export const getErrorMessages = state => {
	return state.errorMessages;
};

export const getIsDepartmentOpen = state => {
	return state.iuState.departmentsOpen;
};

export const getAllCategories = state => {
	
	const cat = state.itemsData.categories;
	
	const catAllIDs = cat.allIDs;
	const catById = cat.byId;

	const outputArray = [];
	
	for (let i = 0; i < catAllIDs.length; i++) {

		const item = catById[catAllIDs[i]];
		
		outputArray.push(item);

	}

	return outputArray;


};

export const getCategoryById = (state, categoryId) => {
	
	const cat = state.itemsData.categories;

	return cat.byId[categoryId];

};

export const getAllSubcategories = state => {
	
	const subcat = state.itemsData.subcategories;

	const subcatAllIDs = subcat.allIDs;
	const subcatById = subcat.byId;

	const outputArray = [];
	
	for (let i = 0; i < subcatAllIDs.length; i++) {

		const item = subcatById[subcatAllIDs[i]];

		outputArray.push(item);
		
	}

	return outputArray;

};


export const getSubcategoriesByCategoryId = (state, categoryId) => {
	
	const subcat = state.itemsData.subcategories;

	const subcatAllIDs = subcat.allIDs;
	const subcatById = subcat.byId;

	const outputArray = [];
	
	for (let i = 0; i < subcatAllIDs.length; i++) {

		const item = subcatById[subcatAllIDs[i]];
		

		if	(item.category._id === categoryId) {
			outputArray.push(item);
		}

	}

	return outputArray;

};

export const getCategoryImages = (state, categoryId) => {
	
	const cat = state.itemsData.categories;
	
	const categoryObject = cat.byId[categoryId];
	
	const imagesArray = categoryObject.images;
	
	const allImagesObject = cat.images.byId;
	
	const outputArray = [];
	
	for (let i = 0; i < imagesArray.length; i++) {

		outputArray.push(allImagesObject[imagesArray[i]]);
	}

	return outputArray;

};
