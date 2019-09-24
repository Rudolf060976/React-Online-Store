/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable'; // ** THIS 2 LINES ARE NEEDED FOR PROMISES AND ASYNC FUNCTIONS
import 'regenerator-runtime/runtime'; // AND OTHER JAVASCRIPT NEW FEATURES
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './mainStyles/bootstrapStyles.scss';
import './mainStyles/index.scss';
import theme from './styledComponents/theme';
import App from './App';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import store from './redux/store';
import SignupValidation from './pages/Signup/SignupValidation';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ChangePassword from './pages/ChangePassword/ChangePassword';

const destination = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/login/forgotpassword" component={ForgotPassword} />
					<Route exact path="/users/resetpassword" component={ResetPassword} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/users/validate" component={SignupValidation} />
					<Route component={App} />
				</Switch>			
			</Router>	
		</ThemeProvider>
	</Provider>,	
	destination
);
