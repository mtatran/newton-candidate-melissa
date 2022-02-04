import { forEach } from 'lodash';

export const duplicate = x => f => {
	if (x > 0) {
		f(x);
		duplicate(x - 1)(f);
	}
};

export const greetingTime = (hour, greetings) => {
	const greet = greetings
		? greetings
		: {
				afternoon: 'afternoon',
				evening: 'evening',
				morning: 'morning'
		  };
	let g = null;

	if (!hour) return greet.morning;

	const split_morning = 5;
	const split_afternoon = 12;
	const split_evening = 17;
	const split_midnight = 0;
	const currentHour = hour;

	if (currentHour >= split_afternoon && currentHour <= split_evening) {
		g = greet.afternoon;
	} else if (currentHour >= split_evening || (currentHour >= split_midnight && currentHour <= split_morning)) {
		g = greet.evening;
	} else {
		g = greet.morning;
	}

	return g;
};

export const percentage = (number, maxDecimals = 2) => {
	if (!number) return '0.00%';
	const num = parseFloat(number) * 100;
	const splitNumber = String(num).split('.');
	const commaNumber = splitNumber[0] ? splitNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') : splitNumber[0];
	let finalNumber = '';
	if (splitNumber[1] && parseFloat(splitNumber[1]) !== 0) {
		const finalDecimals = splitNumber[1].substring(0, maxDecimals);
		finalNumber = `${commaNumber}.${finalDecimals}`;

		if (finalDecimals.length !== maxDecimals) {
			let decimal = parseFloat(`.${finalDecimals}`).toFixed(maxDecimals);
			let finalFixedDecimal = decimal.split('.')[1];
			finalNumber = `${commaNumber}.${finalFixedDecimal}`;
		}
	} else {
		finalNumber = commaNumber;
	}
	return `${finalNumber}%`;
};

export const floorSymbol = (
	number,
	maxDecimals = 6,
	symbol = '',
	hasDecimalOverflow = false,
	expandScientificNotation
) => {
	if (!number && number !== 0) return 0;
	const numberObject = commaFormat(number, maxDecimals, hasDecimalOverflow, expandScientificNotation);

	let finalNumber = numberObject.decimal
		? `${numberObject.integer}.${numberObject.decimal}`
		: `${numberObject.integer}`;
	let sign = numberObject.isPositive ? '' : '-';
	if (symbol !== 0 && symbol !== '$') {
		symbol = ' ' + symbol;
	}
	return symbol === '$' ? `${sign}${symbol}${finalNumber}` : `${sign}${finalNumber}${symbol}`;
};

export const commaFormat = (number, maxDecimals, hasDecimalOverflow, expandScientificNotation) => {
	if (!number && number !== 0) return 0;
	const isPositive = number >= 0;
	number = Math.abs(number);
	const MAX_OVERFLOW = 6;
	let decimal = 0;
	let precision = getPrecision(number);
	if (number < 0.000001) {
		maxDecimals = expandScientificNotation ? precision : maxDecimals;
	}
	const splitNumber = String(precision ? parseFloat(number).toFixed(precision) : parseFloat(number)).split('.');
	const integer = splitNumber[0] ? splitNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') : splitNumber[0];
	const splitDecimal = splitNumber[1] ? splitNumber[1] : '';
	if (hasDecimalOverflow && integer <= 1) {
		const finalDecimals = splitDecimal.substring(0, MAX_OVERFLOW);
		decimal = finalDecimals;
	} else if (splitDecimal && parseFloat(splitDecimal) !== 0) {
		const finalDecimals = splitDecimal.substring(0, maxDecimals);
		decimal = finalDecimals;

		if (finalDecimals.length > maxDecimals || finalDecimals.length !== 0) {
			let fixedDecimal = parseFloat(`.${finalDecimals}`).toFixed(maxDecimals);
			let finalFixedDecimal = fixedDecimal.split('.')[1];
			decimal = finalFixedDecimal;
		}
	}

	return {
		isPositive,
		integer,
		decimal
	};
};

