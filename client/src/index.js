/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './mainStyles/bootstrapStyles.scss';
import './mainStyles/index.scss';
import theme from './styledComponents/theme';
import App from './App';

const destination = document.getElementById('root');

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Router>
			<App />
		</Router>	
	</ThemeProvider>,	
	destination
);
