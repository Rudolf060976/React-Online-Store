import React from 'react';
import { Link } from 'react-router-dom';
import './UserNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UserNav() {
	return (
		<div id="user-nav-container">
			<ul id="header-user-nav-list">
				<li><Link to="/" activeClassName="user-nav-active">Browsing History<FontAwesomeIcon icon="caret-down" className="icon-user-nav" /></Link></li>
				<li><Link to="/" activeClassName="user-nav-active">Shopping Cart</Link></li>
				<li><Link to="/" activeClassName="user-nav-active">Your Orders</Link></li>
				<li><Link to="/" activeClassName="user-nav-active">Your Account</Link></li>
				<li><Link to="/" activeClassName="user-nav-active">Your Wishlist</Link></li>
				<li><Link to="/" activeClassName="user-nav-active">Help</Link></li>	
			</ul>
		</div>
	);
}

export default UserNav;
