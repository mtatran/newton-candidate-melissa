import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { percentage } from '../../../../global/utils/logic';
import { stablecoins } from '../../../../global/utils/coins';

class Percentage extends PureComponent {
	render() {
		if (stablecoins.includes(this.props.quote)) return null;
		const value = percentage(this.props.change);
		const color = this.props.change > 0 ? 'increase' : this.props.change < 0 ? 'decrease' : '';
		return <span className={color}>{this.props.change > 0 ? `+${value}` : value}</span>;
	}
}

const mapStateToProps = ({ exchange }, { quote, base }) => {
	base = base ? base : 'CAD';
	let symbol = `${quote}_${base}`;
	return {
		change: quote && exchange.change[symbol] ? exchange.change[symbol] : ''
	};
};

export default connect(mapStateToProps)(Percentage);
