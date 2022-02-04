import config from '../utils/config';

var _sift = (window._sift = window._sift || []);

export const siftInit = userId => {
	if (_sift) {
		_sift.push(['_setAccount', config.SIFT_BEACON_KEY]);
		_sift.push(['_setUserId', userId]);
		_sift.push(['_trackPageview']);
	}
};
