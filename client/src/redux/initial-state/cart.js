const cart = {

	isFetching: false,
	error: false,
	errorMessage: null,
	allIDs: [],
	byId: {},
	images: {
		allIDs: [],
		byId: {}
	},
	count: null,
	subtotal: null,
	tax: null,
	total: null
};

export default cart;
