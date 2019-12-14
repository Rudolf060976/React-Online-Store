import React from 'react';
import './Loading.scss';
import image from '../../assets/gifs/loading-arrow.gif';
import image2 from '../../assets/gifs/loading-gear.gif';

function Loading({ type }) {

	let loadingImage = image;

	if (type === 'arrow') {
		loadingImage = image;
	} 
	
	if (type === 'gear') {
		loadingImage = image2;
	}

	return (
		<div className="loading-arrow-container">
			<img className="loading-arrow-image" src={loadingImage} alt="Loading..." />
		</div>
	);
}

export default Loading;
