import { actionsItemsData, actionsUserData, actionsCart } from './actions';
import * as fetchItemsData from '../../modules/fetchFunctions/itemsData';
import * as fetchCart from '../../modules/fetchFunctions/cart';

const actionsAsyncFetchCategoriesData = () => {
	
	return fetchItemsData.fetchGetAllCategories().then(json => {
		
		if (json.ok) {

			const { data: { categories: docs } } = json;
								
			return Promise.resolve(docs);
		} 

		return Promise.reject(json.error);	

	}, err => {
			
		return Promise.reject(err);

	});		

};

const actionsAsyncFetchCategories = () => {
	
	return (dispatch, getState) => {
		
		dispatch(actionsItemsData.categories.fetch());
		
		let imagesAllIDs = null;
		
		return actionsAsyncFetchCategoriesData().then(docs => {
			
			imagesAllIDs = docs.reduce((acc, item) => {

				return [...acc, ...item.images];

			}, []);

						
			return fetchItemsData.fetchGetManyImages(imagesAllIDs).then(json => {
				
				const { data } = json;

				const output = data.map(item => {
					/* NOTA: EN LA API VIENE data, QUE ES UN ARRAY CONVERTIDO A JSON  */
				/* ESE ARRAY ES DE DOCUMENTOS DE LA FORMA { _id: xxx, image: xxxx }  */
				/* image es un Buffer de Node.js, pero que fué convertido en JSON  */
				/* Por lo tanto hay que convertirlo DE NUEVO a Buffer, con Buffer.from */
				/* Luego, debemos crear un Blob para poder usar URL.createObjectURL */
				/* ya que ese método solo usa Blobs o Files */
				/* Por último, URL.createObjectURL nos da el url de la imágen */
					return {
						_id: item._id,
						id: item._id,
						imageURL: URL.createObjectURL(new Blob([Buffer.from(item.image)]))
					};
				});			


				dispatch(actionsItemsData.categories.fetchSuccess(docs, output));

			}, err => {

				dispatch(actionsItemsData.categories.fetchFailure(err.message));
				
				return Promise.reject(err);
			});	


		}, err => {

			dispatch(actionsItemsData.categories.fetchFailure(err.message));

			return Promise.reject(err);			

		});
		

	};

};


const actionsAsyncFetchSubcategoriesByCategoryId = (categoryId) => {


	return (dispatch, getState) => {

		dispatch(actionsItemsData.subcategories.fetch());

		fetchItemsData.fetchGetAllSubCategoriesByCategoryId(categoryId).then(json => {

			if (json.ok) {

				const { data: { subcategories: docs } } = json;

				dispatch(actionsItemsData.subcategories.fetchSuccess(docs));

				return Promise.resolve();

			}

			dispatch(actionsItemsData.subcategories.fetchFailure(json.message));

			return Promise.reject(json.error);


		}).catch(err => {

			dispatch(actionsItemsData.subcategories.fetchFailure(err.message));

			return Promise.reject(err);
		});

	};

};

const actionsAsyncFetchSubcategoriesData = () => {
	
	return fetchItemsData.fetchGetAllSubCategories().then(json => {

		if (json.ok) {

			const { data: { subcategories: docs } } = json;
								
			return Promise.resolve(docs);
		} 

		return Promise.reject(json.error);	

	}, err => {
			
		return Promise.reject(err);

	});		

};

const actionsAsyncFetchAllSubcategories = () => {


	return (dispatch, getState) => {

		dispatch(actionsItemsData.subcategories.fetch());

		let imagesAllIDs = null;

		return actionsAsyncFetchSubcategoriesData().then(docs => {
			
			imagesAllIDs = docs.reduce((acc, item) => {

				return [...acc, ...item.images];

			}, []);
			
					
			return fetchItemsData.fetchGetManyImages(imagesAllIDs).then(json => {
								
				const { data } = json;

				const output = data.map(item => {
					/* NOTA: EN LA API VIENE data, QUE ES UN ARRAY CONVERTIDO A JSON  */
				/* ESE ARRAY ES DE DOCUMENTOS DE LA FORMA { _id: xxx, image: xxxx }  */
				/* image es un Buffer de Node.js, pero que fué convertido en JSON  */
				/* Por lo tanto hay que convertirlo DE NUEVO a Buffer, con Buffer.from */
				/* Luego, debemos crear un Blob para poder usar URL.createObjectURL */
				/* ya que ese método solo usa Blobs o Files */
				/* Por último, URL.createObjectURL nos da el url de la imágen */
					return {
						_id: item._id,
						id: item._id,
						imageURL: URL.createObjectURL(new Blob([Buffer.from(item.image)]))
					};
				});
				
				dispatch(actionsItemsData.subcategories.fetchSuccess(docs, output));

			}, err => {

				dispatch(actionsItemsData.subcategories.fetchFailure(err.message));

				return Promise.reject(err);
			});	

		}, err => {

			dispatch(actionsItemsData.subcategories.fetchFailure(err.message));

			return Promise.reject(err);

		});

	};

};

