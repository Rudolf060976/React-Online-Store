import React from 'react';
import { Link } from 'react-router-dom';
import './DealsItem.scss';

function DealsItem({ itemObject, imageObject }) {

	const itemPath = `/itemsheet/${itemObject._id}`;

	return (
		<div className="deals-item">
			<p className="deals-item-caption">{itemObject.shortName}</p>					
			<div className="deals-items-image-container">
				<div className="deals-items-image-center">
					<img src={imageObject.imageURL} alt="" className="deals-items-image" />
					<Link to={itemPath}>
						<button type="button" className="deals-items-button">Quick Look</button>
					</Link>
				</div>
				
			</div>
		</div>
	);
}

export default DealsItem;
