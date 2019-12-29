import React from 'react';
import './SheetHeader.scss';

function SheetHeader({ itemObject }) {

	const { name, brand, target } = itemObject;

	const target2 = target === 'All' ? 'Everyone' : target;

	return (
		<div id="item-sheet-header-container">
			<h6>{name}</h6>
			<p id="item-sheet-header-brand">by <span>{brand}</span></p>
			<p id="item-sheet-header-for">For <span>{target2}</span></p>			
		</div>
	);
}

export default SheetHeader;
