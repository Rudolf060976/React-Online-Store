import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './assets/fontAwesome/library'; // LOADING FONTAWESOME LIBRARY
import './App.scss';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';
import Departments from './components/Departments/Departments';
import { getIsDepartmentOpen } from './redux/selectors';

function App({ isDepartmentsOpen }) {

	return (
		<>
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
		isDepartmentsOpen: getIsDepartmentOpen(state)
	};
};

export default connect(mapStateToProps)(App);
