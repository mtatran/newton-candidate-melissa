import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './reducers/userReducer';
import exchangeReducer from './reducers/exchangeReducer';
import languageReducer from './reducers/languageReducer';
import activeReducer from './reducers/activeReducer';
import animationReducer from './reducers/animationReducer';
import permissionsReducer from './reducers/permissionsReducer';

export default history =>
	combineReducers({
		user: userReducer,
		exchange: exchangeReducer,
		permissions: permissionsReducer,
		i18n: languageReducer,
		activeForm: activeReducer,
		animation: animationReducer,
		router: connectRouter(history)
	});
