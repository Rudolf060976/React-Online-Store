import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getErrorMessages } from '../../redux/selectors';
import EmailNotification from '../../components/EmailNotification/EmailNotification';
import checkedImage from '../../assets/images/checkedIcon.svg';
import logo from '../../assets/images/LOGO.png';
import './ForgotPassword.scss';
import { fetchPostForgotPasswordUser } from '../../modules/fetchFunctions/users';

const initialValues = {
	username: ''
};

const handleFormSubmit = (values, actions, setLocalError, setLocalErrorMessage, setNotificationTitle, setNotificationContent, setSuccess, getErrorMessage) => {

	const { username } = values;

	const NotificationTitle = 'Please check your Email to reset your Password';
	const NotificationContent = (<>We have sent an email to  <span className="content-different">{username}</span>  so that you can reset your password. Please check your email inbox for instructions on how to proceed.</>);

	fetchPostForgotPasswordUser(username).then(response => {

		if (response.ok) {

			setNotificationTitle(NotificationTitle);
			setNotificationContent(NotificationContent);
			setSuccess(true);

		} else {

			// eslint-disable-next-line
			if (response.status === 400) {
				
				setLocalErrorMessage(getErrorMessage('011') + response.message);
				setLocalError(true);

			} else if (response.status === 500) {

				setLocalErrorMessage(getErrorMessage('009') + response.error.message);
				setLocalError(true);

			} else if (response.status === 404) {

				setLocalErrorMessage(getErrorMessage('007'));
				setLocalError(true);

			}
		
		}

	}).catch(err => {

		setLocalErrorMessage(err.message);
		setLocalError(true);

	});

};

const schema = yup.object().shape({

	username: yup.string().max(100).required('Email is Required!').email('Email must be a valid email!')

});

const errorIcon = (<FontAwesomeIcon icon="exclamation-triangle" size="sm" />);

const ErrorAlert = ({ msg }) => (
	<CSSTransition appear in timeout={500} classNames="forgotpsw-form-error-effect">
		<div id="forgotpsw-form-error-container">{errorIcon}<span id="forgotpsw-form-error-message">{msg}</span> 
		</div>
	</CSSTransition>
);


function ForgotPassword({ getErrorMessage }) {

	const [localError, setLocalError] = useState(false);
	const [localErrorMessage, setLocalErrorMessage] = useState(null);
	const [success, setSuccess] = useState(false);
	const [notificationTitle, setNotificationTitle] = useState(null);
	const [notificationContent, setNotificationContent] = useState(null);

	return (
		<>
			{ success ? <EmailNotification image={checkedImage} title={notificationTitle} content={notificationContent} buttonTitle="Done" linkPath="/" /> : (
				<div id="forgotpsw-form-container">
					<div id="forgotpsw-form">
						<div id="forgotpsw-form-header">
							<img src={logo} alt="" />
							<h6>Please type your Username</h6>
						</div>
						{localError ? <ErrorAlert msg={localErrorMessage} /> : null}
						
						<Formik
							initialValues={initialValues} 
							onSubmit={(values, actions) => {
								setTimeout(() => {

									handleFormSubmit(values, actions, setLocalError, setLocalErrorMessage, setNotificationTitle, setNotificationContent, setSuccess, getErrorMessage);

									actions.setSubmitting(false);

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
											<div className="forgotpsw-form-text-div">
												<p><label htmlFor="forgotpsw-username">Email :</label></p>
												<input {...field} autoComplete="off" type="text" className="form-effect-border-bottom" id="forgotpsw-username" autoFocus />
												<span className="focus-form-effect-border-bottom" />
											</div>									
										)}
									</Field>
									<Button id="forgotpsw-form-button" variant="info" size="lg" disabled={isSubmitting} onClick={submitForm} block>{isSubmitting ? 'Loading...' : 'SUBMIT'} </Button>	
								</Form>
							)}
						</Formik>
						<div id="forgotpsw-form-footer">
							<p><Link to="/login">Back to Login</Link></p>
							<p>Don&apos;t have an account? <Link to="/signup">Sign In</Link></p>
						</div>
					</div>
				</div>			
			)}	
			
		</>
	)
}

const mapStateToProps = state => {

	return {
		getErrorMessage: code => getErrorMessages(state)[code]
	};

};


export default connect(mapStateToProps, null)(ForgotPassword);
