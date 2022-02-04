import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet-async';
import { svgIconNewton, svgNewtonLogo } from '../../../../../global/assets/vectors/icons';
import { Link } from 'react-router-dom';
import { PRIVATE_ACTIVITY_LIST, PRIVATE_DASHBOARD } from '../../../../actions/state/routes';
import MarketList from './list/List';
import { STEP_DASHBOARD } from '../../../../actions/state/state';
import { greetingTime } from '../../../../../global/utils/logic';
import moment from 'moment';
import i18n from '../../../../i18n';
import {
	_Container,
	_fill,
	_fixed,
	_gradient,
	_header,
	_list,
	_logo,
	_tabs,
	_view,
	_watermark
} from '../../../../../design/styles/styled-components/pages/Market';

const SCROLL_THRESHOLD = 50;

class Market extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			smallMenu: false
		};
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

	render() {
		const greeting = greetingTime(moment().format('HH'), {
			afternoon: i18n.t('afternoon'),
			evening: i18n.t('evening'),
			morning: i18n.t('morning')
		});
		const good = i18n.t('good');
		const welcome = i18n.t('welcomeTitleDashboard');
		const goodMorning = `${good} ${greeting ? greeting : 'morning'}`;
		const portfolio = i18n.t('portfolio');
		const market = i18n.t('market');
		const activity = i18n.t('activity');
		const dashboard = i18n.t('dashboard');
		const marketListTxt = i18n.t('marketList');

		return (
			<div className="market">
				<Helmet>
					<title> Market | Newton </title>
				</Helmet>
				<_Container className="marketContainer">
					<_watermark>
						<div
							onClick={() => {
								this.props.history.push(PRIVATE_DASHBOARD);
							}}>
							{svgIconNewton()}
						</div>
					</_watermark>
					<_fixed welcome={this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? null : 'true'}>
						<div>
							<_header className={`market-header ${this.state.smallMenu ? 'active' : ''}`}>
								<div className={`market-header-wrapper  ${this.state.smallMenu ? 'active' : ''}`}>
									<h1 className={`${this.state.smallMenu ? 'active' : ''}`}>
										<span
											className={`market-header-wrapper-greetings ${
												this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? '' : 'greet'
											}`}>
											{this.props.nextStep === STEP_DASHBOARD && this.props.firstName
												? `${goodMorning}, `
												: `${welcome}`}
										</span>
										{this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? (
											<span className="market-header-wrapper-username">{this.props.firstName}.</span>
										) : null}
									</h1>
									<h1 className={`small ${this.state.smallMenu ? 'active' : ''}`}>
										<span className="market-header-wrapper-greetings">
											{this.props.nextStep === STEP_DASHBOARD && this.props.firstName
												? `${goodMorning}, `
												: `${welcome}`}
										</span>
										{this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? (
											<span className="market-header-wrapper-username">{this.props.firstName}.</span>
										) : null}
									</h1>
									<p>
										<span
											onClick={() => {
												this.props.history.push(PRIVATE_DASHBOARD);
											}}>
											{dashboard}
										</span>
										/<span className="noClick">{marketListTxt}</span>
									</p>
								</div>
							</_header>
							<_tabs className="market-tabs">
								<Link className="market-tabs-item" to={{ pathname: PRIVATE_DASHBOARD, state: { fixed: true } }}>
									<span>{portfolio.toUpperCase()}</span>
								</Link>
								<div className={`market-tabs-item active ${this.props.location?.state?.direction}`}>
									<span>{market.toUpperCase()}</span>
								</div>
								<Link className="market-tabs-item" to={{ pathname: PRIVATE_ACTIVITY_LIST, state: { fixed: true } }}>
									<span>{activity.toUpperCase()}</span>
								</Link>
							</_tabs>
						</div>
					</_fixed>
					<_gradient className="market-gradient">
						<_logo className="market-gradient-logo">{svgNewtonLogo('#1e2137')}</_logo>
						<_fill className="market-gradient-fill" />
					</_gradient>
					<_view className="market-view">
						<_list className="market-view-list">
							<MarketList list={true} />
						</_list>
					</_view>
				</_Container>
			</div>
		);
	}
}

const mapStateToProps = ({ permissions, user }) => ({
	nextStep: permissions.step,
	firstName: user.firstName
});

export default connect(mapStateToProps)(Market);
