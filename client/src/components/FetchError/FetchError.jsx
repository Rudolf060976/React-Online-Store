import React from 'react';
import './FetchError.scss';
import image from '../../assets/images/errorIcon..svg';
import boy from '../../assets/images/FETCH_ERROR.jpg';

function FetchError({ type, message }) {

	let errorImage = image;

	if (type === 'normal') {
		errorImage = image;
	}

	if (type === 'boy') {
		errorImage = boy;
	}

	return (
		<div className="fetching-error-container">
			<img className="fetching-error-image" src={errorImage} alt="Error..." />
			{ message ? (<p>{ message }</p>) : null }
		</div>
	);
}

export default FetchError;
