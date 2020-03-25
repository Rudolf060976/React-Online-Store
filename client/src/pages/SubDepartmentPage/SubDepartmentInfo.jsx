import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`

	width: 100%;

	display: flex;
	justify-content: flex-start;
	align-items: center;

`;

const StyledImage = styled.img`

	max-width: 50px;

`;

const StyledDescriptionContainer = styled.div`



`;

const StyledNames = styled.h6`

	padding: 0;
	margin: 0;

`;

const StyledDescription = styled.p`



`;

function SubDepartmentInfo({ subdepObject, subdepImage }) {

	const { name, description } = subdepObject;

	const { name: categoryName } = subdepObject.category;

	const { imageURL } = subdepImage;


	return (
		<StyledContainer>
			<StyledImage src={imageURL} alt="" />
			<StyledDescriptionContainer>
				<StyledNames>
					{name} | {categoryName}
				</StyledNames>	
				<StyledDescription>
					{description}
				</StyledDescription>
			</StyledDescriptionContainer>			
		</StyledContainer>
	);
}

export default SubDepartmentInfo;
