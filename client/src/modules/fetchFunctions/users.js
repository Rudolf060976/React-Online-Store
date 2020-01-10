import Config from '../../../config';

const apiUrl = Config.URL.apiURL;


const fetchGetLoginUser = async () => {

	const path = Config.ROUTES.USER.GET_Login;

	const options = {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);		
		
	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);
};


const fetchGetLogoutUser = async () => {

	const path = Config.ROUTES.USER.GET_Logout;

	const options = {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);

	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);
};


const fetchPostLoginUser = async (username, password) => {
	
	const path = Config.ROUTES.USER.POST_Login;
	
	const data = {
		username,
		password
	};

	const options = {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);		
		
	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);

};

const fetchPostRegisterUser = async (username, password, firstname, lastname, email) => {
	
	const path = Config.ROUTES.USER.POST_Register;
	
	const data = {
		username,
		password,
		firstname,
		lastname,
		email
	};

	const options = {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};
	
	const response = await fetch(apiUrl + path, options);		
		
	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);
	
};

const fetchPostValidateUser = async (userId, token) => {

	const path = Config.ROUTES.USER.POST_Validate;
	
	const data = {
		id: userId,
		token
	};

	const options = {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);		
		
	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);

};

const fetchPostForgotPasswordUser = async (username) => {

	const path = Config.ROUTES.USER.POST_ForgotPassword;
	
	const data = {
		username
	};

	const options = {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);		
		
	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);

};

const fetchPostResetPasswordUser = async (userId, token, newPassword) => {

	const path = Config.ROUTES.USER.POST_ResetPassword;
	
	const data = {
		id: userId,
		token,
		password: newPassword
	};

	const options = {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);		
		
	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);

};

const fetchPostPasswordChange = async (username, password, newPassword) => {

	const path = Config.ROUTES.USER.POST_PasswordChange;
	
	const data = {
		username,
		password,
		newPassword
	};

	const options = {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	};

	const response = await fetch(apiUrl + path, options);		
		
	if (response.ok) {

		return await response.json();

	}

	throw new Error(`Error status: ${response.status}. There was a problem fetching data.`);

};

export {
	fetchGetLoginUser,
	fetchGetLogoutUser,
	fetchPostLoginUser,
	fetchPostForgotPasswordUser,
	fetchPostPasswordChange,
	fetchPostRegisterUser,
	fetchPostResetPasswordUser,
	fetchPostValidateUser
};
