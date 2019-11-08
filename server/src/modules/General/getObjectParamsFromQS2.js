
const getObjectParamsFromQS2 = req => {

	const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

	const myUrl = new URL(fullUrl);
			
	const params = new URLSearchParams(myUrl.search);

	let filter;
	
	try {

		filter = JSON.parse(params.get('filter'));
		
	} catch (error) {
		
		filter = {
			ids: []
		};

	}
		
	return filter;

}

module.exports = getObjectParamsFromQS2;