/* eslint object-curly-newline: "off" */
/* eslint react/jsx-indent-props: "off" */
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import './Login.scss';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../assets/images/LOGO.png';
import EmailNotification from '../../components/EmailNotification/EmailNotification';
import warningIcon from '../../assets/images/warning.svg';
import { fetchPostLoginUser } from '../../modules/fetchFunctions/users';
import { getErrorMessages } from '../../redux/selectors';
import { actionsUser } from '../../redux/actions/actions';

const initialValues = {
	username: '',
	password: ''	
};

const handleFormSubmit = (values, options, setLocalError, setLocalErrorMessage, setError, setNotificationTitle, setNotificationContent, setSuccess, setUserLogin, getErrorMessage) => {
	
	const { username, password } = values;
	
	fetchPostLoginUser(username, password).then(response => {

		if (response.ok) {

			const { data: { user } } = response;

			setUserLogin(user);
			setSuccess(true);

		} else {

			// eslint-disable-next-line
			if (response.status === 423 && response.message === 'USER IS NOT VALIDATED') {
				
				setLocalErrorMessage(getErrorMessage('005'));
				setLocalError(true);

			} else if (response.status === 423 && response.message === 'USER IS SUSPENDED') {

				setNotificationTitle('Sorry!');
				setNotificationContent(getErrorMessage('006'));
				setError(true);

			} else if (response.status === 401 && response.error.message === 'INCORRECT USERNAME') {						

				setLocalErrorMessage(getErrorMessage('007'));
				setLocalError(true);
			} else if (response.status === 401 && response.error.message === 'INCORRECT PASSWORD') {						

				setLocalErrorMessage(getErrorMessage('008'));
				setLocalError(true);
			} 

		}

	}).catch(err => {
		
		setLocalErrorMessage(err.message);
		setLocalError(true);

	});
	
};

const schema = yup.object().shape({

	username: yup.string().max(100).required('Email is Required!').email('Email must be a valid email!'),
	password: yup.string().max(50).required('Password is Required')	
});

const errorIcon = (<FontAwesomeIcon icon="exclamation-triangle" size="sm" />);


const ErrorAlert = ({ msg }) => (
	<CSSTransition appear in timeout={500} classNames="login-form-error-effect">
		<div id="login-form-error-container">{errorIcon}<span id="login-form-error-message">{msg}</span> 
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

function Login({ setUserLogin, getErrorMessage }) {
		
	const [localError, setLocalError] = useState(false);
	const [localErrorMessage, setLocalErrorMessage] = useState(null);
	const [error, setError] = useState(false);
	const [notificationTitle, setNotificationTitle] = useState(null);
	const [notificationContent, setNotificationContent] = useState(null);
	const [success, setSuccess] = useState(false);
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
			{ success ? <Redirect to="/" /> : null }			
			{ error ? <EmailNotification image={warningIcon} title={notificationTitle} content={notificationContent} buttonTitle="Done" linkPath="/" /> : (
				<div id="login-form-container">
					<div id="login-form">
						<div id="login-form-header">
							<img src={logo} alt="" />
							<h6>Log in to your account</h6>
						</div>
						{localError ? <ErrorAlert msg={localErrorMessage} /> : null}
						<Formik 
							initialValues={initialValues} 
							onSubmit={(values, options) => {
								setTimeout(() => {

									handleFormSubmit(values, options, setLocalError, setLocalErrorMessage, setError, setNotificationTitle, setNotificationContent, setSuccess, setUserLogin, getErrorMessage);

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
												<p><label htmlFor="login-username">Email :</label></p>
												<input {...field} autoComplete="off" type="text" className="form-effect-border-bottom" id="login-username" autoFocus />
												<span className="focus-form-effect-border-bottom" />
											</div>
										)}
									</Field>							
									<Field name="password">
										{({ field }) => (
											<div className="login-form-text-div">
												<p><label htmlFor="login-password">Password :</label>{eyeIcon(pswVisible, handleEyeClick)}</p>
												<input {...field} autoComplete="off" type={psw1Type} className="form-effect-border-bottom" id="login-password" />
												<span className="focus-form-effect-border-bottom" />
											</div>
										)}
									</Field>								
									<Button id="login-form-button" variant="info" size="lg" disabled={isSubmitting} onClick={submitForm} block>{isSubmitting ? 'Loading...' : 'LOG IN'} </Button>	
								</Form>						
							)}
						</Formik>
						<div id="login-form-footer">
							<p><Link to="/login/forgotpassword">Forgot your password?</Link></p>
							<p>Don&apos;t have an account? <Link to="/signup">Sign In</Link></p>
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

const mapDispatchToProps = dispatch => {

	return {
		setUserLogin: user => dispatch(actionsUser.userLogin(user))
	};

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
