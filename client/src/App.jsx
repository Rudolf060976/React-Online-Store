import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './assets/fontAwesome/library'; // LOADING FONTAWESOME LIBRARY
import './App.scss';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';
import ItemSheet from './pages/ItemSheet/ItemSheet';
import Departments from './components/Departments/Departments';
import CartPage from './pages/CartPage/CartPage';
import { getIsDepartmentOpen, getErrorMessages, getIsLoggedUser, getRedirectGoCart, getRedirectGoLogin } from './redux/selectors';
import { actionsAsyncFetchCategories, actionsAsyncFetchAllSubcategories, actionsAsyncFetchDealsItems, actionsAsyncFetchSeasonItems } from './redux/actions/asyncActions';
import { actionsIUstate } from './redux/actions/actions';
import SubDepartmentPage from './pages/SubDepartmentPage/SubDepartmentPage';

function App({ isDepartmentsOpen, dispatch, getErrorMessage, isUserLogged, getGoCart, getGoLogin, setGoCartTrue, setGoCartFalse, setGoLoginTrue, setGoLoginFalse }) {

	const [load, setLoad] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	
	useEffect(() => {
		
		dispatch(actionsAsyncFetchCategories()).then(() => {
			
			return dispatch(actionsAsyncFetchAllSubcategories());

		}).then(() => {
			
			return dispatch(actionsAsyncFetchDealsItems());
			
		}).then(() => {
			
			dispatch(actionsAsyncFetchSeasonItems());
		
		})
			.catch(err => {
				
				setErrorMessage(getErrorMessage('013') + err.message + getErrorMessage('010'));
				setError(true);
			
			});		

		setLoad(true);

	}, [load]);

	const errorIcon = (<FontAwesomeIcon icon="exclamation-triangle" size="sm" />);

	const ErrorAlert = ({ msg }) => (
		<CSSTransition appear in timeout={300} classNames="header-error-effect">
			<div id="app-error-container">{errorIcon}<span id="app-error-message">{msg}</span> 
			</div>
		</CSSTransition>
	);
	

	const handleCartClick = () => {

		if (isUserLogged) {

			setGoCartTrue();

			setTimeout(() => {
				
				setGoCartFalse();

			}, 500);

		} else {

			setGoLoginTrue();
			

			setTimeout(() => {
				
				setGoLoginFalse();

			}, 500);
		}

	};
	
	return (
		<>
			{ error ? <ErrorAlert msg={errorMessage} /> : null}
			{ getGoLogin ? <Redirect push to="/login" /> : null }
			{ getGoCart ? <Redirect push to="/cart" /> : null }
			<Header handleCartClick={handleCartClick} />
			<div id="max-width-container">
				{isDepartmentsOpen ? <Departments /> : null }
				<div id="app-container">
					<Switch>						
						<Route path="/itemsheet/:itemId">
							<ItemSheet />
						</Route>
						<Route path="/cart">
							<CartPage />
						</Route>
						<Route path="/subdepartment/list/:subdepId">
							<SubDepartmentPage />	
						</Route>						
						<Route path="/" component={Home} />						
					</Switch>
				</div>		
			</div>				
			<Footer />
		</>
	);
}

const mapStateToProps = state => {

	return {
		isDepartmentsOpen: getIsDepartmentOpen(state),
		getErrorMessage: code => getErrorMessages(state)[code],
		isUserLogged: getIsLoggedUser(state),
		getGoCart: getRedirectGoCart(state),
		getGoLogin: getRedirectGoLogin(state)		
	};
};

const mapDispatchToProps = dispatch => {

	return {
		dispatch,
		setGoCartTrue: () => dispatch(actionsIUstate.redirects.cart.true()),
		setGoCartFalse: () => dispatch(actionsIUstate.redirects.cart.false()),
		setGoLoginTrue: () => dispatch(actionsIUstate.redirects.login.true()),
		setGoLoginFalse: () => dispatch(actionsIUstate.redirects.login.false())
	};

};


export default connect(mapStateToProps, mapDispatchToProps)(App);
