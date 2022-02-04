import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './redux';
import { POST_LOGOUT } from './actions/fetch/auth';
import { syncExchange, syncPermissions } from './actions/state/forms';

export const history = createBrowserHistory();

const composeEnhancers = compose;

const syncReducers = store => next => action => {
	const prevExchange = store.getState().exchange;
	const prevPermissions = store.getState().permissions;
	next(action);
	const nextExchange = store.getState().exchange;
	const nextPermissions = store.getState().permissions;

	if (prevExchange !== nextExchange) {
		next(syncExchange(nextExchange));
	}
	if (prevPermissions !== nextPermissions) {
		next(syncPermissions(nextPermissions));
	}
};

const middlewares = [syncReducers, thunk, routerMiddleware(history)];

const appReducer = createRootReducer(history);

const rootReducer = (state, action) => {
	if (action.type === POST_LOGOUT) {
		const { router, animation } = state;
		state = { router, animation };
	}

	return appReducer(state, action);
};

export default function configureStore() {
	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./redux');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
