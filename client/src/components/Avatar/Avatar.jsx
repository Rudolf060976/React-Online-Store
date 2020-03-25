import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

const StyledAvatar = styled('div')`
	
	width: ${props => (props.small ? '80px' : 'auto')};
	padding: 0;
	background:  transparent;
		
	#avatar-button {
		width: 100%;
		background: transparent;
		border: none;
		border-radius: 5px 5px 0 0;
		transition: all 0.3s linear;
		padding: ${props => (props.small ? '5px 10px' : '5px')};
	}

	#avatar-button:hover {
				
		box-shadow: 1px 1px 20px whitesmoke;	
	}

	#avatar-button:focus {
		outline: 0;
	}

	#icon-avatar {		
		color: ${props => props.avatarColor || lighten(0.1, props.theme.colorLightBlue)};
		font-size: 1.5rem;
		margin: 0;
		margin-right: 5px;
		padding: 0;				
	}

	#icon-avatar-text {
		
		margin-right: 5px;
		color: ${props => props.textColor || 'black'};
		font-size: 1.2rem;
	}

	#icon-avatar-arrow {

		color: ${props => props.arrowColor || 'white'};
		font-size: 1.5rem;
		padding: 0;
		margin: 0;
	}
	
	.avatar-menu-small {
		overflow: hidden;
		max-height: 0;
		transition: max-height .3s linear;
		background-color: ${props => props.menuColor};
		border-radius: 0 0 5px 5px;
		box-shadow: 1px 1px 4px black inset;
		padding: 0;	

		li {

			list-style-type: none;
			width: 100%;
			padding: 0;
			margin: 0;

			a {
				display: inline-block;
				width: 100%;
				margin: 0;
				padding: 5px 0 0 10px;				
				text-decoration: none;
				color: ${props => props.theme.colorPurpleDark};
				font-size: 1.6rem;
				font-weight: bold;
				letter-spacing: 1px;
				transition: color .1s linear;
				font-style: italic;
							
			}

			a:hover {
				color: ${props => props.theme.colorYellowDark};
				text-shadow: 1px 1px blue;

			}

			button {

				display: inline-block;
				width: 100%;
				margin: 0;
				padding: 5px 0 8px 10px;
				color: ${props => props.theme.colorPurpleDark};
				font-size: 1.6rem;
				font-weight: bold;
				letter-spacing: 1px;
				transition: color .1s linear;
				font-style: italic;
				background: transparent;
				border: none;
				text-align: left;

			}	

			button:hover {
				color: ${props => props.theme.colorYellowDark};
				text-shadow: 1px 1px blue;
				outline: none;
			}

			button:active {
				
			}

		}

		li:first-child a {
			padding-top: 10px;			
		}

		li:last-child button {
			padding-bottom: 10px;
		}
		

	}

	.avatar-menu-large {
		overflow: hidden;
		max-height: 0;
		transition: max-height .2s linear;
		background-color: ${props => props.menuColor};
		border-radius: 0 0 5px 5px;
		box-shadow: 1px 1px 4px black inset;
		padding: 0;		
		
		li {

			list-style-type: none;
			width: 100%;
			padding: 0;
			margin: 0;


			a {
				display: inline-block;
				width: 100%;
				margin: 0;
				padding: 0 0 0 10px;				
				text-decoration: none;
				color: ${props => props.theme.colorBlueDark};
				font-size: 1.2rem;
				font-weight: bold;				
				transition: color .1s linear;
				font-family: Rubik;	
										
			}

			a:hover {
				color: ${props => props.theme.colorLightBlue};
				
			}

			span {

				display: inline-block;
				width: 100%;
				margin: 0;
				padding: 0 0 0 10px;
				color: ${props => props.theme.colorBlueDark};
				font-size: 1.2rem;
				font-weight: bold;
				font-family: Rubik;	
				
				transition: color .1s linear;
				
				background: transparent;
				border: none;
				text-align: left;

			}

			span:hover {
				color: ${props => props.theme.colorLightBlue};
				
				outline: none;

				cursor: pointer;
			}
			
		}

		li:first-child a {
			padding-top: 5px;			
		}
		
		li:last-child button {
			padding-bottom: 5px;
		}
		

	}

	.avatar-menu-open {
		max-height: 120px;		
	}


	.icon-your-account {

		margin: 0 5px;
		color: ${lighten(.60,'black')};

	}

	.icon-logout {

		margin: 0 5px;

		color: ${lighten(.60,'black')};

	}



`;

const menuClass = (isOpen, isSmall) => {

	let classOpen = '';
	let classSize = '';

	if (isOpen) {
		
		classOpen = 'avatar-menu-open';

	} else {

		classOpen = '';
	}

	if (isSmall) {
		classSize = 'avatar-menu-small';
	} else {
		classSize = 'avatar-menu-large';
	}

	return `${classSize} ${classOpen}`;

};


function Avatar(props) {

	const [open, setOpen] = useState(false);

	const {
		avatarColor,
		arrowColor,
		textColor,
		borderColor,
		menuColor,
		small,
		value,
		handleLogout
	} = props; 


	return (
		<StyledAvatar small={small} avatarColor={avatarColor} arrowColor={arrowColor} textColor={textColor} borderColor={borderColor} menuColor={menuColor}>
			<button type="button" id="avatar-button" onClick={() => (open ? setOpen(false) : setOpen(true))}>			
				<FontAwesomeIcon icon="user-check" size="lg" id="icon-avatar" />
				<Badge variant="light" id="icon-avatar-text">{small ? `${value.substr(0, 1).toUpperCase()}` : `Hello, ${value.substr(0, 15)}!`}</Badge>
				<FontAwesomeIcon icon={ open ? "caret-up" : "caret-down" } size="lg" id="icon-avatar-arrow" />
			</button>			
			<ul className={menuClass(open, small)}>
				<li><Link to="/"><FontAwesomeIcon icon="address-card" className="icon-your-account" />Your Account</Link></li>
				<li><span onClick={() => handleLogout()}><FontAwesomeIcon icon="sign-in-alt" className="icon-logout" />Logout</span></li>
			</ul>			
		</StyledAvatar>
	);
}

export default Avatar;
