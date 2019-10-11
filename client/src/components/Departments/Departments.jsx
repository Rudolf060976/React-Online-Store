import React, { Component } from 'react';

import './Departments.scss';
import DepList from './DepList';
import SubdepList from './SubdepList';
import DepImages from './DepImages';

class Departments extends Component {

	render() {
		return (
			<div id="departments-container">
				<DepList />
				<SubdepList />
				<DepImages />
			</div>
		);
	}
}

export default Departments;
