import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const StyledCart = styled.div`
	box-shadow: 1px 1px 5px whitesmoke;
	border-radius: 5px;	
	transition: all 0.3s linear;	
	
	&:focus {
		outline: 0;
	}
`;

const Button = styled.button.attrs(props => ({
	size: props.size || 'sm',		
	fontSize: () => {
		switch (props.size) {
		case 'lg':
			return '1.7rem';
		case 'sm':
			return '1.4rem';
		default:
			return '1.4rem';
		}			
	},
	counterFontSize: () => {
		switch (props.size) {
		case 'lg':
			return '1.3rem';
		case 'sm':
			return '1.2rem';
		default:
			return '1.2rem';
		}			
	},
	counterMargin: () => {
		switch (props.size) {
		case 'lg':
			return '0 0 0 5px';
		case 'sm':
			return '0 0 0 1px';
		default:
			return '0 0 0 1px';
		}			
	},
	padding: () => {
		switch (props.size) {
		case 'lg':
			return '5px 12px';
		case 'sm':
			return '2px 5px';
		default:
			return '2px 5px';
		}			
	},
	defaultFgColor: 'blue',
	defaultCounterColor: 'black'
}))`
	width:100%;
	color: ${props => props.fgColor || props.defaultFgColor};
	border: ${props => props.fgColor || props.defaultFgColor} solid 1px;
	background: ${props => props.bgColor || 'white'};
	border-radius: 5px;
	transition: all 0.3s linear;
	font-size: ${props => props.fontSize()};
	padding: ${props => props.padding()};
	
	&:hover {
		border: ${props => props.bgColor || 'white'} solid 1px;
		background: ${props => props.fgColor || props.defaultFgColor};
		color: ${props => props.bgColor || 'white'};

		#cart-counter {
			color: ${props => props.bgColor || 'white'};
		}
	}

	&:focus {
		outline: 0;
	}
	
	#cart-counter {
		margin: ${props => props.counterMargin()};
		padding: 0;
		color: ${props => props.counterColor || props.defaultCounterColor};
		font-size: ${props => props.counterFontSize()};	
		transition: all 0.3s linear;	
	}
`;


const Cart = function (props) {
	
	const {
		fgColor,
		bgColor,
		size,		
		value,
		counterColor,
	} = props;
	
	return (
		<StyledCart size={size}>
			<Link to="/">
				<Button size={size} fgColor={fgColor} bgColor={bgColor} counterColor={counterColor}>
					<FontAwesomeIcon icon="shopping-cart" className="icon-main-nav icon-cart" />Cart
					<Badge variant="outline-warning" id="cart-counter">{`( ${value} )`}</Badge>
				</Button>
			</Link>
		</StyledCart>
	);
	
};

export default Cart;
