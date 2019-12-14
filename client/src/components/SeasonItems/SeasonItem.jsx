import React from 'react';
import './SeasonItem.scss';
import ItemInfo from '../ItemQuickInfo1/ItemInfo';

function SeasonItem({ itemObject, imageObject }) {

	const output = (
		<div className="season-item-image-container">					
			<img className="season-item-image" src={imageObject.imageURL} alt="" />
			<div className="season-item-info-container">
				<ItemInfo itemObject={itemObject} />
			</div>	
		</div>
	);

	return (
		<>		
			{ itemObject !== undefined ? output : null }
		</>
	);
}

export default SeasonItem;
