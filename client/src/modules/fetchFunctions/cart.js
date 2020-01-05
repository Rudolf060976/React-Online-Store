import Config from '../../../config';

const apiUrl = Config.URL.apiURL;


const fetchGetCartItems = async (userId) => {

	const path = Config.ROUTES.CART.GET_CartItems(userId);

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

const fetchGetCartTotals = async (userId) => {

	const path = Config.ROUTES.CART.GET_CartTotals(userId);

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

const fetchPostCartItem = async (userId, itemId, qty) => {

	const path = Config.ROUTES.CART.POST_CartItem;

	const data = {
		userId,
		itemId,
		qty
	};

	const options = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		body: JSON.stringify(data)
	};

	const response = await fetch(apiUrl + path, options);

	return await response.json();

};

const fetchPutCartItem = async (lineId, qty) => {

	const path = Config.ROUTES.CART.PUT_CartItem(lineId);

	const data = {
		qty
	};

	const options = {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		body: JSON.stringify(data)
	};

	const response = await fetch(apiUrl + path, options);

	return await response.json();

};


const fetchDeleteCartItem = async lineId => {

	const path = Config.ROUTES.CART.DELETE_CartItem(lineId);

	const options = {
		method: 'DELETE',
		credentials: 'include',
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);

	return await response.json();

};


export {
	fetchGetCartItems,
	fetchGetCartTotals,
	fetchPostCartItem,
	fetchPutCartItem,
	fetchDeleteCartItem
}