export const commaCoin = (number, maxDecimals, symbol) => {
	if (!number && number !== 0) return 0;

	const MAX_OVERFLOW = 2;
	let decimal = 0;
	let isPositive = number >= 0;
	number = !isPositive ? number * -1 : number;
	const splitNumber = String(parseFloat(number)).split('.');
	const splitDecimal = splitNumber[1] ? splitNumber[1] : '';

	let integer;
	if (symbol) {
		integer = splitNumber[0] ? splitNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') : splitNumber[0];
	} else {
		integer = splitNumber[0];
	}

	if (splitNumber[0] >= 1000) {
		const finalDecimals = splitDecimal.substring(0, MAX_OVERFLOW);
		decimal = finalDecimals;
	} else if (splitDecimal && parseFloat(splitDecimal) !== 0) {
		const finalDecimals = splitDecimal.substring(0, maxDecimals);
		decimal = finalDecimals;

		if (finalDecimals.length > maxDecimals) {
			let fixedDecimal = parseFloat(`.${finalDecimals}`).toFixed(maxDecimals);
			let finalFixedDecimal = fixedDecimal.split('.')[1];
			decimal = finalFixedDecimal;
		}
	}
	return {
		isPositive,
		integer,
		decimal
	};
};

export const floorPrice = number => {
	if (!number) return 0;
	// Floor a coin amount in decimals depending on the price. Floor for amounts and prices, round when adding up to 1 for weights.
	let multiple = 100;
	const num = parseFloat(number);
	if (num < 10) multiple = 10000;
	return Math.floor(num * multiple) / multiple;
};

export const floorAmount = number => {
	if (!number) return 0;
	// Floor a coin amount in decimals depending on the price. Floor for amounts and prices, round when adding up to 1 for weights.
	let multiple = 10000;
	const num = parseFloat(number);
	if (num < 1) multiple = 1000000;
	return Math.floor(num * multiple) / multiple;
};

export const roundAmount = number => {
	if (!number) return 0;
	// Floor a coin amount in decimals depending on the price. Floor for amounts and prices, round when adding up to 1 for weights.
	let multiple = 100;
	const num = parseFloat(number);
	return Math.round(num * multiple) / multiple;
};

export const floorCoin = (number, maxDecimals = 6, symbol = '') => {
	if (!number && number !== 0) return 0;
	const numberObject = commaCoin(number, maxDecimals, symbol);
	let finalNumber = numberObject.decimal
		? `${numberObject.integer}.${numberObject.decimal}`
		: `${numberObject.integer}`;
	let sign = numberObject.isPositive ? '' : '-';
	return symbol ? `${sign}${finalNumber} ${symbol}` : `${sign}${finalNumber}`;
};

export const roundPrice = number => {
	if (!number) return 0;
	// Round a coin number to a certain amount of decimals depending on the price
	let multiple = 100;
	const num = parseFloat(number);
	if (num < 10) multiple = 10000;
	return Math.round(num * multiple) / multiple;
};

export const countDecimals = (value, maxDecimal = 6) => {
	if (Math.floor(value) === value) return 0;
	const decimalsAmount = value.toString().split('.')[1].length || 0;
	return decimalsAmount > maxDecimal ? maxDecimal : decimalsAmount;
};

export const roundSpecific = (number, maxDecimals = 6) => {
	if (!number && number !== 0) return 0;

	let multiple = Math.pow(10, maxDecimals);

	return Math.round(number * multiple) / multiple;
};

export const currencyFormat = num => {
	return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const deepIncludes = (arr, str) => {
	// Go through each of the items in the array and run includes on the string
	let bool = false;
	forEach(arr, item => {
		if (item === str || String(str).includes(item)) bool = true;
	});
	return bool;
};

export const getPrecision = number => {
	number = Math.abs(number);
	let precision = null;
	if (number < 0.000001) {
		const scientificNotationTest = /(?:[+\-])?(?:0|[1-9]\d*)(?:\.(\d*))?(?:[eE][+\-]?(\d+))?/;
		const [, extraDecimal, precise] = String(parseFloat(number)).match(scientificNotationTest);
		precision = precise ? Number(precise) + (extraDecimal ?? '').length : null;
	}
	return precision;
};
