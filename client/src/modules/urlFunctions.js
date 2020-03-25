const functionBuildUrlFromFilterPageLimitSort = (filter, page, limit, sort) => {

	// NOTE: filter, page & limit CAN BE UNDEFINED...
	
	const { field, order } = sort;

	const query = {
		page,
		limit,
		filter: JSON.stringify(filter),
		sort: JSON.stringify({
			field,
			order
		})
	};

	const params = new URLSearchParams(query);			
	
	return params.toString();
	
};

export { 
	
	// eslint-disable-next-line
	functionBuildUrlFromFilterPageLimitSort
};
