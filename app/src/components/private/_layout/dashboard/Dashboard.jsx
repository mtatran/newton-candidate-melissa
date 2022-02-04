import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet-async';
import { each, isEmpty } from 'lodash';
import moment from 'moment';
import { svgNewtonLogo } from '../../../../../global/assets/vectors/icons';
import { floorSymbol, greetingTime } from '../../../../../global/utils/logic';
import TotalBalance from '../../connected/TotalBalance';
import MarketList from '../market/list/List';
import { PRIVATE_ACTIVITY_LIST, PRIVATE_MARKET } from '../../../../actions/state/routes';
import { STEP_DASHBOARD } from '../../../../actions/state/state';
import { br } from '../../../../../global';
import i18n from '../../../../i18n';
import {
	_Container,
	_display,
	_fill,
	_fixed,
	_gradient,
	_logo,
	_tabs,
	_welcome,
	_wrapper
} from '../../../../../design/styles/styled-components/pages/Dashboard';
import { VERIFICATION_SUCCESS } from '../../../../actions/state/types';
import { GENERAL } from '../../../../redux/reducers/userReducer';
import Portfolio from './portfolio/Portfolio';
import { Decimals } from '../../../../../global/utils/values';
import ActivitySection from '../../_layout/activity/ActivitySection/ActivitySection';

const SCROLL_THRESHOLD = 50;

