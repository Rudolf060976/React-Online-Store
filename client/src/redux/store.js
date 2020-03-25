import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loggedUser from './reducers/loggedUser';
import errorMessages from './reducers/errorMessages';
import iuState from './reducers/iuState';
import itemsData from './reducers/itemsData';
import cart from './reducers/cart';

const rootReducer = combineReducers({
	loggedUser,
	errorMessages,
	iuState,
	itemsData,
	cart
});

//const unsubscribe = store.subscribe(() => console.log('STORE:', JSON.stringify(store.getState(), null, 2));

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
