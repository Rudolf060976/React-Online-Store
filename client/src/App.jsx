import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './assets/fontAwesome/library'; // LOADING FONTAWESOME LIBRARY
import './App.scss';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';


function App() {
	return (
		<>
			<Header />
			<div id="app-container">
				<Switch>
					<Route path="/" component={Home} />
				</Switch>
			</div>			
			<Footer />
		</>
	);
}

export default App;
