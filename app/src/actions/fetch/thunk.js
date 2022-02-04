import { FETCH_ERROR, NETWORK_ERROR } from './errors';

const createThunk = (action, request, successCallback, errorCallback, metadata) => {
	return dispatch => {
		request
			.then(({ data, status }) => {
				if ((parseFloat(status) >= 200 && parseFloat(status) < 300) || status === 304) {
					dispatch({ type: action, payload: data, meta: metadata ? metadata : {} });
					if (successCallback) successCallback(data);
				}
			})
			.catch(error => {
				if (error && error.response) {
					if (parseFloat(error.response.status) === 401) localStorage.removeItem('isLoggedIn');
					dispatch({ type: FETCH_ERROR, payload: action });
					if (errorCallback) errorCallback(error.response.data, error.response.status);
				} else if (error && !error.response && error.message && error.message.includes(NETWORK_ERROR)) {
					dispatch({ type: FETCH_ERROR, payload: action });
					if (errorCallback) errorCallback([error.message], 500);
				}
			});
	};
};

export default createThunk;
