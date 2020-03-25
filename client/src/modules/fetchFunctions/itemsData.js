import axios from 'axios';
import Config from '../../../config';

const { apiURL } = Config.URL;

const { ItemsResultsLimitByDefault } = Config.APP;

/*

- The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if
anything prevented the request from completing.

- fetch() won't receive cross-site cookies; you can’t establish a cross site session using fetch. Set-Cookie headers
from other sites are silently ignored.

- fetch won’t send cookies, unless you set the credentials init option. (Since Aug 25, 2017. The spec changed the
default credentials policy to same-origin. Firefox changed since 61.0b13.)

*/

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
	
	const response = await fetch(apiURL + path, options);		
	
	if (response.ok) {
	
		return await response.json();

	}
	
	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);
	

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

	const response = await fetch(apiURL + path, options);		
	
	if (response.ok) {

		return await response.blob();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);

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

	const response = await fetch(apiURL + path, options);		
		
	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);

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
	const response = await fetch(apiURL + path, options);		
		
	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);


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

	const response = await fetch(apiURL + path, options);		
		
	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);


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

	const response = await fetch(apiURL + path, options);

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

	const response3 = await fetch(apiURL + path, options);

	if (response3.ok) {

		return await response3.json();

	}

	throw new Error(`Error status: ${response3.status}. There was a problem fetching data.`);


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

	const response = await fetch(apiURL + path, options);

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

	const response3 = await fetch(apiURL + path, options);

	if (response3.ok) {

		return await response3.json();

	}

	throw new Error(`Error status: ${response3.status}. There was a problem fetching data.`);


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

	const response = await fetch(apiURL + path, options);

	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);


};

const fetchGetItemsByFilter = async (filter, page, sort) => {

	const limit = ItemsResultsLimitByDefault;
		
	const path = Config.ROUTES.ITEMS.GET_ItemsByFilter(filter, page, limit, sort);

	const options = {
		url: apiURL + path,
		method: 'GET',
		/* params: {
			page,
			limit,
			sort
		}, */
		responseType: 'json',
		withCredentials: false
	};
	
	return await axios(options);

};

export {
	fetchGetAllCategories,
	fetchGetAllSubCategoriesByCategoryId,
	fetchGetAllSubCategories,
	fetchGetImage,
	fetchGetManyImages,
	fetchGetDealsItems,
	fetchGetSeasonItems,
	fetchGetSelectedItem,
	fetchGetItemsByFilter
};
