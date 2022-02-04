import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
	getAssets,
	getPairs,
	getPermissions,
	getVerificationStatus,
	getPortfolio,
	getProfile,
	getRates,
	setRatesCalled
} from '../../actions/fetch/profile';
import {
	PRIVATE_ACTIVITY_LIST,
	PRIVATE_DASHBOARD,
	PRIVATE_MARKET,
	PRIVATE_TWO_FACTOR,
	PUBLIC_DEFAULT,
	PUBLIC_LOGIN
} from '../../actions/state/routes';
import { loadingApp, STEP_CODE, STEP_DASHBOARD } from '../../actions/state/state';
import { connectLivePrice } from '../../actions/fetch/websocket';
import { setLivePrice } from '../../actions/state/pricing';
import { toggleServerError } from '../../actions/state/forms';
import { _loading } from '../../../design/styles/styled-components/shared/Loading';
import { svgIconNewton } from '../../../global/assets/vectors/icons';
import config from '../../../global/utils/config';
import { VERIFICATION_SUCCESS } from '../../actions/state/types';
import { privateRoutes } from '../../../global/utils/privateRoutes';
import { deepIncludes } from '../../../global/utils/logic';
import { Timings } from '../../../global/utils/timings';
import { getLogout } from '../../actions/fetch/auth';

