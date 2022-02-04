import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ActivitySection from './ActivitySection/ActivitySection';
import {
	_container,
	_fixed,
	_gradient,
	_gradient_fill,
	_greetings,
	_header,
	_history,
	_item,
	_list,
	_logo,
	_tab_active,
	_tab_link,
	_tabs,
	_username,
	_welcome,
	_welcome_wrapper,
	_wrapper
} from './Activity.styled';
import { svgNewtonLogo } from '../../../../../global/assets/vectors/icons';
import { greetingTime } from '../../../../../global/utils/logic';
import moment from 'moment';
import i18n from '../../../../i18n';
import { STEP_DASHBOARD } from '../../../../actions/state/state';
import { PRIVATE_DASHBOARD, PRIVATE_MARKET } from '../../../../actions/state/routes';
import Helmet from 'react-helmet-async';
import { MENU } from '../../../../actions/state/types';
import { toggleActions, toggleMenuReport } from '../../../../actions/state/forms';

const SCROLL_THRESHOLD = 50;

class Activity extends PureComponent {
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
		const accountHistory = i18n.t('accountHistory');
		const csvFile = i18n.t('csvFile');
		const dashboard = i18n.t('dashboard');

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

		return (
			<React.Fragment>
				<Helmet>
					<title>{accountHistory} | Newton</title>
				</Helmet>
				<_list>
					<_container>
						<_fixed welcome={this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? null : 'true'}>
							<div>
								<_welcome active={this.state.smallMenu ? 'true' : null}>
									<_welcome_wrapper active={this.state.smallMenu ? 'true' : null}>
										<_header mobile active={this.state.smallMenu ? 'true' : null}>
											<h1>
												<_greetings
													greet={this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? null : 'true'}>
													{this.props.nextStep === STEP_DASHBOARD && this.props.firstName
														? `${goodMorning}, `
														: `${welcome}`}
												</_greetings>
												{this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? (
													<_username>{this.props.firstName}.</_username>
												) : null}
											</h1>
											<h4>
												<_greetings>
													{this.props.nextStep === STEP_DASHBOARD && this.props.firstName
														? `${goodMorning}, `
														: `${welcome}`}
												</_greetings>
												{this.props.nextStep === STEP_DASHBOARD && this.props.firstName ? (
													<_username>{this.props.firstName}.</_username>
												) : null}
											</h4>
										</_header>
										<p>
											<_history
												onClick={() => {
													this.props.history.push(PRIVATE_DASHBOARD);
												}}>
												{dashboard}
											</_history>
											/<_history noClick>{accountHistory}</_history>
										</p>
									</_welcome_wrapper>
								</_welcome>
								<_tabs>
									<_tab_link to={{ pathname: PRIVATE_DASHBOARD, state: { fixed: true } }}>
										<span>{portfolio.toUpperCase()}</span>
									</_tab_link>
									<_tab_link to={{ pathname: PRIVATE_MARKET, state: { direction: 'right', fixed: true } }}>
										<span>{market.toUpperCase()}</span>
									</_tab_link>
									<_tab_active $active>
										<span>{activity.toUpperCase()}</span>
									</_tab_active>
								</_tabs>
							</div>
						</_fixed>
						<_gradient>
							<_logo>{svgNewtonLogo('#1e2137')}</_logo>
							<_gradient_fill />
						</_gradient>
						<_wrapper>
							<_header>
								<h2>{accountHistory}</h2>
								<h3
									onClick={() => {
										this.props.toggleMenuReport(true);
										this.props.toggleActions(MENU);
									}}>
									{csvFile}
								</h3>
							</_header>
							<_item>
								<ActivitySection month={true} paginated={true} />
							</_item>
						</_wrapper>
					</_container>
				</_list>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ user, permissions }) => ({
	nextStep: permissions.step,
	firstName: user.firstName
});

export default withRouter(connect(mapStateToProps, { toggleActions, toggleMenuReport })(Activity));
