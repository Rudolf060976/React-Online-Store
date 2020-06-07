import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { getDealsItems, getDealsItemImages, getIsDealsFetching } from '../../redux/selectors';
import './Deals.scss';
import DealsItem from './DealsItem';
import Loading from '../Loading1/Loading';

function Deals({ getItems, getItemImages, isFetching }) {
	
	const carouselItems = getItems.map(item => {

		const imageObject = getItemImages(item._id)[0];

		return (
			<div key={item._id}>
				<DealsItem itemObject={item} imageObject={imageObject}	/>
			</div>
		);
	});
	
	const container = (
		<div id="deals-items-container">			
			<h6><Link to="/">Deals of the Day</Link></h6>						
			<Carousel indicators={false} interval={2000}>
				{carouselItems}		
			</Carousel>
		</div>
	);

	return (
		<>
			{ isFetching ? <div style={{ gridArea: 'deals', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', height: '25rem' }}><Loading type="arrow" /></div> : container }
		</>			
	);
}

const mapStateToProps = state => {

	return {
		getItems: getDealsItems(state),
		getItemImages: itemId => getDealsItemImages(state, itemId),
		isFetching: getIsDealsFetching(state)
	};

};


export default connect(mapStateToProps, null)(Deals);
