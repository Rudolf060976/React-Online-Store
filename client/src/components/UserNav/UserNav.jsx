import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';


function UserNav() {

	const [menuVisible, setMenuVisible] = useState(false);

	const mobilMenu = (
		<CSSTransition in={menuVisible} timeout={300} classNames="mobil-user-nav" unmountOnExit>
			<ul className="mobil-user-nav-list">
				<li><Link to="/" activeClassName="user-nav-active">Browsing History<FontAwesomeIcon icon="caret-down" className="icon-user-nav" /></Link></li>
				<li><Link to="/" activeClassName="user-nav-active">Shopping Cart</Link></li>
				<li><Link to="/" activeClassName="user-nav-active">Your Orders</Link></li>
				<li><Link to="/" activeClassName="user-nav-active">Your Account</Link></li>
				<li><Link to="/" activeClassName="user-nav-active">Your Wishlist</Link></li>
				<li><Link to="/" activeClassName="user-nav-active">Help</Link></li>	
			</ul>
		</CSSTransition>
	);

	return (
		<>
			<button type="button" id="user-nav-button" onClick={() => setMenuVisible(!menuVisible)}>{menuVisible ? <FontAwesomeIcon icon="angle-double-up" className="icon-main-nav" /> : <span><FontAwesomeIcon icon="angle-double-down" className="icon-main-nav" /> User Options</span> } </button>
			{mobilMenu}
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
		</>
	);
}

export default UserNav;
