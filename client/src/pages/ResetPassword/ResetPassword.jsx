/* eslint-disable react/jsx-indent-props */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import { getErrorMessages } from '../../redux/selectors';
import checkedImage from '../../assets/images/checkedIcon.svg';
import EmailNotification from '../../components/EmailNotification/EmailNotification';
import { fetchPostResetPasswordUser } from '../../modules/fetchFunctions/users';
import logo from '../../assets/images/LOGO.png';
import './ResetPassword.scss';


const initialValues = {
	password: '',
	confirmPassword: ''
};

const schema = yup.object().shape({

	password: yup.string().min(8, 'Password should contain at least 8 characters!').max(20, 'Password cannot exceed 20 characters!').required('Password is Required')
		.matches(/^[a-zA-Z][a-zA-Z0-9._-]*[a-zA-Z0-9]+$/, 'Password is not valid (see notes below)')
		.matches(/\d/, 'Password should contain at least one number!')
		.matches(/\S{0}/, 'Password should not contain white spaces!'),
	confirmPassword: yup.string().max(20, 'Password cannot exceed 20 characters!').required('Password is Required')
});

const errorIcon = (<FontAwesomeIcon icon="exclamation-triangle" size="sm" />);


const ErrorAlert = ({ msg }) => (
	<CSSTransition appear in timeout={500} classNames="signup-form-error-effect">
		<div id="signup-form-error-container">{errorIcon}<span id="signup-form-error-message">{msg}</span> 
		</div>
	</CSSTransition>
);

const handleFormSubmit = (values, actions, setLocalError, setLocalErrorMessage, setNotificationTitle, setNotificationContent, setSuccess, id, token, getErrorMessage, inputRef1) => {

	const { password, confirmPassword } = values;

	const NotificationTitle = 'Success';
	const NotificationContent = (<>Your password has been successfully reset. Please log back into BitZone website using your new password.</>);
	

	if (password !== confirmPassword) {

		// values.password = '';
		// values.confirmPassword = '';
		
		setLocalErrorMessage(getErrorMessage('012'));
		setLocalError(true);		

		inputRef1.current.focus();

	} else {
		
		setLocalErrorMessage(null);
		setLocalError(false);

	}

	fetchPostResetPasswordUser(id, token, password).then(response => {

		if (response.ok) {

			setNotificationTitle(NotificationTitle);
			setNotificationContent(NotificationContent);
			setSuccess(true);
		} else {
			// eslint-disable-next-line
			if (response.status === 400 || response.status === 401) {

				setLocalErrorMessage(getErrorMessage('011') + response.message);
				setLocalError(true);

			} else {

				setLocalErrorMessage(getErrorMessage('009') + response.message);
				setLocalError(true);

			}			

		}

	}).catch(err => {

		setLocalErrorMessage(err.message);
		setLocalError(true);

	});


};

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


function ResetPassword({ getErrorMessage, location }) {
	
	const [success, setSuccess] = useState(false);
	const [notificationTitle, setNotificationTitle] = useState(null);
	const [notificationContent, setNotificationContent] = useState(null);
	const [id, setId] = useState(null);
	const [token, setToken] = useState(null);
	const [localError, setLocalError] = useState(false);
	const [localErrorMessage, setLocalErrorMessage] = useState(null);
	const [pswVisible, setPswVisible] = useState(false);
	const [psw1Type, setPsw1Type] = useState('password');
	const [psw2Type, setPsw2Type] = useState('password');

	const inputRef1 = useRef(null);	

	useEffect(() => {

		const mySearch = new URLSearchParams(location.search);

		const newId = mySearch.get('id');

		const newToken = mySearch.get('token');

		setId(newId);
		
		setToken(newToken);

	}, [location.search]);


	const handleEyeClick = (e) => {

		if (pswVisible) {

			setPswVisible(false);
			setPsw1Type('password');
			setPsw2Type('password');

		} else {

			setPswVisible(true);
			setPsw1Type('text');
			setPsw2Type('text');

			setTimeout(() => {
				
				setPswVisible(false);
				setPsw1Type('password');
				setPsw2Type('password');

			}, 1000);


		}

	};

		
	return (
		<>
			{ success ? <EmailNotification image={checkedImage} title={notificationTitle} content={notificationContent} buttonTitle="LOGIN" linkPath="/login" /> : (
				<div id="resetpsw-form-container">
					<div id="resetpsw-form">
						<div id="resetpsw-form-header">
							<img src={logo} alt="" />
							<h6>Reset your Password</h6>
						</div>
						{localError ? <ErrorAlert msg={localErrorMessage} /> : null}				
						<Formik 
							initialValues={initialValues} 
							onSubmit={(values, options) => {
								setTimeout(() => {

									handleFormSubmit(values, options, setLocalError, setLocalErrorMessage, setNotificationTitle, setNotificationContent, setSuccess, id, token, getErrorMessage, inputRef1);

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
									<Field name="password">
										{({ field }) => (
											<div className="resetpsw-form-text-div">
												<p><label htmlFor="resetpsw-password">New Password :</label>{eyeIcon(pswVisible, handleEyeClick)}</p>
												<input {...field} autoComplete="off" type={psw1Type} className="form-effect-border-bottom" id="resetpsw-password" autoFocus ref={inputRef1} />
												<span className="focus-form-effect-border-bottom" />
											</div>
										)}
									</Field>							
									<Field name="confirmPassword">
										{({ field }) => (
											<div className="resetpsw-form-text-div">
												<p><label htmlFor="resetpsw-confirm-password">Enter new password again :</label></p>
												<input {...field} autoComplete="off" type={psw2Type} className="form-effect-border-bottom" id="resetpsw-confirm-password" />
												<span className="focus-form-effect-border-bottom" />
											</div>
										)}
									</Field>								
									<Button id="resetpsw-form-button" variant="info" size="lg" disabled={isSubmitting} onClick={submitForm} block>{isSubmitting ? 'Loading...' : 'CONFIRM'} </Button>	
								</Form>						
							)}
						</Formik>
						<div id="resetpsw-form-footer">
							<p>Please set a new 8-20 character password. Your password must <strong>start with a letter (a-z / A-Z) and contain at least one number (0-9).</strong> Permitted symbols: dot (.), underscore (_) and dash (-).
							</p>							
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

export default connect(mapStateToProps)(ResetPassword);
