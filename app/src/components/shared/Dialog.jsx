import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Loading from '../../../design/animations/lottie/loading/Loading';
import { _dialog } from '../../../design/styles/styled-components/shared/Dialog';
import { svgIconPending } from '../../../global/assets/vectors/icons';
import i18n from '../../i18n';
import { br } from '../../../global';
import { Timings } from '../../../global/utils/timings';

class Dialog extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			enterSubmit: false,
			fetching: false,
			showTimeOutMessage: false
		};

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.unfetch = this.unfetch.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown, false);
		document.addEventListener('keyup', this.handleKeyUp, false);
	}

	componentDidUpdate(prevProps) {
		if (
			(prevProps.activeFetching[this.props.type] !== this.props.activeFetching[this.props.type] ||
				this.props.activeFetching[this.props.type]) &&
			this.props.alertTimeout
		) {
			setTimeout(() => {
				this.setState({ showTimeOutMessage: true });
			}, Timings.showTimeoutMessage);
		}
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown, false);
		document.removeEventListener('keyup', this.handleKeyUp, false);
	}

	handleKeyDown(e) {
		if (e.key === 'Enter' && !this.state.fetching && !this.props.errorOpen) {
			this.setState({ enterSubmit: true });
		}
	}

	unfetch() {
		this.setState({
			fetching: false
		});
	}

	handleKeyUp(e) {
		if (e.key === 'Enter' && !this.state.fetching && !this.props.errorOpen) {
			this.confirm();
		}
	}

	confirm() {
		this.setState(
			{
				fetching: true
			},
			() => {
				this.props.confirm(this.unfetch);
			}
		);
	}

	render() {
		const pleaseDoNotRefreshBrowser = i18n.t('pleaseDoNotRefreshBrowser');
		const pleaseDoNotRefreshApp = i18n.t('pleaseDoNotRefreshApp');
		const cancelTxt = this.props.cancelTxt ? this.props.cancelTxt : i18n.t('Cancel');
		const confirmTxt = this.props.confirmTxt ? this.props.confirmTxt : i18n.t('Confirm');

		return (
			<_dialog className={`dialog solid ${this.props.noBlock ? 'no-block' : ''}`}>
				<div
					className={`dialogContainer ${this.props.className ? this.props.className : ''} ${
						this.props.activeFetching[this.props.type] ? 'stop-animation' : ''
					}`}>
					<div className="dialog-semantics">
						<div className="dialog-semantics-header">{this.props.header}</div>
						<div className="dialog-semantics-description">{this.props.description}</div>
					</div>
					<div className="dialog-commands">
						{!this.state.fetching && !this.props.activeFetching[this.props.type] ? (
							<div className="dialog-commands-cancel" onClick={() => this.props.cancel()}>
								{cancelTxt}
							</div>
						) : null}
						<div
							className={`dialog-commands-ok ${
								!this.props.activeFetching[this.props.type] && this.state.enterSubmit ? ' enter' : ''
							}${!this.props.activeFetching[this.props.type] ? ' active' : ''}`}
							onClick={() => this.confirm()}>
							{this.props.activeFetching[this.props.type] || this.state.fetching ? <Loading.Dots /> : confirmTxt}
						</div>
					</div>
				</div>
				{this.state.showTimeOutMessage ? (
					<div className={`dialogPopup`}>
						<div className="popup dark">
							<span className="popup-icon">{svgIconPending('white', 'none')}</span>
							<p className="popup-message">{this.props.alertTimeoutMessage}</p>
							{this.props.alertTimeoutSubMessage ? (
								<p className="popup-message-sub">
									{window.innerWidth >= br.desktop ? pleaseDoNotRefreshBrowser : pleaseDoNotRefreshApp}
								</p>
							) : null}
							{this.props.alertTimeoutTime ? (
								<div className="popup-action unclicklable">{this.props.alertTimeoutTime}</div>
							) : null}
						</div>
					</div>
				) : null}
			</_dialog>
		);
	}
}

const mapStateToProps = ({ activeForm }) => ({
	errorOpen: activeForm.errorOpen,
	activeFetching: activeForm.activeFetching
});

export default withRouter(connect(mapStateToProps)(Dialog));
