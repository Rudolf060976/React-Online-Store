/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function DepList({ departmentsList, selectedDepartment, initialDepId }) {
	
	const [selectedId, setSelectedId] = useState(initialDepId);

	const handleMouseEnter = (itemId, e) => {

		selectedDepartment(itemId);

		setSelectedId(itemId);

	};


	const departmentLine = (id, name, handleMouse) => {
		
		return (
			<li className="departments-list-line" key={id} onMouseEnter={handleMouse}>
				<a className="departments-list-line-link" href="#">
					{name}
				</a>
				{ (selectedId === id) ? <FontAwesomeIcon className="departments-list-line-icon" icon="angle-right" size="lg" /> : null}
			</li>
		);

	};

	return (
		<div id="departments-list-container">
			<ul id="departments-list">
				{ departmentsList.map(item => departmentLine(item._id, item.name, (e) => handleMouseEnter(item._id, e)))}
			</ul>
		</div>
	);
}

export default DepList;
