import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Sheet from './Sheet/Sheet';
import AddedToCart from '../AddedToCart/AddedToCart';
import { fetchPostCartItem } from '../../modules/fetchFunctions/cart';

import { actionsAsyncFetchSelectedItem, actionsAsyncFetchGetCartItems } from '../../redux/actions/asyncActions';
import {
	getIsSelectedItemFetching,
	getIsSelectedItemError,
	getSelectedItemErrorMessage,
	getSelectedItem,
	getSelectedItemImages,
	getIsLoggedUser,
	getUserProfile,
	getCartTotals
} from '../../redux/selectors';
import Loading from '../../components/Loading1/Loading';
import FetchError from '../../components/FetchError/FetchError';


function ItemSheet({ dispatch, isFetching, isFetchingError, getErrorMessage, getItem, getImages, isUserLogged, userProfile, cartTotals }) {

	const { itemId } = useParams();

	const [showAddedToCart, setShowAddedToCart] = useState(false);
	const [quant, setQuant] = useState(0);
	

	const history = useHistory();

	const handleAddToCart = quantity => {

		const qty = Number.parseInt(quantity, 10);
		
				
		if (qty > 0) {
			
			if (!isUserLogged) {

				setShowAddedToCart(false);

				history.push('/login');

			} else {
				
				setQuant(qty);

				fetchPostCartItem(userProfile._id, itemId, qty).then(() => {
						
					dispatch(actionsAsyncFetchGetCartItems(userProfile._id)).then(() => {							
						
											
						setShowAddedToCart(true);	

					});

				});

			}
		}	
	};


	useEffect(() => {
	
		dispatch(actionsAsyncFetchSelectedItem(itemId)).then(() => {
			
			dispatch(actionsAsyncFetchGetCartItems(userProfile._id)).then(() => {


			});
		
		});
			
	}, []);


	let content = null;

	if (isFetching) {

		content = (<Loading type="arrow" />);

	} else if (isFetchingError) {
		
		content = (<FetchError type="boy" message={getErrorMessage} />);

	} else if (showAddedToCart) {

		content = (
			<div style={{ width: '100%', position: 'relative', opacity: 1 }}>
				<AddedToCart itemObject={getItem} itemImages={getImages} quantity={quant} cartTotals={cartTotals} />
				<Sheet itemObject={getItem} itemImages={getImages} handleAddToCart={handleAddToCart} lowOpacity />
			</div>
		);
		
	} else {

		content = (<Sheet itemObject={getItem} itemImages={getImages} handleAddToCart={handleAddToCart} />);


	}

	
	return (
		<>
			{content}
		</>
	);
}


const mapStateToProps = state => {

	return {
		isFetching: getIsSelectedItemFetching(state),
		isFetchingError: getIsSelectedItemError(state),
		getErrorMessage: getSelectedItemErrorMessage(state),
		getItem: getSelectedItem(state),
		getImages: getSelectedItemImages(state),
		isUserLogged: getIsLoggedUser(state),
		userProfile: getUserProfile(state),
		cartTotals: getCartTotals(state)
	};

};

export default connect(mapStateToProps, null)(ItemSheet);
