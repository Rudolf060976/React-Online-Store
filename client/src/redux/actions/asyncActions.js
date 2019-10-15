import { actionsItemsData, actionsUserData } from './actions';
import * as fetchItemsData from '../../modules/fetchFunctions/itemsData';


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
			
			const fetchArray = [];

			for (let j = 0; j < imagesAllIDs.length; j++) {

				fetchArray.push(fetchItemsData.fetchGetImage(imagesAllIDs[j]));
				
			}		
			
			return Promise.all(fetchArray).then((images) => {
				
				const output = [];

				for (let i = 0; i < imagesAllIDs.length; i++) {

					output.push({
						_id: imagesAllIDs[i],
						imageURL: URL.createObjectURL(images[i])
					});
				}
				
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
			
			const fetchArray = [];

			for (let j = 0; j < imagesAllIDs.length; j++) {

				fetchArray.push(fetchItemsData.fetchGetImage(imagesAllIDs[j]));
				
			}
			
			return Promise.all(fetchArray).then(images => {
								
				const output = [];

				for (let i = 0; i < imagesAllIDs.length; i++) {

					output.push({
						_id: imagesAllIDs[i],
						imageURL: URL.createObjectURL(images[i])
					});
				}
				
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


export {
	actionsAsyncFetchCategories,
	actionsAsyncFetchSubcategoriesByCategoryId,
	actionsAsyncFetchAllSubcategories
};
