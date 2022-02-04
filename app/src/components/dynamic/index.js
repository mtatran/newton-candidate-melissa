import { PUBLIC } from '../../actions/state/types';
import { ANIMATION_STAY } from '../../actions/state/state';
import { deepOverride } from '../../../global/utils/helpers';
import options from './routes/options';
import { match } from './routes/match';
import { br } from '../../../global';

const routeOptions = (path, direction) => {
	const defaultSettings = {
		preload: [],
		tabGroup: [],
		enter_transition: {
			mobile: {
				duration: 0,
				steps: [1],
				animation: {
					fallback: ANIMATION_STAY
				}
			},
			desktop: {
				duration: 0,
				steps: [1],
				animation: {
					fallback: ANIMATION_STAY
				}
			}
		},
		exit_transition: {
			mobile: {
				duration: 0,
				steps: [1],
				animation: {
					fallback: ANIMATION_STAY
				}
			},
			desktop: {
				duration: 0,
				steps: [1],
				animation: {
					fallback: ANIMATION_STAY
				}
			}
		},
		transition_duration: 0,
		transition_steps: [1],
		transition_animation: {},
		menu: false,
		close: false,
		error: false,
		logo: false,
		show_mobile: false,
		confetti: false,
		path_access: PUBLIC
	};

	// Override default options with route configs
	let opt = options();
	let route = match(path);
	const settings = deepOverride(defaultSettings, opt[route]);

	// Simplify and flatten transitions
	const device = window.innerWidth >= br.desktop ? 'desktop' : 'mobile';
	const device_options = settings[direction] ? settings[direction][device] : false;
	if (direction && device_options) {
		settings.transition_duration = device_options.duration;
		settings.transition_steps = device_options.steps;
		settings.transition_animation = device_options.animation;
	}

	return settings;
};

export default routeOptions;
