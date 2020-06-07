import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { getSeasonItems, getSeasonItemImages, getIsSeasonFetching } from '../../redux/selectors';
import './Season.scss';
import SeasonItem from './SeasonItem';
import Loading from '../Loading1/Loading';

function Season({ getItems, getItemImages, isFetching }) {
	
	
	const maxCount = getItems.length;

	const carouselItemArray = [];
	
	for (let i = 0; i < maxCount; i += 2) {
		console.log('getItems:' , getItems);
		const imageObject1 = getItemImages(getItems[i]._id)[0];
		
		let imageObject2 = null;
		
		if (getItems[i + 1]) {

			imageObject2 = getItemImages(getItems[i + 1]._id)[0];

		} else {

			imageObject2 = {
				imageURL: ''
			};
		}		

		const element = (
			<div key={getItems[i]._id}>			
				<div className="season-item">
					<SeasonItem itemObject={getItems[i]} imageObject={imageObject1} />
					<SeasonItem itemObject={getItems[i + 1]} imageObject={imageObject2} />
				</div>
			</div>
		);

		carouselItemArray.push(element);

	}

	const container = (
		<div id="season-items-container">
			<h6><Link to="/">Season Deals</Link></h6>		
			<Carousel indicators={false} interval={4000} fade>
				{ carouselItemArray }
			</Carousel>
		</div>		
	);


	return (
		<>
			{ isFetching ? <div style={{ gridArea: 'season', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', height: '25rem' }}><Loading type="arrow" height="20rem" /></div> : container }
		</>
	);
}

const mapStateToProps = state => {

	return {
		getItems: getSeasonItems(state),
		getItemImages: itemId => getSeasonItemImages(state, itemId),
		isFetching: getIsSeasonFetching(state)
	};

};

export default connect(mapStateToProps, null)(Season);
