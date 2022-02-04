import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PRIVATE_DASHBOARD, PRIVATE_MARKET, PUBLIC_LOGIN } from '../../actions/state/routes';
import { getLogout } from '../../actions/fetch/auth';
import { changeLanguage, EN, FR } from '../../actions/state/langs';
import i18n from '../../i18n';
import { openNewWindow, restoreLayout, saveLayout } from '../../../global/utils/openfin';
import BranchLabel from './branch/BranchLabel';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mobileOpen: false,
			showButton: false
		};

		this.mouseOut = this.mouseOut.bind(this);
		this.focusMenu = this.focusMenu.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.mouseOut, false);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.mouseOut, false);
	}

	mouseOut(event) {
		if (this.state.mobileOpen && this.menuRef && !this.menuRef.contains(event.target)) {
			event.preventDefault();
			this.setState({ mobileOpen: false });
		}
	}
	toggleMobile() {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	}

	focusMenu(node) {
		this.menuRef = node;
	}

	openFinWidgets() {
		return (
			<div>
				<div
					onClick={() => {
						openNewWindow(PRIVATE_MARKET);
					}}
					className="header-langs">
					Market Widget
				</div>
				<div
					onClick={() => {
						saveLayout();
					}}
					className="header-langs">
					Save layout
				</div>
				<div
					onClick={() => {
						restoreLayout();
					}}
					className="header-langs">
					Restore saved layout
				</div>
			</div>
		);
	}

	render() {
		const menu = i18n.t('menu');
		const login = i18n.t('login');
		const dashboard = i18n.t('dashboard');
		const market = i18n.t('market');
		const logout = i18n.t('logout');
		const english = i18n.t('english');
		const french = i18n.t('french');

		return (
			<div className={`header ${this.state.mobileOpen ? 'active' : ''}`}>
				<div
					className="header-button"
					onMouseOver={() => {
						this.setState({ showButton: true });
					}}
					onMouseLeave={() => {
						this.setState({ showButton: false });
					}}>
					{this.state.showButton ? (
						<button
							onClick={() => {
								this.toggleMobile();
							}}>
							{menu}
						</button>
					) : null}
				</div>
				<div className={`header-mobile ${this.state.mobileOpen ? 'open' : ''}`} ref={this.focusMenu}>
					<Link
						to={PUBLIC_LOGIN}
						onClick={() => {
							this.toggleMobile();
						}}>
						{login}
					</Link>
					<Link
						to={PRIVATE_DASHBOARD}
						onClick={() => {
							this.toggleMobile();
						}}>
						{dashboard}
					</Link>
					<Link
						to={PRIVATE_MARKET}
						onClick={() => {
							this.toggleMobile();
						}}>
						{market}
					</Link>
					{this.props.authenticated ? (
						<Link
							to={PUBLIC_LOGIN}
							onClick={() => {
								this.props.getLogout();
							}}>
							{logout}
						</Link>
					) : null}
					<div
						onClick={() => {
							this.props.changeLanguage(EN);
						}}
						className="header-langs">
						{english}
					</div>
					<div
						onClick={() => {
							this.props.changeLanguage(FR);
						}}
						className="header-langs">
						{french}
					</div>
					<BranchLabel />

					{typeof fin !== 'undefined' ? this.openFinWidgets() : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ permissions }) => ({
	authenticated: permissions.authenticated
});

export default connect(mapStateToProps, {
	getLogout,
	changeLanguage
})(Header);
