import React, { Component } from 'react';
import Deals from '../components/DealsOfTheDay/Deals';
import Animation1 from '../components/Animation1/Animation1';
import Season from '../components/SeasonItems/Season';
import './Home.scss';


export default class Home extends Component {
	render() {
		return (
			<>
				<div id="home-grid">
					<Deals />				
					<Animation1 />
					<Season />
				</div>
			</>
		);
	}
}
