import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { each, forEach, orderBy, remove } from 'lodash';
import { svgCoins } from '../../../../../../global/assets/vectors/coins';
import { svgIconDecrease, svgIconIncrease } from '../../../../../../global/assets/vectors/icons';
import Name from '../../../connected/Name';
import Percentage from '../../../connected/Percentage';
import PriceSpot from '../../../connected/PriceSpot';
import i18n from '../../../../../i18n';
import { _icon } from '../../../../../../design/styles/styled-components/pages/Market';
import colors from '../../../../../../global/utils/colors';
import { stablecoins, stablecoinsFull } from '../../../../../../global/utils/coins';

class List extends PureComponent {
	items() {
		let list = [];
		const noItems = i18n.t('nothingMarket');
		let count = 0;
		each(this.props.pairList, symbol => {
			let symbolSplit = symbol.ticker.split('_');

			if (symbolSplit.length !== 2) return;
			let base = symbolSplit[0];
			let quote = symbolSplit[1];
			if (base === this.props.filter) return;

			const changeIcon = this.props.change[symbol.ticker] >= 0 ? svgIconIncrease() : svgIconDecrease();
			count++;
			if ((this.props.max ? count <= this.props.max : true) && base !== 'QCAD' && quote === 'CAD') {
				list.push(
					<a key={`${count}: market_list-item`} className="market_list-item slim">
						<_icon className="market_list-item-icon" coin={base} bg={colors(base)}>
							<span className="market_list-item-icon-main">{svgCoins(base)}</span>
						</_icon>
						<div className="market_list-itemContainer slim">
							<span className="market_list-item-title">
								<Name ticker={base} />
								<span className="market_list-item-title-ticker">
									{base} / {quote}
								</span>
							</span>
							<div className="market_list-item-description">
								<div className="market_list-item-description-icon">
									<span className="market_list-item-description-prices-variation">
										<Percentage quote={base} base={quote} />
									</span>
									{!stablecoins.includes(base) && this.props.change[symbol.ticker] !== 0 ? changeIcon : null}
								</div>
								<div className="market_list-item-description-prices">
									<span className="market_list-item-description-prices-amount">
										<PriceSpot isCoin={true} quote={base} base={quote} />
									</span>
								</div>
							</div>
						</div>
					</a>
				);
			} else if ((this.props.max ? count <= this.props.max : true) && base === 'QCAD') {
				list.push(
					<div key={`${count}: market_list-item`} className="market_list-item static slim">
						<_icon className="market_list-item-icon" coin={base} bg={colors(base)}>
							<span className="market_list-item-icon-main">{svgCoins(base)}</span>
						</_icon>
						<div className="market_list-itemContainer">
							<span className="market_list-item-title">
								<Name ticker={base} />
								<span className="market_list-item-title-ticker">
									{base} / {quote}
								</span>
							</span>
							<div className="market_list-item-description">
								<div className="market_list-item-description-icon">
									{!stablecoins.includes(base) ? changeIcon : null}
								</div>
								<div className="market_list-item-description-prices">
									<span className="market_list-item-description-prices-amount">
										<PriceSpot isCoin={true} quote={base} base={quote} />
									</span>
								</div>
							</div>
						</div>
					</div>
				);
			}
		});
		if (!this.props.location?.state?.fixed || (this.props.location?.state?.fixed && this.props.ratesCalled)) {
			if (count === 0) {
				return <span className="market_list-item-empty">{noItems}</span>;
			} else {
				return list;
			}
		}
	}

	render() {
		const items = this.items();
		const marketList = i18n.t('marketList');
		return (
			<div className={`market_list ${this.props.list ? 'list' : ''}`}>
				{!this.props.max && this.props.max !== 0 && <h2>{marketList}</h2>}
				<div className={`market_listContainer ${this.props.max ? 'max' : ''}`}>{items}</div>
			</div>
		);
	}
}

const mapStateToProps = ({ exchange }) => {
	let pairList = exchange.pairList || [];
	let marketCapsSorted = [];
	let stableCoins = [];
	remove(pairList, symbol => {
		let symbolSplit = symbol.split('_');
		return symbolSplit[1] !== 'CAD';
	});

	forEach(exchange.marketCaps, itemMarketCap => {
		forEach(pairList, itemPairList => {
			let symbolSplit = itemPairList.split('_');
			if (symbolSplit[0] === itemMarketCap.symbol) {
				if (!stablecoinsFull.includes(symbolSplit[0])) {
					marketCapsSorted.push({ ticker: itemPairList, market_cap: itemMarketCap.market_cap });
				} else {
					stableCoins.push({ ticker: itemPairList, market_cap: itemMarketCap.market_cap });
				}
			}
		});
	});

	pairList = orderBy(marketCapsSorted, ['market_cap'], ['desc']);

	forEach(stableCoins, item => {
		pairList.push(item);
	});

	return {
		pairList,
		change: exchange.change,
		ratesCalled: exchange.ratesCalled
	};
};

export default withRouter(connect(mapStateToProps)(List));
