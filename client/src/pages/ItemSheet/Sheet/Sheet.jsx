import React from 'react';
import './Sheet.scss';
import SheetHeader from '../SheetHeader/SheetHeader';
import SheetImages from '../SheetImages/SheetImages';
import SheetPrice from '../SheetPrice/SheetPrice';
import SheetStock from '../SheetStock/SheetStock';
import SheetFeatures from '../SheetFeatures/SheetFeatures';
import SheetBuy from '../SheetBuy/SheetBuy';

function Sheet({ itemObject, itemImages }) {
	return (
		<div id="item-sheet-container">
			<SheetHeader itemObject={itemObject} />
			{ itemImages.length > 0 ? (<SheetImages itemImages={itemImages} />) : null }
			<SheetPrice itemObject={itemObject} />
			<SheetStock itemObject={itemObject} />			
			{ itemObject.keyFeatures ? <SheetFeatures keyFeatures={itemObject.keyFeatures} /> : null }
			<SheetBuy itemObject={itemObject} />
		</div>
	);
}

export default Sheet;
