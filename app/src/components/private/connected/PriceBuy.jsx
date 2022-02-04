import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { floorSymbol } from '../../../../global/utils/logic';
import { Decimals, fiatList } from '../../../../global/utils/values';
import { stablecoinsFull } from '../../../../global/utils/coins';
import { _pulse } from '../../../../design/styles/styled-components/shared/PricePulse';

class PriceBuy extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			up: false,
			down: false
		};
	}

	componentDidUpdate(prevProps) {
		const prevPrice = prevProps.priceBuy;
		const currentPrice = this.props.priceBuy;

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
		if (this.props.priceBuy || this.props.priceBuy === 0) {
			if (fiatList.includes(this.props.base)) {
				price = floorSymbol(this.props.priceBuy, Decimals.fiat, this.props.fiatSymbol, true);
			} else {
				let decimal = Decimals.crypto;
				if (stablecoinsFull.includes(this.props.base)) decimal = Decimals.fiat;
				price = floorSymbol(this.props.priceBuy, decimal, this.props.base);
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
	return {
		priceBuy: quote && (exchange.priceBuy[symbol] || exchange.priceBuy[symbol] === 0) ? exchange.priceBuy[symbol] : '',
		fiatSymbol: exchange.symbols[exchange.activeFiat],
		base: base,
		ticker: symbol
	};
};

export default connect(mapStateToProps)(PriceBuy);
