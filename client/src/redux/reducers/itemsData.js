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

	}

},
initialState
);


export default reducer;
