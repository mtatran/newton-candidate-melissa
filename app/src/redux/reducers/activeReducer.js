import {
	TOGGLE_ACTIONS,
	TOGGLE_DIALOG,
	TOGGLE_MENU_REPORT,
	TOGGLE_REPORT,
	TOGGLE_SERVER_ERROR
} from '../../actions/state/forms';

const initialState = {
	active: true,
	openDialog: false,
	errorOpen: false,
	activeToggleTFA: false,
	activeAction: '',
	activeReport: false,
	activeMenuReport: false,
	tabsDirection: 'left',
	animateDrawer: false
};

const activeReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_DIALOG: {
			return { ...state, openDialog: action.payload };
		}
		case TOGGLE_SERVER_ERROR: {
			return { ...state, errorOpen: action.payload };
		}
		case TOGGLE_ACTIONS: {
			return {
				...state,
				activeAction: action.payload.active,
				tabsDirection: action.payload.tabsDirection,
				animateDrawer: action.payload.animate
			};
		}
		case TOGGLE_REPORT: {
			return { ...state, activeReport: action.payload };
		}
		case TOGGLE_MENU_REPORT: {
			return { ...state, activeMenuReport: action.payload };
		}
		default:
			return state;
	}
};

export default activeReducer;
