/* eslint object-curly-newline: "off" */
/* eslint react/jsx-indent-props: "off" */
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import './Signup.scss';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/LOGO.png';
import { fetchPostRegisterUser } from '../../modules/fetchFunctions/users';
import { getErrorMessages } from '../../redux/selectors';
import EmailNotification from '../../components/EmailNotification/EmailNotification';
import checkedImage from '../../assets/images/checkedIcon.svg';

const initialValues = {
	username: '',
	password: '',
	firstName: '',
	lastName: ''
};

const handleFormSubmit = (values, options, setError, setErrorMessage, getErrorMessage, setSuccess, setNotificationTitle, setNotificationContent) => {
			
	const { username, password, firstName, lastName } = values;
	
	const NotificationTitle = 'Sign-up Complete. Please check your Email';
	const NotificationContent = (<>Thank you for signing up. We have sent an email to  <span className="content-different">{username}</span>  so that you can verify your account. Please check your email inbox for instructions on how to proceed.</>);
				
	fetchPostRegisterUser(username, password, firstName, lastName, username).then(response => {
		
		if (response.ok) {
			setNotificationTitle(NotificationTitle);
			setNotificationContent(NotificationContent);
			setSuccess(true);
					
		} else {
				
			if (response.status === 409) {
				
				setError(true);
				return setErrorMessage(getErrorMessage('001'));	
			} 

			setError(true);
			setErrorMessage(response.message);			
		}

	}).catch(error => {
		setError(true);		
		setErrorMessage(error.message);			

	});
	
};

const schema = yup.object().shape({

	username: yup.string().max(70, 'Email cannot exceed 70 characters!').required('Email is Required!').email('Email must be a valid email!'),
	password: yup.string().max(20, 'Password cannot exceed 20 characters!').required('Password is Required'),
	firstName: yup.string().max(50, 'First Name cannot exceed 50 characters').required('First Name is Required!'),
	lastName: yup.string().max(50, 'Last Name cannot exceed 50 characters').required('Last Name is Required!')	
});

const errorIcon = (<FontAwesomeIcon icon="exclamation-triangle" size="sm" />);


const ErrorAlert = ({ msg }) => (
	<CSSTransition appear in timeout={500} classNames="signup-form-error-effect">
		<div id="signup-form-error-container">{errorIcon}<span id="signup-form-error-message">{msg}</span> 
		</div>
	</CSSTransition>
);

const eyeIcon = (visible, handleClick) => {

	if (visible) {
		// eslint-disable-next-line
		return (<button type="button" className="resetpsw-form-eye-button" onClick={handleClick}><FontAwesomeIcon icon="eye" size="lg" /></button>);
		// eslint-disable-next-line
	} else {
		// eslint-disable-next-line
		return (<button type="button" className="resetpsw-form-eye-button" onClick={handleClick}><FontAwesomeIcon icon="eye-slash" size="lg" /></button>);
	}

};

function Signup({ getErrorMessage }) {


	const [responseError, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [success, setSuccess] = useState(false);
	const [notificationTitle, setNotificationTitle] = useState(null);
	const [notificationContent, setNotificationContent] = useState(null);
	const [pswVisible, setPswVisible] = useState(false);
	const [psw1Type, setPsw1Type] = useState('password');

	const handleEyeClick = (e) => {

		if (pswVisible) {

			setPswVisible(false);
			setPsw1Type('password');
			
		} else {

			setPswVisible(true);
			setPsw1Type('text');
			
			setTimeout(() => {
				
				setPswVisible(false);
				setPsw1Type('password');
				
			}, 1000);


		}

	};
			
	return (	
		<>
			{ success ? <EmailNotification image={checkedImage} title={notificationTitle} content={notificationContent} buttonTitle="Done" linkPath="/" /> : (
				<div id="signup-form-container">
					<div id="signup-form">
						<div id="signup-form-header">
							<img src={logo} alt="" />
							<h6>Create your account to continue</h6>
						</div>
						{responseError ? <ErrorAlert msg={errorMessage} /> : null}
						<Formik 
							initialValues={initialValues} 
							onSubmit={(values, options) => {
								setTimeout(() => {

									handleFormSubmit(values, options, setError, setErrorMessage, getErrorMessage, setSuccess, setNotificationTitle, setNotificationContent);

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
												<p><label htmlFor="signup-username">Email :</label></p>
												<input {...field} autoComplete="off" type="text" className="effect-border-bottom" id="signup-username" autoFocus />
												<span className="focus-effect-border-bottom" />
											</div>
										)}
									</Field>							
									<Field name="password">
										{({ field }) => (
											<div className="signup-form-text-div">
												<p><label htmlFor="signup-password">Password :</label>{eyeIcon(pswVisible, handleEyeClick)}</p>
												<input {...field} autoComplete="off" type={psw1Type} className="effect-border-bottom" id="signup-password" />
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
			)}
		</>
	);
	
}


const mapStateToProps = state => {

	return {
		getErrorMessage: code => getErrorMessages(state)[code]
	};

};

export default connect(mapStateToProps)(Signup);
