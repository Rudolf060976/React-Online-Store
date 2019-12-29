import React from 'react';
import './SheetGallery.scss';

function SheetGallery({ itemImages, handleSelected, selectedId }) {

	const handleMouseEnter = (imageId, e) => {

		handleSelected(imageId);

	};

	const getClassName = id => {

		if (id === selectedId) {
			return 'item-sheet-gallery-list-line selected-in-item-gallery';
		} 

		return 'item-sheet-gallery-list-line';
		
	};

	
	const galleryLine = (imageId, imageURL, handleClick) => {

		return (
			<li className={getClassName(imageId)} key={imageId} onMouseEnter={handleClick}>
				<img className="item-sheet-gallery-image" src={imageURL} alt="" />
			</li>
		);
	};

	return (
		<div id="item-sheet-gallery-container">
			<ul id="item-sheet-gallery-list">
				{ itemImages.map(item => galleryLine(item._id, item.imageURL, e => handleMouseEnter(item._id, e))) }
			</ul>
		</div>
	);
}

export default SheetGallery;
