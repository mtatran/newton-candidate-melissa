import React from 'react';
import 'jest-canvas-mock';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import config from '../../app/global/utils/config';
import { theme } from '../../app/design/styles/theme/theme';
import { styles } from '../../app/design/styles/theme/styles';
import { sizes } from '../../app/design/styles/theme/styles';
import { ThemeProvider } from 'styled-components';
import { fireEvent } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.rest = rest;
global.setupServer = setupServer;
global.API_URL = config.API_URL;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.createStore = createStore;
global.applyMiddleware = applyMiddleware;
global.thunk = thunk;
global.createMemoryHistory = createMemoryHistory;
global.combineReducers = combineReducers;
global.fireEvent = fireEvent;

//Comment out console.log mock when needing to use console.log to debug.
jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn());
jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn());
jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());

const withLayers = theme => ({ ...theme, mode: 'dark', layers: 'default', styles, sizes });

global.renderComponent = (component, history, store) => {
	return (
		<Provider store={store}>
			<HelmetProvider>
				<Router history={history}>
					<ThemeProvider theme={withLayers(theme['dark'])}>
						<Switch>{component}</Switch>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		</Provider>
	);
};
