// Determine Current Environment
const Env = process.env.REACT_APP_ENV || 'beta';
export const isProd = Env === 'production';

// Hard coded configs depending on environment
const config = {
	local: {
		device_token: 'flugleborg',
		API_URL: 'http://local.tradenewton.com:8000',
		REF_URL: 'https://sandbox.newton.co',
		FE_URL: 'https://sandbox.newton.co',
		WEBSOCKET_BE_URL: 'https://ws.newton.co',
		SIFT_BEACON_KEY: '82ccd74932',
		refreshPrice: 30000,
		refreshOrder: 60000,
		clientName: 'Newton',
		version: 'dev'
	},
	development: {
		device_token: 'flugleborg',
		API_URL: 'https://dev.newton.co',
		REF_URL: 'https://sandbox.newton.co',
		FE_URL: 'https://sandbox.newton.co',
		WEBSOCKET_BE_URL: 'https://ws-staging.newton.co',
		SIFT_BEACON_KEY: '82ccd74932',
		refreshPrice: 30000,
		refreshOrder: 60000,
		clientName: 'Newton',
		version: 'dev'
	},
	test: {
		device_token: 'flugleborg',
		API_URL: 'https://dev.newton.co',
		REF_URL: 'https://sandbox.newton.co',
		FE_URL: 'https://sandbox.newton.co',
		WEBSOCKET_BE_URL: 'https://ws-staging.newton.co',
		SIFT_BEACON_KEY: '82ccd74932',
		refreshPrice: 30000,
		refreshOrder: 60000,
		clientName: 'Newton',
		version: 'dev'
	}
};

export default config[Env];
