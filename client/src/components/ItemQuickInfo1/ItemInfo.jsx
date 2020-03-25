import React from 'react';
import { Link } from 'react-router-dom';
import './ItemInfo.scss';

function ItemInfo({ itemObject }) {

	const itemPath = `/itemsheet/${itemObject._id}`;

	return (
		<div className="item-info1-container">
			<p className="item-info1-caption">{itemObject.shortName}</p>
			<Link to={itemPath}>
				<button type="button" className="item-info1-button">Quick Look</button>
			</Link>
		</div>
	);
}

export default ItemInfo;
