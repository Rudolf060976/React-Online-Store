import { functionBuildUrlFromFilterPageLimit } from './src/modules/urlFunctions';


const configDEV = {

	URL: {

		apiURL: 'http://localhost:3000'

	}	
	
};


const configPROD = {

	URL: {

		apiURL: 'http://localhost:3000'

	}
};

const Config = {

	URL: (process.env.NODE_ENV === 'production' ? configPROD.URL : configDEV.URL),
	ROUTES: {

		CATEGORIES: {

			GET_AllCategories: '/api/categories',
			GET_Subcategories: (categoryId) => {
				return `/api/categories/${categoryId}/sub`;
			}	

		},
		ITEMS: {
			GET_ItemsByFilter: (filter, page, limit) =>{
				
				const myUrl = functionBuildUrlFromFilterPageLimit(filter, page, limit);
							
				return `/api/items?${myUrl}`;
				
			},
			GET_ItemById: (itemId) => {
				return `/api/items/${itemId}`;
			},
			GET_ItemImageById: (itemId, imageId) => {
				return `/api/items/${itemId}/images/${imageId}`;
			},
			GET_ItemsByCategory: (categoryId) => {
				return `/api/items/category/${categoryId}`;
			},
			GET_ItemsBySubCategory: (subcategoryId) => {
				return `/api/items/subcategory/${subcategoryId}`;
			},
			POST_Item_BASIC_FIELDS: '/api/items/',
			POST_ItemImageOne: (itemId) => {
				return `/api/items/${itemId}/images/one`;
			},
			POST_ItemImagesAll: (itemId) => {
				return `/api/items/${itemId}/images/all`;
			},
			POST_Item_BY_FILTER: '/api/items/byfilter',
			DEL_ItemImageOne: (itemId, imageId) => {
				return `/api/items/${itemId}/images/one/${imageId}`;
			},
			DEL_ItemImagesAll: (itemId) => {
				return `/api/items/${itemId}/images/all`;
			},
			PUT_ItemUpdate: (itemId) => {
				return `/api/items/${itemId}`;
			}			
		},
		USER: {
			GET_Login: '/api/login',
			GET_Logout: '/api/logout',
			POST_Register: '/api/users/register',
			POST_Validate: '/api/users/validate',
			POST_Login: '/api/login',
			POST_ForgotPassword: '/api/users/forgotpassword',
			POST_ResetPassword: '/api/users/resetpassword',
			POST_PasswordChange: '/api/users/passwordchange'
		}		

	}


};

export default Config;
