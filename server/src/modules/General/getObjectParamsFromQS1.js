
const getObjectParamsFromQS1 = req => {

	const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

	const myUrl = new URL(fullUrl);
			
	const params = new URLSearchParams(myUrl.search);

	let filter;
	
	try {

		filter = JSON.parse(params.get('filter'));
		
	} catch (error) {
		
		filter = {};

	}
	
	const page = params.get('page');

	const limit = params.get('limit');

	let sort = params.get('sort');

	try {

		sort = JSON.parse(sort);	
		
		sort = {
			[sort.field]: sort.order
		};

	} catch (error) {

		sort = { 'name': 'ASC' };
		
	}

	return { page, limit, sort, filter };

}

module.exports = getObjectParamsFromQS1;