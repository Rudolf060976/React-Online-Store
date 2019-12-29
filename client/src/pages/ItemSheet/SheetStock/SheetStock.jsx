import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	grid-area: stock;
	background-color: white;
	padding: 20px 10px;
`;


const StyledTitle = styled.p`
	padding: 0;
	margin: 0;
	text-align: center;
	color: ${props => props.inStock ? 'rgba(0,0,0,0.7)' : 'rgba(255, 100, 100,1)'};
	font-family: "Lilita One", Verdana, Geneva, Tahoma, sans-serif;
	letter-spacing: 1px;
	font-size: 1.4rem;
	margin-bottom: 15px;
`;

const StyledStock = styled.p`

	padding: 0;
	margin: 0;
	text-align: center;
	color: black;
	font-family: "Rubik", Verdana, Geneva, Tahoma, sans-serif;
	
	line-height: 2rem;
	font-size: 1.2rem;
	margin-bottom: 15px;

`;

const StyledSoldBy = styled.p`

	padding: 0;
	margin: 0;
	text-align: center;
	color: black;
	font-size: 1.2rem;
`;

const StyledSpan = styled.span`

	color: rgba(255, 100, 100, 1);


`;


function SheetStock({ itemObject }) {

	const { inStock, stock } = itemObject;

	const inStockMessage = inStock ? 'In Stock' : 'Currently not available';

	const stockMessage = inStock ? `Only ${stock} in stock. Order soon` : 'Will be in Stock soon';

	return (
		<Container>
			<StyledTitle inStock={inStock}>{ inStockMessage }</StyledTitle>			
			<StyledStock>{ stockMessage }</StyledStock>	
			<StyledSoldBy>Sold By <StyledSpan>BitZone</StyledSpan></StyledSoldBy>		
		</Container>
	);
}

export default SheetStock;
