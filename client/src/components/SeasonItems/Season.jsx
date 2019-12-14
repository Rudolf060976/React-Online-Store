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

		const imageObject1 = getItemImages(getItems[i]._id)[0];
		const imageObject2 = getItemImages(getItems[i + 1]._id)[0];

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
			<h6><Link to="/">Christmas Deals</Link></h6>		
			<Carousel indicators={false} interval={4000} fade>
				{ carouselItemArray }
			</Carousel>
		</div>		
	);


	return (
		<>
			{ isFetching ? <Loading type="gear" /> : container }
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
