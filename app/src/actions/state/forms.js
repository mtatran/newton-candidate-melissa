export const HANDLE_FOCUS = 'HANDLE_FOCUS';
export const HANDLE_BLUR = 'HANDLE_BLUR';
export const HANDLE_KEY_DOWN = 'HANDLE_KEY_DOWN';
export const HANDLE_CHANGE = 'HANDLE_CHANGE';
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';

export const CLEAR_FORMS = 'CLEAR_FORMS';
export const CLEAR_FORM_ERROR = 'CLEAR_FORM_ERROR';

export const SYNC_EXCHANGE = 'SYNC_EXCHANGE';
export const SYNC_PERMISSIONS = 'SYNC_PERMISSIONS';

export const TOGGLE_SERVER_ERROR = 'TOGGLE_SERVER_ERROR';

export const TOGGLE_ACTIONS = 'TOGGLE_ACTIONS';
export const TOGGLE_REPORT = 'TOGGLE_REPORT';
export const TOGGLE_MENU_REPORT = 'TOGGLE_MENU_REPORT';

export const SET_EMAIL = 'SET_EMAIL';

export const toggleActions = (active, tabsDirection = 'left', animate = false) => {
	return { type: TOGGLE_ACTIONS, payload: { active, tabsDirection, animate } };
};

export const handleFocus = (form, field) => {
	return { type: HANDLE_FOCUS, payload: { form, field } };
};

export const handleBlur = (form, field) => {
	return { type: HANDLE_BLUR, payload: { form, field } };
};

export const handleKeyDown = form => {
	return { type: HANDLE_KEY_DOWN, payload: { form } };
};

export const handleChange = (form, field, value) => {
	return { type: HANDLE_CHANGE, payload: { form, field, value } };
};

export const clearForms = () => {
	return { type: CLEAR_FORMS };
};

export const clearFormError = () => {
	return { type: CLEAR_FORM_ERROR };
};

export const toggleDialog = open => {
	return { type: TOGGLE_DIALOG, payload: open };
};

export const syncExchange = exchangeReducer => {
	return { type: SYNC_EXCHANGE, payload: exchangeReducer };
};

export const syncPermissions = permissionsReducer => {
	return { type: SYNC_PERMISSIONS, payload: permissionsReducer };
};

export const toggleServerError = open => {
	return { type: TOGGLE_SERVER_ERROR, payload: open };
};

export const toggleReport = open => {
	return { type: TOGGLE_REPORT, payload: open };
};

export const toggleMenuReport = open => {
	return { type: TOGGLE_MENU_REPORT, payload: open };
};

export const setEmail = email => {
	return { type: SET_EMAIL, payload: email };
};
