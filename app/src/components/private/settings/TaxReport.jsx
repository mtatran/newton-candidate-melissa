import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import i18n from '../../../i18n';
import { svgIcon, svgIconBack } from '../../../../global/assets/vectors/icons';
import { toggleMenuReport, toggleReport } from '../../../actions/state/forms';
import { getFullActions } from '../../../actions/fetch/profile';
import { csvActivityHistory, csvCoinTracker } from '../../../../global/utils/helpers';
import { forEach, map } from 'lodash';
import moment from 'moment';
import { PRIVATE_TAX_REPORT } from '../../../actions/state/routes';
import PrivatePage from '../../shared/PrivatePage';
import { Timings } from '../../../../global/utils/timings';
import {
	DEPOSITED,
	DEPOSITED_CRYPTO,
	ETRANSFER_DEPOSITED,
	ETRANSFER_WITHDRAWAL_REIMBURSED,
	ETRANSFER_WITHDRAWN,
	INSTANT_DEPOSIT,
	REFERRAL_REWARD,
	TRADE,
	WIRE_DEPOSITED,
	WITHDRAWN,
	WITHDRAWAL_COMPLETED
} from '../../../../global/utils/values';
import { ADJUSTMENT } from '../../../actions/state/types';
import {
	_actions,
	_actions_inline,
	_container,
	_desc,
	_header,
	_info,
	_report,
	_return,
	_return_container,
	_wrapper
} from '../_layout/settings/tax-report/TaxReport.styled';
import Loading from '../../../../design/animations/lottie/loading/Loading';

class TaxReport extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	download(parser, activities, prefix) {
		let csv = parser(activities);
		if (csv === null) return null;

		let name = this.props.fullName ? this.props.fullName : this.props.firstName;
		name = name.trim().replace(' ', '_');
		let filename = prefix + name + '.csv';

		if (!csv.match(/^data:text\/csv/i)) {
			csv = 'data:text/csv;charset=utf-8,' + csv;
		}

		let data = encodeURI(csv);

		let link = document.createElement('a');
		link.setAttribute('href', data);
		link.setAttribute('download', filename);
		link.click();
	}

	generateReportHistory(exportAction) {
		const reportFor = i18n.t('reportFor');

		const yearList = {};
		forEach(this.props.activity, activity => {
			switch (activity.type) {
				case DEPOSITED_CRYPTO:
				case WITHDRAWN:
				case WITHDRAWAL_COMPLETED:
				case ETRANSFER_WITHDRAWN:
				case ETRANSFER_DEPOSITED:
				case DEPOSITED:
				case INSTANT_DEPOSIT:
				case REFERRAL_REWARD:
				case WIRE_DEPOSITED:
				case TRADE:
				case ETRANSFER_WITHDRAWAL_REIMBURSED:
				case ADJUSTMENT: {
					if (!yearList[moment(activity.date).format('YYYY')]) {
						yearList[moment(activity.date).format('YYYY')] = [];
					}
					yearList[moment(activity.date).format('YYYY')].push(activity);
					break;
				}
				default:
					break;
			}
		});

		let list = [];
		map(yearList, (year, key) => {
			list.push(
				<_report key={key}>
					{reportFor} {key}
					<span
						onClick={() => {
							this.download(csvActivityHistory, year, 'account-history-');
						}}>
						{exportAction}
					</span>
				</_report>
			);
		});

		return list;
	}

	componentWillUnmount() {
		this.props.toggleReport(false);
		this.props.toggleMenuReport(false);
	}

	closeSubMenu() {
		this.setState({ closing: true }, () => {
			setTimeout(() => {
				this.setState({ closing: false }, () => {
					this.props.return();
					this.props.toggleReport(false);
					this.props.toggleMenuReport(false);
				});
			}, Timings.closeDrawer);
		});
	}
	render() {
		const reportHeader = i18n.t('reportHeader');
		const reportDesc1 = i18n.t('reportDesc1');
		const reportDesc2 = i18n.t('reportDesc2');

		const coinTracker = i18n.t('coinTracker');
		const exportAction = i18n.t('export');

		const taxReportPageTitle = i18n.t('reportHeader');

		const active = this.props.active || this.props.staticActive;

		const generated = !!this.props.activity?.length;

		if (!active) return null;
		return (
			<div>
				<PrivatePage title={taxReportPageTitle} virtualUrl={PRIVATE_TAX_REPORT} />
				<_container $closing={this.state.closing} $tabGroup={this.props.staticActive}>
					<_return>
						<_return_container
							onClick={() => {
								this.closeSubMenu();
							}}>
							{svgIconBack()}
						</_return_container>
					</_return>
					<_wrapper>
						<_info>
							<_header>{reportHeader}</_header>
							<_desc>
								<p>{reportDesc1}</p>
								<p>{reportDesc2}</p>
							</_desc>
						</_info>
						<div>
							<_actions
								onClick={() => {
									if (!this.state.fetching && !generated) {
										this.setState({ fetching: true }, () => {
											this.props.getFullActions(
												() => {
													this.setState({ fetching: false });
												},
												() => {
													this.setState({ fetching: false });
												}
											);
										});
									}
								}}>
								<_actions_inline $generated={generated} $fetching={this.state.fetching}>
									<span>{generated ? i18n.t('myReports') : i18n.t('generateReport')}</span>
									{!this.state.fetching ? svgIcon('icon-close') : <Loading.Circle width={20} height={20} />}
								</_actions_inline>
							</_actions>
							{generated ? (
								<>
									{this.generateReportHistory(exportAction)}
									<_report>
										{coinTracker}
										<span
											onClick={() => {
												this.download(csvCoinTracker, this.props.activity, 'cointrack-history-');
											}}>
											{exportAction}
										</span>
									</_report>
								</>
							) : null}
						</div>
					</_wrapper>
				</_container>
			</div>
		);
	}
}

const mapStateToProps = ({ activeForm, user }) => ({
	active: activeForm.activeReport,
	staticActive: activeForm.activeMenuReport,
	activity: user.report || [],
	fullName: user.fullName,
	firstName: user.firstName
});

export default withRouter(connect(mapStateToProps, { toggleReport, toggleMenuReport, getFullActions })(TaxReport));
