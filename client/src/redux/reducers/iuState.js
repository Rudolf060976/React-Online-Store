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

	}
},
initialState	
);

export default reducer;
