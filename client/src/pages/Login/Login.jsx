/* eslint object-curly-newline: "off" */
/* eslint react/jsx-indent-props: "off" */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Login.scss';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/LOGO.png';


const initialValues = {
	username: '',
	password: ''	
};

const handleFormSubmit = (values, options) => {
	
	// eslint-disable-next-line	
	alert(JSON.stringify(values, null, 2));

	// eslint-disable-next-line
	console.log('options: ', JSON.stringify(options, null, 2));
	
};

const schema = yup.object().shape({

	username: yup.string().max(100).required('Username is Required!').email('Username must be a valid email!'),
	password: yup.string().max(50).required('Password is Required')	
});

const errorIcon = (<FontAwesomeIcon icon="exclamation-triangle" size="sm" />);


const ErrorAlert = ({ msg }) => (
	<CSSTransition appear in timeout={500} classNames="login-form-error-effect">
		<div id="login-form-error-container">{errorIcon}<span id="login-form-error-message">{msg}</span> 
		</div>
	</CSSTransition>
);


function Login() {
		
	return (
		<div id="login-form-container">
			<div id="login-form">
				<div id="login-form-header">
					<img src={logo} alt="" />
					<h6>Log in to your account</h6>
				</div>
				<Formik 
					initialValues={initialValues} 
					onSubmit={(values, options) => {
						setTimeout(() => {

							handleFormSubmit(values, options);

							options.setSubmitting(false);

						}, 500);

					}}						
					validationSchema={schema}
					validateOnBlur={false}
					validateOnChange={false}
				>
					{({ values, errors, isSubmitting, submitForm }) => (						
						<Form method="get" action="form">
							{Object.keys(errors).length > 0 ? (<ErrorAlert msg={errors[Object.keys(errors)[0]]} />) : null }							
							<Field name="username">
								{({ field }) => (
									<div className="login-form-text-div">
										<p><label htmlFor="login-username">Username :</label></p>
										<input {...field} autoComplete="off" type="text" className="effect-border-bottom" id="login-username" autoFocus />
										<span className="focus-effect-border-bottom" />
									</div>
								)}
							</Field>							
							<Field name="password">
								{({ field }) => (
									<div className="login-form-text-div">
										<p><label htmlFor="login-password">Password :</label></p>
										<input {...field} autoComplete="off" type="text" className="effect-border-bottom" id="login-password" />
										<span className="focus-effect-border-bottom" />
									</div>
								)}
							</Field>								
							<Button id="login-form-button" variant="info" size="lg" disabled={isSubmitting} onClick={submitForm} block>{isSubmitting ? 'Loading...' : 'LOG IN'} </Button>	
						</Form>						
					)}
				</Formik>
				<div id="login-form-footer">
					<p><Link to="/">Forgot your password?</Link></p>
					<p>Don&apos;t have an account? <Link to="/signup">Sign In</Link></p>
				</div>
			</div>
		</div>	
	);
	
}

export default Login;
