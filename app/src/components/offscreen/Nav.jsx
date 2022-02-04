import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { svgIcon, svgNewtonLogo } from '../../../global/assets/vectors/icons';
import routeOptions from '../dynamic';
import { _close, _logo, _nav, _overlay } from '../../../design/styles/styled-components/shared/Nav';
import { toggleMenu } from '../../actions/state/state';
import { getLogout } from '../../actions/fetch/auth';
import { PRIVATE_DASHBOARD, PRIVATE_TWO_FACTOR, PUBLIC_LOGIN } from '../../actions/state/routes';
import { MENU, PRIVATE } from '../../actions/state/types';
import Settings from '../private/_layout/settings/Settings';
import { toggleActions } from '../../actions/state/forms';
import BlockPullToRefresh from '../shared/BlockPullToRefresh';
import { Timings } from '../../../global/utils/timings';

class Nav extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			closing: false,
			tabGroup: false
		};

		this.containerRef = this.containerRef.bind(this);
	}

	containerRef(node) {
		this.container = node;
	}

	clickOut(e) {
		if (e.target === this.container) {
			this.closeAction();
		}
	}

	closeAction(handleLogout) {
		this.setState({ closing: true }, () => {
			setTimeout(() => {
				this.setState({ closing: false }, () => {
					this.props.toggleActions('');
					if (handleLogout) handleLogout();
				});
			}, Timings.closeDrawer);
		});
	}

	render() {
		const path = this.props.location.pathname;
		const route = routeOptions(path);
		const notLogged = [PRIVATE_TWO_FACTOR];
		const icon = () => {
			if (route.close) {
				if (route.path_access === PRIVATE) {
					return (
						<_close to={PRIVATE_DASHBOARD} className="nav-close">
							{svgIcon('icon-close')}
						</_close>
					);
				} else {
					return (
						<_close to={PUBLIC_LOGIN} className="nav-close">
							{svgIcon('icon-close')}
						</_close>
					);
				}
			} else if (route.menu) {
				return (
					<_overlay
						onMouseDown={e => {
							this.clickOut(e);
						}}
						className={`menu-overlay ${this.props.active === MENU ? 'active' : ''} ${
							this.state.closing ? 'closing' : ''
						}`}>
						<div
							ref={this.containerRef}
							className={`menuBackground ${this.props.active ? 'active' : ''} ${
								this.state.closing ? 'closing' : ''
							}`}></div>
						{this.props.active === MENU ? <BlockPullToRefresh /> : null}
						<Settings
							open={this.props.active === MENU}
							drawer={this.props.active}
							tabGroup={this.state.tabGroup}
							closing={this.state.closing ? 'true' : null}
							singleMenu
							click={() => {
								if (this.props.active === MENU) {
									this.closeAction();
								} else {
									this.props.toggleActions(MENU);
								}
							}}
							close={handleClose => {
								this.closeAction(handleClose);
							}}
						/>
					</_overlay>
				);
			} else {
				return null;
			}
		};

		const logo = () => {
			if (!route.logo) return null;

			if (route.path_access === PRIVATE && !notLogged.includes(path)) {
				return (
					<_logo
						className={`nav-logo ${route.show_mobile ? 'show' : ''}`}
						onClick={() => {
							this.props.history.push(PRIVATE_DASHBOARD);
						}}>
						{svgNewtonLogo()}
					</_logo>
				);
			} else {
				return (
					<_logo
						className={`nav-logo ${route.show_mobile ? 'show' : ''}`}
						onClick={() => {
							this.props.getLogout();
							this.props.history.push(PUBLIC_LOGIN);
						}}>
						{svgNewtonLogo()}
					</_logo>
				);
			}
		};

		return (
			<_nav className="nav">
				{logo()}
				{icon()}
			</_nav>
		);
	}
}

const mapStateToProps = ({ activeForm }) => ({
	active: activeForm.activeAction
});

export default withRouter(connect(mapStateToProps, { toggleMenu, getLogout, toggleActions })(Nav));
