/* eslint jsx-a11y/anchor-is-valid: "off" */
/* eslint jsx-a11y/control-has-associated-label: "off" */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import DepImages from './DepImages';

function SubdepList({ subDepartmentsList, imagesList, selectedDepartment, handleClose }) {

	const [visible, setVisible] = useState(false);

	const always = true;

	useEffect(() => {
			
		setVisible(true);
		
	}, [always]);

	const subdepartmentLine = (id, name, handleClick) => {
		
		return (
			<li className="departments-small-subdeplist-line" key={id}>
				<a className="departments-small-subdeplist-line-link" href="#" onClick={handleClick}>
					{name}
				</a>				
			</li>
		);

	};

	const handleBackButtonClick = e => {

		setVisible(false);
		
		setTimeout(() => {

			handleClose();

		}, 300);  
	
	};

	const handleMouseClick = (id, e) => {

	
	};


	return (
		<CSSTransition in={visible} timeout={500} classNames="my-mobile-menu-subdeplist-effect">	
			<div id="departments-small-subdeplist-container">					
				<h4>{selectedDepartment.name}</h4>
				<button type="button" id="departments-small-subdeplist-back-button" onClick={handleBackButtonClick}><FontAwesomeIcon className="departments-small-subdeplist-back-button-icon" icon="arrow-left" size="lg" />Back</button>
				<ul id="departments-small-subdeplist">
					{ subDepartmentsList.map(item => subdepartmentLine(item._id, item.name, e => handleMouseClick(item._id, e)))}
				</ul>
				<DepImages imagesList={imagesList} />
			</div>
		</CSSTransition>
	);
}

export default SubdepList;
