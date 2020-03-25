import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './MainNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

function MainNav() {

	const [menuVisible, setMenuVisible] = useState(false);
	
	const mobilMenu = (
		<CSSTransition in={menuVisible} timeout={300} classNames="mobil-main-nav" unmountOnExit>
			<ul className="mobil-main-nav-list">
				<li><Link to="/"><FontAwesomeIcon icon="home" className="icon-main-nav" />Home</Link></li>
				<li><Link to="/"><FontAwesomeIcon icon="gifts" className="icon-main-nav" />Deals of the Day</Link></li>
				<li><Link to="/"><FontAwesomeIcon icon="file-signature" className="icon-main-nav" />Contact Us</Link></li>
				<li><Link to="/login"><FontAwesomeIcon icon="sign-in-alt" className="icon-main-nav" />Help</Link></li>
				<li><Link to="/signup"><FontAwesomeIcon icon="user-shield" className="icon-main-nav" />About Us</Link></li>			
			</ul>				
		</CSSTransition>
	);
	

	return (
		<>
			<button type="button" id="main-nav-button" onClick={() => setMenuVisible(!menuVisible)}>{menuVisible ? <FontAwesomeIcon icon="chevron-up" className="icon-main-nav" /> : <span><FontAwesomeIcon icon="chevron-down" className="icon-main-nav" /> Menu</span> } </button>
			{mobilMenu}			
			<div id="main-nav-container">
				<ul id="header-main-nav-list">
					<li><NavLink to="/" activeClassName="main-nav-active"><FontAwesomeIcon icon="home" className="icon-main-nav" />Home</NavLink></li>
					<li><NavLink to="/" activeClassName="main-nav-active"><FontAwesomeIcon icon="gifts" className="icon-main-nav" />Deals of the Day</NavLink></li>
					<li><NavLink to="/" activeClassName="main-nav-active"><FontAwesomeIcon icon="file-signature" className="icon-main-nav" />Contact Us</NavLink></li>
					<li><NavLink to="/login" activeClassName="main-nav-active"><FontAwesomeIcon icon="question-circle" className="icon-main-nav" />Help</NavLink></li>
					<li><NavLink to="/signup" activeClassName="main-nav-active"><FontAwesomeIcon icon="building" className="icon-main-nav" />About Us</NavLink></li>			
				</ul>
			</div>
		</>
	);
}

export default MainNav;
