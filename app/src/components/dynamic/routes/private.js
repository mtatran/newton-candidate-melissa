import {
	PRIVATE_ACTIVITY_LIST,
	PRIVATE_DASHBOARD,
	PRIVATE_MARKET,
	PRIVATE_TWO_FACTOR,
	PUBLIC_LOGIN
} from '../../../actions/state/routes';
import { PRIVATE } from '../../../actions/state/types';
import { ANIMATION_LEFT, ANIMATION_RIGHT } from '../../../actions/state/state';

const options = {
	[PRIVATE_TWO_FACTOR]: {
		preload: [PUBLIC_LOGIN, PRIVATE_DASHBOARD],
		menu: true,
		logo: true,
		path_access: PRIVATE,
		enter_transition: {
			mobile: {
				duration: 350,
				animation: {
					[PUBLIC_LOGIN]: ANIMATION_LEFT
				}
			}
		},
		exit_transition: {
			mobile: {
				duration: 350,
				animation: {
					[PUBLIC_LOGIN]: ANIMATION_RIGHT
				}
			}
		}
	},
	[PRIVATE_DASHBOARD]: {
		preload: [PRIVATE_ACTIVITY_LIST],
		tabGroup: [PRIVATE_MARKET, PRIVATE_ACTIVITY_LIST],
		drawer: true,
		mainLogo: true,
		path_access: PRIVATE,
		enter_transition: {
			mobile: {
				duration: 350,
				animation: {
					[PRIVATE_MARKET]: ANIMATION_RIGHT
				}
			}
		},
		exit_transition: {
			mobile: {
				duration: 350,
				animation: {
					[PRIVATE_MARKET]: ANIMATION_LEFT,
					[PUBLIC_LOGIN]: ANIMATION_RIGHT
				}
			}
		}
	},
	[PRIVATE_MARKET]: {
		tabGroup: [PRIVATE_DASHBOARD, PRIVATE_ACTIVITY_LIST],
		drawer: true,
		path_access: PRIVATE,
		enter_transition: {
			mobile: {
				duration: 350,
				animation: {}
			}
		},
		exit_transition: {
			mobile: {
				duration: 350,
				animation: {}
			}
		}
	},
	[PRIVATE_ACTIVITY_LIST]: {
		preload: [PRIVATE_DASHBOARD],
		tabGroup: [PRIVATE_MARKET, PRIVATE_ACTIVITY_LIST],
		drawer: true,
		mainLogo: true,
		path_access: PRIVATE,
		enter_transition: {
			mobile: {
				duration: 350,
				animation: {}
			}
		},
		exit_transition: {
			mobile: {
				duration: 350,
				animation: {}
			}
		}
	}
};

export default options;
