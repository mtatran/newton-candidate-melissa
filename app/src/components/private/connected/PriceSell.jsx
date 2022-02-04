import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Decimals, fiatList } from '../../../../global/utils/values';
import { floorSymbol } from '../../../../global/utils/logic';
import { stablecoinsFull } from '../../../../global/utils/coins';
import { _pulseDark } from '../../../../design/styles/styled-components/shared/PricePulse';

class PriceSell extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			up: false,
			down: false
		};
	}

	componentDidUpdate(prevProps) {
		const prevPrice = prevProps.priceSell;
		const currentPrice = this.props.priceSell;

		const prevTicker = prevProps.ticker;
		const currentTicker = this.props.ticker;

		if (prevPrice !== currentPrice && prevTicker === currentTicker) {
			if (prevPrice > currentPrice && prevPrice !== undefined) this.setState({ up: false, down: true });
			else if (prevPrice < currentPrice && prevPrice !== undefined) this.setState({ up: true, down: false });
			else {
				this.setState({ up: false, down: false });
			}
		}
	}

	render() {
		let price = '...';
		if (this.props.priceSell) {
			if (fiatList.includes(this.props.base)) {
				price = floorSymbol(this.props.priceSell, Decimals.fiat, this.props.symbol, true);
			} else {
				let decimal = Decimals.crypto;
				if (stablecoinsFull.includes(this.props.base)) decimal = Decimals.fiat;
				price = floorSymbol(this.props.priceSell, decimal, this.props.base);
			}
		}
		return (
			<_pulseDark up={this.state.up} down={this.state.down}>
				{price}
			</_pulseDark>
		);
	}
}

const mapStateToProps = ({ exchange }, { quote, base }) => {
	base = base ? base : 'CAD';
	let symbol = `${quote}_${base}`;
	return {
		priceSell: quote && exchange.priceSell[symbol] ? exchange.priceSell[symbol] : '',
		symbol: exchange.symbols[exchange.activeFiat],
		base: base,
		ticker: symbol
	};
};

export default connect(mapStateToProps)(PriceSell);
