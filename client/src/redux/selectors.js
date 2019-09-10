// import { createSelector } from 'reselect';

// ***** USERS ***********

export const getIsLoggedUser = state => {

	return state.loggedUser.isLogged;

};

export const getUserProfile = state => {

	return state.loggedUser.userProfile;

};

export const getErrorMessages = state => {
	return state.errorMessages;
};
