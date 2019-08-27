import React, { Component } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.scss';
import { withTheme } from 'styled-components';
import Logo from '../../../assets/images/LOGO.png';
import MainNav from '../../MainNav/MainNav';
import UserNav from '../../UserNav/UserNav';
import Search from '../../Search/Search';
import Cart from '../../Cart/Cart';
import User from '../../User/User';


class Header extends Component {
	render() {
		return (
			<div id="header-container">
				<Container className="header-grid">
					<Row>
						<Col xl={2} lg={2} md={2} sm={12} xs={12}>							
							<img id="header-logo" src={Logo} alt="Logo" />
							<button type="button" id="btnDepartments">
								<FontAwesomeIcon id="icon-departments" icon="align-justify" />
								Departments
							</button>							
						</Col>
						<Col xl={6} lg="auto" md="auto" sm={12} xs={12}>
							<MainNav />
							<Search />
							<UserNav />
						</Col>
						<Col xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
							<div id="header-new-user-container">
								<p id="new-to-bitzone"><Badge variant="warning">New</Badge> to BitZone?</p>
								<p id="signup-container"><Link to="/"><FontAwesomeIcon icon="user-shield" className="icon-main-nav icon-signup" />Sign Up</Link></p>
							</div>							
						</Col>
						<Col xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
							<Cart size="lg" value="0" fgColor={this.props.theme.colorYellowDark} bgColor={this.props.theme.colorBlueBase} margin="50px 0 10px 0" />
							<p id="login-container"><Link to="/"><FontAwesomeIcon icon="sign-in-alt" className="icon-main-nav icon-login" />Login</Link></p>
						</Col>
						<Col xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
							<User />
						</Col>						
					</Row>					
				</Container>
			</div>
		);
	}
}

export default withTheme(Header);
