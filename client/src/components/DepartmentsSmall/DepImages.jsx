import React from 'react';

function DepImages({ imagesList }) {
	return (
		<div id="departments-small-images-list-container">
			<ul id="departments-small-images-list">			
				{ imagesList.map((item, index) => (
					<li id={`department-small-menu-list-item-${index}`} key={item._id}><img id={`department-small-menu-image-${index}`} src={item.imageURL} alt="" /></li>	
				))}
			</ul>
		</div>
	)
}

export default DepImages;
