import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import { withTheme } from 'styled-components';
import './Header.scss';
import Logo from '../../../assets/images/LOGO.png';
import MainNav from '../../MainNav/MainNav';
import UserNav from '../../UserNav/UserNav';
import Search from '../../Search/Search';
import Cart from '../../Cart/Cart';
import Avatar from '../../Avatar/Avatar';
import { getIsLoggedUser, getUserProfile, getErrorMessages, getIsDepartmentOpen, getCartTotals } from '../../../redux/selectors';
import { fetchGetLoginUser, fetchGetLogoutUser } from '../../../modules/fetchFunctions/users';
import { actionsUser, actionsIUstate } from '../../../redux/actions/actions';
import { actionsAsyncFetchGetCartItems } from '../../../redux/actions/asyncActions';
import home from '../../../assets/images/home.svg';


class Header extends Component {

	constructor(props) {
		super(props);

		this.state = {
			error: false,
			errorMessage: null
		};

		this.handleLogout = this.handleLogout.bind(this);
		this.handleDepartments = this.handleDepartments.bind(this);
		this.handleCartClick = this.handleCartClick.bind(this);
	}

	componentDidMount() {

		const { loginUser, logoutUser } = this.props;

		fetchGetLoginUser().then(response => {

			const { data: { user } } = response;

			if (response.ok) {
		
				loginUser(user);

				this.props.fetchCart(user._id);

			} else {
				logoutUser();
			}

		}).catch(err => {

			logoutUser();

		});

		
	}

	handleLogout() {

		const { logoutUser, getErrorMessage } = this.props;

		fetchGetLogoutUser().then(response => {

			this.setState({
				error: false,
				errorMessage: null
			});
			
			logoutUser();

		}).catch(err => {
			
			this.setState({
				error: true,
				errorMessage: getErrorMessage('009') + err.message + getErrorMessage('010')
			});

		});

	}

	handleDepartments() {
		const { isDepartmentsOpen, openDepartments, closeDepartments } = this.props;

		if (isDepartmentsOpen) {

			closeDepartments();
		
		} else {
			openDepartments();
		}
	}

	handleCartClick() {
					
		this.props.handleCartClick();
	}
	
	render() {
		const { isLoggedUser, userProfile } = this.props;
		const { error, errorMessage } = this.state;
		const { cartTotals } = this.props;
		const cartCount = cartTotals.count || 0;		 
		const errorIcon = (<FontAwesomeIcon icon="exclamation-triangle" size="sm" />);
		
		const ErrorAlert = ({ msg }) => (
			<CSSTransition appear in timeout={300} classNames="header-error-effect">
				<div id="header-error-container">{errorIcon}<span id="header-error-message">{msg}</span> 
				</div>
			</CSSTransition>
		);

		return (
			<header id="header-container">
				<div id="header-logo-container">							
					<img id="header-logo" src={Logo} alt="Logo" />
				</div>
				<button type="button" id="btnDepartments" onClick={this.handleDepartments}>
					<FontAwesomeIcon id="icon-departments" icon={this.props.isDepartmentsOpen ? "caret-up" : "caret-down"} size="lg" />
					Departments
				</button>
				<button type="button" id="mobile-btnDepartments" onClick={this.handleDepartments}><FontAwesomeIcon id="mobile-icon-departments" icon="align-justify" size="lg" />
				</button>		
				<div id="header-main-nav">
					{error ? <ErrorAlert msg={errorMessage} /> : null}
					<MainNav />
				</div>
				<div id="header-search">
					<Search />
				</div>
				<div id="header-user-nav">
					{ isLoggedUser ? <UserNav /> : null }	
				</div>			
				<div id="header-cart">
					<Cart size="lg" value={isLoggedUser ? cartCount : null} fgColor={this.props.theme.colorYellowDark} bgColor={this.props.theme.colorBlueBase} counterColor="white" pxChangeLargeToSmall="680px" handleClick={this.handleCartClick} />	
				</div>			
					{ 
						!isLoggedUser ? (
							<div id="header-new-user">
								<p id="new-to-bitzone"><Badge variant="warning">New</Badge> to BitZone? <span id="signup-container"><Link to="/signup"><FontAwesomeIcon icon="user-shield" className="icon-main-nav icon-signup" />Sign Up</Link></span></p>
								<p id="login-container"><Link to="/login"><FontAwesomeIcon icon="sign-in-alt" className="icon-main-nav icon-login" />Login</Link></p>		
							</div>
						) : null
					}				
					{ 
						isLoggedUser ? (
							<div id="header-logged-user">
								<Avatar arrowColor="white" textColor={this.props.theme.colorBlueBase} value={userProfile.firstname} borderColor="white" menuColor={this.props.theme.colorBg1} handleLogout={this.handleLogout} />
							</div>	
						) : null
					}			
				<div id="header-mobile-new-user">				
					{ 
						!isLoggedUser ? (
							<>
								<p id="signup-container"><Link to="/signup"><FontAwesomeIcon icon="user-shield" className="icon-main-nav icon-signup" />Sign Up</Link>
								</p>
								<p id="login-container"><Link to="/login"><FontAwesomeIcon icon="sign-in-alt" className="icon-main-nav icon-login" />Login</Link>
								</p>						
							</>
						) : null
					}
				</div>
				<div id="header-mobile-logged-user">				
					{ 
						isLoggedUser ? (						
							<Avatar small avatarColor={this.props.theme.colorPurpleClear} arrowColor="white" textColor={this.props.theme.colorBlueBase} value={userProfile.firstname} borderColor="white" menuColor={this.props.theme.colorLightBlue} handleLogout={this.handleLogout} />						
						) : null
					}
				</div>
				<div id="mobil-header-icon-home">
					<Link to="/"><img src={home} alt="" /><span>Home</span></Link>
				</div>
			</header>
		);
	}
}

const mapStateToProps = state => {

	return {
		
		isLoggedUser: getIsLoggedUser(state),
		userProfile: getUserProfile(state),
		getErrorMessage: code => getErrorMessages(state)[code],
		isDepartmentsOpen: getIsDepartmentOpen(state),
		cartTotals: getCartTotals(state)
	};

};

const mapDispatchToProps = dispatch => {

	return {
		loginUser: user => dispatch(actionsUser.userLogin(user)),
		logoutUser: () => dispatch(actionsUser.userLogout()),
		openDepartments: () => dispatch(actionsIUstate.departments.open()),
		closeDepartments: () => dispatch(actionsIUstate.departments.close()),
		fetchCart: userId => dispatch(actionsAsyncFetchGetCartItems(userId))		
	};

};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Header));
