import React from 'react';
import './ItemData.scss';

function ItemData({ name, price, quantity }) {
	return (		
		<table id="items-added-to-cart-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Quantity</th>
					<th>Price</th>
				</tr>										
			</thead>
			<tfoot>
				<tr>
					<th>{name}</th>
					<th className="table-cell-center">{quantity}</th>
					<th>$ {price}</th>
				</tr>										
			</tfoot>
			
		</table>		
		
	);
}

export default ItemData;
