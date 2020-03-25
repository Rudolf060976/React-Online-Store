const itemsData = {

	categories: {
		isFetching: false,
		error: false,
		errorMessage: '',
		allIDs: [],
		byId: {},
		images: {
			allIDs: [],
			byId: {}
		}
	},
	subcategories: {
		isFetching: false,
		error: false,
		errorMessage: '',
		allIDs: [],
		byId: {},
		images: {
			allIDs: [],
			byId: {}
		}
	},
	dealsItems: {
		isFetching: false,
		error: false,
		errorMessage: '',
		allIDs: [],
		byId: {},
		images: {
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
		allIDs: [],
		byId: {},
		images: {
			allIDs: [],
			byId: {}
		}		
	},
	filteredItems: {
		isFetching: false,
		error: false,
		errorMessage: null,
		items: {
			allIDs: [],
			byId: {}
		},
		images: {
			allIDs: [],
			byId: {}
		},		
		filter: {}
	},
	selectedItem: {
		isFetching: false,
		error: false,
		errorMessage: '',
		item: {},
		images: {
			allIDs: [],
			byId: {}
		}		
	}

};

export default itemsData;
