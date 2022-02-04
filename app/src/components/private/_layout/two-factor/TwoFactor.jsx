import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet-async';
import FormTwoFactor from './form/FormTwoFactor';
import { svgIconCheck, svgIconNoCheck } from '../../../../../global/assets/vectors/icons';
import i18n from '../../../../i18n';

class TwoFactor extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const loginSecurity = i18n.t('loginSecurity');
		const enterCode = i18n.t('enterCode');
		const security = i18n.t('security');
		const tfaMethod = i18n.t('2FALabel');

		return (
			<div className="tfaForm">
				<Helmet>
					<title>{loginSecurity}</title>
				</Helmet>
				<div className="tfaFormContainer">
					<h1>{enterCode}</h1>
					<div className="tfaForm-step active">
						<div className="tfaForm-step-header active">
							<span className="tfaForm-step-header-checkbox">
								<span>{this.props.hasPermissions.includes('') ? svgIconCheck() : svgIconNoCheck()}</span>
							</span>
							<p>{security}</p>

							<span className="tfaForm-step-header-method">
								{tfaMethod} | <span className="tfaForm-step-header-method-highlight">{this.props.method}</span>
							</span>
						</div>
						<div className="tfaForm-step-body active">
							<div className="tfaForm-step-bodyContainer">
								<div className="tfaForm-step-bodyContent">
									<FormTwoFactor />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ permissions, user }) => ({
	hasPermissions: permissions.has_permissions,
	method: user.twoFAMethod
});

export default connect(mapStateToProps)(TwoFactor);
