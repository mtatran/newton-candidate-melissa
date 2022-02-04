import axios from 'axios';
import { stringify } from 'qs';
import config from './config';

const API_URL = config.API_URL;

export const createAxiosGet = (url, params, headers, extra = '') => {
	return axios({
		method: 'get',
		withCredentials: true,
		url: `${API_URL}${url}${extra}${params ? stringify(params, { indices: false }) || params : ''}`,
		headers
	});
};

export const createAxiosPost = (url, params, headers = {}, body) => {
	const data = body ? body : '';
	return axios({
		method: 'post',
		withCredentials: true,
		xsrfCookieName: 'csrftoken',
		xsrfHeaderName: 'X-CSRFTOKEN',
		url: `${API_URL}${url}${params ? stringify(params) : ''}`,
		data,
		headers
	});
};

export const createAxiosGetPostman = (url, params, headers, extra = '') => {
	return axios({
		method: 'get',
		url: `https://7ba9d5c2-6163-4f01-a52d-50926bc6054e.mock.pstmn.io${url}${extra}${
			params ? stringify(params, { indices: false }) || params : ''
		}`,
		headers
	});
};
