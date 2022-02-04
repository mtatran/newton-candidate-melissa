import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Symbol from '../../../../connected/Symbol';
import Value from '../../../../connected/Value';
import Change from '../../../../connected/Change';
import colors from '../../../../../../../global/utils/colors';
import { selectCoin } from '../../../../../../actions/state/state';
import i18n from '../../../../../../i18n';
import { _border } from '../../../../../../../design/styles/styled-components/pages/Portfolio';
import CoinAmount from '../../../../connected/CoinAmount';

class Coin extends PureComponent {
	render() {
		const ticker = this.props.ticker;
		const clickToTrade = i18n.t('clickToTrade');

		return (
			<div
				key={this.props.key}
				className={`dashboard-portfolio-coin ${!this.props.hasCoin ? 'hide-mobile' : ''}`}
				onClick={() => {
					this.props.selectCoin(ticker);
				}}>
				<div className="dashboard-portfolio-coinContainer">
					<div className="dashboard-portfolio-coin-amount">
						<Symbol ticker={ticker} />
						<span>
							<span>
								<CoinAmount ticker={ticker} empty={ticker} />
							</span>
						</span>
					</div>
					<div className="dashboard-portfolio-coin-value">
						<Value ticker={ticker} empty={clickToTrade} />
					</div>
					<div className="dashboard-portfolio-coin-price">
						<Change ticker={ticker} />
					</div>
				</div>
				<_border className="dashboard-portfolio-coin-border" bg={colors(ticker)} />
			</div>
		);
	}
}

const mapStateToProps = ({ exchange }, { ticker }) => {
	return {
		hasCoin: exchange.amount[ticker] ? exchange.amount[ticker] !== 0 : false
	};
};

export default withRouter(connect(mapStateToProps, { selectCoin })(Coin));
