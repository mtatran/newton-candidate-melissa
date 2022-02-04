import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { svgIconDecrease, svgIconIncrease } from '../../../../global/assets/vectors/icons';
import { percentage } from '../../../../global/utils/logic';
import { stablecoins } from '../../../../global/utils/coins';

class Change extends PureComponent {
	render() {
		const svgUp = svgIconIncrease();
		const svgDown = svgIconDecrease();
		const svg = this.props.change >= 0 ? svgUp : svgDown;
		const change = percentage(this.props.change);

		if (stablecoins.includes(this.props.ticker)) return null;
		return (
			<span>
				{this.props.change > 0 ? `+${change}` : change}
				<span className={this.props.change >= 0 ? 'up' : 'down'}>{svg}</span>
			</span>
		);
	}
}

const mapStateToProps = ({ exchange }, { ticker }) => {
	let symbol = `${ticker}_${exchange.activeFiat}`;

	return {
		change: ticker && exchange.change[symbol] ? exchange.change[symbol] : ''
	};
};

export default connect(mapStateToProps)(Change);
