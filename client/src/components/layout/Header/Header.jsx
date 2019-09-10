import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTheme } from 'styled-components';
import './Header.scss';
import Logo from '../../../assets/images/LOGO.png';
import MainNav from '../../MainNav/MainNav';
import UserNav from '../../UserNav/UserNav';
import Search from '../../Search/Search';
import Cart from '../../Cart/Cart';
import Avatar from '../../Avatar/Avatar';
import { getIsLoggedUser, getUserProfile } from '../../../redux/selectors';
import { fetchGetLoginUser } from '../../../modules/fetchFunctions/users';
import { actionsUser } from '../../../redux/actions/actions';


class Header extends Component {

	componentDidMount() {

		const { loginUser, logoutUser } = this.props;

		fetchGetLoginUser().then(response => {

			const { data: { user } } = response;

			if (response.ok) {
		
				loginUser(user);

			} else {
				logoutUser();
			}

		}).catch(err => {

			logoutUser();

		});

	}

	render() {
		const { isLoggedUser, userProfile } = this.props;

		return (
			<header id="header-container">
				<div id="header-flexbox">
					<div id="header-flex-col1">							
						<img id="header-logo" src={Logo} alt="Logo" />
						<button type="button" id="btnDepartments">
							<FontAwesomeIcon id="icon-departments" icon="caret-down" />
							Departments
						</button>
						<button type="button" id="mobile-btnDepartments">Departments<FontAwesomeIcon id="mobile-icon-departments" icon="chevron-right" />
						</button>							
					</div>
					<div id="header-flex-col2">
						<MainNav />
						<Search />
						<UserNav />
					</div>
					<div id="header-flex-col3">
						<div id="header-new-user">
							
							{
								!isLoggedUser ? (
									<>
										<p id="new-to-bitzone"><Badge variant="warning">New</Badge> to BitZone? <span id="signup-container"><Link to="/signup"><FontAwesomeIcon icon="user-shield" className="icon-main-nav icon-signup" />Sign Up</Link></span></p>
										<p id="login-container"><Link to="/login"><FontAwesomeIcon icon="sign-in-alt" className="icon-main-nav icon-login" />Login</Link></p>
									</>
								) : null
							}							
							{ 
								isLoggedUser ? (
									<p id="hello-user">
										<Avatar avatarColor={this.props.theme.colorPurpleClear} arrowColor="white" textColor={this.props.theme.colorBlueBase} value={userProfile.firstname} borderColor="white" />
									</p>
								) : null
							}					
						</div>
						<div id="header-cart">
							<Cart size="lg" value={isLoggedUser ? 0 : null} fgColor={this.props.theme.colorYellowDark} bgColor={this.props.theme.colorBlueBase} counterColor="white" />	
						</div>						
					</div>
					{ 
						!isLoggedUser ? (
							<div id="mobil-header-user">							
								<p id="signup-container"><Link to="/signup"><FontAwesomeIcon icon="user-shield" className="icon-main-nav icon-signup" />Sign Up</Link>
								</p>
								<p id="login-container"><Link to="/login"><FontAwesomeIcon icon="sign-in-alt" className="icon-main-nav icon-login" />Login</Link>
								</p>																	
							</div>
						) : null
					}					
					{ 
						isLoggedUser ? (
							<div id="mobil-icon-avatar">
								<Avatar small avatarColor={this.props.theme.colorPurpleClear} arrowColor="white" textColor={this.props.theme.colorBlueBase} value={userProfile.firstname} borderColor="white" />
							</div>
						) : null
					}		
					<div id="mobil-header-cart">
						<Cart size="sm" value={isLoggedUser ? 0 : null} fgColor={this.props.theme.colorYellowDark} bgColor={this.props.theme.colorBlueBase} counterColor="white" />	
					</div>						
					
				</div>
			</header>
		);
	}
}

const mapStateToProps = state => {

	return {
		
		isLoggedUser: getIsLoggedUser(state),
		userProfile: getUserProfile(state)
	};

};

const mapDispatchToProps = dispatch => {

	return {
		loginUser: user => dispatch(actionsUser.userLogin(user)),
		logoutUser: () => dispatch(actionsUser.userLogout())
	};

};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Header));
