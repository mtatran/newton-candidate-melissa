import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { floorCoin } from '../../../../global/utils/logic';
import { Decimals } from '../../../../global/utils/values';

class CoinAmount extends PureComponent {
	render() {
		const empty = this.props.empty || this.props.empty === '' ? this.props.empty : 0;
		return (
			<span>
				{this.props.amount
					? floorCoin(this.props.amount, Decimals.crypto, this.props.hideTicker ? '' : this.props.ticker)
					: `${empty} ${this.props.hideTicker ? '' : this.props.ticker}`}
			</span>
		);
	}
}

const mapStateToProps = ({ exchange }, { ticker }) => {
	return {
		amount: exchange.amount[ticker]
	};
};

export default connect(mapStateToProps)(CoinAmount);
