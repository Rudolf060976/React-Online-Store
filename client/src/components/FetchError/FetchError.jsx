import React from 'react';
import styled from 'styled-components';
import image from '../../assets/images/errorIcon..svg';
import boy from '../../assets/images/FETCH_ERROR.jpg';


const FetchErrorContainer = styled.div`

	width: 100%;
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
	
`;

const FetchErrorImage = styled.img`

	max-width: 100px;

`;


function FetchError({ type, message }) {

	let errorImage = image;

	if (type === 'normal') {
		errorImage = image;
	}

	if (type === 'boy') {
		errorImage = boy;
	}

	return (
		<FetchErrorContainer>
			<FetchErrorImage src={errorImage} alt="Error..." />
		</FetchErrorContainer>			
	);
}

export default FetchError;
