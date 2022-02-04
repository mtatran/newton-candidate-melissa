import React from 'react';
import { withRouter } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import importedComponent from 'react-imported-component';
import LoadingComponent from './components/shared/Loading';
import ErrorComponent from './components/shared/Error';
import Header from './components/shared/Header';
import APIGateway from './components/shared/APIGateway';
import OffScreen from './components/offscreen/_layout/OffScreen';
import {
	PRIVATE_ACTIVITY_LIST,
	PRIVATE_DASHBOARD,
	PRIVATE_MARKET,
	PRIVATE_TWO_FACTOR,
	PUBLIC_DEFAULT,
	PUBLIC_LOGIN
} from './actions/state/routes';
import '../design/styles/sass/styles.scss';
import '../global/utils/config';
import { isProd } from '../global/utils/config';
import PageTransition from './components/shared/PageTransition';
import { useSift } from '../global/hooks/scripts/useSift';
import { useHideContextMenu } from '../global/hooks/scripts/useHideContextMenu';
import { useMobileWidth } from '../global/hooks/scripts/useMobileWidth';

// eslint-disable-next-line react/display-name
const animateSwitch = (CustomSwitch, AnimatorComponent) => ({ children }) => {
	return (
		<Route
			render={({ location }) => (
				<AnimatorComponent uniqKey={location.pathname}>
					<CustomSwitch location={location}>{children}</CustomSwitch>
				</AnimatorComponent>
			)}
		/>
	);
};

const SwitchTransition = animateSwitch(Switch, PageTransition);

const options = { LoadingComponent, ErrorComponent };
export const routes = {
	[PUBLIC_LOGIN]: importedComponent(() => import('./components/public/_layout/login/Login'), options),
	[PUBLIC_DEFAULT]: importedComponent(() => import('./components/public/_layout/default/DefaultHome'), options),
	[PRIVATE_TWO_FACTOR]: importedComponent(() => import('./components/private/_layout/two-factor/TwoFactor'), options),
	[PRIVATE_DASHBOARD]: importedComponent(() => import('./components/private/_layout/dashboard/Dashboard'), options),
	[PRIVATE_MARKET]: importedComponent(() => import('./components/private/_layout/market/Market'), options),
	[PRIVATE_ACTIVITY_LIST]: importedComponent(() => import('./components/private/_layout/activity/Activity'), options)
};

const LazyLogin = routes[PUBLIC_LOGIN];
const LazyDefaultHome = routes[PUBLIC_DEFAULT];
const LazyTwoFactor = routes[PRIVATE_TWO_FACTOR];
const LazyDashboard = routes[PRIVATE_DASHBOARD];
const LazyMarket = routes[PRIVATE_MARKET];
const LazyActivityList = routes[PRIVATE_ACTIVITY_LIST];

const PrivateRoute = props => {
	return <Route {...props} />;
};

const App = () => {
	const header = !isProd ? <Header /> : null;
	useSift();
	useHideContextMenu();
	useMobileWidth();

	return (
		<div className="wrapper">
			<APIGateway />
			{header}
			<OffScreen>
				<SwitchTransition>
					<Route exact path={PUBLIC_LOGIN} component={LazyLogin} />
					<PrivateRoute exact path={PRIVATE_TWO_FACTOR} component={LazyTwoFactor} />
					<PrivateRoute exact path={PRIVATE_DASHBOARD} component={LazyDashboard} />
					<PrivateRoute exact path={PRIVATE_MARKET} component={LazyMarket} />
					<PrivateRoute exact path={PRIVATE_ACTIVITY_LIST} component={LazyActivityList} />
					<Route exact path="/" component={LazyDefaultHome} />
					<Redirect to="/" />
				</SwitchTransition>
			</OffScreen>
		</div>
	);
};

export default withRouter(App);
