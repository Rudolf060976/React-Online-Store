/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './mainStyles/bootstrapStyles.scss';
import './mainStyles/index.scss';
import theme from './styledComponents/theme';
import App from './App';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const destination = document.getElementById('root');

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Router>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route component={App} />
			</Switch>			
		</Router>	
	</ThemeProvider>,	
	destination
);
