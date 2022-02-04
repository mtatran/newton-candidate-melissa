export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const EN = 'en';
export const FR = 'fr';

export const changeLanguage = lng => {
	return { type: CHANGE_LANGUAGE, payload: lng };
};
