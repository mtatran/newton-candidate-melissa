import { compact, each, findIndex, forEach, isEmpty, mapKeys } from 'lodash';
import { br } from '../index';
import { ADJUSTMENT, TRADE, TYPE_COIN, TYPE_FIAT } from '../../src/actions/state/types';
import {
	defaultCoinOrder,
	DEPOSITED,
	DEPOSITED_CRYPTO,
	ETRANSFER_DEPOSITED,
	ETRANSFER_WITHDRAWAL_REIMBURSED,
	ETRANSFER_WITHDRAWN,
	INSTANT_DEPOSIT,
	REFERRAL_REWARD,
	REFFERAL_REWARD,
	WIRE_DEPOSITED,
	WITHDRAWN,
	WITHDRAWAL_COMPLETED
} from './values';
import moment from 'moment';
import i18n from '../../i18n';
import { fiatList } from '../../global/utils/values';
import { getPrecision } from './logic';

export const isDesktop = () => {
	return window.innerWidth > br.desktop;
};

export const isTablet = () => {
	return window.innerWidth > br.tablet;
};

export const parseError = (data, status) => {
	let serverMessage = '';

	if (status === 500) {
		serverMessage = i18n.t('somethingWentWrong');
	} else if (status === 451) {
		serverMessage = i18n.t('invalidCountry');
	} else {
		mapKeys(data, value => {
			if (!serverMessage) {
				if (value instanceof Array) {
					serverMessage = value[0];
				} else {
					serverMessage = value;
				}
			}
		});
	}

	return serverMessage;
};

export const ellipsize = (str, max, fromEnd) => {
	const string = String(str);
	const ellipsis = '... ';
	let start = '';
	let end = '';
	let final = '';
	if (string.length > max) {
		if (fromEnd) {
			start = string.substring(0, max - parseFloat(fromEnd) - ellipsis.length);
			end = string.substring(string.length - parseFloat(fromEnd), string.length);
			final = start + ellipsis + end;
		} else {
			start = string.substring(0, max - ellipsis.length);
			final = start + ellipsis;
		}
	} else {
		final = string;
	}
	return final;
};

export const formatPhone = phoneNumber => {
	if (!phoneNumber) return '';

	const numbers = phoneNumber.split('');

	let numberClusters = ['', '', ''];
	each(numbers, (number, index) => {
		if (index < 3) {
			numberClusters[0] = numberClusters[0] + number;
		} else if (index < 6) {
			numberClusters[1] = numberClusters[1] + number;
		} else {
			numberClusters[2] = numberClusters[2] + number;
		}
	});

	return `(${numberClusters[0]}) ${numberClusters[1]}-${numberClusters[2]}`;
};

export const deepOverride = (defaults, over) => {
	const cycle = (defs, opts) => {
		let obj = { ...defs };
		mapKeys(opts, (value, key) => {
			if (!isEmpty(value) && typeof value === 'object' && value.constructor === Object) {
				obj[key] = cycle(obj[key], value);
			} else {
				obj[key] = value;
			}
		});
		return obj;
	};

	return cycle(defaults, over);
};

export const validateValueChange = (value, revertValue = '', type, limitLength = 12) => {
	const isDot = /^[.]?$/;
	if (isNaN(value) && !isDot.test(value)) {
		value = revertValue;
	} else if (String(value).length > limitLength) {
		if (String(value).includes('.')) {
			const limit = Math.pow(10, limitLength);
			value = Math.floor(value * limit) / limit;
		} else {
			value = revertValue;
		}
	} else if (type === TYPE_FIAT) {
		const decimals = value.toString().split('.').length > 1 ? value.toString().split('.')[1] : '';
		if (decimals && decimals.length > 2) {
			value = revertValue;
		}
	} else if (type === TYPE_COIN) {
		const decimals = value.toString().split('.').length > 1 ? value.toString().split('.')[1] : '';
		if (decimals && decimals.length > limitLength) {
			value = revertValue;
		}
	}

	return value;
};

