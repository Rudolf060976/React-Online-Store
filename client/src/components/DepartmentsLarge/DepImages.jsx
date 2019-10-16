import React from 'react';


function DepImages({ imagesList }) {
	
	return (
		<div id="departments-images-list-container">
			<ul id="departments-images-list">			
				{ imagesList.map((item, index) => (
					<li id={`department-menu-list-item-${index}`} key={item._id}><img id={`department-menu-image-${index}`} src={item.imageURL} alt="" /></li>	
				))}
			</ul>
		</div>
	);
}

export default DepImages;
