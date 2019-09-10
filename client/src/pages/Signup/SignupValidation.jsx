import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostValidateUser } from '../../modules/fetchFunctions/users';
import EmailNotification from '../../components/EmailNotification/EmailNotification';
import checkedIcon from '../../assets/images/checkedIcon.svg';
import errorIcon from '../../assets/images/errorIcon..svg';
import { getErrorMessages } from '../../redux/selectors';

class SignupValidation extends Component {
	
	constructor(props) {
		super(props);
		// eslint-disable-next-line
		this.state = {
			success: false,
			notificationTitle: null,
			notificationContent: null,
			image: null,
			buttonTitle: null,
			linkPath: null
		};

	}

	componentDidMount() {

		const { location, getErrorMessage } = this.props;

		const mySearch = new URLSearchParams(location.search);

		const id = mySearch.get('id');

		const token = mySearch.get('token');
	

		fetchPostValidateUser(id, token).then(response => {

			if (response.ok) {

				this.setState({
					image: checkedIcon,
					notificationTitle: 'Account verified!',
					notificationContent: (<><p>Thank you! Your account has been verified! Now you&#39;re ready to Log in.</p></>),
					buttonTitle: 'Log In',
					linkPath: '/login',
					success: true
				});				

			} else {

				if (response.status === 401 && response.message === 'INVALID TOKEN') {

					return this.setState({
						image: errorIcon,
						notificationTitle: 'Sorry!',
						notificationContent: (<>{getErrorMessage('002')}</>),
						buttonTitle: 'Done',
						linkPath: '/',
						success: true
					});						
					// eslint-disable-next-line
				} else if (response.status === 409 && response.message === 'USER IS ALREADY VALIDATED') {


					return this.setState({
						image: errorIcon,
						notificationTitle: 'Sorry!',
						notificationContent: (<>{getErrorMessage('003')}</>),
						buttonTitle: 'Login',
						linkPath: '/login',
						success: true
					});			

				}

				return this.setState({
					image: errorIcon,
					notificationTitle: 'Sorry!',
					notificationContent: ('ERROR ' + response.status + ' ' + response.message + getErrorMessage('004')),
					buttonTitle: 'Done',
					linkPath: '/',
					success: true
				});				

			}


		}).catch(err => {

			return this.setState({
				image: errorIcon,
				notificationTitle: 'Sorry!',
				notificationContent: err.message,
				buttonTitle: 'Done',
				linkPath: '/',
				success: true
			});		

		});

	}
	
	render() {

		const {success, image, notificationTitle, notificationContent, buttonTitle, linkPath } = this.state;

		return (
			<>
				{ success ? <EmailNotification image={image} title={notificationTitle} content={notificationContent} buttonTitle={buttonTitle} linkPath={linkPath} /> : null}
			</>
		);


	} 
	
	
}

const mapStateToProps = state => {

	return {
		getErrorMessage: code => getErrorMessages(state)[code]
	};

};

export default connect(mapStateToProps)(SignupValidation);
