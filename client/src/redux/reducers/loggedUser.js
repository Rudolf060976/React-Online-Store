import { handleActions } from 'redux-actions';
import { actionsUser } from '../actions/actions';

import globalInitialState from '../initial-state/initialState';

const { loggedUser: initialState } = globalInitialState;

const reducer = handleActions({

	[actionsUser.userLogin]: (state, action) => {

		return {
			isLogged: true,
			userProfile: action.payload.user
		};

	},
	[actionsUser.userLogout]: (state, action) => {

		return {
			isLogged: false,
			userProfile: {}
		};

	}
},
initialState
);

export default reducer;
