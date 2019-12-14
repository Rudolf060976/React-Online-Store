import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './assets/fontAwesome/library'; // LOADING FONTAWESOME LIBRARY
import './App.scss';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';
import Departments from './components/Departments/Departments';
import { getIsDepartmentOpen, getErrorMessages } from './redux/selectors';
import { actionsAsyncFetchCategories, actionsAsyncFetchAllSubcategories, actionsAsyncFetchDealsItems, actionsAsyncFetchSeasonItems } from './redux/actions/asyncActions';

function App({ isDepartmentsOpen, dispatch, getErrorMessage }) {

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

	return (
		<>
			{ error ? <ErrorAlert msg={errorMessage} /> : null}
			<Header />
			<div id="max-width-container">
				{isDepartmentsOpen ? <Departments /> : null }
				<div id="app-container">
					<Switch>
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
		getErrorMessage: code => getErrorMessages(state)[code]		
	};
};


export default connect(mapStateToProps, null)(App);
