import { isEmpty, map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { toggleActions, toggleMenuReport } from '../../../../../actions/state/forms';
import Pagination from '../Pagination/Pagination';
import { ADJUSTMENT, MENU } from '../../../../../actions/state/types';
import { GENERAL } from '../../../../../redux/reducers/userReducer';
import { svgCoins } from '../../../../../../global/assets/vectors/coins';
import { floorCoin, floorSymbol } from '../../../../../../global/utils/logic';
import { getBlockExplorerURL } from '../../../../../../global/utils/coins';
import { getActionsPaginated, getDetails } from '../../../../../actions/fetch/profile';
import Loading from '../../../../../../design/animations/lottie/loading/Loading';
import { isDesktop } from '../../../../../../global/utils/helpers';
import { STEP_DASHBOARD } from '../../../../../actions/state/state';
import {
	_amount,
	_center,
	_container,
	_date,
	_description,
	_empty,
	_icon,
	_item,
	_item_container,
	_link_mini,
	_link_mobile,
	_main,
	_secondary,
	_section,
	_title,
	_title_link,
	_header,
	_detail
} from './ActivitySection.styled';
import {
	svgAdjustment,
	svgGiftReferral,
	svgCheckCircle,
	svgIconDeposit,
	svgIconTrade,
	svgIconWithdraw,
	svgLink
} from '../../../../../../global/assets/vectors/icons';
import {
	Decimals,
	DEPOSITED,
	DEPOSITED_CRYPTO,
	PAGINATION_LIMIT,
	REFERRAL_REWARD,
	TRADE,
	WITHDRAWAL_COMPLETED
} from '../../../../../../global/utils/values';

const ActivitySection = ({ max, padding, scroll, paginated }) => {
	const [offset, setOffset] = useState(0);
	const [limit] = useState(max || PAGINATION_LIMIT);
	const [fetching, setFetching] = useState(true);
	const [isActive, setisActive] = useState(false);

	const { t } = useTranslation();
	const dispatch = useDispatch();
	const step = useSelector(({ permissions }) => permissions.step);
	const activities = useSelector(({ user }) => user.activity[GENERAL] || []);
	const activeFiat = useSelector(({ exchange }) => exchange.activeFiat);
	const symbolFiat = useSelector(({ exchange }) => exchange.symbols[exchange.activeFiat]);
	const coinList = useSelector(({ exchange }) => exchange.name);

	const mockDetailsData = [
		{
			id: '4',
			bank_account: {},
			created: '2021-10-06T16:35:00.277033-04:00',
			fee: '0.00000000',
			from_amount: '10.00000000',
			from_asset: 'CAD',
			is_api: false,
			quoted_asset_cad_price: '0.00000000',
			reference: '',
			to_amount: '0.00000000',
			to_asset: '',
			type: 'ADJUSTMENT'
		},
		{
			id: '3',
			bank_account: {},
			created: '2021-10-27T19:53:05.498782-04:00',
			fee: '50.00000000',
			from_amount: '-150.000000000',
			from_asset: 'BTC',
			is_api: false,
			quoted_asset_cad_price: '0.00000000',
			reference: '0xc159f8f384b84b7028f91e4b44fad8c87a9010b47cb3e62ded0620e6cb0fb54b',
			to_amount: '0.00000000',
			to_asset: '',
			type: 'WITHDRAWAL_COMPLETED'
		},
		{
			id: '2',
			bank_account: {},
			created: '2021-11-16T11:24:08.355300-05:00',
			fee: '0.00000000',
			from_amount: '294.18947460',
			from_asset: 'BTC',
			is_api: false,
			quoted_asset_cad_price: '0.00000000',
			reference: '',
			to_amount: '0.00000000',
			to_asset: '',
			type: 'DEPOSITED'
		},
		{
			id: '1',
			bank_account: {},
			created: '2021-10-04T16:35:00.277033-04:00',
			fee: '0.00000000',
			from_amount: '25.00000000',
			from_asset: 'CAD',
			is_api: false,
			quoted_asset_cad_price: '0.00000000',
			reference: '',
			to_amount: '0.00000000',
			to_asset: '',
			type: 'REFERRAL_REWARD'
		},
		{
			id: '0',
			bank_account: {},
			created: '2021-11-19T20:12:22.309698-05:00',
			fee: '0.00000000',
			from_amount: '500.00000000',
			from_asset: 'CAD',
			is_api: false,
			quoted_asset_cad_price: '1.48563000',
			reference: '',
			to_amount: '336.55755471',
			to_asset: 'BTC',
			type: 'TRADE'
		}
	];

	useEffect(() => {
		setFetching(true);
		dispatch(
			getActionsPaginated({ offset, limit }, () => {
				setFetching(false);
			})
		);
	}, [offset, limit]);

	const items = () => {
		const recentActivity = activities.items;

		let count = 0;

		let startDate, endDate;

		const list = map(recentActivity, activity => {
			if (count < (max || recentActivity?.length)) {
				const actions = switchActivity(activity, count);
				if (count === 0) startDate = activity.date;
				endDate = activity.date;
				count++;
				return actions;
			}
		});

		if (count && step === STEP_DASHBOARD) {
			const isMultipleMonths = moment(endDate).format('MMMM YYYY') !== moment(startDate).format('MMMM YYYY');
			const format = !isDesktop() && isMultipleMonths ? 'MMM YYYY' : 'MMMM YYYY';

			return (
				<>
					{!max && (
						<_header>
							<p>
								{moment(startDate).format(format)}
								{isMultipleMonths ? ` - ${moment(endDate).format(format)}` : ''}
							</p>
							<h3
								onClick={() => {
									dispatch(toggleMenuReport(true));
									dispatch(toggleActions(MENU));
								}}>
								{t('export')}
							</h3>
						</_header>
					)}
					{list}
				</>
			);
		} else {
			const noItems = t('noItems');
			return <_empty $center>{noItems}</_empty>;
		}
	};

	const switchActivity = (activity, count) => {
		const title = {
			INSTANT_DEPOSIT: t('INSTANT_DEPOSIT'),
			DEPOSIT: t('DEPOSIT'),
			DEPOSITED: t('deposited')
		};

		const today = new Date();
		const dateAgo = moment(activity.date)
			.locale('en', {
				calendar: {
					lastDay: t('lastDay'),
					sameDay: t('sameDay'),
					nextDay: t('nextDay'),
					lastWeek: t('lastWeek'),
					nextWeek: t('nextWeek'),
					sameElse: t('sameElse')
				}
			})
			.from(today);
		const date = moment(activity.date).format('h:mma MMM DD, YYYY');
		const key = `${count}-count`;
		let isActivityTrade = false;
		let isActivityTradeMain = false;
		let isSmall = false;
		let isLink = false;
		let isCrypto = activity.currency !== activeFiat;
		let isSecondary = false;
		let cryptoIcon = null;
		let icon = null;
		let titleValue = null;
		let symbol = symbolFiat;
		let extraInfo = null;
		let isAdjustment = false;
		let txid = activity.reference;
		let amount = activity.amount;
		let decimal = Decimals.fiat;
		const id = activity.id;
		const account = !isEmpty(activity.account) ? `${activity.account.name} ${activity.account.mask}` : t('bankAccount');
		// TO DO: Handle action details

		switch (activity.type) {
			case ADJUSTMENT: {
				icon = svgAdjustment();
				isSecondary = true;
				isAdjustment = true;
				isSmall = !isCrypto;
				cryptoIcon = isCrypto ? svgCoins(activity.currency) : symbolFiat;
				titleValue = t('ADJUSTMENT');
				decimal = isCrypto ? Decimals.crypto : Decimals.fiat;
				symbol = isCrypto ? activity.currency : symbolFiat;
				break;
			}
			case DEPOSITED_CRYPTO: {
				isSecondary = true;
				isSmall = !isCrypto;
				icon = svgIconDeposit();
				cryptoIcon = svgCoins(activity.currency);
				titleValue = `${activity.currency} ${t('DEPOSITED')}`;
				decimal = isCrypto ? Decimals.crypto : Decimals.fiat;
				symbol = isCrypto ? activity.currency : symbolFiat;
				break;
			}
			case WITHDRAWAL_COMPLETED: {
				icon = svgIconWithdraw();
				isSecondary = isCrypto;
				cryptoIcon = svgCoins(activity.currency);
				decimal = isCrypto ? Decimals.crypto : Decimals.fiat;
				symbol = isCrypto ? activity.currency : symbolFiat;
				extraInfo = isCrypto ? (coinList ? coinList[activity.currency] : activity.currency) : ` ${t('to')} ${account}`;
				titleValue = isCrypto ? `${t('WITHDRAW')} ${extraInfo}` : `${t('WITHDRAW')} ${t('funds')} ${extraInfo}`;
				isLink = isCrypto && txid;
				break;
			}
			case DEPOSITED: {
				titleValue = `${title[activity.type]} ${t('via')} ${account}`;
				icon = svgIconDeposit();
				break;
			}
			case TRADE: {
				const forTrade = t('forTrade');
				icon = svgIconTrade();
				isActivityTradeMain = true;
				isSecondary = true;

				let coinTicker, fiatTicker, description, coinAmount;
				amount = Math.abs(activity.fromAmount);
				coinTicker = activity.toAsset;
				cryptoIcon = svgCoins(coinTicker);
				coinAmount = floorCoin(activity.toAmount, Decimals.crypto);
				fiatTicker = activity.fromAsset;
				description = `${floorSymbol(
					amount,
					decimal,
					symbol,
					false,
					true
				)} ${fiatTicker} ${forTrade} ${coinAmount} ${coinTicker}`;
				titleValue = `${t('TRADED')} ${description}`;
				break;
			}
			case REFERRAL_REWARD: {
				icon = svgGiftReferral();
				isSecondary = true;
				cryptoIcon = svgCheckCircle();
				titleValue = t('REFERRAL_REWARD');
				amount = activity.toAmount ? Math.abs(activity.toAmount) : Math.abs(activity.fromAmount);
				break;
			}
		}

		if (!icon) return null;

		//TO DO: Handle action details in the UI
		//TO DO: Handle details style and UX
a

		const openContent = (
		<>
		<div className="openContentItem">
				<_icon>
					<_main $activityTrade={isActivityTradeMain} $adjustment={isAdjustment}>
						{icon}
					</_main>
					{isSecondary && (
						<_secondary $activityTrade={isActivityTrade} $small={isSmall}>
							{cryptoIcon}
						</_secondary>
					)}
				</_icon>
				<_item_container>
					<div className = "containerEl">
					<_title>
						<span>
							{mockDetailsData[id].from_asset}
						</span>
					</_title>
					<_description>
						<span>
							{mockDetailsData[id].from_amount}
						</span>
					</_description>
					</div>
					<div className = "containerEl">
					<_title>
						<span>
							{mockDetailsData[id].to_asset}
						</span>
					</_title>
					<_description>
						<span>
							{mockDetailsData[id].toAmount}
						</span>
					</_description>
					</div>
					<div className = "containerEl">
					<_title>
						<span>
							Date
						</span>
					</_title>
					<_description>
						<span>
							<_date>{dateAgo}</_date>
						</span>
					</_description>
					</div>
				</_item_container>
		</div>
		</>	
		)
		const closedContent = (
		<>
		<_icon>
					<_main $activityTrade={isActivityTradeMain} $adjustment={isAdjustment}>
						{icon}
					</_main>
					{isSecondary && (
						<_secondary $activityTrade={isActivityTrade} $small={isSmall}>
							{cryptoIcon}
						</_secondary>
					)}
				</_icon>
				<_item_container>
					<_title>
						<span>
							{titleValue}
							{isLink && (
								<_title_link>
									<a rel="noreferrer" target="_blank" href={getBlockExplorerURL(symbol, extraInfo, txid)}>
										<div>
											<_link_mobile>{t('view')}</_link_mobile> {t('transaction')} <_link_mini>{t('id')}</_link_mini>
										</div>
										{svgLink()}
									</a>
								</_title_link>
							)}
						</span>
					</_title>
					<_description>
						<_date>{dateAgo}</_date>
						<_detail>{date}</_detail>
						{amount ? <_amount>{floorSymbol(amount, decimal, symbol, false, true)}</_amount> : null}
					</_description>
				</_item_container>
		</>)

		return (
			<_item key={key} onClick={() => {setisActive(!isActive);dispatch(getDetails(id))}}>
				{isActive? openContent : closedContent}
			</_item>
		);
	};

	return (
		<_section $padding={padding} $scroll={scroll}>
			{fetching ? (
				<_center $margin={max} style={{ height: limit * 69 + 38 + 'px' }}>
					<Loading.Circle width={50} height={50} />
				</_center>
			) : null}
			{!fetching ? <_container>{items()}</_container> : null}
			{paginated && activities.count && step === STEP_DASHBOARD && (
				<Pagination
					count={activities.count}
					offset={offset}
					limit={limit}
					setOffset={newOffset => setOffset(newOffset)}
				/>
			)}
		</_section>
	);
};

export default ActivitySection;
