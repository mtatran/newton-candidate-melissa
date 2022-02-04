export const floorNumber = (number, maxDecimals = 6) => {
	if (!number && number !== 0) return 0;

	let multiple = Math.pow(10, maxDecimals);
	const num = parseFloat(number);
	return Math.floor(num * multiple) / multiple;
};

const formatAmount = (amount, maxDecimals) => {
	return parseFloat(floorNumber(amount, maxDecimals));
};

export const calculateSell = (amount, price) => {
	if (!amount && amount !== 0) return 0;
	return formatAmount(amount * price);
};

export const calculateBuy = (amount, price) => {
	if (!amount && amount !== 0) return 0;
	return formatAmount(amount / price);
};

export const calculateCoinToCoin = (amount, priceDivident, priceMultiplier) => {
	if (!amount && amount !== 0) return 0;
	return formatAmount((amount / priceDivident) * priceMultiplier);
};

export const decimalSteps = decimals => {
	if (decimals <= 0) return '1';
	else {
		let step = '.';
		for (let i = decimals - 1; i > 0; i--) step = step.concat('0');
		return step.concat('1');
	}
};
