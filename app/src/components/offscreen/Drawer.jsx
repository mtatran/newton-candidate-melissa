import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import routeOptions from '../dynamic';
import { _drawer, _fill } from '../../../design/styles/styled-components/shared/Drawer';
import { toggleMenu } from '../../actions/state/state';
import { clearFormError, toggleActions, toggleMenuReport, toggleReport } from '../../actions/state/forms';
import { MENU } from '../../actions/state/types';
import Settings from '../private/_layout/settings/Settings';
import { trackVirtualPageview } from '../../actions/state/analytics';
import BlockPullToRefresh from '../shared/BlockPullToRefresh';
import { Timings } from '../../../global/utils/timings';

class Drawer extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			closing: false,
			tabGroup: false,
			noAnimation: false,
			prevAction: MENU
		};

		this.closeAction = this.closeAction.bind(this);
		this.containerRef = this.containerRef.bind(this);
		this.trackClosingOfMenu = this.trackClosingOfMenu.bind(this);
	}

	containerRef(node) {
		this.container = node;
	}

	clickOut(e) {
		if (e.target === this.container) {
			this.closeAction();
		}
	}

	trackClosingOfMenu() {
		const currenctUrlLocation = this.props.location.pathname;
		setTimeout(() => {
			const currentTitle = document.title;
			this.props.trackVirtualPageview(currentTitle, currenctUrlLocation);
		}, Timings.trackClosingMenu);
	}

	closeAction(handleLogout, menu) {
		this.setState({ closing: true }, () => {
			if (window.zE) {
				window.zE('webWidget', 'hide');
				window.zE('webWidget', 'close');
			}
			setTimeout(() => {
				this.setState({ closing: false }, () => {
					menu ? this.props.toggleActions(MENU, '', true) : this.props.toggleActions('');
					this.props.toggleReport(false);
					this.props.toggleMenuReport(false);
					this.props.clearFormError();
					if (handleLogout) handleLogout();
					else if (!menu) this.trackClosingOfMenu();
				});
			}, Timings.closeDrawer);
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.active !== this.props.active && prevProps.active) {
			if (prevProps.active && this.props.active) {
				this.setState({ noAnimation: true });
			} else if (!prevProps.active && this.props.active) {
				this.setState({ noAnimation: false });
			}
		}

		if (prevProps.active && this.props.active && !this.props.animateDrawer) {
			this.setState({ tabGroup: true });
		} else {
			this.setState({ tabGroup: false });
		}
	}

	render() {
		const path = this.props.location.pathname;
		const route = routeOptions(path);

		let active = this.props.active;
		if (this.props.animateDrawer && this.props.active !== MENU) {
			active = this.state.prevAction;
		}

		if (route.drawer) {
			return (
				<_drawer className={`drawer ${this.props.active ? 'active' : ''}`}>
					{this.props.active ? <BlockPullToRefresh /> : null}
					<div
						onMouseDown={e => {
							this.clickOut(e);
						}}
						className={`drawerContainer ${this.props.active ? 'active' : ''}`}>
						<div
							ref={this.containerRef}
							className={`drawerBackground ${this.props.active ? 'active' : ''} ${this.state.closing ? 'closing' : ''}`}
						/>
						<div className={`drawerSidebar  ${this.props.active ? 'active' : ''}`}>
							<div className={`drawer-nav ${this.props.active === MENU ? 'active' : ''}`}>
								<Settings
									open={this.props.active === MENU || (this.state.prevAction === MENU && this.props.animateDrawer)}
									drawer={active}
									tabGroup={this.state.tabGroup}
									closing={this.state.closing && this.props.active === MENU ? 'true' : null}
									close={handleClose => {
										this.closeAction(handleClose);
									}}
									click={() => {
										if (this.props.active === MENU) {
											this.closeAction();
										} else {
											this.props.toggleActions(MENU);
										}
									}}
								/>
							</div>
							<div className={`drawerBar ${this.props.active || this.state.closing ? 'active' : ''}`}>
								<_fill
									height={'100vh'}
									drawer={this.props.active ? 'true' : null}
									closing={this.state.closing ? 'true' : null}
								/>
							</div>
						</div>
					</div>
				</_drawer>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = ({ activeForm }) => ({
	active: activeForm.activeAction,
	animateDrawer: activeForm.animateDrawer
});

export default withRouter(
	connect(mapStateToProps, {
		toggleMenu,
		toggleActions,
		clearFormError,
		toggleReport,
		trackVirtualPageview,
		toggleMenuReport
	})(Drawer)
);
