import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet-async';
import { trackVirtualPageview } from '../../actions/state/analytics';
import { withRouter } from 'react-router';

class PrivatePage extends Component {
	componentDidMount() {
		if (!this.props.closing) {
			const currenctUrlLocation = this.props.location.pathname;
			const title = `${this.props.title}`;
			this.props.trackVirtualPageview(title, currenctUrlLocation + '/' + this.props.virtualUrl);
		}
	}

	render() {
		const title = `${this.props.title}`;
		return !this.props.closing ? <Helmet title={title} /> : null;
	}
}

export default withRouter(connect(null, { trackVirtualPageview })(PrivatePage));