export const discrete = email => {
	const string = String(email);
	const stars = '***';
	const start = string.substring(0, 2);
	let end = string.substring(string.indexOf('@'), string.length);
	return start + stars + end;
};

export const sortCoins = coinList => {
	let list = [];

	forEach(coinList, coin => {
		let index = findIndex(defaultCoinOrder, defaultCoin => {
			return defaultCoin === coin;
		});

		if (index >= 0) {
			list[index] = coin;
		} else {
			if (!list[defaultCoinOrder.length]) {
				list.push(coin);
			} else {
				if (list.length >= defaultCoinOrder.length) {
					list[list.length] = coin;
				} else {
					list[defaultCoinOrder.length] = coin;
				}
			}
		}
	});

	list = compact(list);

	return list;
};
export const uppercaseSentence = fullname => {
	let split = fullname.split(' ');

	if (split.length <= 1) return fullname;

	let sentence = [];
	split.forEach(item => {
		sentence.push(item.charAt(0).toUpperCase() + item.slice(1));
	});

	return sentence.join(' ');
};

const getCSVAmountFormatting = (amount, asset) => {
	if (fiatList.includes(asset)) {
		const precision = getPrecision(amount);
		if (precision) return parseFloat(Math.abs(amount)).toFixed(precision);
	}
	return Math.abs(parseFloat(amount));
};

export const csvCoinTracker = data => {
	if (data === null || !data.length) return null;
	let result = 'Date,Received Quantity,Currency,Sent Quantity,Currency,Fee Amount,Fee Currency,Tag\n';

	data.forEach(item => {
		const { toAsset, fromAsset, toAmount, fromAmount, date, type, fee } = item;
		let time = moment.utc(date).format('MM/DD/YYYY HH:mm:ss');
		switch (type) {
			case TRADE: {
				let receivedQuantity = getCSVAmountFormatting(toAmount, toAsset);
				let receivedCurrency = toAsset;
				let sendQuantity = getCSVAmountFormatting(fromAmount, fromAsset);
				let sendCurrency = fromAsset;
				let line = `${time},${receivedQuantity},${receivedCurrency},${sendQuantity},${sendCurrency},,,\n`;
				result += line;
				break;
			}
			case INSTANT_DEPOSIT:
			case DEPOSITED:
			case DEPOSITED_CRYPTO:
			case ETRANSFER_DEPOSITED:
			case WIRE_DEPOSITED: {
				let receivedQuantity = Math.abs(parseFloat(fromAmount));
				let receivedCurrency = fromAsset;
				let line = `${time},${receivedQuantity},${receivedCurrency},,,,,\n`;
				result += line;
				break;
			}
			case ETRANSFER_WITHDRAWN:
			case WITHDRAWN: {
				let sendQuantity = Math.abs(parseFloat(fromAmount));
				let sendCurrency = fromAsset;
				let line = `${time},,,${sendQuantity},${sendCurrency},,,\n`;
				result += line;
				break;
			}
			case WITHDRAWAL_COMPLETED: {
				let sendQuantity = Math.abs(parseFloat(fromAmount));
				let sendCurrency = fromAsset;
				let itemFee = fee ? fee : '';
				let line = `${time},,,${sendQuantity},${sendCurrency},${itemFee},${itemFee ? sendCurrency : ''},\n`;
				result += line;
				break;
			}
			case REFERRAL_REWARD:
			case REFFERAL_REWARD: {
				let receivedQuantity = toAmount ? Math.abs(parseFloat(toAmount)) : Math.abs(parseFloat(fromAmount));
				let receivedCurrency = toAsset ?? fromAsset;
				let line = `${time},${receivedQuantity},${receivedCurrency},,,,,gift\n`;
				result += line;
				break;
			}
			case ADJUSTMENT: {
				let sendQuantity = Math.abs(parseFloat(fromAmount));
				let sendCurrency = fromAsset;
				let line = `${time},,,${sendQuantity},${sendCurrency},,,\n`;
				result += line;
				break;
			}
			case ETRANSFER_WITHDRAWAL_REIMBURSED: {
				let sendQuantity = Math.abs(parseFloat(fromAmount));
				let sendCurrency = fromAsset;
				let line = `${time},,,${sendQuantity},${sendCurrency},,,\n`;
				result += line;
				break;
			}
		}
	});

	return result;
};

