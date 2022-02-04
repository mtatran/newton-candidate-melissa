export const SET_LIVE_PRICE = 'SET_LIVE_PRICE';

export const setLivePrice = (data, throttle) => {
	return { type: SET_LIVE_PRICE, payload: { data, throttle } };
};
