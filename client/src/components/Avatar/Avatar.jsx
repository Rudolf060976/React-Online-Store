import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'react-bootstrap';

const StyledAvatar = styled('div')`
	
	padding: 0;
	background:  rgba(${props => props.bgColor || 'transparent'},.5);
	
	#avatar-button {
		background: transparent;
		border: none;
		transition: all 0.3s linear;
		padding: 5px;
	}

	#avatar-button:hover {
		
		border-radius: 5px;	
		box-shadow: 1px 1px 20px whitesmoke;	
	}

	#avatar-button:focus {
		outline: 0;
	}

	#icon-avatar {		
		color: ${props => props.avatarColor || 'white'};
		font-size: 1.5rem;
		margin: 0;
		margin-right: 5px;
		padding: 0;		
	}

	#icon-avatar-text {
		
		margin-right: 5px;
		color: ${props => props.textColor || 'black'}
	}

	#icon-avatar-arrow {

		color: ${props => props.arrowColor || 'white'}; ;
		font-size: 1.5rem;
		
	}

	#caret-down {
		padding: 0;
		margin: 0;
	}
	
`;


function Avatar(props) {
	const {
		avatarColor,
		arrowColor,
		textColor,
		borderColor,
		small,
		value
	} = props; 

	return (
		<StyledAvatar avatarColor={avatarColor} arrowColor={arrowColor} textColor={textColor} borderColor={borderColor}>
			<button type="button" id="avatar-button">			
				<FontAwesomeIcon icon="user-check" size="lg" id="icon-avatar" />
				<Badge variant="light" id="icon-avatar-text">{small ? `${value.substr(0, 1).toUpperCase()}` : `Hello, ${value.substr(0, 15)}!`}</Badge>
				<FontAwesomeIcon icon="caret-down" size="lg" id="icon-avatar-arrow" />
			</button>
		</StyledAvatar>
	);
}

export default Avatar;
