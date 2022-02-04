import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { floorSymbol } from '../../../../global/utils/logic';
import { Decimals } from '../../../../global/utils/values';

class TotalBalance extends PureComponent {
	render() {
		const empty = this.props.empty ? this.props.empty : '...';
		return (
			<span>
				{parseFloat(this.props.balance) > 0 ? floorSymbol(this.props.balance, Decimals.fiat, this.props.symbol) : empty}
			</span>
		);
	}
}

const mapStateToProps = ({ exchange }) => ({
	balance: exchange.balance,
	symbol: exchange.symbols[exchange.activeFiat]
});

export default connect(mapStateToProps)(TotalBalance);
