import {
	GET_ASSETS,
	GET_PAIRS,
	GET_PORTFOLIO,
	GET_PRICES,
	GET_RATES,
	SET_RATES_CALLED
} from '../../actions/fetch/profile';
import { TYPE_COIN, TYPE_FIAT } from '../../actions/state/types';
import { each, forEach, isEmpty, reverse, sortBy, uniqBy } from 'lodash';
import { sortCoins } from '../../../global/utils/helpers';
import { SET_LIVE_PRICE } from '../../actions/state/pricing';

export const initialState = {
	hasFunds: false,
	activeCoin: '',
	activeFiat: 'CAD',
	coinList: [],
	pairList: {},
	pairs: {},
	marketCaps: {},
	fiatList: ['CAD'],
	supported: {},
	funds: {},
	symbols: { ['CAD']: '$' },
	amount: {},
	priceBuy: {},
	priceSell: {},
	spot: {},
	percent: {},
	value: {},
	change: {},
	balance: 0,
	weights: {},
	weightList: [],
	name: {},
	type: { CAD: TYPE_FIAT, BTC: TYPE_COIN },
	pending: {},
	pendingAll: {},
	ratesCalled: false,
	validation: { trade: false, fund: false, withdraw: false },
	success: { type: '', info: { FUNDS: {}, TRADE: {}, WITHDRAW: {} } }
};

const exchangeReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PORTFOLIO: {
			let funds = {};
			let value = {};
			let weights = {};
			let weightList = [];
			let amount = {};
			let spot = {};
			let sortCoins = [];
			let highestValue = 0;
			let activeCoin = state.activeCoin;
			let hasFunds = !!parseFloat(action.payload.portfolio.total_fiat_value);

			each(action.payload.portfolio.currencies, ticker => {
				if (!state.fiatList.includes(ticker.symbol)) {
					amount[ticker.symbol] = parseFloat(ticker.balance);
					sortCoins.push({
						ticker: ticker.symbol,
						value: parseFloat(ticker.cad_value),
						balance: ticker.balance
					});
					if (parseFloat(ticker.cad_value) > highestValue) {
						highestValue = parseFloat(ticker.cad_value);
						activeCoin = state.activeCoin ? state.activeCoin : ticker.symbol;
					}
				} else {
					funds[ticker.symbol] = parseFloat(ticker.balance);
				}
				value[ticker.symbol] = parseFloat(ticker.cad_value);
				weights[ticker.symbol] = parseFloat(ticker.percent) / 100;
			});

			sortCoins = reverse(sortBy(sortCoins, 'value'));

			//Adding to weight list
			forEach(sortCoins, coin => {
				weightList.push(coin.ticker);
			});
			each(state.fiatList, item => weightList.push(item));

			const balance = action.payload.portfolio.total_cad_value;
			if (!activeCoin) activeCoin = 'BTC';
			return {
				...state,
				activeCoin,
				funds,
				value,
				weights,
				weightList,
				amount,
				spot,
				balance,
				hasFunds,
				sortCoins,
				locked_assets: action.payload?.portfolio?.locked_assets
			};
		}
		case GET_RATES:
		case GET_PRICES: {
			let change = { ...state.change };
			let priceBuy = { ...state.priceBuy };
			let priceSell = { ...state.priceSell };
			const rates = action.payload.rates;
			each(rates, rate => {
				let symbol = `${rate.to}_${rate.from}`;
				if (!state.supported[symbol]) {
					change[symbol] = parseFloat(rate.change) / 100;
					priceBuy[symbol] = parseFloat(rate.ask);
					priceSell[symbol] = parseFloat(rate.bid);
				}

				if (!change[symbol]) {
					change[symbol] = parseFloat(rate.change) / 100;
				}
			});
			return { ...state, change, priceBuy, priceSell };
		}
		case SET_RATES_CALLED: {
			return { ...state, ratesCalled: true };
		}
		case SET_LIVE_PRICE: {
			let data = action.payload.data;
			const throttle = action.payload.throttle;
			let change = { ...state.change };
			let priceBuy = { ...state.priceBuy };
			let priceSell = { ...state.priceSell };
			let supported = { ...state.supported };

			try {
				if (Array.isArray(data))
					each(data, rate => {
						if (rate.error) {
							supported[rate.symbol] = false;
						} else {
							if (!throttle.isThrottled(rate.symbol)) {
								throttle.setThrottle(rate.symbol);
								supported[rate.symbol] = true;
								let symbol = rate.symbol;
								if (rate.change) change[symbol] = parseFloat(rate.change) / 100;
								priceBuy[symbol] = parseFloat(rate.ask);
								priceSell[symbol] = parseFloat(rate.bid);
							}
						}
					});
				else {
					if (data.error) {
						supported[data.symbol] = false;
					} else {
						if (!throttle.isThrottled(data.symbol)) {
							throttle.setThrottle(data.symbol);
							supported[data.symbol] = true;
							let symbol = data.symbol;
							if (data.change) change[symbol] = parseFloat(data.change) / 100;
							priceBuy[symbol] = parseFloat(data.ask);
							priceSell[symbol] = parseFloat(data.bid);
						}
					}
				}
			} catch (ex) {
				return { ...state };
			}

			return { ...state, change, priceBuy, priceSell, supported };
		}
		case GET_ASSETS: {
			let symbols = {};
			let type = {};
			let name = {};
			let coinList = [];
			let marketCaps = [];
			forEach(action.payload, asset => {
				const ticker = asset.short_name;
				symbols[ticker] = asset.symbol;
				name[ticker] = asset.long_name;
				marketCaps.push({ symbol: ticker, market_cap: asset.market_cap });
				if (asset.type === 'FIAT') {
					type[ticker] = TYPE_FIAT;
				} else if (asset.type === 'CRYPTO') {
					type[ticker] = TYPE_COIN;
					coinList.push(ticker);
				}
			});

			coinList = sortCoins(coinList);
			return {
				...state,
				symbols,
				name,
				coinList,
				type,
				marketCaps
			};
		}
		case GET_PAIRS: {
			let pairList = [];
			let coinPairs = {};
			let supportedCoins = [];
			let currentCoin = '';
			forEach(action.payload, item => {
				let symbol = `${item.from_asset_short}_${item.to_asset_short}`;
				pairList.push(symbol);
				if (currentCoin !== item.to_asset_short) {
					supportedCoins = [];
					currentCoin = item.to_asset_short;
					if (!isEmpty(coinPairs[item.to_asset_short])) {
						coinPairs[item.to_asset_short].push(item.from_asset_short);
					} else {
						coinPairs[item.to_asset_short] = supportedCoins;
					}
				}
				supportedCoins.push(item.from_asset_short);
			});
			coinPairs[currentCoin]?.push?.apply(coinPairs[currentCoin], supportedCoins);
			forEach(action.payload, item => {
				if (currentCoin !== item.from_asset_short) {
					supportedCoins = [];
					currentCoin = item.from_asset_short;
					if (!isEmpty(coinPairs[item.from_asset_short])) {
						coinPairs[item.from_asset_short].push(item.to_asset_short);
					} else {
						coinPairs[item.from_asset_short] = supportedCoins;
					}
				}
				supportedCoins.push(item.to_asset_short);
			});
			coinPairs[currentCoin]?.push?.apply(coinPairs[currentCoin], supportedCoins);
			let uniqueCoinPairs = {};
			forEach(coinPairs, (pairs, ticker) => {
				uniqueCoinPairs[ticker] = uniqBy(pairs, e => e);
			});
			return {
				...state,
				pairs: uniqueCoinPairs,
				pairList
			};
		}
		default:
			return state;
	}
};

export default exchangeReducer;
