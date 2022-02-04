import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import routeOptions from '../dynamic';
import { svgIconNewton } from '../../../global/assets/vectors/icons';
import { _logo } from '../../../design/styles/styled-components/shared/Logo';
import { PRIVATE_DASHBOARD } from '../../actions/state/routes';

class Logo extends PureComponent {
	render() {
		const path = this.props.location.pathname;
		const route = routeOptions(path);

		if (!route.mainLogo) return null;

		return (
			<_logo
				className="logo"
				onClick={() => {
					path === PRIVATE_DASHBOARD ? window.location.reload() : this.props.history.push(PRIVATE_DASHBOARD);
				}}>
				{svgIconNewton()}
			</_logo>
		);
	}
}

export default withRouter(connect(null)(Logo));
