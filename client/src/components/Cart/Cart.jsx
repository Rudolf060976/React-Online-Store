import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const StyledCart = styled.div.attrs(props => ({
	size: props.size || 'sm',	
	width: () => {
		switch (props.size) {
		case 'lg':
			return '130px';
		case 'sm':
			return '90px';
		default:
			return '90px';
		}			
	}
	
}))`
	width: ${props => props.width()};	
	box-shadow: 1px 1px 5px whitesmoke;
	border-radius: 5px;	
	transition: all 0.3s linear;
	margin: ${props => props.margin};	
	
	&:focus {
		outline: 0;
	}
`;

const Button = styled.button.attrs(props => ({
	size: props.size || 'sm',	
	width: () => {
		switch (props.size) {
		case 'lg':
			return '130px';
		case 'sm':
			return '90px';
		default:
			return '90px';
		}			
	},
	fontSize: () => {
		switch (props.size) {
		case 'lg':
			return '1.8rem';
		case 'sm':
			return '1.3rem';
		default:
			return '1.3rem';
		}			
	},
	counterFontSize: () => {
		switch (props.size) {
		case 'lg':
			return '1.6rem';
		case 'sm':
			return '1.1rem';
		default:
			return '1.1rem';
		}			
	},
	leftMarginCounter: () => {
		switch (props.size) {
		case 'lg':
			return '6px';
		case 'sm':
			return '1px';
		default:
			return '1px';
		}			
	}

}))`
	width: ${props => props.width()};	
	color: ${props => props.fgColor};
	border: ${props => props.fgColor} solid 1px;
	background: ${props => props.bgColor};
	border-radius: 5px;
	transition: all 0.3s linear;
	font-size: ${props => props.fontSize()};
	
	&:hover {
		border: ${props => props.bgColor} solid 1px;
		background: ${props => props.fgColor};
		color: ${props => props.bgColor};

		#cart-counter {
			color: ${props => props.bgColor};
		}
	}

	&:focus {
		outline: 0;
	}
	
	#cart-counter {
		margin-left: ${props => props.leftMarginCounter()};;
		color: white;
		font-size: ${props => props.counterFontSize()};	
		transition: all 0.3s linear;	
	}
`;


class Cart extends Component {
	render() {
		
		return (
			<StyledCart size={this.props.size} margin={this.props.margin}>
				<Link to="/">
					<Button size={this.props.size} fgColor={this.props.fgColor} bgColor={this.props.bgColor}>
						<FontAwesomeIcon icon="shopping-cart" className="icon-main-nav icon-cart" />Cart
						<Badge variant="outline-warning" id="cart-counter">{this.props.value}</Badge>
					</Button>
				</Link>
			</StyledCart>
		);
	}
}

export default Cart;
