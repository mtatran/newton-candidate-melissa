import { createAxiosPost } from '../../../global/utils/axiosFetch';
import createThunk from './thunk';
import config from '../../../global/utils/config';

// List of Actions
export const POST_PHONE_START = 'POST_PHONE_START';
export const POST_PHONE_CHECK = 'POST_PHONE_CHECK';
export const POST_LOGIN_USER = 'POST_LOGIN_USER';
export const POST_REQUEST_2FA = 'POST_REQUEST_2FA';
export const POST_CHECK_TOKEN = 'POST_CHECK_TOKEN';
export const POST_CREATE_PROFILE = 'POST_CREATE_PROFILE';
export const POST_LOGOUT = 'POST_LOGOUT';
export const POST_PHONE_UPDATE = 'POST_PHONE_UPDATE';
export const POST_2FA_METHOD = 'POST_2FA_METHOD';

// REST API endpoints
export const postLoginUser = (username, password, success, error) => {
	const device_token = config ? config.device_token : null;
	const headers = { 'Content-Type': 'application/json' };
	const body = { username, password, device_token };

	return createThunk(POST_LOGIN_USER, createAxiosPost('/dashboard/api/login/', null, headers, body), success, error);
};

export const postRequest2FA = (success, error) => {
	return createThunk(POST_REQUEST_2FA, createAxiosPost('/dashboard/api/phone/2fa/start/'), success, error);
};

export const postCheckToken = (code, success, error) => {
	const headers = { 'Content-Type': 'application/json' };
	const body = { code };

	return createThunk(
		POST_CHECK_TOKEN,
		createAxiosPost('/dashboard/api/phone/2fa/check/', null, headers, body),
		success,
		error
	);
};

export const getLogout = (success, error) => {
	const body = {
		device_token: ''
	};
	localStorage.removeItem('isLoggedIn');
	if (window.zE) {
		window.zE = undefined;
	}

	return createThunk(POST_LOGOUT, createAxiosPost('/dashboard/api/logout/', null, null, body), success, error);
};

export const post2FAMethod = (method, success, error) => {
	const headers = { 'Content-Type': 'application/json' };
	const body = { method };

	return createThunk(
		POST_2FA_METHOD,
		createAxiosPost('/dashboard/api/preferred-two-fa/update/', null, headers, body),
		success,
		error
	);
};
