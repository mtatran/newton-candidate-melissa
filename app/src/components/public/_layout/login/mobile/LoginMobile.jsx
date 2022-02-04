import React from 'react';
import { Link } from 'react-router-dom';
import { svgIconBack } from '../../../../../../global/assets/vectors/icons';
import { PUBLIC_DEFAULT } from '../../../../../actions/state/routes';
import FormLoginMobile from './form/FormLoginMobile';
import FormLogicLogin from '../logic/FormLogicLogin';
import { _container, _loginMobile, _return } from './LoginMobile.styled';
import Helmet from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const LoginMobile = () => {
	const { t } = useTranslation();

	return (
		<_loginMobile>
			<Helmet>
				<title>{t('loginPageTitle')}</title>
				<meta name="description" content="Login to your account" />
			</Helmet>
			<_container>
				<_return>
					<Link to={PUBLIC_DEFAULT}>{svgIconBack()}</Link>
				</_return>
				<FormLogicLogin>
					<FormLoginMobile />
				</FormLogicLogin>
			</_container>
		</_loginMobile>
	);
};

export default LoginMobile;
