import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

	grid-area: features;
	padding: 20px;
	background-color: white;

`;

const StyledTitle = styled.h6`

	color: #354069;
	padding: 0;
	margin: 0;
	font-family: "Lilita One", Verdana, Geneva, Tahoma, sans-serif;
	padding-left: 20px;
	font-size: 1.5rem;
`;

const StyledList = styled.ul`

	list-style: none;
	

`;

const StyledListLine = styled.li`

	padding-left: 20px;

`;

const StyledLineTitle = styled.p`

	padding: 0;
	margin: 0;
	font-size: 1.2rem;
	font-weight: bold;
	color: rgba(0,0,0,.7);
`;


const StyledLineDescription = styled.p`

	padding: 0;
	margin: 0;
	font-size: 1.2rem;

`;

function SheetFeatures({ keyFeatures }) {

	
	const listLine = (index, title, description) => {

		return (
			<StyledListLine key={index}>
				{ title ? <StyledLineTitle>- {title}</StyledLineTitle> : null }
				{ description ? <StyledLineDescription>{description}</StyledLineDescription> : null }
			</StyledListLine>
		);

	};


	return (
		<Container>
			<StyledTitle>Key Features:</StyledTitle>
			<StyledList>
				{ keyFeatures.map((item, index) => listLine(index, item.title, item.description))}
			</StyledList>
		</Container>
	);
}

export default SheetFeatures;
