import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.scss';
import { withTheme } from 'styled-components';
import Logo from '../../../assets/images/LOGO.png';
import MainNav from '../../MainNav/MainNav';
import UserNav from '../../UserNav/UserNav';
import Search from '../../Search/Search';
import Cart from '../../Cart/Cart';
import Avatar from '../../Avatar/Avatar';


class Header extends Component {
	render() {
		return (
			<header id="header-container">
				<div id="header-flexbox">
					<div id="header-flex-col1">							
						<img id="header-logo" src={Logo} alt="Logo" />
						<button type="button" id="btnDepartments">
							<FontAwesomeIcon id="icon-departments" icon="align-justify" />
							Departments
						</button>							
					</div>
					<div id="header-flex-col2">
						<MainNav />
						<Search />
						<UserNav />
					</div>
					<div id="header-flex-col3">
						<div id="header-new-user">
							<p id="new-to-bitzone"><Badge variant="warning">New</Badge> to BitZone? <span id="signup-container"><Link to="/"><FontAwesomeIcon icon="user-shield" className="icon-main-nav icon-signup" />Sign Up</Link></span></p>
							<p id="login-container"><Link to="/"><FontAwesomeIcon icon="sign-in-alt" className="icon-main-nav icon-login" />Login</Link></p>
							<p id="hello-user">
								<Avatar avatarColor={this.props.theme.colorPurpleClear} arrowColor="white" textColor={this.props.theme.colorBlueBase} value="gsdfgsdfgsdrgserregre" borderColor="white" />
							</p>	
						</div>
						<div id="header-cart">
							<Cart size="lg" value="10" fgColor={this.props.theme.colorYellowDark} bgColor={this.props.theme.colorBlueBase} counterColor="white" />	
						</div>						
					</div>
					<div id="header-flex-col4">
						<div id="mobil-header-user">							
							<span id="signup-container"><Link to="/"><FontAwesomeIcon icon="user-shield" className="icon-main-nav icon-signup" />Sign Up</Link>
							</span>
							<span id="login-container"><Link to="/"><FontAwesomeIcon icon="sign-in-alt" className="icon-main-nav icon-login" />Login</Link>
							</span>
							<span id="mobil-icon-avatar">
								<Avatar small avatarColor={this.props.theme.colorPurpleClear} arrowColor="white" textColor={this.props.theme.colorBlueBase} value="gsdfgsdfgsdrgserregre" borderColor="white" />
							</span>																
						</div>
						<div id="mobil-header-cart">
							<Cart size="sm" value="10" fgColor={this.props.theme.colorYellowDark} bgColor={this.props.theme.colorBlueBase} counterColor="white" />	
						</div>						
					</div>
				</div>
			</header>
		);
	}
}

export default withTheme(Header);
