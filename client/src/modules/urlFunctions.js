const functionBuildUrlFromFilterPageLimit = (filter, page, limit) => {

	// NOTE: filter, page & limit CAN BE UNDEFINED...
	
	const params = new URLSearchParams();			

	if (page) {
		params.append('page', page);
	}

	if (limit) {
		params.append('limit', limit);
	}

	if (Object.keys(filter) > 0) {

		Object.keys(filter).forEach(key => {

			params.append(key, filter[key]);

		});
					
	}			
	
	return params.toString();

};

export { 
	
	// eslint-disable-next-line
	functionBuildUrlFromFilterPageLimit
};