export const csvActivityHistory = data => {
	if (data === null || !data.length) return null;
	let result =
		'Date,Type,Received Quantity,Received Currency,Sent Quantity,Sent Currency,Fee Amount,Fee Currency,Tag\n';

	data.forEach(item => {
		const { toAsset, fromAsset, toAmount, fromAmount, date, type, fee } = item;
		let time = moment(date).format('MM/DD/YYYY HH:mm:ss');
		switch (type) {
			case TRADE: {
				let receivedQuantity = getCSVAmountFormatting(toAmount, toAsset);
				let receivedCurrency = toAsset;
				let sendQuantity = getCSVAmountFormatting(fromAmount, fromAsset);
				let sendCurrency = fromAsset;
				let line = `${time},TRADE,${receivedQuantity},${receivedCurrency},${sendQuantity},${sendCurrency}\n`;
				result += line;
				break;
			}
			case INSTANT_DEPOSIT:
			case WIRE_DEPOSITED:
			case DEPOSITED:
			case ETRANSFER_DEPOSITED:
			case DEPOSITED_CRYPTO: {
				let receivedQuantity = Math.abs(parseFloat(fromAmount));
				let receivedCurrency = fromAsset;
				let line = `${time},DEPOSIT,${receivedQuantity},${receivedCurrency}\n`;
				result += line;
				break;
			}
			case ETRANSFER_WITHDRAWN:
			case WITHDRAWN: {
				let sendQuantity = Math.abs(parseFloat(fromAmount));
				let sendCurrency = fromAsset;
				let line = `${time},WITHDRAWN,,,${sendQuantity},${sendCurrency}\n`;
				result += line;
				break;
			}
			case WITHDRAWAL_COMPLETED: {
				let sendQuantity = Math.abs(parseFloat(fromAmount));
				let sendCurrency = fromAsset;
				let itemFee = fee ? fee : '';
				let line = `${time},WITHDRAWN,,,${sendQuantity},${sendCurrency},${itemFee},${itemFee ? sendCurrency : ''}\n`;
				result += line;
				break;
			}
			case REFERRAL_REWARD:
			case REFFERAL_REWARD: {
				let receivedQuantity = toAmount ? Math.abs(parseFloat(toAmount)) : Math.abs(parseFloat(fromAmount));
				let receivedCurrency = toAsset ?? fromAsset;
				let line = `${time},DEPOSIT,${receivedQuantity},${receivedCurrency},,,Referral Program\n`;
				result += line;
				break;
			}
			case ADJUSTMENT: {
				let sendQuantity = Math.abs(parseFloat(fromAmount));
				let sendCurrency = fromAsset;
				let line = `${time},ADJUSTMENT,,,${sendQuantity},${sendCurrency}\n`;
				result += line;
				break;
			}
			case ETRANSFER_WITHDRAWAL_REIMBURSED: {
				let sendQuantity = Math.abs(parseFloat(fromAmount));
				let sendCurrency = fromAsset;
				let line = `${time},REIMBURSEMENT,,,${sendQuantity},${sendCurrency}\n`;
				result += line;
				break;
			}
		}
	});

	return result;
};

export const getStringSize = (string, sizeType = 1000000, fixed = 2) => {
	if (!string && string !== '') return 0;
	return (new TextEncoder().encode(string).length / sizeType).toFixed(fixed);
};

export const getCookie = name => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2)
		return parts
			.pop()
			.split(';')
			.shift();
};

export const setCookie = (name, value, days) => {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
};
