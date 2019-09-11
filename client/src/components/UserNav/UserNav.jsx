import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import history from '../../assets/images/browsing.svg';
import cart from '../../assets/images/shopping-cart.svg';
import orders from '../../assets/images/delivery-truck.svg';
import account from '../../assets/images/account.svg';
import wishlist from '../../assets/images/wishlist2.svg';
import help from '../../assets/images/help.svg';

function UserNav() {
	
	const mobilMenu = (		
		<ul className="mobil-user-nav-list">
			<li><img src={history} alt="" /><Link to="/">History</Link></li>
			<li><img src={cart} alt="" /><Link to="/">Cart</Link></li>
			<li><img src={orders} alt="" /><Link to="/">Orders</Link></li>
			<li><img src={account} alt="" /><Link to="/">Account</Link></li>
			<li><img src={wishlist} alt="" /><Link to="/">Wishlist</Link></li>
			<li><img src={help} alt="" /><Link to="/">Help</Link></li>	
		</ul>		
	);

	return (
		<>			
			{mobilMenu}
			<div id="user-nav-container">
				<ul id="header-user-nav-list">
					<li><Link to="/">Browsing History<FontAwesomeIcon icon="caret-down" className="icon-user-nav" /></Link></li>
					<li><Link to="/">Shopping Cart</Link></li>
					<li><Link to="/">Your Orders</Link></li>
					<li><Link to="/">Your Account</Link></li>
					<li><Link to="/">Your Wishlist</Link></li>
					<li><Link to="/">Help</Link></li>	
				</ul>
			</div>
		</>
	);
}

export default UserNav;
