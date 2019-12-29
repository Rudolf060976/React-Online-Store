import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	grid-area: price;
	background-color: white;
	padding: 30px 10px;
	
`;

const StyledTitle = styled.p`

	color: #354069;
	padding: 0;
	margin: 0;
	font-family: "Squada One", Verdana, Geneva, Tahoma, sans-serif;
	letter-spacing: 1px;
	line-height: 2rem;
	font-size: 1.6rem;
	margin-bottom: 15px;
	text-align: center;
	
`; 

const StyledPrice = styled.p`

	color: black;
	padding: 0;
	margin: 0;
	font-family: "Rubik", Verdana, Geneva, Tahoma, sans-serif;
	font-size: 1.4rem;
	font-weight: 500;
	margin-bottom: 15px;
	padding-left: 20px;
`;

const StyledCondition = styled.p`

	color: black;
	padding: 0;
	margin: 0;
	font-family: "Rubik", Verdana, Geneva, Tahoma, sans-serif;
	font-size: 1.2rem;
	font-weight: 400;
	padding-left: 20px;
`;

const StyledSpan = styled.span`

	color: rgba(255, 100, 100, 1);


`;


function SheetPrice({ itemObject }) {

	const { shortName, price, condition } = itemObject;
	
	return (
		<Container>
			<StyledTitle>
				{ shortName }
			</StyledTitle>
			<StyledPrice>
				{ `Price: $ ${price ? price.$numberDecimal : ''}`}
			</StyledPrice>
			<StyledCondition>
				Condition: <StyledSpan>{condition}</StyledSpan>				
			</StyledCondition>
		</Container>
	);
}

export default SheetPrice;
