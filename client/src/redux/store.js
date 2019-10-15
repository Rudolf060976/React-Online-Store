import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loggedUser from './reducers/loggedUser';
import errorMessages from './reducers/errorMessages';
import iuState from './reducers/iuState';
import itemsData from './reducers/itemsData';

const rootReducer = combineReducers({
	loggedUser,
	errorMessages,
	iuState,
	itemsData
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
