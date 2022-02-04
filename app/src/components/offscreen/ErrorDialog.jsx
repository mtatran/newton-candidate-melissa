import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PRIVATE_DASHBOARD, PUBLIC_DEFAULT } from '../../actions/state/routes';
import i18n from '../../i18n';
import { toggleServerError } from '../../actions/state/forms';
import { _errorDialog } from '../../../design/styles/styled-components/shared/ErrorDialog';
import { Timings } from '../../../global/utils/timings';

class ErrorDialog extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			closing: false
		};

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	componentDidMount() {
		if (this.props.errorOpen || this.state.closing) {
			document.addEventListener('keydown', this.handleKeyDown, false);
			document.addEventListener('keyup', this.handleKeyUp, false);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.errorOpen !== prevProps.errorOpen || this.state.closing) {
			document.addEventListener('keydown', this.handleKeyDown, false);
			document.addEventListener('keyup', this.handleKeyUp, false);
		}
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown, false);
		document.removeEventListener('keyup', this.handleKeyUp, false);
	}

	handleKeyDown(e) {
		if (e.key === 'Enter' && this.props.errorOpen) {
			this.setState({ enterSubmit: true });
		}
	}

	handleKeyUp(e) {
		if (e.key === 'Enter' && this.props.errorOpen) {
			this.closeMenu();
		}
	}

	closeMenu() {
		this.setState({ closing: true }, () => {
			setTimeout(() => {
				this.setState({ closing: false }, () => {
					document.removeEventListener('keydown', this.handleKeyDown, false);
					document.removeEventListener('keyup', this.handleKeyUp, false);
					this.props.toggleServerError(false);
					localStorage.getItem('isLoggedIn') && this.props.authenticated
						? this.props.history.push(PRIVATE_DASHBOARD)
						: this.props.history.push(PUBLIC_DEFAULT);
				});
			}, Timings.closeErrorDialog);
		});
	}

	render() {
		if (this.props.errorOpen || this.state.closing) {
			const confirm = i18n.t('backToSafety');
			const header = i18n.t('oops');
			const description = i18n.t('supportIssue');

			return (
				<_errorDialog className="dialog noBlur" closing={this.state.closing}>
					<div className="dialogContainer">
						<div className="dialog-semantics">
							<div className="dialog-semantics-header">{header}</div>
							<div className="dialog-semantics-description">{description}</div>
						</div>
						<div className="dialog-commands">
							<div className={`dialog-commands-ok active`} onClick={() => this.closeMenu()}>
								{confirm}
							</div>
						</div>
					</div>
				</_errorDialog>
			);
		}
		return null;
	}
}

const mapStateToProps = ({ activeForm, permissions }) => ({
	errorOpen: activeForm.errorOpen,
	authenticated: permissions.authenticated
});

export default withRouter(connect(mapStateToProps, { toggleServerError })(ErrorDialog));
