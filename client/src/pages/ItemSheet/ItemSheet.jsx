import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Sheet from './Sheet/Sheet';

import { actionsAsyncFetchSelectedItem } from '../../redux/actions/asyncActions';
import {
	getIsSelectedItemFetching,
	getIsSelectedItemError,
	getSelectedItemErrorMessage,
	getSelectedItem,
	getSelectedItemImages
} from '../../redux/selectors';
import Loading from '../../components/Loading1/Loading';
import FetchError from '../../components/FetchError/FetchError';

function ItemSheet({ dispatch, isFetching, isFetchingError, getErrorMessage, getItem, getImages }) {

	const { itemId } = useParams();
	
	useEffect(() => {
	
		dispatch(actionsAsyncFetchSelectedItem(itemId)).then(() => {

		
		});
			
	}, []);

	let content = null;

	if (isFetching) {

		content = (<Loading type="arrow" />);

	} else if (isFetchingError) {
		
		content = (<FetchError type="boy" message={getErrorMessage} />);

	} else {

		content = (<Sheet itemObject={getItem} itemImages={getImages} />);

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
		getImages: getSelectedItemImages(state)
	};

};

export default connect(mapStateToProps, null)(ItemSheet);
