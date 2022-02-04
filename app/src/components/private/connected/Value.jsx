import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { floorSymbol } from '../../../../global/utils/logic';
import { Decimals } from '../../../../global/utils/values';

class Value extends PureComponent {
	render() {
		return (
			<span className={this.props.empty && !this.props.value ? 'empty' : ''}>
				{this.props.empty && !this.props.value
					? this.props.empty
					: floorSymbol(this.props.value, Decimals.fiat, this.props.symbol)}
			</span>
		);
	}
}

const mapStateToProps = ({ exchange }, { ticker }) => ({
	value: ticker && exchange.value ? exchange.value[ticker] : '',
	symbol: exchange.symbols[exchange.activeFiat]
});

export default connect(mapStateToProps)(Value);
