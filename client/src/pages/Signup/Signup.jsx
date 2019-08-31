/* eslint object-curly-newline: "off" */
/* eslint react/jsx-indent-props: "off" */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Signup.scss';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/LOGO.png';


const initialValues = {
	username: '',
	password: '',
	firstName: '',
	lastName: ''
};

const handleFormSubmit = (values, options) => {
	
	// eslint-disable-next-line	
	alert(JSON.stringify(values, null, 2));

	// eslint-disable-next-line
	console.log('options: ', JSON.stringify(options, null, 2));
	
};

const schema = yup.object().shape({

	username: yup.string().max(100).required('Username is Required!').email('Username must be a valid email!'),
	password: yup.string().max(50).required('Password is Required'),
	firstName: yup.string().required('First Name is Required!'),
	lastName: yup.string().required('Last Name is Required!')	
});

const errorIcon = (<FontAwesomeIcon icon="exclamation-triangle" size="sm" />);


const ErrorAlert = ({ msg }) => (
	<CSSTransition appear in timeout={500} classNames="signup-form-error-effect">
		<div id="signup-form-error-container">{errorIcon}<span id="signup-form-error-message">{msg}</span> 
		</div>
	</CSSTransition>
);


function Signup() {
		
	return (
		<div id="signup-form-container">
			<div id="signup-form">
				<div id="signup-form-header">
					<img src={logo} alt="" />
					<h6>Create your account to continue</h6>
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
									<div className="signup-form-text-div">
										<p><label htmlFor="signup-username">Username :</label></p>
										<input {...field} autoComplete="off" type="text" className="effect-border-bottom" id="signup-username" autoFocus />
										<span className="focus-effect-border-bottom" />
									</div>
								)}
							</Field>							
							<Field name="password">
								{({ field }) => (
									<div className="signup-form-text-div">
										<p><label htmlFor="signup-password">Password :</label></p>
										<input {...field} autoComplete="off" type="text" className="effect-border-bottom" id="signup-password" />
										<span className="focus-effect-border-bottom" />
									</div>
								)}
							</Field>							
							<Field name="firstName">
								{({ field }) => (
									<div className="signup-form-text-div">
										<p><label htmlFor="signup-firstname">First Name :</label></p>
										<input {...field} autoComplete="off" type="text" className="effect-border-bottom" id="signup-firstname" />
										<span className="focus-effect-border-bottom" />
									</div>
								)}
							</Field>							
							<Field name="lastName">
								{({ field }) => (
									<div className="signup-form-text-div">
										<p><label htmlFor="signup-lastname">Last Name :</label></p>
										<input {...field} autoComplete="off" type="text" className="effect-border-bottom" id="signup-lastname" />
										<span className="focus-effect-border-bottom" />
									</div>
								)}
							</Field>							
							<Button id="signup-form-button" variant="info" size="lg" disabled={isSubmitting} onClick={submitForm} block>{isSubmitting ? 'Loading...' : 'SIGN UP'} </Button>	
						</Form>						
					)}
				</Formik>
				<div id="signup-form-footer">
					<p>By creating an account, I agree to the <Link to="/">Terms of Service</Link>, <Link to="/">Privacy Policy</Link>, and <Link to="/">Cookie Policy</Link></p>
					<p>Already have an account? <Link to="/login">Log in</Link></p>
				</div>
			</div>
		</div>	
	);
	
}

export default Signup;
