// Public routes go here for string matching paths
export const PUBLIC_DEFAULT = '/';
export const PUBLIC_LOGIN = '/login';

// Private routes matching go here for string matching paths
export const PRIVATE_TWO_FACTOR = `/login-verification`;
export const PRIVATE_DASHBOARD = `/dashboard`;
export const PRIVATE_MARKET = `/market`;
export const PRIVATE_ACTIVITY_LIST = `/activity-list`;
export const PRIVATE_SETTINGS = `settings`;
export const PRIVATE_TAX_REPORT = `tax-report`;

// Animating Routes
export const ENTER_WITHOUT_ANIMATION = 'ENTER_WITHOUT_ANIMATION';
export const ANIMATION_ENTER_START = 'ANIMATION_ENTER_START';
export const ANIMATION_ENTER_END = 'ANIMATION_ENTER_END';
export const ANIMATION_EXIT_START = 'ANIMATION_EXIT_START';
export const ANIMATION_EXIT_END = 'ANIMATION_EXIT_END';

export const enterWithoutAnimation = route => {
	return { type: ENTER_WITHOUT_ANIMATION, payload: { route } };
};

export const animationEnterStart = (route, transition, layer) => {
	return { type: ANIMATION_ENTER_START, payload: { route, transition, layer } };
};

export const animationEnterEnd = route => {
	return { type: ANIMATION_ENTER_END, payload: { route } };
};

export const animationExitStart = (route, transition, layer) => {
	return { type: ANIMATION_EXIT_START, payload: { route, transition, layer } };
};

export const animationExitEnd = route => {
	return { type: ANIMATION_EXIT_END, payload: { route } };
};
