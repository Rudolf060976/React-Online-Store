import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MainNav() {
	return (
		<div id="main-nav-container">
			<ul id="header-main-nav-list">
				<li><NavLink to="/" activeClassName="main-nav-active"><FontAwesomeIcon icon="home" className="icon-main-nav" />Home</NavLink></li>
				<li><NavLink to="/" activeClassName="main-nav-active"><FontAwesomeIcon icon="gifts" className="icon-main-nav" />Deals of the Day</NavLink></li>
				<li><NavLink to="/" activeClassName="main-nav-active"><FontAwesomeIcon icon="file-signature" className="icon-main-nav" />Contact Us</NavLink></li>
				<li><NavLink to="/" activeClassName="main-nav-active"><FontAwesomeIcon icon="sign-in-alt" className="icon-main-nav" />Login</NavLink></li>
				<li><NavLink to="/" activeClassName="main-nav-active"><FontAwesomeIcon icon="user-shield" className="icon-main-nav" />Sign Up</NavLink></li>			
			</ul>
		</div>
	);
}

export default MainNav;
