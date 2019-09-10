
const usersData = {

	userOrders: {
		isFetching: false,
		error: false,
		errorMessage: '',
		orders: {
			allIDs: [],
			byId: {}
		}
	},
	ordersItems: {
		isFetching: false,
		error: false,
		errorMessage: '',
		items: {
			allIDs: [],
			byId: {}
		}
	},
	lastSearches: {
		isFetching: false,
		error: false,
		errorMessage: '',
		items: {
			allIDs: [],
			byId: {}
		}
	},
	lastViewed: {
		isFetching: false,
		error: false,
		errorMessage: '',
		items: {
			allIDs: [],
			byId: {}
		}
	}

};

export default usersData;
