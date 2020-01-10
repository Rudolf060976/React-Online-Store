import React from 'react';
import './AddedToCart.scss';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import missingImage from '../../assets/images/missing-image.png';
import ItemData from './ItemData/ItemData';


function AddedToCart({ itemObject, itemImages, quantity, cartTotals }) {

	const { shortName, price } = itemObject;


	return (
		<div className="item-added-to-cart-container">
			<h6><FontAwesomeIcon icon="check" size="sm" className="item-added-to-cart-icon" />Item Added to Cart!</h6>
			{ itemImages ? (<img src={itemImages[0].imageURL} alt="" className="item-added-to-cart-image" />) : missingImage }
			<ItemData name={shortName} price={price.$numberDecimal} quantity={quantity} />
			{cartTotals.count ? (<p id="item-added-to-cart-cart-data"><span>Cart Subtotal</span> ({cartTotals.count} items): $ {cartTotals.subtotal.$numberDecimal}</p>) : null }
			<div id="item-added-to-cart-buttons-container">
				<Link to="/cart"><Button variant="warning" size="md">Go to Cart</Button></Link>
				<Link to="/"><Button variant="primary" size="md">Continue Shopping</Button></Link>
			</div>			
		</div>
	);
}

export default AddedToCart;
