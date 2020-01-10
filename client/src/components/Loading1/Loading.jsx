import React from 'react';
import styled from 'styled-components';
import image from '../../assets/gifs/loading-arrow.gif';
import image2 from '../../assets/gifs/loading-gear.gif';


const LoadingContainer = styled.div`

	width: 100%;
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
	
`;

const LoadingImage = styled.img`

	max-width: 100px;

`;


function Loading({ type }) {

	let loadingImage = image;

	if (type === 'arrow') {
		loadingImage = image;
	} 
	
	if (type === 'gear') {
		loadingImage = image2;
	}

	return (
		<LoadingContainer>
			<LoadingImage src={loadingImage} alt="Loading..." />
		</LoadingContainer>		
	);
}

export default Loading;
