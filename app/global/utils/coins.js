import i18n from '../../src/i18n';
import StaticLinks from '../../global/utils/links';

export const coins = {
	XRP: 'Tag',
	XLM: 'MEMO'
};

export const withdrawSpecialCases = {
	XRP: { lowerLimit: 20, required: false },
	XLM: { lowerLimit: 1, required: false }
};

export const disclaimers = {
	ETH: i18n.t('ETHDisclaimer'),
	USDT: i18n.t('USDTDisclaimer'),
	USDC: i18n.t('USDCDisclaimer')
};

export const ETH = 'ETH';

export const stablecoins = ['QCAD'];

export const newPairs = ['USDC'];

export const stablecoinsFull = ['QCAD', 'USDT', 'USDC'];

export const fiveDecimalPairs = ['XRP_USDC', 'XLM_USDC', 'USDT_USDC', 'QCAD_USDC'];

export const getBlockExplorerURL = (symbol, name, txid) => {
	switch (symbol) {
		case 'BTC':
		case 'ETH':
		case 'BCH':
			return `${StaticLinks.blockchainLink}${symbol.toString().toLowerCase()}/tx/${txid}`;
		case 'XRP':
		case 'LTC':
		case 'XLM':
		case 'XMR':
			return `${StaticLinks.blockchair}${name.toString().toLowerCase()}/transaction/${txid}`;
		case 'QCAD':
		case 'USDC':
		case 'USDT':
			return `${StaticLinks.etherscan}${txid}`;
		case 'DOT':
			return `${StaticLinks.polkascan}${txid}`;
	}
};
