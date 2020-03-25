import { handleActions } from 'redux-actions';
import { actionsCart } from '../actions/actions';

import globalInitialState from '../initial-state/initialState';

const { cart: initialState } = globalInitialState;


const reducer = handleActions({
	[actionsCart.fetch]: (state, action) => {

		return {
			isFetching: true,
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

	},
	[actionsCart.fetchSuccess]: (state, action) => {

		const { payload: { docs, images, totals } } = action;

		const allIDs = docs.map(item => item._id);

		const byId = docs.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: item
			};

		}, {});

		const imagesAllIDs = images.map(item => item._id);

		const imagesById = images.reduce((acc, item) => {

			return {
				...acc,
				[item._id]: item
			};

		}, {});
		
		
		const { count, subtotal, tax, total } = totals;

		return {		
			isFetching: false,
			error: false,
			errorMessage: null,
			allIDs,
			byId,
			images: {
				allIDs: imagesAllIDs,
				byId: imagesById
			},
			count,
			subtotal,
			tax,
			total
		};

	},
	[actionsCart.fetchFailure]: (state, action) => {

		const { payload: { errorMessage } } = action;

		return {
			isFetching: false,
			error: true,
			errorMessage,
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

	}
	
}, initialState);

export default reducer;
