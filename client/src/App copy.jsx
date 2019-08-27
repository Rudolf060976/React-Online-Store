import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Rooms from './pages/Rooms/Rooms';
import ErrorPage from './pages/Error/Error';
import SingleRoom from './pages/Rooms/SingleRoom/SingleRoom';
import Navbar from './components/layout/Navbar/Navbar';

function App() {

	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/rooms" component={Rooms} />
				<Route path="/rooms/:slug" component={SingleRoom} />
				<Route component={ErrorPage} />			
			</Switch>
		</>
	);

}

export default App;
