import { PRIVATE_DASHBOARD, PRIVATE_TWO_FACTOR, PUBLIC_DEFAULT, PUBLIC_LOGIN } from '../../../actions/state/routes';
import { PUBLIC } from '../../../actions/state/types';
import { ANIMATION_LEFT, ANIMATION_RIGHT, ANIMATION_RIGHT_FULL, ANIMATION_STAY } from '../../../actions/state/state';

const options = {
	[PUBLIC_LOGIN]: {
		preload: [PRIVATE_TWO_FACTOR],
		confetti: true,
		path_access: PUBLIC,
		enter_transition: {
			mobile: {
				duration: 350,
				animation: {
					fallback: ANIMATION_STAY,
					[PRIVATE_TWO_FACTOR]: ANIMATION_RIGHT,
					[PRIVATE_DASHBOARD]: ANIMATION_RIGHT,
					[PUBLIC_DEFAULT]: ANIMATION_LEFT
				}
			}
		},
		exit_transition: {
			mobile: {
				duration: 350,
				animation: {
					[PRIVATE_TWO_FACTOR]: ANIMATION_LEFT,
					[PUBLIC_DEFAULT]: ANIMATION_RIGHT_FULL
				}
			}
		}
	},
	[PUBLIC_DEFAULT]: {
		confetti: true,
		path_access: PUBLIC,
		enter_transition: {
			mobile: {
				duration: 0,
				animation: {
					fallback: ANIMATION_STAY
				}
			}
		},
		exit_transition: {
			mobile: {
				duration: 350,
				animation: {
					fallback: ANIMATION_STAY
				}
			}
		}
	}
};

export default options;