class Dashboard extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			active: '',
			isDesktop: +window.innerWidth >= br.desktop,
			enterSubmit: false,
			smallMenu: false
		};

		this.resizeWindow = this.resizeWindow.bind(this);
		this.scrollHandler = this.scrollHandler.bind(this);
	}

	componentDidMount() {
		this.subscribeScroll();
		this.scrollHandler();
	}

	componentWillUnmount() {
		let scrollDiv = document.getElementById('offscreen-scrollable');
		scrollDiv.removeEventListener('scroll', this.scrollHandler);
	}

	subscribeScroll() {
		let scrollDiv = document.getElementById('offscreen-scrollable');
		scrollDiv.addEventListener('scroll', this.scrollHandler);
	}

	scrollHandler() {
		let scrollDiv = document.getElementById('offscreen-scrollable');

		if (scrollDiv.scrollTop >= SCROLL_THRESHOLD && !this.state.smallMenu) {
			this.setState({ smallMenu: true });
		} else if (this.state.smallMenu && scrollDiv.scrollTop < SCROLL_THRESHOLD) {
			this.setState({ smallMenu: false });
		}
	}

	resizeWindow() {
		if (window.innerWidth >= br.desktop && !this.state.isDesktop) {
			this.setState({
				isDesktop: true
			});
		} else if (this.state.isDesktop) {
			this.setState({
				isDesktop: false
			});
		}
	}

	hasCoins() {
		let coins = false;
		each(this.props.coinList, coin => {
			if (this.props.amount[coin] > 0) coins = true;
		});
		return coins;
	}

	countPending() {
		let count = 0;
		each(this.props.pending, pending => {
			if (pending.type.includes('DEPOSIT') || pending.type.includes('WITHDRAW')) count++;
		});

		return count;
	}

	hasNoActivity() {
		if (this.props.activity.length === 0) return true;

		if (this.props.activity.length === 1) {
			const item = this.props.activity[0];

			if (item.type === 'CREATED') return true;
		}
		return false;
	}

	render() {
		const yourPortfolio = i18n.t('yourPortfolio');
		const emptyBalance = i18n.t('emptyBalance');
		const recentActivity = i18n.t('recentActivity');
		const marketTitle = i18n.t('market');
		const viewActivity = i18n.t('viewActivity');
		const dashboard = i18n.t('dashboard');
		const portfolio = i18n.t('portfolio');
		const market = i18n.t('market');
		const activity = i18n.t('activity');
		const viewMarket = i18n.t('viewMarket');
		const balance = this.props.balance ? this.props.balance : 0;

		const hasCoins = this.hasCoins();
		const isBlurred = this.props.match.params && this.props.match.params.action;
		const verified = this.props.verificationStatus === VERIFICATION_SUCCESS;
		const hasNoAccount = !hasCoins && isEmpty(this.props.funds) && this.hasNoActivity() && !verified;

		const good = i18n.t('good');
		const welcome = i18n.t('welcomeTitleDashboard');
		const greeting = greetingTime(moment().format('HH'), {
			afternoon: i18n.t('afternoon'),
			evening: i18n.t('evening'),
			morning: i18n.t('morning')
		});
		const goodMorning = `${good} ${greeting ? greeting : i18n.t('morning')}`;

		return (
			<div className={`dashboard`}>
				<Helmet>
					<title>
						{parseFloat(balance) > 0 ? `${floorSymbol(balance, Decimals.fiat, '')} | ` : ''}
						{dashboard} | Newton
					</title>
				</Helmet>
				<_Container className={`dashboardContainer ${isBlurred ? 'blurBackground' : ''}`}>
					<_fixed welcome={this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? null : 'true'}>
						<div>
							<_welcome className={`dashboard-welcome ${this.state.smallMenu ? 'active' : ''}`}>
								<div className="dashboard-welcome-background" />
								<div className={`dashboard-welcome-wrapper ${this.state.smallMenu ? 'active' : ''}`}>
									<h1 className={`${this.state.smallMenu ? 'active' : ''}`}>
										<span
											className={`dashboard-welcome-wrapper-greetings ${
												this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? '' : 'greet'
											}`}>
											{this.props.nextStep === STEP_DASHBOARD && this.props.firstName
												? `${goodMorning}, `
												: `${welcome}`}
										</span>
										{this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? (
											<span className="dashboard-welcome-wrapper-username">{this.props.firstName}.</span>
										) : null}
									</h1>
									<h1 className={`small ${this.state.smallMenu ? 'active' : ''}`}>
										<span
											className={`dashboard-welcome-wrapper-greetings ${
												this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? '' : 'greet'
											}`}>
											{this.props.nextStep === STEP_DASHBOARD && this.props.firstName
												? `${goodMorning}, `
												: `${welcome}`}
										</span>
										{this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? (
											<span className="dashboard-welcome-wrapper-username">{this.props.firstName}.</span>
										) : null}
									</h1>
								</div>
							</_welcome>
							<_tabs className="dashboard-tabs">
								<div className="dashboard-tabs-item active right">
									<span>{portfolio.toUpperCase()}</span>
								</div>
								<Link
									className="dashboard-tabs-item"
									to={{ pathname: PRIVATE_MARKET, state: { direction: 'left', fixed: true } }}>
									<span>{market.toUpperCase()}</span>
								</Link>
								<Link className="dashboard-tabs-item" to={{ pathname: PRIVATE_ACTIVITY_LIST, state: { fixed: true } }}>
									<span>{activity.toUpperCase()}</span>
								</Link>
							</_tabs>
						</div>
					</_fixed>
					<_gradient className="dashboard-gradient">
						<_logo className="dashboard-gradient-logo">{svgNewtonLogo('#1e2137')}</_logo>
						<_fill className="dashboard-gradient-fill" />
					</_gradient>
					<_wrapper className="dashboardWrapper">
						<div className={`dashboard-wallet ${hasNoAccount ? 'empty' : ''}`}>
							<div className="dashboard-wallet-balance">
								<h4>{yourPortfolio}</h4>
								<h2>
									<TotalBalance empty={emptyBalance} />
								</h2>
							</div>
						</div>
					</_wrapper>
					{!hasNoAccount || (this.props.nextStep === STEP_DASHBOARD && verified) ? <Portfolio /> : null}
					{!hasNoAccount && (
						<_display className="dashboard-display">
							<div className="dashboard-display-activity">
								<div className="dashboard-display-activity-recent">
									<div className="dashboard-display-activity-recent-header">
										<p>{recentActivity}</p>
										<Link to={PRIVATE_ACTIVITY_LIST}>{viewActivity}</Link>
									</div>
									<ActivitySection max={6} />
								</div>
							</div>
							<div className="dashboard-display-market_list">
								<div className="dashboard-display-market_list-header">
									<p>{marketTitle}</p>
									<Link to={PRIVATE_MARKET}>{viewMarket}</Link>
								</div>
								<MarketList max={5} />
							</div>
						</_display>
					)}
				</_Container>
			</div>
		);
	}
}

const mapStateToProps = ({ exchange, permissions, user }) => {
	const activeFiat = exchange.activeFiat;

	return {
		nextStep: permissions.step,
		verificationStatus: permissions.verificationStatus,
		coinList: exchange.coinList,
		funds: exchange.funds,
		amount: exchange.amount,
		firstName: user.firstName,
		activity: user.activity[GENERAL]?.items || [],
		activeFiat,
		balance: exchange.balance
	};
};

export default withRouter(connect(mapStateToProps, {})(Dashboard));
