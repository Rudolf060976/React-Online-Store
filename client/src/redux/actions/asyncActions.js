import { actionsItemsData, actionsUserData } from './actions';
import * as fetchItemsData from '../../modules/fetchFunctions/itemsData';

const actionsAsyncFetchCategories = () => {

	return (dispatch, getState) => {

		dispatch(actionsItemsData.categories.fetch());

		fetchItemsData.fetchGetAllCategories().then(json => {

			if (json.ok) {

				const { data: { categories: docs } } = json;

				dispatch(actionsItemsData.categories.fetchSuccess(docs));

				return Promise.resolve();

			} 

			dispatch(actionsItemsData.categories.fetchFailure(json.message));

			return Promise.reject(json.error);			
			

		}).catch(err => {

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

}


export default { actionsAsyncFetchCategories, actionsAsyncFetchSubcategoriesByCategoryId };
