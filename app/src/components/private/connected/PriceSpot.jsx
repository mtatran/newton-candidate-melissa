import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Decimals, fiatList } from '../../../../global/utils/values';
import { floorSymbol } from '../../../../global/utils/logic';
import { stablecoinsFull } from '../../../../global/utils/coins';
import { _pulse } from '../../../../design/styles/styled-components/shared/PricePulse';

class PriceSpot extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			up: false,
			down: false
		};
	}

	componentDidUpdate(prevProps) {
		const prevPrice = prevProps.price;
		const currentPrice = this.props.price;

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
		if (this.props.price) {
			if (fiatList.includes(this.props.base)) {
				price = floorSymbol(this.props.price, Decimals.fiat, this.props.symbol, true);
			} else {
				let decimal = Decimals.crypto;
				if (stablecoinsFull.includes(this.props.base)) decimal = Decimals.fiat;
				price = floorSymbol(this.props.price, decimal, this.props.base);
			}
		}
		return (
			<_pulse up={this.state.up} down={this.state.down}>
				{price}
			</_pulse>
		);
	}
}

const mapStateToProps = ({ exchange }, { quote, base }) => {
	base = base ? base : 'CAD';
	let symbol = `${quote}_${base}`;

	let priceBuy = exchange.priceBuy[symbol] ? exchange.priceBuy[symbol] : '';
	let priceSell = exchange.priceSell[symbol] ? exchange.priceSell[symbol] : 0;

	let price = (priceBuy + priceSell) / 2;

	if (price === 0 || isNaN(price)) price = '';

	return {
		price: price,
		symbol: exchange.symbols[exchange.activeFiat],
		base: base,
		ticker: symbol
	};
};

export default connect(mapStateToProps)(PriceSpot);
