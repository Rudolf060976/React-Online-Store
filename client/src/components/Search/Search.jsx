import React from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Search.scss';


function Search() {
	return (
		<div id="header-search-container">
			<InputGroup className="mb-3" size="lg">
				<InputGroup.Prepend>
					<Button variant="outline-warning"><FontAwesomeIcon icon="search" /></Button>
				</InputGroup.Prepend>
				<FormControl id="input-search" placeholder="Search here for Products, Brands and More..." />
			</InputGroup>
		</div>
	);
}

export default Search;
