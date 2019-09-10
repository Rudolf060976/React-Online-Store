import Config from '../../../config';

const apiUrl = Config.apiURL;

const fetchGetAllCategories = async () => {
	

	const path = Config.ROUTES.CATEGORIES.GET_AllCategories;

	const options = {
		method: 'GET',
		credentials: 'omit',
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
		credentials: 'omit',
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
	fetchGetAllSubCategoriesByCategoryId
};
