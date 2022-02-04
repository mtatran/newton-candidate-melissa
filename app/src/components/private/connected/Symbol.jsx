import React, { PureComponent } from 'react';
import { svgCoins } from '../../../../global/assets/vectors/coins';
import { _coin } from '../../../../design/styles/styled-components/pages/Dashboard';

class Symbol extends PureComponent {
	render() {
		return <_coin coin={this.props.ticker}>{svgCoins(this.props.ticker)}</_coin>;
	}
}

export default Symbol;
