import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './src/App';
import './i18n';
import { HelmetProvider } from 'react-helmet-async';
import configureStore, { history } from './src/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import { rehydrateMarks } from 'react-imported-component';
import { theme } from './design/styles/theme/theme';
import { styles } from './design/styles/theme/styles';
import sizes from './design/styles/theme/sizes';

const store = configureStore();
const element = document.getElementById('app');

const withLayers = (theme) => ({...theme, mode: 'dark', layers: 'default', styles, sizes});

const app = (
	<Provider store={store}>
		<HelmetProvider>
			<ConnectedRouter history={history}>
				<ThemeProvider theme={withLayers(theme['dark'])}>
					<App />
				</ThemeProvider>
			</ConnectedRouter>
		</HelmetProvider>
	</Provider>
);

if (process.env.NODE_ENV === 'production') {
	rehydrateMarks().then(() => {
		ReactDOM.hydrate(app, element);
	});
} else {
	ReactDOM.render(app, element);
}
