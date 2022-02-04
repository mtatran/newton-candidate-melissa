import { GET_PERMISSIONS, GET_VERIFICATION_STATUS } from '../../actions/fetch/profile';
import { POST_LOGIN_USER, POST_LOGOUT, POST_PHONE_START } from '../../actions/fetch/auth';
import { STEP_CODE, STEP_DASHBOARD, USER_STEP } from '../../actions/state/state';

import { INSTANT_FUNDS, VERIFICATION_SUCCESS } from '../../actions/state/types';

export const labelNextStep = permissions => {
	const lacking = permission => permissions.lacking_permissions?.includes(permission);

	const steps = new Map().set(STEP_CODE, [lacking('TwoFactorAuthenticated')]);

	let step = '';
	steps.forEach((arr, key) => {
		if (arr.every(bool => bool)) {
			if (!step) step = key;
		}
	});
	return step;
};

export const initialState = {
	authenticated: false,
	step: '',
	has_permissions: [],
	lacking_permissions: ['EmailVerified', 'ProfileVerified', 'PhoneVerified', 'BankConnected', 'TwoFactorAuthenticated'],
	limits: {
		[INSTANT_FUNDS]: {
			limit: 0,
			remaining: 0
		}
	},
	isTwoFactor: false,
	verificationStatus: null
};

const permissionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_LOGIN_USER:
		case GET_PERMISSIONS: {
			let nextStep = '';
			let isTwoFactorAuthentication = false;
			nextStep = labelNextStep(action.payload);
			if (nextStep === STEP_CODE) isTwoFactorAuthentication = true;

			return {
				...state,
				has_permissions: action.payload.has_permissions,
				lacking_permissions: action.payload.lacking_permissions,
				isTwoFactor: isTwoFactorAuthentication,
				step: nextStep
			};
		}
		case GET_VERIFICATION_STATUS: {
			let step = state.step;
			if (action.payload.status === VERIFICATION_SUCCESS) step = STEP_DASHBOARD;
			else step = '';
			return { ...state, step, verificationStatus: action.payload.status };
		}
		case USER_STEP: {
			return { ...state, step: STEP_DASHBOARD };
		}

		case POST_PHONE_START: {
			if (action.meta.bypass) return { ...state };
			return {
				...state,
				step: STEP_CODE
			};
		}
		case POST_LOGOUT: {
			return { ...state, authenticated: false, has_permissions: [], lacking_permissions: [], step: '' };
		}
		default:
			return state;
	}
};

export default permissionsReducer;
