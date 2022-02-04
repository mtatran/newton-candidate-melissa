import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import i18n from '../../i18n';
import { _offline } from '../../../design/styles/styled-components/shared/Offline';
import { Timings } from '../../../global/utils/timings';

class Offline extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			offline: false,
			closing: false
		};

		this.online = this.online.bind(this);
		this.offline = this.offline.bind(this);
	}

	componentDidMount() {
		window.addEventListener('online', this.online);
		window.addEventListener('offline', this.offline);
	}

	componentWillUnmount() {
		window.removeEventListener('online', this.online);
		window.removeEventListener('offline', this.offline);
	}

	online(e) {
		e.preventDefault();
		this.setState({ offline: false, closing: true }, () => {
			setTimeout(() => {
				this.setState({ closing: false });
			}, Timings.closeOnline);
		});
	}

	offline(e) {
		e.preventDefault();
		this.setState({ offline: true });
	}

	render() {
		const youOffline = i18n.t('youOffline');
		if (!this.state.offline && !this.state.closing) return null;

		//TODO need a restyle
		return (
			<_offline className="offline" exit={this.state.closing ? 'true' : null}>
				<div className="offlineContainer">
					<span>{youOffline}</span>
				</div>
			</_offline>
		);
	}
}
export default connect(null)(Offline);