let priceInterval = false;
let PRICE_INTERVAL;
class APIGateway extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: '',
			loadingExit: false
		};
	}

	componentDidMount() {
		const nextRoute = this.props.location.pathname || '';
		this.requestsByRoute(null, nextRoute);
	}

	componentDidUpdate(prevProps) {
		const prevRoute = prevProps.location.pathname !== this.props.location.pathname ? prevProps.location.pathname : '';
		const nextRoute = this.props.location.pathname || '';
		const hasFixed =
			this.props.location?.state?.fixed &&
			prevProps.location.pathname !== PUBLIC_DEFAULT &&
			prevProps.location.pathname !== PUBLIC_LOGIN;

		if (prevProps.location.pathname !== this.props.location.pathname && !hasFixed) {
			document.getElementById('offscreen-scrollable').scrollTo(0, 0);
			this.requestsByRoute(prevRoute, nextRoute);
		}

		if (
			prevProps.verificationStatus &&
			prevProps.verificationStatus !== this.props.verificationStatus &&
			this.props.verificationStatus === VERIFICATION_SUCCESS
		)
			this.requestsByRoute(prevRoute, nextRoute);
	}

	componentWillUnmount() {
		this.clearIntervals();
	}

	clearIntervals() {
		priceInterval = false;
		if (PRICE_INTERVAL) clearInterval(PRICE_INTERVAL);
	}

	handleLogout() {
		this.props.getLogout();
		this.props.history.replace(PUBLIC_LOGIN);
	}

	handleErrors(status, callback) {
		this.clearIntervals();
		this.props.loadingApp(false);
		if (parseFloat(status) === 429 || (parseFloat(status) >= 500 && parseFloat(status) < 600))
			this.props.toggleServerError(true);
		else if (parseFloat(status) === 401) this.props.history.replace(PUBLIC_LOGIN);
		if (callback) callback();
	}

	marketRates() {
		const rates = new Promise(res => this.props.getRates(res, res));
		const pairs = new Promise(res => this.props.getPairs(res, res));
		const assets = new Promise(res => this.props.getAssets(res, res));

		Promise.all([assets, pairs, rates])
			.then(() => {
				this.props.setRatesCalled();
			})
			.catch(() => {
				this.props.setRatesCalled();
			});
	}

	requestsByRoute(prevPath, nextPath) {
		const privatePath = deepIncludes(privateRoutes, nextPath);

		const error = () => {
			this.setState({ error: 'An error occurred. Please refresh your browser.' });
		};

		const loaded = endpointCall => {
			setTimeout(() => {
				this.setState({ loadingExit: true }, () => {
					if (endpointCall) {
						endpointCall(() => {
							this.props.loadingApp(false);
							setTimeout(() => {
								this.setState({ loadingExit: false });
							}, Timings.loadingExit);
						});
					} else {
						this.props.loadingApp(false);
						setTimeout(() => {
							this.setState({ loadingExit: false });
						}, Timings.loadingExit);
					}
				});
			}, Timings.loadingExit);
		};

		const refreshUser = () => {
			this.props.getPermissions(
				() => {
					const rateInterval = () => {
						PRICE_INTERVAL = setInterval(() => {
							if (this.props.authenticated) {
								if (this.props.nextStep === STEP_DASHBOARD) {
									this.props.getRates(
										() => {},
										(_data, status) => this.handleErrors(status)
									);
									this.props.getPortfolio(
										() => {},
										(_data, status) => {
											if (parseFloat(status) === 401) this.handleErrors(status);
											else this.handleErrors(status, () => this.handleLogout());
										}
									);
								}
							} else this.clearIntervals();
						}, config.refreshPrice);
					};

					const refreshDashboard = () => {
						const portfolio = new Promise(res => {
							this.props.getPortfolio(res, res);
						});
						const assets = new Promise(res => {
							this.props.getAssets(res, res);
						});
						const pairs = new Promise(res => {
							this.props.getPairs(res, res);
						});
						const profile = new Promise(res => {
							this.props.getProfile(res, res);
						});

						const rates = new Promise(res => {
							this.props.getRates(
								() => {
									this.props.setRatesCalled();
									if (!priceInterval) {
										priceInterval = true;
										rateInterval();
									}
									res();
								},
								(_data, status) => this.handleErrors(status, res)
							);
						});
						const timeout = new Promise(res => {
							setTimeout(res, Timings.loadingMin, true);
						});

						Promise.all([assets, pairs, portfolio, profile, rates, timeout])
							.then(() => {
								loaded();
							})
							.catch(() => {
								error();
							});
					};
					if (this.props.lackingPermission.includes('TwoFactorAuthenticated')) {
						loaded();
						this.props.history.replace(PRIVATE_TWO_FACTOR);
					} else {
						this.props.getVerificationStatus(() => {
							if (this.props.nextStep === STEP_DASHBOARD && this.props.verificationStatus === VERIFICATION_SUCCESS)
								refreshDashboard();
							else {
								this.props.history.replace(PRIVATE_DASHBOARD);
								this.props.loadingApp(false);
							}
						});
					}
				},
				() => {
					if (privatePath) {
						this.clearIntervals();
						this.props.history.replace(PUBLIC_LOGIN);
						this.props.loadingApp(false);
					}
				}
			);
		};

		const refreshPermissions = path => {
			this.props.getPermissions(
				() => {
					loaded();
					if (privatePath && path !== PRIVATE_TWO_FACTOR) {
						if (this.props.nextStep === STEP_CODE) {
							this.props.history.replace(PRIVATE_TWO_FACTOR);
						}
					}
				},
				() => {
					loaded();
					this.props.loadingApp(false);
					if (privatePath) {
						this.clearIntervals();
						this.props.history.replace(PUBLIC_LOGIN);
						this.props.loadingApp(false);
					}
				}
			);
		};

		if (nextPath.includes(PRIVATE_DASHBOARD)) {
			connectLivePrice(
				Timings.slowThrottle,
				null,
				(data, throttle) => {
					this.props.setLivePrice(data, throttle);
				},
				(data, throttle) => {
					this.props.setLivePrice(data, throttle);
				}
			);
		}

		const refreshLoginRedirect = () => {
			if (localStorage.getItem('isLoggedIn')) {
				this.props.getPermissions(() => {
					this.props.getVerificationStatus(() => {
						const toDashboard = [STEP_DASHBOARD];
						const toCode = [STEP_CODE];
						if (toDashboard.includes(this.props.nextStep)) {
							this.props.loadingApp(true);
							this.props.history.replace(PRIVATE_DASHBOARD);
						} else if (toCode.includes(this.props.nextStep)) {
							this.props.history.replace(PRIVATE_TWO_FACTOR);
						}
					});
				});
			}
		};

		if (nextPath.includes(PRIVATE_MARKET) || nextPath.includes(PRIVATE_DASHBOARD)) {
			if (prevPath === PUBLIC_LOGIN || prevPath === PRIVATE_TWO_FACTOR || prevPath === null)
				this.props.loadingApp(true);
			refreshUser(nextPath);
		} else {
			switch (nextPath) {
				case PUBLIC_DEFAULT: {
					refreshLoginRedirect();
					this.clearIntervals();
					break;
				}
				case PUBLIC_LOGIN: {
					this.clearIntervals();
					refreshLoginRedirect();
					break;
				}
				case PRIVATE_ACTIVITY_LIST:
					refreshUser(nextPath);
					break;
				default:
					refreshPermissions(nextPath);
			}
		}
	}

	render() {
		const Load = () => (
			<_loading className="loading" fadeOut={this.state.loadingExit}>
				{svgIconNewton()}
			</_loading>
		);

		return this.props.refreshing || this.state.loadingExit ? Load() : null;
	}
}

const mapStateToProps = ({ permissions, animation }) => {
	return {
		nextStep: permissions.step,
		authenticated: permissions.authenticated,
		lackingPermission: permissions.lacking_permissions,
		refreshing: animation.refreshing,
		verificationStatus: permissions.verificationStatus
	};
};

export default withRouter(
	connect(mapStateToProps, {
		getAssets,
		getPairs,
		getPortfolio,
		getRates,
		getProfile,
		getPermissions,
		loadingApp,
		setLivePrice,
		getVerificationStatus,
		toggleServerError,
		getLogout,
		setRatesCalled
	})(APIGateway)
);
