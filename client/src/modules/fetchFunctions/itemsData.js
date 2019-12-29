import Config from '../../../config';

const apiUrl = Config.URL.apiURL;

const fetchGetAllCategories = async () => {
	

	const path = Config.ROUTES.CATEGORIES.GET_AllCategories;

	const options = {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);		
		
	return await response.json();

};

const fetchGetImage = async (imageId) => {
	

	const path = Config.ROUTES.CATEGORIES.GET_Image(imageId);

	const options = {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);		
		
	return await response.blob();

};

const fetchGetManyImages = async (ids) => {
	
	const query = {

		filter: JSON.stringify({ ids })

	};

	const qs = new URLSearchParams(query).toString();


	const path = Config.ROUTES.CATEGORIES.GET_Many_Images(qs);

	const options = {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);		
		
	return await response.json();

};


const fetchGetAllSubCategories = async () => {
	
	const path = Config.ROUTES.CATEGORIES.GET_AllSubcategories();

	const options = {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};
	const response = await fetch(apiUrl + path, options);		
		
	return await response.json();

};

const fetchGetAllSubCategoriesByCategoryId = async (categoryId) => {
	
	const path = Config.ROUTES.CATEGORIES.GET_Subcategories(categoryId);

	const options = {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);		
		
	return await response.json();

};

const fetchGetDealsItems = async () => {

	let path = Config.ROUTES.ITEMS.GET_ItemSpecials();

	const options = {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);

	const response2 = await response.json();

	const specialsObj = response2.data.specials[0];

	const { dealOfTheDayItems: dealsItems } = specialsObj;

	const query = {
		filter: JSON.stringify({
			ids: dealsItems
		})
	};

	const qs = new URLSearchParams(query).toString();

	path = Config.ROUTES.ITEMS.GET_Many_Items(qs);

	const response3 = await fetch(apiUrl + path, options);

	return await response3.json();

};


const fetchGetSeasonItems = async () => {

	let path = Config.ROUTES.ITEMS.GET_ItemSpecials();

	const options = {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);

	const response2 = await response.json();

	const specialsObj = response2.data.specials[0];

	const { seasonDealItems: seasonItems } = specialsObj;

	const query = {
		filter: JSON.stringify({
			ids: seasonItems
		})
	};

	const qs = new URLSearchParams(query).toString();

	path = Config.ROUTES.ITEMS.GET_Many_Items(qs);

	const response3 = await fetch(apiUrl + path, options);

	return await response3.json();

};


const fetchGetSelectedItem = async (itemId) => {

	const path = Config.ROUTES.ITEMS.GET_ItemById(itemId);

	const options = {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);

	return await response.json();

};


export {
	fetchGetAllCategories,
	fetchGetAllSubCategoriesByCategoryId,
	fetchGetAllSubCategories,
	fetchGetImage,
	fetchGetManyImages,
	fetchGetDealsItems,
	fetchGetSeasonItems,
	fetchGetSelectedItem
};
