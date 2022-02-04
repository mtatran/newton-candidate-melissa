export const USER_STEP = 'USER_STEP';

// Onboarding state
export const STEP_CODE = 'STEP_CODE';
export const STEP_DASHBOARD = 'STEP_DASHBOARD';

// Animation Directions
export const ANIMATION_TOP = 'ANIMATION_TOP';
export const ANIMATION_RIGHT = 'ANIMATION_RIGHT';
export const ANIMATION_RIGHT_FULL = 'ANIMATION_RIGHT_FULL';
export const ANIMATION_BOTTOM = 'ANIMATION_BOTTOM';
export const ANIMATION_LEFT = 'ANIMATION_LEFT';
export const ANIMATION_LEFT_FULL = 'ANIMATION_LEFT_FULL';
export const ANIMATION_STAY = 'ANIMATION_STAY';
export const ANIMATION_OVERLAY_TOP = 'ANIMATION_OVERLAY_TOP';
export const ANIMATION_OVERLAY_BOTTOM = 'ANIMATION_OVERLAY_BOTTOM';

// Transition direction
export const TRANSITION_EXIT = 'exit_transition';
export const TRANSITION_ENTER = 'enter_transition';

// Open and close Menu
export const MENU_TOGGLE = 'MENU_TOGGLE';

export const toggleMenu = bool => {
	return { type: MENU_TOGGLE, payload: bool };
};

// Loading Protected Page
export const LOADING_APP = 'LOADING_APP';

export const loadingApp = bool => {
	return { type: LOADING_APP, payload: bool };
};

// Select active coin
export const SELECT_COIN = 'SELECT_COIN';

export const selectCoin = ticker => {
	return { type: SELECT_COIN, payload: ticker };
};

export const DESELECT_COIN = 'DESELECT_COIN';

export const deselectCoin = () => {
	return { type: DESELECT_COIN };
};
