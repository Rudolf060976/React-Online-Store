import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`

	grid-area: buy;
	background-color: white;

	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	padding: 15px 0;
	
`;

const StyledSelect = styled.select`

	font-family: "Rubik", Verdana, Geneva, Tahoma, sans-serif;	
	font-size: 1.2rem;
	margin-left: 5px;
	padding: 5px;

`;

const StyledLabel = styled.label`

	font-family: "Rubik", Verdana, Geneva, Tahoma, sans-serif;	
	font-size: 1.2rem;	
`;

const StyledButton = styled.button`

	font-family: "Rubik", Verdana, Geneva, Tahoma, sans-serif;	
	font-size: 1.2rem;
	padding: 0 10px;
	

	color: #354069;
	background-color: transparent;
	border-radius: 5px;
	border: solid 1px #ffc107;
	box-shadow: 1px 1px 8px rgba(0,0,0,.4);
	transition: all .2s linear;

	&:hover {
		background-color: #ffc107

	}

	&:focus {
		outline: 0;
	}

	&:active {
		box-shadow: none;
	}

`;

function SheetBuy({ itemObject, handleAddToCart }) {

	const { stock } = itemObject;

	const [quantity, setQuantity] = useState(0);
	
	const createSelect = stk => {
		
		const stockInt = Number.parseInt(stk, 10);

		if (Number.isNaN(stockInt)) {

			return null;
		}

		const controlArray = [];

		for (let i = 0; i < stockInt; i++) {

			controlArray.push(i + 1);
			
		}

		if (controlArray.length === 0) {
			controlArray.push(0);
		} 

		const output = controlArray.map(item => {

			return (
				<option key={item.toString()} value={item}>{item}</option>				
			);

		});

		return output;

	};

	const isNumber = num => {

		if (typeof num === 'number' && !Number.isNaN(num)) {
			return true;
		}

		return false;

	};

	function handleChange(e) {

		setQuantity(e.target.value);

	}

	function handleClick() {
		
		const stockInt = Number.parseInt(stock, 10);

		if (stockInt > 0 && quantity === 0) {

			handleAddToCart(1);
		} else {

			handleAddToCart(quantity);

		}		
		
	}

	return (
		<Container>
			{ isNumber(stock) ? <StyledLabel>Quantity: <StyledSelect onChange={handleChange} value={quantity}>{ createSelect(stock) }</StyledSelect></StyledLabel> : null}<StyledButton onClick={handleClick}><FontAwesomeIcon icon="shopping-cart" size="sm" />  Add to Cart</StyledButton>				
		</Container>
	);
}


export default SheetBuy;
