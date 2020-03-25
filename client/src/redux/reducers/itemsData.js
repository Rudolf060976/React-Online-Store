import { handleActions } from 'redux-actions';
import { actionsItemsData } from '../actions/actions';

import globalInitialState from '../initial-state/initialState';

const { itemsData: initialState } = globalInitialState;

const reducer = handleActions({

	[actionsItemsData.categories.fetch]: (state, action) => {

		return {
			...state,
			categories: {
				isFetching: true,
				error: false,
				errorMessage: null,
				allIDs: [],
				byId: {}
			}
		};

	},
	[actionsItemsData.categories.fetchSuccess]: (state, action) => {

		/*  
		images = [
			{
				_id: xxxxxxx,
				imageUrl: xcxccxxxcc
			},
			{
				_id: xxxxxxxx,
				imageUrl: wfasdfasdf
			}
		]
		*/
		const { payload: { docs, images } } = action;
		
		const allIDs = docs.map(item => (
			item._id			
		));
		
		const byId = docs.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: {
					...item
				}
			};

		}, {});

		const imagesAllIDs = images.map(item => (
			item._id
		));

		const imagesById = images.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: {
					...item
				}
			};
		}, {});
		
			
		return {
			...state,
			categories: {
				isFetching: false,
				error: false,
				errorMessage: null,
				allIDs,
				byId,
				images: {
					allIDs: imagesAllIDs,
					byId: imagesById
				}
			}
		};

	},
	[actionsItemsData.categories.fetchFailure]: (state, action) => {

		const { payload: { errorMessage } } = action;

		return {
			...state,
			categories: {
				isFetching: false,
				error: true,
				errorMessage,
				allIDs: [],
				byId: {}
			}
		};

	},
	[actionsItemsData.subcategories.fetch]: (state, action) => {

		return {
			...state,
			subcategories: {
				isFetching: true,
				error: false,
				errorMessage: null,
				allIDs: [],
				byId: {}
			}
		};

	},
	[actionsItemsData.subcategories.fetchSuccess]: (state, action) => {

		const { payload: { docs, images } } = action;

		const allIDs = docs.map(item => (
			item._id			
		));

		const byId = docs.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: {
					...item
				}
			};

		}, {});

		const imagesAllIDs = images.map(item => (
			item._id
		));

		const imagesById = images.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: {
					...item
				}
			};
		}, {});

		return {
			...state,
			subcategories: {
				isFetching: false,
				error: false,
				errorMessage: null,
				allIDs,
				byId,
				images: {
					allIDs: imagesAllIDs,
					byId: imagesById
				}
			}
		};

	},
	[actionsItemsData.subcategories.fetchFailure]: (state, action) => {

		const { payload: { errorMessage } } = action;

		return {
			...state,
			subcategories: {
				isFetching: false,
				error: true,
				errorMessage,
				allIDs: [],
				byId: {}
			}
		};

	},
	[actionsItemsData.dealsItems.fetch]: (state, action) => {

		return {
			...state,
			dealsItems: {
				isFetching: true,
				error: false,
				errorMessage: null,
				allIDs: [],
				byId: {},
				images: {
					allIDs: [],
					byId: {}
				}		
			}
		};
	},
	[actionsItemsData.dealsItems.fetchSuccess]: (state, action) => {

		const { payload: { docs, images } } = action;

		const allIDs = docs.map(item => (
			item._id			
		));
		
		const byId = docs.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: {
					...item
				}
			};

		}, {});

		const imagesAllIDs = images.map(item => (
			item._id
		));

		const imagesById = images.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: {
					...item
				}
			};
		}, {});


		return {
			...state,
			dealsItems: {
				isFetching: false,
				error: false,
				errorMessage: null,
				allIDs,
				byId,
				images: {
					allIDs: imagesAllIDs,
					byId: imagesById
				}		
			}
		};

	},
	[actionsItemsData.dealsItems.fetchFailure]: (state, action) => {

		const { payload: { errorMessage } } = action;

		return {
			...state,
			dealsItems: {
				isFetching: false,
				error: true,
				errorMessage,
				allIDs: [],
				byId: {},
				images: {
					allIDs: [],
					byId: {}
				}		
			}
		};

	},
	[actionsItemsData.seasonItems.fetch]: (state, action) => {

		return {
			...state,
			seasonItems: {
				isFetching: true,
				error: false,
				errorMessage: null,
				allIDs: [],
				byId: {},
				images: {
					allIDs: [],
					byId: {}
				}		
			}
		};
	},
	[actionsItemsData.seasonItems.fetchSuccess]: (state, action) => {

		const { payload: { docs, images } } = action;

		const allIDs = docs.map(item => (
			item._id			
		));
		
		const byId = docs.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: {
					...item
				}
			};

		}, {});

		const imagesAllIDs = images.map(item => (
			item._id
		));

		const imagesById = images.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: {
					...item
				}
			};
		}, {});


		return {
			...state,
			seasonItems: {
				isFetching: false,
				error: false,
				errorMessage: null,
				allIDs,
				byId,
				images: {
					allIDs: imagesAllIDs,
					byId: imagesById
				}		
			}
		};

	},
	[actionsItemsData.seasonItems.fetchFailure]: (state, action) => {

		const { payload: { errorMessage } } = action;

		return {
			...state,
			seasonItems: {
				isFetching: false,
				error: true,
				errorMessage,
				allIDs: [],
				byId: {},
				images: {
					allIDs: [],
					byId: {}
				}		
			}
		};

	},
	[actionsItemsData.selectedItem.fetch]: (state, action) => {

		return {
			...state,
			selectedItem: {
				isFetching: true,
				error: false,
				errorMessage: null,
				item: {},
				images: {
					allIDs: [],
					byId: {}
				}
			}
		};

	},
	[actionsItemsData.selectedItem.fetchSuccess]: (state, action) => {

		const { payload: { item, images } } = action;

		const imagesAllIDs = images.map(imgObject => (imgObject._id));

		const imagesById = images.reduce((acc, img) => {

			return {
				...acc,
				[img._id]: {
					...img
				}
			};

		}, {});

		return {
			...state,
			selectedItem: {
				isFetching: false,
				error: false,
				errorMessage: null,
				item,
				images: {
					allIDs: imagesAllIDs,
					byId: imagesById
				}
			}
		};


	},
	[actionsItemsData.selectedItem.fetchFailure]: (state, action) => {

		const { payload: { errorMessage } } = action;

		return {
			...state,
			selectedItem: {
				isFetching: false,
				error: true,
				errorMessage,
				item: {},
				images: {
					allIDs: [],
					byId: {}
				}
			}

		};

	},
	[actionsItemsData.filteredItems.fetch]: (state, action) => {

		return {
			...state,
			filteredItems: {
				isFetching: true,
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
			}
		};
	},
	[actionsItemsData.filteredItems.fetchSuccess]: (state, action) => {

		const { payload: { filter, docs, images } } = action;

		const allIDs = docs.map(item => item._id);

		const byId = docs.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: item
			};

		}, {});

		const imagesAllIDs = images.map(item => (
			item._id
		));

		const imagesById = images.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: item
			};
		}, {});

		return {
			...state,
			filteredItems: {
				isFetching: false,
				error: false,
				errorMessage: null,
				items: {
					allIDs,
					byId
				},
				images: {
					allIDs: imagesAllIDs,
					byId: imagesById
				},
				filter 
			}
		};

	},
	[actionsItemsData.filteredItems.fetchFailure]: (state, action) => {

		const { payload: { errorMessage } } = action;

		return {
			...state,
			filteredItems: {
				isFetching: false,
				error: true,
				errorMessage,
				items: {
					allIDs: [],
					byId: {}
				},
				images: {
					allIDs: [],
					byId: {}
				},
				filter: {}
			}
		};
	},

},
initialState
);


export default reducer;
