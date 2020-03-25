import React from 'react';
import styled from 'styled-components';
import image from '../../assets/gifs/loading-arrow.gif';
import image2 from '../../assets/gifs/loading-gear.gif';


const LoadingContainer = styled.div`

	width: 100%;
	height: ${props => props.height || '50vh'};
	display: flex;
	justify-content: center;
	align-items: center;
	
`;

const LoadingImage = styled.img`

	max-width: ${props => props.arrowWidth || '70px'};

`;


function Loading({ type, height, arrowWidth }) {

	let loadingImage = image;

	if (type === 'arrow') {
		loadingImage = image;
	} 
	
	if (type === 'gear') {
		loadingImage = image2;
	}

	return (
		<LoadingContainer height={height}>
			<LoadingImage src={loadingImage} arrowWidth={arrowWidth} alt="Loading..." />
		</LoadingContainer>		
	);
}

export default Loading;
