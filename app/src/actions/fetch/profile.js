import { createAxiosGet, createAxiosGetPostman } from '../../../global/utils/axiosFetch';
import createThunk from './thunk';

// List of Actions
export const GET_PORTFOLIO = 'GET_PORTFOLIO';
export const GET_ACTIONS = 'GET_ACTIONS';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_ACTIONS_PAGINATED = 'GET_ACTIONS_PAGINATED';
export const GET_RATES = 'GET_RATES';
export const GET_PRICES = 'GET_PRICES';
export const GET_PROFILE = 'GET_PROFILE';
export const SET_FETCHED_PROFILE = 'SET_FETCHED_PROFILE';
export const GET_VERIFICATION_STATUS = 'GET_VERIFICATION_STATUS';
export const GET_PERMISSIONS = 'GET_PERMISSIONS';
export const GET_MARKET = 'GET_MARKET';
export const GET_ASSETS = 'GET_ASSETS';
export const GET_PAIRS = 'GET_PAIRS';
export const GET_PENDING = 'GET_PENDING';
export const SET_RATES_CALLED = 'SET_RATES_CALLED';

const REMOVE_TYPES = [
	'CREATED',
	'ETRANSFER_DEPOSITED_REQUESTED',
	'BOUGHT',
	'SOLD',
	'OPEN',
	'PARTIAL',
	'CANCEL',
	'DEPOSIT_REQUESTED',
	'WITHDRAWAL_REQUESTED',
	'FEES_REFUNDED'
];

export const setRatesCalled = () => {
	return { type: SET_RATES_CALLED };
};

// REST API endpoints
export const getPortfolio = (success, error) => {
	return createThunk(GET_PORTFOLIO, createAxiosGet('/dashboard/api/web/portfolio/'), success, error);
};

export const getActionsPaginated = (params, success, error) => {
	const { offset, limit } = params;

	return createThunk(
		GET_ACTIONS_PAGINATED,
		createAxiosGet(`/dashboard/api/web/actions?`, { remove_type: REMOVE_TYPES, offset, limit }),
		success,
		error
	);
};

export const getDetails = (id, success, error) => {
	return createThunk(GET_DETAILS, createAxiosGetPostman(`/dashboard/api/web/actions/${id}`), success, error, { id });
};

export const getFullActions = (success, error) => {
	return createThunk(GET_ACTIONS, createAxiosGet('/dashboard/api/web/actions/'), success, error);
};

export const getRates = (success, error) => {
	return createThunk(GET_RATES, createAxiosGet('/dashboard/api/web/rates/'), success, error);
};

export const getPrices = (success, error) => {
	return createThunk(GET_PRICES, createAxiosGet('/dashboard/api/rates/'), success, error);
};

export const getProfile = (success, error) => {
	return createThunk(
		GET_PROFILE,
		createAxiosGet('/dashboard/api/profile/?&address&email&bank_account&phone&external_id&two_fa_method'),
		success,
		error
	);
};

export const setFetchedProfile = () => {
	return { type: SET_FETCHED_PROFILE };
};

export const getVerificationStatus = (success, error) => {
	const headers = { 'Content-Type': 'application/json' };
	return createThunk(
		GET_VERIFICATION_STATUS,
		createAxiosGet('/dashboard/api/verification/status/', null, headers),
		success,
		error
	);
};

export const getPermissions = (success, error) => {
	return createThunk(GET_PERMISSIONS, createAxiosGet('/dashboard/api/permissions/'), success, error);
};

export const getMarket = (success, error) => {
	return createThunk(GET_MARKET, createAxiosGet('/api/market/'), success, error);
};

export const getAssets = (success, error) => {
	return createThunk(GET_ASSETS, createAxiosGet('/dashboard/api/assets/'), success, error);
};

export const getPairs = (success, error) => {
	return createThunk(GET_PAIRS, createAxiosGet('/dashboard/api/asset-pairs/'), success, error);
};
