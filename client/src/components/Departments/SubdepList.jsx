/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { useState } from 'react';

function SubdepList({ subDepartmentsList, closeDepartments, selectedDepartment }) {
	
	const [selectedId, setSelectedId] = useState(null);

	const handleMouseEnter = (itemId, e) => {

		setSelectedId(itemId);

		closeDepartments();

	};

	const subDepartmentLine = (id, name, handleMouse) => {

		return (
			<li className="subdepartments-list-line" key={id}>
				<a href="#" className="subdepartments-list-line-link" onClick={handleMouse}>
					{name}
				</a>
			</li>
		);

	};
	
	return (
		<div id="subdepartments-list-container">
			<h6 id="subdepartments-list-title">{selectedDepartment.name}</h6>
			<ul id="subdepartments-list">
				{ subDepartmentsList.map(item => subDepartmentLine(item._id, item.name, (e) => handleMouseEnter(item._id, e)))}
			</ul>
		</div>
	);
}

export default SubdepList;