const actionsAsyncFetchDealsItemsData = async () => {

	try {

		const json = await fetchItemsData.fetchGetDealsItems();
		
		if (json.ok) {

			const { data: { results: docs } } = json;

			return docs;

		}

		throw new Error(json.error);
		
	} catch (error) {
	
		throw new Error(error);
			
	}	

};

const actionsAsyncFetchSeasonItemsData = async () => {

	try {

		const json = await fetchItemsData.fetchGetSeasonItems();
		
		if (json.ok) {

			const { data: { results: docs } } = json;

			return docs;

		}

		throw new Error(json.error);
		
	} catch (error) {
	
		throw new Error(error);
			
	}	

};

const actionsAsyncFetchDealsItems = () => {

	return (dispatch, getState) => {
		
		dispatch(actionsItemsData.dealsItems.fetch());

		let imagesAllIDs = null;


		return actionsAsyncFetchDealsItemsData().then(docs => {
			
			imagesAllIDs = docs.reduce((acc, item) => {

				return [...acc, ...item.images];

			}, []);
			

			return fetchItemsData.fetchGetManyImages(imagesAllIDs).then(json => {
				
				const { data } = json;

				const output = data.map(item => {
					/* NOTA: EN LA API VIENE data, QUE ES UN ARRAY CONVERTIDO A JSON  */
				/* ESE ARRAY ES DE DOCUMENTOS DE LA FORMA { _id: xxx, image: xxxx }  */
				/* image es un Buffer de Node.js, pero que fué convertido en JSON  */
				/* Por lo tanto hay que convertirlo DE NUEVO a Buffer, con Buffer.from */
				/* Luego, debemos crear un Blob para poder usar URL.createObjectURL */
				/* ya que ese método solo usa Blobs o Files */
				/* Por último, URL.createObjectURL nos da el url de la imágen */
					return {
						_id: item._id,
						id: item._id,
						imageURL: URL.createObjectURL(new Blob([Buffer.from(item.image)]))
					};
				});			


				dispatch(actionsItemsData.dealsItems.fetchSuccess(docs, output));

			}, err => {

				dispatch(actionsItemsData.dealsItems.fetchFailure(err.message));

				return Promise.reject(err);

			});


		}, err => {

			dispatch(actionsItemsData.dealsItems.fetchFailure(err.message));

			return Promise.reject(err);

		});


	};

};


const actionsAsyncFetchSeasonItems = () => {

	return (dispatch, getState) => {
		
		dispatch(actionsItemsData.seasonItems.fetch());

		let imagesAllIDs = null;


		return actionsAsyncFetchSeasonItemsData().then(docs => {
			
			imagesAllIDs = docs.reduce((acc, item) => {

				return [...acc, ...item.images];

			}, []);
			

			return fetchItemsData.fetchGetManyImages(imagesAllIDs).then(json => {
				
				const { data } = json;

				const output = data.map(item => {
					/* NOTA: EN LA API VIENE data, QUE ES UN ARRAY CONVERTIDO A JSON  */
				/* ESE ARRAY ES DE DOCUMENTOS DE LA FORMA { _id: xxx, image: xxxx }  */
				/* image es un Buffer de Node.js, pero que fué convertido en JSON  */
				/* Por lo tanto hay que convertirlo DE NUEVO a Buffer, con Buffer.from */
				/* Luego, debemos crear un Blob para poder usar URL.createObjectURL */
				/* ya que ese método solo usa Blobs o Files */
				/* Por último, URL.createObjectURL nos da el url de la imágen */
					return {
						_id: item._id,
						id: item._id,
						imageURL: URL.createObjectURL(new Blob([Buffer.from(item.image)]))
					};
				});			


				dispatch(actionsItemsData.seasonItems.fetchSuccess(docs, output));

			}, err => {

				dispatch(actionsItemsData.seasonItems.fetchFailure(err.message));

				return Promise.reject(err);

			});


		}, err => {

			dispatch(actionsItemsData.seasonItems.fetchFailure(err.message));

			return Promise.reject(err);

		});


	};

};

