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

//  ********* DEALS ITEMS SELECTORS **********************

export const getIsDealsFetching = state => {

	return state.itemsData.dealsItems.isFetching;

};

export const getDealsItems = state => {

	const Items = state.itemsData.dealsItems;
	
	const { allIDs } = Items;

	const { byId } = Items;

	const outputArray = [];

	for (let i = 0; i < allIDs.length; i++) {

		const item = byId[allIDs[i]];

		outputArray.push(item);
	}
	
	return outputArray;

};

export const getDealsItemImages = (state, itemId) => {

	const Items = state.itemsData.dealsItems;

	const itemObject = Items.byId[itemId];

	const imagesArray = itemObject.images;

	const allImagesObject = Items.images.byId;

	const outputArray = [];

	for (let i = 0; i < imagesArray.length; i++) {

		const item = allImagesObject[imagesArray[i]];

		outputArray.push(item);

	}

	return outputArray;

};

// ************* SEASON ITEMS SELECTORS *******************

export const getIsSeasonFetching = state => {

	return state.itemsData.seasonItems.isFetching;

};

export const getSeasonItems = state => {

	const Items = state.itemsData.seasonItems;

	const { allIDs } = Items;

	const { byId } = Items;

	const outputArray = [];

	for (let i = 0; i < allIDs.length; i++) {

		const item = byId[allIDs[i]];

		outputArray.push(item);

	}

	return outputArray;

};

export const getSeasonItemImages = (state, itemId) => {

	const Items = state.itemsData.seasonItems;

	const itemObject = Items.byId[itemId];

	const imagesArray = itemObject.images;

	const allImagesObject = Items.images.byId;

	const outputArray = [];

	for (let i = 0; i < imagesArray.length; i++) {
		
		const image = allImagesObject[imagesArray[i]];

		outputArray.push(image);
	}

	return outputArray;

};


// ************* selectedItem SELECTORS *******************

export const getIsSelectedItemFetching = state => {

	return state.itemsData.selectedItem.isFetching;

};

export const getIsSelectedItemError = state => {

	return state.itemsData.selectedItem.error;

};

export const getSelectedItemErrorMessage = state => {

	return state.itemsData.selectedItem.errorMessage;

};

export const getSelectedItem = state => {

	return state.itemsData.selectedItem.item;

};

export const getSelectedItemImages = state => {

	const imagesArrayIDs = state.itemsData.selectedItem.images.allIDs;

	const imagesById = state.itemsData.selectedItem.images.byId;

	const outputArray = [];

	for (let i = 0; i < imagesArrayIDs.length; i++) {

		const image = imagesById[imagesArrayIDs[i]];

		outputArray.push(image);

	}

	return outputArray;

};

// ************* CART Selectors ***********************

export const getIsCartFetching = state => {

	return state.cart.isFetching;

};

export const getIsCartError = state => {

	return state.cart.error;

};

export const getCartErrorMessage = state => {

	return state.cart.errorMessage;

};

export const getCartLines = state => {

	const { allIDs } = state.cart;

	const { byId } = state.cart;

	const outputArray = [];

	for (let i = 0; i < allIDs.length; i++) {

		const line = byId[allIDs[i]];

		outputArray.push(line);

	}

	return outputArray;

};

export const getCartItemImages = (state, itemId) => {

	if (getCartLines(state).length > 0) {
		
		const LineItemObject = getCartLines(state).find(line => line.item[0]._id === itemId);
		
		const imagesArray = LineItemObject.item[0].images;

		const allImagesObject = state.cart.images.byId;

		const outputArray = [];

		for (let i = 0; i < imagesArray.length; i++) {

			const item = allImagesObject[imagesArray[i]];

			outputArray.push(item);

		}

		return outputArray;

	}

	return [];


};


export const getCartTotals = state => {
	
	const { count, subtotal, tax, total } = state.cart;
	
	return {
		count,
		subtotal,
		tax,
		total
	};
};


export const getRedirectGoCart = state => state.iuState.goCart;

export const getRedirectGoLogin = state => state.iuState.goLogin;
