/* eslint jsx-a11y/anchor-is-valid: "off" */
/* eslint jsx-a11y/control-has-associated-label: "off" */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';


function DepList({ departmentsList, selectedDepartment, handleClose }) {

	const [visible, setVisible] = useState(false);
	const [hoveredId, setHoveredId] = useState(null);
	const always = true;

	useEffect(() => {
			
		setVisible(true);
		
	}, [always]);

	const handleMouseHover = (id, e) => {
		
		if (id !== hoveredId) {
			setHoveredId(id);
		}		

	};

	const handleBackButtonClick = e => {

		setVisible(false);
		
		setTimeout(() => {

			handleClose();

		}, 300);  
		

	};

	const handleMouseClick = (id, e) => {

		
		selectedDepartment(id);

	};

	const departmentLine = (id, name, handleHover, handleClick) => {
		
		return (
			<li className="departments-small-deplist-line" key={id} onMouseEnter={handleHover}>
				<a className="departments-small-deplist-line-link" href="#" onClick={handleClick}>
					{name}
				</a>
				{ (hoveredId === id) ? <FontAwesomeIcon className="departments-small-deplist-line-icon" icon="angle-right" size="lg" /> : null}
			</li>
		);

	};


	return (
		<CSSTransition in={visible} timeout={500} classNames="my-mobile-menu-deplist-effect">	
			<div id="departments-small-deplist-container">								<h4>Departments</h4>
				<button type="button" id="departments-small-deplist-back-button" onClick={handleBackButtonClick}><FontAwesomeIcon className="departments-small-deplist-back-button-icon" icon="arrow-left" size="lg" />Back</button>
				<ul id="departments-small-deplist">
					{ departmentsList.map(item => departmentLine(item._id, item.name, e => handleMouseHover(item._id, e), e => handleMouseClick(item._id, e)))}
				</ul>
			</div>
		</CSSTransition>
	);
}

export default DepList;
