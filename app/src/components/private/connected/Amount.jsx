import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { floorSymbol } from '../../../../global/utils/logic';
import { Decimals } from '../../../../global/utils/values';

class Amount extends PureComponent {
	render() {
		const empty = this.props.empty || this.props.empty === '' ? this.props.empty : 0;
		return <span>{this.props.amount ? floorSymbol(this.props.amount, Decimals.crypto) : empty}</span>;
	}
}

const mapStateToProps = ({ exchange }, { ticker }) => {
	let amount = '';

	if (ticker && exchange.amount) {
		if (exchange.amount[ticker] || exchange.amount[ticker] === 0) {
			amount = exchange.amount[ticker];
		}
	}

	return {
		amount
	};
};

export default connect(mapStateToProps)(Amount);
