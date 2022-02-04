import { CHANGE_LANGUAGE } from '../../actions/state/langs';
import i18n from '../../i18n';

const initialState = {
	translations: {}
};

const languageReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_LANGUAGE:
			i18n.changeLanguage(action.payload);
			return {
				...state,
				translations: action.payload
			};
		default:
			return state;
	}
};

export default languageReducer;