const fetchSelectedItem = async (itemId) => {

	try {

		const json = await fetchItemsData.fetchGetSelectedItem(itemId);

		if (json.ok) {

			const { data: { item } } = json;

			return item;
		}

		throw new Error(json.error);
		
	} catch (error) {
		
		throw new Error(error);

	}

};

const actionsAsyncFetchSelectedItem = (itemId) => {

	return (dispatch, getState) => {

		dispatch(actionsItemsData.selectedItem.fetch());

		return fetchSelectedItem(itemId).then(item => {

			const imagesAllIDs = item.images;


			return fetchItemsData.fetchGetManyImages(imagesAllIDs).then(json => {

				const { data } = json;

				const output = data.map(imgObject => {
					/* NOTA: EN LA API VIENE data, QUE ES UN ARRAY CONVERTIDO A JSON  */
				/* ESE ARRAY ES DE DOCUMENTOS DE LA FORMA { _id: xxx, image: xxxx }  */
				/* image es un Buffer de Node.js, pero que fué convertido en JSON  */
				/* Por lo tanto hay que convertirlo DE NUEVO a Buffer, con Buffer.from */
				/* Luego, debemos crear un Blob para poder usar URL.createObjectURL */
				/* ya que ese método solo usa Blobs o Files */
				/* Por último, URL.createObjectURL nos da el url de la imágen */
					return {
						_id: imgObject._id,
						id: imgObject._id,
						imageURL: URL.createObjectURL(new Blob([Buffer.from(imgObject.image)]))
					};
				});		
				
				
				dispatch(actionsItemsData.selectedItem.fetchSuccess(item, output));

			}, err => {

				dispatch(actionsItemsData.selectedItem.fetchFailure(err.message));

				return Promise.reject(err);

			});


		}, err => {

			dispatch(actionsItemsData.selectedItem.fetchFailure(err.message));

			return Promise.reject(err);

		});


	};

};

const actionsAsyncFetchGetCartItems = (userId) => {


	return (dispatch, getState) => {

		dispatch(actionsCart.fetch());

		let imagesAllIDs = null;

		return fetchCart.fetchGetCartItems(userId).then(json => {

			const { data: { result: cartLines } } = json;
	

			imagesAllIDs = cartLines.reduce((acc, line) => {

				return [...acc, ...line.item[0].images];

			}, []);
			
			return fetchItemsData.fetchGetManyImages(imagesAllIDs).then(json2 => {

				const { data } = json2;

				const output = data.map(item => {
					/* NOTA: EN LA API VIENE data, QUE ES UN ARRAY CONVERTIDO A JSON  */
				/* ESE ARRAY ES DE DOCUMENTOS DE LA FORMA { _id: xxx, image: xxxx }  */
				/* image es un Buffer de Node.js, pero que fué convertido en JSON  */
				/* Por lo tanto hay que convertirlo DE NUEVO a Buffer, con Buffer.from */
				/* Luego, debemos crear un Blob para poder usar URL.createObjectURL */
				/* ya que ese método solo usa Blobs o Files */
				/* Por último, URL.createObjectURL nos da el url de la imágen */
					return {
						_id: item._id,
						id: item._id,
						imageURL: URL.createObjectURL(new Blob([Buffer.from(item.image)]))
					};
				});			

				
				return fetchCart.fetchGetCartTotals(userId).then(json3 => {

					const { data: { result: pretotals } } = json3;

					const totals = pretotals[0];
					
					if(!totals) {
						const totalsZero = {
							count: 0,
							subtotal: 0,
							tax: 0,
							total: 0
						};

						return dispatch(actionsCart.fetchSuccess(cartLines, output, totalsZero));
					}

					dispatch(actionsCart.fetchSuccess(cartLines, output, totals));


				}, err => {

					dispatch(actionsCart.fetchFailure(err.message));

					return Promise.reject(err);

				});


			}, err => {

				dispatch(actionsCart.fetchFailure(err.message));

				return Promise.reject(err);

			});


		}, err => {

			dispatch(actionsCart.fetchFailure(err.message));

			return Promise.reject(err);

		});

	};


};


export {
	actionsAsyncFetchCategories,
	actionsAsyncFetchSubcategoriesByCategoryId,
	actionsAsyncFetchAllSubcategories,
	actionsAsyncFetchDealsItems,
	actionsAsyncFetchSeasonItems,
	actionsAsyncFetchSelectedItem,
	actionsAsyncFetchGetCartItems
};
