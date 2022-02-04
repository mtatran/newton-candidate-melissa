import {
	ANIMATION_ENTER_END,
	ANIMATION_ENTER_START,
	ANIMATION_EXIT_END,
	ANIMATION_EXIT_START,
	ENTER_WITHOUT_ANIMATION
} from '../../actions/state/routes';
import { LOADING_APP, MENU_TOGGLE } from '../../actions/state/state';

const initialState = {
	entering: {
		route: '',
		transition: [],
		layer: []
	},
	leaving: {
		route: '',
		transition: [],
		layer: []
	},
	loaded: [],
	refreshing: false,
	menu: false
};

const animationReducer = (state = initialState, action) => {
	switch (action.type) {
		case ENTER_WITHOUT_ANIMATION: {
			return { ...state, entering: { route: action.payload.route } };
		}
		case ANIMATION_ENTER_START: {
			return {
				...state,
				entering: { route: action.payload.route, transition: action.payload.transition, layer: action.payload.layer }
			};
		}
		case ANIMATION_ENTER_END: {
			return {
				...state,
				entering: { route: '', transition: {}, layer: 0 }
			};
		}
		case ANIMATION_EXIT_START: {
			return {
				...state,
				leaving: { route: action.payload.route, transition: action.payload.transition, layer: action.payload.layer }
			};
		}
		case ANIMATION_EXIT_END: {
			return { ...state, leaving: { route: '', transition: {}, layer: 0 } };
		}
		case LOADING_APP: {
			const refreshing = action.payload;
			return { ...state, refreshing };
		}
		case MENU_TOGGLE: {
			return { ...state, menu: action.payload };
		}
		default:
			return state;
	}
};

export default animationReducer;
