import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { deselectCoin, STEP_DASHBOARD } from '../../../../../actions/state/state';
import { INSTANT_FUNDS } from '../../../../../actions/state/types';
import { chevron, svgIconPending } from '../../../../../../global/assets/vectors/icons';
import { each, forEach } from 'lodash';
import { GENERAL } from '../../../../../redux/reducers/userReducer';
import i18n from '../../../../../i18n';
import { _shadow, _slider } from '../../../../../../design/styles/styled-components/pages/Dashboard';
import { floorSymbol } from '../../../../../../global/utils/logic';
import { Decimals } from '../../../../../../global/utils/values';
import Coin from './coin/Coin';
import smoothscroll from 'smoothscroll-polyfill';

class Portfolio extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			start: true,
			end: false,
			scrollable: false
		};
		this.mousewheel = this.mousewheel.bind(this);
		this.mouseHorizontal = this.mouseHorizontal.bind(this);
		this.onResize = this.onResize.bind(this);
		smoothscroll.polyfill();
	}

	componentDidMount() {
		document.addEventListener('mousewheel', this.mousewheel, { passive: false });

		const portfolio = document.getElementsByClassName('dashboard-portfolio')[0];
		if (portfolio.scrollLeft === 0) {
			this.setState({ start: true });
		} else if (portfolio.offsetWidth + portfolio.scrollLeft === portfolio.scrollWidth) {
			this.setState({ end: true });
		}
		this.onResize();
		window.addEventListener('resize', this.onResize);
	}

	onResize() {
		const portfolio = document.getElementsByClassName('dashboard-portfolio')[0];
		const scrollable = portfolio ? portfolio.offsetWidth < portfolio.scrollWidth : false;

		if (this.state.scrollable !== scrollable) {
			this.setState({ scrollable });
		}
	}
	componentDidUpdate() {
		this.onResize();
	}

	componentWillUnmount() {
		document.removeEventListener('mousewheel', this.mousewheel);
		window.removeEventListener('resize', this.onResize);
	}

	mousewheel(event) {
		if (this.horizontalRef && this.horizontalRef.contains(event.target) && this.state.scrollable) {
			event.preventDefault();
			const portfolio = document.getElementsByClassName('dashboard-portfolio')[0];
			const moveBy = Math.abs(event.deltaX) >= Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
			portfolio.scrollBy(moveBy, 0);
			event.stopPropagation();

			if (portfolio.scrollLeft === 0) {
				this.setState({ start: true, end: false });
			} else if (portfolio.offsetWidth + portfolio.scrollLeft >= portfolio.scrollWidth - 32) {
				this.setState({ end: true, start: false });
			} else {
				if (this.state.start || this.state.end) {
					this.setState({ start: false, end: false });
				}
			}
		}
	}

	horizontalMove(directionFactor) {
		const portfolio = document.getElementsByClassName('dashboard-portfolio')[0];
		const moveBy = portfolio.offsetWidth * directionFactor;

		portfolio.scrollBy(moveBy, 0);

		if (portfolio.scrollLeft === 0) {
			this.setState({ start: true, end: false });
		} else if (portfolio.offsetWidth + portfolio.scrollLeft >= portfolio.scrollWidth - 32) {
			this.setState({ end: true, start: false }, () => {
				portfolio.scrollBy(32, 0);
			});
		} else {
			if (this.state.start || this.state.end) {
				this.setState({ start: false, end: false });
			}
		}
	}

	mouseHorizontal(node) {
		this.horizontalRef = node;
	}

	portfolioItems(isOldUser, coinLength) {
		const tickers = this.props.coinList;
		let list = [];

		const fiatSymbol = this.props.symbol;
		const pendingIcon = svgIconPending('#7375B6', 'transparent');
		const pendingAmount = this.getPendingTotal() - (this.props.instantFunds.limit - this.props.instantFunds.remaining);
		const fiatTicker = this.props.activeFiat;
		const fiatAmount = floorSymbol(this.props.funds[this.props.activeFiat], Decimals.fiat, this.props.symbol);

		const tapToAdd = i18n.t('tapToAdd');

		if (this.props.nextStep === STEP_DASHBOARD) {
			list.push(
				pendingAmount > 0 ? (
					<div
						key={fiatTicker}
						className={`dashboard-portfolio-funds ${coinLength}`}
						onClick={() => {
							this.props.deselectCoin();
						}}>
						<div className="dashboard-portfolio-fundsContainer pending">
							<div className="dashboard-portfolio-funds-ticker">
								<span>{fiatSymbol}</span>
								<span>{fiatTicker.toUpperCase()}</span>
							</div>
							<div className="dashboard-portfolio-funds-amount">
								<span>{fiatAmount}</span>
							</div>
							<div className="dashboard-portfolio-funds-pending">
								<span className="dashboard-portfolio-funds-pending-icon">{pendingIcon}</span>
								<span>{floorSymbol(pendingAmount, Decimals.fiat, this.props.symbol)}</span>
							</div>
						</div>
						<div className="dashboard-portfolio-funds-border" />
					</div>
				) : (
					<div
						key={fiatTicker}
						className={`dashboard-portfolio-funds ${coinLength}`}
						onClick={() => {
							this.props.deselectCoin();
						}}>
						<div className="dashboard-portfolio-fundsContainer">
							<div className="dashboard-portfolio-funds-ticker">
								<span>{fiatSymbol}</span>
								<span>{fiatTicker.toUpperCase()}</span>
							</div>
							<div className="dashboard-portfolio-funds-amount">
								<span>{fiatAmount}</span>
							</div>
							<div className="dashboard-portfolio-funds-add">
								<span>{tapToAdd}</span>
							</div>
						</div>
						<div className="dashboard-portfolio-funds-border" />
					</div>
				)
			);
		}

		if (isOldUser) {
			each(tickers, (ticker, index) => {
				list.push(<Coin key={ticker + index} ticker={ticker} activeTicker={coin => this.setState({ active: coin })} />);
			});
		}

		return list;
	}

	hasCoins() {
		let coins = 0;
		each(this.props.coinList, coin => {
			if (this.props.amount[coin] > 0) coins++;
		});
		return coins;
	}

	getPendingTotal() {
		let total = 0;

		const pending = this.props.pending;
		forEach(pending, item => {
			if (item.type === 'DEPOSIT') {
				total += parseFloat(item.amount);
			}
		});

		return total;
	}

	render() {
		const hasCoins = this.hasCoins();
		const hasNoAccount = !hasCoins && !this.props.funds[this.props.activeFiat] && this.props.activity.length === 0;

		let coinLength;
		if (hasCoins < 2) {
			coinLength = 'all';
		} else if (hasCoins === 2) {
			coinLength = 'desktop';
		} else {
			coinLength = 'none';
		}

		return (
			<_slider className={`dashboard-slider ${this.state.scrollable ? 'scroll' : ''}`}>
				{this.state.scrollable ? (
					<div className="dashboard-slider-arrows">
						<div
							className={`dashboard-slider-arrows-back ${this.state.start ? 'disabled' : ''}`}
							onClick={() => {
								if (!this.state.start) {
									this.horizontalMove(-1);
								}
							}}>
							{chevron(this.state.start ? 'disabled' : 'active')}
						</div>
						<div
							className={`dashboard-slider-arrows-forward ${this.state.end ? 'disabled' : ''}`}
							onClick={() => {
								if (!this.state.end) {
									this.horizontalMove(1);
								}
							}}>
							{chevron(this.state.end ? 'disabled' : 'active')}
						</div>
					</div>
				) : null}
				<div className="dashboard-sliderDisplay">
					<div className={`dashboard-portfolio ${this.state.end ? 'end' : ''}`} ref={this.mouseHorizontal}>
						{this.portfolioItems(!hasNoAccount, coinLength)}
					</div>
					{this.state.scrollable ? (
						<React.Fragment>
							<_shadow className="dashboard-shadow-left" hide={this.state.start}></_shadow>
							<_shadow className="dashboard-shadow-right" hide={this.state.end}></_shadow>{' '}
						</React.Fragment>
					) : null}
				</div>
			</_slider>
		);
	}
}

const mapStateToProps = ({ permissions, exchange, user }) => {
	let count = 0;
	each(exchange.weights, (weight, ticker) => {
		if (parseFloat(weight) > 0 && !exchange.fiatList.includes(ticker)) count++;
	});

	const activeFiat = exchange.activeFiat;

	return {
		funds: exchange.funds,
		activity: user.activity[GENERAL] || [],
		allCoins: exchange.coinList.length !== 0 ? count >= exchange.coinList.length : false,
		nextStep: permissions.step,
		symbol: exchange.symbols[activeFiat],
		pending: exchange.pendingAll,
		instantFunds: permissions.limits[INSTANT_FUNDS],
		coinList: exchange.coinList,
		amount: exchange.amount,
		activeFiat
	};
};

export default connect(mapStateToProps, { deselectCoin })(Portfolio);
