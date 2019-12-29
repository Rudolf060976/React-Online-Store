import React, { useState } from 'react';
import './SheetImages.scss';

import SheetGallery from '../SheetGallery/SheetGallery';

function SheetImages({ itemImages }) {

	const [selectedId, setSelectedId] = useState(itemImages[0]._id);

	const getImageObject = imageid => {

		return itemImages.find(item => item._id === imageid);

	};

	const handleSelected = id => {

		setSelectedId(id);
		
	};
	

	return (
		<div id="item-sheet-images-container">
			<div id="item-sheet-big-image-container">
				<img id="item-sheet-big-image" src={getImageObject(selectedId).imageURL} alt="" />
			</div>
			<SheetGallery itemImages={itemImages} handleSelected={handleSelected} selectedId={selectedId} />
		</div>
	);
}

export default SheetImages;
