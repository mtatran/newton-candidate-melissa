const colors = ticker => {
	let coin = {};
	switch (ticker) {
		case 'BTC':
			coin = { color: '#f7931a' };
			break;
		case 'ETH':
			coin = { color: '#627eea' };
			break;
		case 'LTC':
			coin = { color: '#9f9f9f' };
			break;
		case 'CAD':
		case 'USD':
			coin = { color: '#ffba00' };
			break;
		case 'XLM':
			coin = { color: '#742F9E' };
			break;
		case 'XRP':
			coin = { color: '#06060a' };
			break;
		case 'BCH':
			coin = { color: '#8dc351' };
			break;
		case 'USDC':
			coin = { color: '#2775ca' };
			break;
		case 'XMR':
			coin = { color: '#ff6600' };
			break;
		case 'USDT': {
			coin = { color: '#26a17b' };
			break;
		}
		case 'QCAD': {
			coin = { color: '#ff0000' };
			break;
		}
		case 'DOGE': {
			coin = { color: '#c3a634' };
			break;
		}
		case 'LINK': {
			coin = { color: '#2e61de' };
			break;
		}
		case 'COMP': {
			coin = { color: '#00d395' };
			break;
		}
		case 'AAVE': {
			coin = { color: '#0ea6b9' };
			break;
		}
		case 'UNI': {
			coin = { color: '#FF007E' };
			break;
		}
		case 'MATIC': {
			coin = { color: '#9444E9' };
			break;
		}
		case 'DAI': {
			coin = { color: '#F5AC37' };
			break;
		}
		case 'SUSHI': {
			coin = { color: '#E461CE' };
			break;
		}
		case 'SNX': {
			coin = { color: '#1b1230' };
			break;
		}
		case 'CRV': {
			coin = { color: '#000000' };
			break;
		}
		case 'ADA': {
			coin = { color: '#246dd3' };
			break;
		}
		case 'YFI': {
			coin = { color: '#006AE3' };
			break;
		}
		case 'DOT': {
			coin = { color: '#E6007A' };
			break;
		}
		case 'PAXG': {
			coin = { color: '#CCA727' };
			break;
		}
		case 'MKR': {
			coin = { color: '#25b69d' };
			break;
		}
		case 'ZEC': {
			coin = { color: '#ecb244' };
			break;
		}
		case 'EOS': {
			coin = { color: '#2f3151' };
			break;
		}
		case 'DASH': {
			coin = { color: '#1c75bc' };
			break;
		}
		case 'XTZ': {
			coin = { color: '#2e84fd' };
			break;
		}
		case 'BAT': {
			coin = { color: '#ed3310' };
			break;
		}
		case 'ZRX': {
			coin = { color: '#06060a' };
			break;
		}
		case 'ENJ': {
			coin = { color: '#9468ff' };
			break;
		}
		case 'TUSD': {
			coin = { color: '#1A5AFF' };
			break;
		}
		case 'KNC': {
			coin = { color: '#31CB9E' };
			break;
		}
		case 'OMG': {
			coin = { color: '#1A53F0' };
			break;
		}
		case 'AXS': {
			coin = { color: '#2491EF' };
			break;
		}
		case 'BAL': {
			coin = { color: '#21222C' };
			break;
		}
		case 'SAND': {
			coin = { color: '#00aeef' };
			break;
		}
		case 'GRT': {
			coin = { color: '#7b61ff' };
			break;
		}
		case 'QNT': {
			coin = { color: '#262261' };
			break;
		}
		case 'ELF': {
			coin = { color: '#2b5eba' };
			break;
		}
		case 'FTM': {
			coin = { color: '#26b6ea' };
			break;
		}
		case 'MANA': {
			coin = { color: '#ff7b61' };
			break;
		}
		case 'UMA': {
			coin = { color: '#ff4a4a' };
			break;
		}
		case '1INCH': {
			coin = { color: '#2f3151' };
			break;
		}
		case 'SOL': {
			coin = { color: '#1A1E21' };
			break;
		}
		case 'ALGO': {
			coin = { color: '#1A1E21' };
			break;
		}
		case 'ETC': {
			coin = { color: '#16a350' };
			break;
		}
		case 'SUPER': {
			coin = { color: '#7b61ff' };
			break;
		}
		case 'CHR': {
			coin = { color: '#0f1115' };
			break;
		}
		case 'STORJ': {
			coin = { color: '#2683ff' };
			break;
		}
		case 'CHZ': {
			coin = { color: '#cd0124' };
			break;
		}
		case 'CVC': {
			coin = { color: '#3ab03e' };
			break;
		}
		case 'ANKR': {
			coin = { color: '#2075e8' };
			break;
		}
		case 'SXP': {
			coin = { color: '#ec6e45' };
			break;
		}
		case 'HOT': {
			coin = { color: '#007f88' };
			break;
		}
		case 'USDP': {
			coin = { color: '#085229' };
			break;
		}
		case 'REP': {
			coin = { color: '#0e0e20' };
			break;
		}
		case 'RSR': {
			coin = { color: '#1a1e21' };
			break;
		}
		case 'AMP': {
			coin = { color: '#d9327c' };
			break;
		}
		case 'SRM': {
			coin = { color: '#181b62' };
			break;
		}
		case 'EGLD': {
			coin = { color: '#1a1e21' };
			break;
		}
		case 'NEXO': {
			coin = { color: '#2853C3' };
			break;
		}
		case 'MLN': {
			coin = { color: '#3295db' };
			break;
		}
		case 'GUSD': {
			coin = { color: '#24ddf9' };
			break;
		}
		case 'META': {
			coin = { color: '#15181c' };
			break;
		}
		case 'NU': {
			coin = { color: '#1e65f3' };
			break;
		}
		case 'RLC': {
			coin = { color: '#f5d107' };
			break;
		}
		case 'NMR': {
			coin = { color: '#000000' };
			break;
		}
		case 'OCEAN': {
			coin = { color: '#16191c' };
			break;
		}
		case 'INJ': {
			coin = { color: '#1A1E21' };
			break;
		}
		case 'UST': {
			coin = { color: '#162955' };
			break;
		}
		case 'FEI': {
			coin = { color: '#22996e' };
			break;
		}
		case 'LRC': {
			coin = { color: '#1f63ff' };
			break;
		}
		case 'REN': {
			coin = { color: '#16406e' };
			break;
		}
		case 'STX': {
			coin = { color: '#5546ff' };
			break;
		}
		case 'BAND': {
			coin = { color: '#516ffa' };
			break;
		}
		case 'SKL': {
			coin = { color: '#1a1e21' };
			break;
		}
		case 'POLY': {
			coin = { color: '#3f4b80' };
			break;
		}
		case 'ALPHA': {
			coin = { color: '#153080' };
			break;
		}
		case 'MDX': {
			coin = { color: '#131735' };
			break;
		}
		case 'OGN': {
			coin = { color: '#007cff' };
			break;
		}
		case 'LUNA': {
			coin = { color: '#EBC331' };
			break;
		}
		case 'AVAX': {
			coin = { color: '#E84242' };
			break;
		}
		case 'ATOM': {
			coin = { color: '#1A1E21' };
			break;
		}
		case 'VET': {
			coin = { color: '#4199EB' };
			break;
		}
		case 'SHIB': {
			coin = { color: '#F00500' };
			break;
		}
		case 'HBAR': {
			coin = { color: '#101216' };
			break;
		}
		default:
			coin = { color: '#FF8E00' };
			break;
	}

	return coin['color'];
};

export default colors;
