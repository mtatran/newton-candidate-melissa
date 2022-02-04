import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { batch, useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../../../design/animations/lottie/loading/Loading';
import { svgIcon, svgIconBack } from '../../../../../../global/assets/vectors/icons';
import { csvActivityHistory, csvCoinTracker, parseError } from '../../../../../../global/utils/helpers';
import { Timings } from '../../../../../../global/utils/timings';
import moment from 'moment';
import {
	DEPOSITED,
	DEPOSITED_CRYPTO,
	ETRANSFER_DEPOSITED,
	ETRANSFER_WITHDRAWAL_REIMBURSED,
	ETRANSFER_WITHDRAWN,
	INSTANT_DEPOSIT,
	REFERRAL_REWARD,
	REFFERAL_REWARD,
	TRADE,
	WIRE_DEPOSITED,
	WITHDRAWN,
	WITHDRAWAL_COMPLETED
} from '../../../../../../global/utils/values';
import { getFullActions } from '../../../../../actions/fetch/profile';
import { toggleMenuReport, toggleReport, toggleServerError } from '../../../../../actions/state/forms';
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
} from './TaxReport.styled';
import { PRIVATE_TAX_REPORT } from '../../../../../actions/state/routes';
import PrivatePage from '../../../../shared/PrivatePage';
import { ADJUSTMENT } from '../../../../../actions/state/types';
import { _error_paragraph } from '../../../../public/_layout/login/mobile/form/FormLoginMobile.styled';

const TaxReport = ({ onClose, ios }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const active = useSelector(({ activeForm }) => activeForm.activeReport);
	const staticActive = useSelector(({ activeForm }) => activeForm.activeMenuReport);
	const activityList = useSelector(({ user }) => user.report || []);
	const fullName = useSelector(({ user }) => user.fullName);
	const firstName = useSelector(({ user }) => user.firstName);

	const [closing, setClosing] = useState(false);
	const [fetching, setFetching] = useState(false);
	const [serverMessage, setServerMessage] = useState();

	useEffect(() => {
		return () => {
			dispatch(toggleReport(false));
			dispatch(toggleMenuReport(false));
		};
	}, []);

	useEffect(() => {
		if (closing) {
			setTimeout(
				() =>
					batch(() => {
						setClosing(false);
						onClose();
						dispatch(toggleReport(false));
						dispatch(toggleMenuReport(false));
					}),
				Timings.closeDrawer
			);
		}
	}, [closing]);

	useEffect(() => {
		if (fetching) {
			dispatch(
				getFullActions(
					() => setFetching(false),
					(data, status) => {
						if (parseFloat(status) >= 500 && parseFloat(status) < 600) {
							dispatch(toggleServerError(true));
						} else {
							setFetching(false);
							setServerMessage(parseError(data, status));
						}
					}
				)
			);
		}
	}, [fetching]);

	const download = (parser, activities, prefix) => {
		let csv = parser(activities);
		if (!csv) return null;

		let name = fullName ? fullName : firstName;
		name = name.trim().replaceAll(' ', '_');
		const filename = prefix + name + '.csv';

		if (!csv.match(/^data:text\/csv/i)) {
			csv = 'data:text/csv;charset=utf-8,' + csv;
		}
		const data = encodeURI(csv);

		const link = document.createElement('a');
		link.setAttribute('href', data);
		link.setAttribute('download', filename);
		link.click();
	};

	const generateReportHistory = exportAction => {
		const yearList = activityList?.reduce((list, activity) => {
			switch (activity.type) {
				case DEPOSITED_CRYPTO:
				case WITHDRAWN:
				case WITHDRAWAL_COMPLETED:
				case ETRANSFER_WITHDRAWN:
				case ETRANSFER_DEPOSITED:
				case DEPOSITED:
				case INSTANT_DEPOSIT:
				case REFERRAL_REWARD:
				case REFFERAL_REWARD:
				case WIRE_DEPOSITED:
				case TRADE:
				case ETRANSFER_WITHDRAWAL_REIMBURSED:
				case ADJUSTMENT: {
					if (!list[moment(activity.date).format('YYYY')]) {
						list[moment(activity.date).format('YYYY')] = [];
					}
					list[moment(activity.date).format('YYYY')].push(activity);
					break;
				}
				default:
					break;
			}
			return list;
		}, {});

		return Object.keys(yearList).reduce((reports, year) => {
			reports.push(
				<_report key={year}>
					{t('reportFor')} {year}
					<span
						onClick={() => {
							download(csvActivityHistory, yearList[year], `account-history-${year}-`);
						}}>
						{exportAction}
					</span>
				</_report>
			);
			return reports;
		}, []);
	};

	return active || staticActive || ios ? (
		<div>
			<PrivatePage title={t('reportHeader')} virtualUrl={PRIVATE_TAX_REPORT} />
			<_container $closing={closing} $tabGroup={staticActive} $ios={ios}>
				{!ios ? (
					<_return>
						<_return_container onClick={() => setClosing(true)}>{svgIconBack()}</_return_container>
					</_return>
				) : null}
				<_wrapper $ios={ios}>
					<_info>
						<_header>{t('reportHeader')}</_header>
						<_desc>
							<p>{t('reportDesc1')}</p>
							<p>{t('reportDesc2')}</p>
						</_desc>
					</_info>
					<div>
						<_actions
							onClick={() => {
								if (!fetching && !activityList?.length) {
									setFetching(true);
								}
							}}>
							<_actions_inline $generated={activityList?.length} $fetching={fetching}>
								<span>{activityList?.length ? t('myReports') : t('generateReport')}</span>
								{!fetching ? svgIcon('icon-close') : <Loading.Circle width={20} height={20} />}
							</_actions_inline>
						</_actions>
						{activityList.count ? (
							<>
								{generateReportHistory(t('export'))}
								<_report>
									{t('coinTracker')}
									<span
										onClick={() => {
											download(csvCoinTracker, activityList, 'cointracker-history-');
										}}>
										{t('export')}
									</span>
								</_report>
								<_report>
									{t('koinly')}
									<span
										onClick={() => {
											download(csvCoinTracker, activityList, 'koinly-history-');
										}}>
										{t('export')}
									</span>
								</_report>
							</>
						) : null}
						{serverMessage ? (
							<_error_paragraph $error $top>
								{serverMessage}
							</_error_paragraph>
						) : null}
					</div>
				</_wrapper>
			</_container>
		</div>
	) : null;
};

export default TaxReport;
