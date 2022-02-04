import { POST_LOGIN_USER, POST_LOGOUT } from '../../actions/fetch/auth';
import { USER_STEP } from '../../actions/state/state';
import {
	GET_ACTIONS,
	GET_ACTIONS_PAGINATED,
	GET_DETAILS,
	GET_PROFILE,
	SET_FETCHED_PROFILE
} from '../../actions/fetch/profile';
import { map, forEach } from 'lodash';
import { AUTHY, DEPOSITED, DEPOSITED_CRYPTO, SMS } from '../../../global/utils/values';
import { uppercaseSentence } from '../../../global/utils/helpers';
import { mockDetailsData } from '../mock';

export const GENERAL = 'GENERAL';
export const SPECIFIC = 'SPECIFIC';

const initialState = {
	userData: {},
	report: [],
	activity: {
		[GENERAL]: { count: null, items: [] },
		[SPECIFIC]: { count: null, items: [] }
	},
	addressSuggestions: {},
	email: '',
	phone: '',
	twoFAMethod: localStorage.getItem('twoFAMethod') || SMS,
	external_id: '',
	profile: {},
	wallets: {},
	specificActivity: false,
	firstName: '',
	fullName: '',
	photoIdCanRetry: true,
	profileFetched: false
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_LOGIN_USER: {
			const external_id = action.payload.external_id || '';

			let twoFAMethod = state.twoFAMethod;
			if (action.payload.two_factor_information) {
				switch (action.payload.two_factor_information.method) {
					case SMS.toUpperCase(): {
						twoFAMethod = SMS;
						break;
					}
					case AUTHY.toUpperCase(): {
						twoFAMethod = AUTHY;
						break;
					}
					default: {
						twoFAMethod = SMS;
						break;
					}
				}
				localStorage.setItem('twoFAMethod', twoFAMethod);
			}
			return { ...state, external_id, twoFAMethod };
		}
		case POST_LOGOUT: {
			return { ...state };
		}
		case USER_STEP: {
			return { ...state, step: action.payload };
		}
		case GET_PROFILE: {
			const email = action.payload.email || '';
			const external_id = action.payload.external_id || '';
			const phone = action.payload.phone;
			let firstName =
				action.payload.address && action.payload.address.name ? action.payload.address.name.split(' ') : '';
			firstName = firstName ? firstName[0][0].toUpperCase() + firstName[0].slice(1) : '';

			let fullName = action.payload.address ? action.payload.address.name : '';
			fullName = fullName ? uppercaseSentence(fullName) : '';

			let twoFAMethod;
			switch (action.payload.two_fa_method) {
				case SMS.toUpperCase(): {
					twoFAMethod = SMS;
					break;
				}
				case AUTHY.toUpperCase(): {
					twoFAMethod = AUTHY;
					break;
				}
				default: {
					twoFAMethod = SMS;
					break;
				}
			}

			return {
				...state,
				profile: action.payload,
				email,
				firstName,
				fullName,
				external_id,
				phone,
				twoFAMethod,
				photoIdCanRetry: action.payload.photoIdCanRetry,
				profileFetched: true
			};
		}
		case SET_FETCHED_PROFILE: {
			return { ...state, profileFetched: true };
		}
		case GET_ACTIONS: {
			const { actions } = action.payload;

			const items = map(actions, item => {
				let type = item.type;
				const status = null;
				const account = item.bank_account;
				const date = item.created;
				let fromAsset = item.from_asset;
				let fromAmount = parseFloat(item.from_amount);
				let toAsset = item.to_asset;
				let toAmount = parseFloat(item.to_amount);
				let currency = fromAsset;
				let amount = Math.abs(fromAmount);
				let is_api = item.is_api;
				let reference = item.reference;
				let fee = parseFloat(item.fee);

				if (type === DEPOSITED && fromAmount) {
					type = DEPOSITED_CRYPTO;
				}

				return {
					type,
					status,
					account,
					amount,
					date,
					fromAsset,
					fromAmount,
					toAsset,
					toAmount,
					currency,
					is_api,
					reference,
					fee
				};
			});

			return {
				...state,
				report: items
			};
		}
		case GET_ACTIONS_PAGINATED: {
			const count = 5;
			const actions = [];

			//Mocked actions to match postman call
			forEach(mockDetailsData, item => actions.unshift(item));

			const items = map(actions, item => {
				let type = item.type;
				const status = null;
				const account = item.bank_account;
				const date = item.created;
				let fromAsset = item.from_asset;
				let fromAmount = parseFloat(item.from_amount);
				let toAsset = item.to_asset;
				let toAmount = parseFloat(item.to_amount);
				let currency = fromAsset;
				let amount = Math.abs(fromAmount);
				let is_api = item.is_api;
				let reference = item.reference;
				let id = item.id;

				if (type === 'DEPOSITED' && fromAmount) {
					type = 'DEPOSITED_CRYPTO';
				}

				return {
					id,
					type,
					status,
					account,
					amount,
					date,
					fromAsset,
					fromAmount,
					toAsset,
					toAmount,
					currency,
					is_api,
					reference
				};
			});
			return {
				...state,
				activity: {
					...state.activity,
					[GENERAL]: { count, items }
				}
			};
		}
		case GET_DETAILS: {
			const { payload, meta } = action;
			const items = map(state.activity[GENERAL]?.items, item => {
				if (item.id === meta.id) item.details = payload.data;
				return item;
			});

			return {
				...state,
				activity: {
					...state.activity,
					[GENERAL]: {
						...state.activity[GENERAL],
						items
					}
				}
			};
		}
		default:
			return state;
	}
};

export default userReducer;
