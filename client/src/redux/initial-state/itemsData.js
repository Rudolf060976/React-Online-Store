const itemsData = {

	categories: {
		isFetching: false,
		error: false,
		errorMessage: '',
		allIDs: [],
		byId: {}

	},
	subcategories: {
		isFetching: false,
		error: false,
		errorMessage: '',
		allIDs: [],
		byId: {}
	},
	dealsItems: {
		isFetching: false,
		error: false,
		errorMessage: '',
		items: {
			allIDs: [],
			byId: {}
		}
	},
	bestSellerItems: {
		isFetching: false,
		error: false,
		errorMessage: '',
		items: {
			allIDs: [],
			byId: {}
		}
	},
	mustHaveItems: {
		isFetching: false,
		error: false,
		errorMessage: '',
		items: {
			allIDs: [],
			byId: {}
		}
	},
	seasonItems: {
		isFetching: false,
		error: false,
		errorMessage: '',
		items: {
			allIDs: [],
			byId: {}
		}
	},
	filteredItems: {
		isFetching: false,
		error: false,
		errorMessage: '',
		items: {
			allIDs: [],
			byId: {}
		},
		filter: {}
	}

};

export default itemsData;
