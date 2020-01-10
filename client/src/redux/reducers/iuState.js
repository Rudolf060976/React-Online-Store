import { handleActions } from 'redux-actions';
import { actionsIUstate } from '../actions/actions';

import globalInitialState from '../initial-state/initialState';

const { iuState: initialState } = globalInitialState;

const reducer = handleActions({
	[actionsIUstate.departments.open]: (state, action) => {

		return {
			...state,
			departmentsOpen: true
		};

	},
	[actionsIUstate.departments.close]: (state, action) => {

		return {
			...state,
			departmentsOpen: false
		};

	},
	[actionsIUstate.redirects.cart.true]: (state, action) => {

		return {
			...state,
			goCart: true
		};

	},
	[actionsIUstate.redirects.cart.false]: (state, action) => {

		return {
			...state,
			goCart: false
		};


	},
	[actionsIUstate.redirects.login.true]: (state, action) => {

		return {
			...state,
			goLogin: true
		};


	},
	[actionsIUstate.redirects.login.false]: (state, action) => {

		return {
			...state,
			goLogin: false
		};

	}
},
initialState	
);

export default reducer;
