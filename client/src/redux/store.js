import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loggedUser from './reducers/loggedUser';
import errorMessages from './reducers/errorMessages';

const rootReducer = combineReducers({
	loggedUser,
	errorMessages
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
