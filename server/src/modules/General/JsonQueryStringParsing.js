
function queryStringToJSON(qs) {
	//qs = qs || location.search.slice(1);

	var pairs = qs.split('&');
	var result = {};
	/* eslint-disable-next-line */
	pairs.forEach (function(p) {
		var pair = p.split('=');
		var key = pair[0];
		var value = decodeURIComponent(pair[1] || '');

		if( result[key] ) {
			if( Object.prototype.toString.call( result[key] ) === '[object Array]' ) {
				result[key].push( value );
			} else {
				result[key] = [ result[key], value ];
			}
		} else {
			result[key] = value;
		}
	});

	return JSON.parse(JSON.stringify(result));
}

module.exports = queryStringToJSON;