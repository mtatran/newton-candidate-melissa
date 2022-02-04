import React from 'react';
import Helmet from 'react-helmet-async';
import {
	_action,
	_active,
	_container,
	_description,
	_gradient,
	_info,
	_login,
	_main,
	_section,
	_tabs,
	_tabsContainer,
	_tag,
	_title,
	_wrapper
} from './Login.styled';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PUBLIC_LOGIN } from '../../../../actions/state/routes';
import FormLogicLogin from './logic/FormLogicLogin';
import FormLogin from './desktop/form/FormLogin';
import LoginMobile from './mobile/LoginMobile';

const Login = () => {
	const { t } = useTranslation();
	const active = useSelector(({ activeForm }) => activeForm.active);
	const entering = useSelector(({ animation }) =>
		animation.entering.route === PUBLIC_LOGIN ? animation.entering : {}
	);

	if (window.innerWidth < 900) {
		return <LoginMobile />;
	} else {
		return (
			<_login>
				<Helmet>
					<title>{t('loginPageTitle')}</title>
					<meta name="description" content="Login to your account" />
				</Helmet>
				<_container duration={entering?.duration || 0}>
					<_info>
						<_main>
							<_title>{t('welcomeNewton')}</_title>
							<_description>{t('canadaNoFee')}</_description>
							<_tag>
								<span>{t('letsGetSignedIn')}</span>
							</_tag>
						</_main>
					</_info>
					<_action active={active}>
						<_section>
							<_wrapper>
								<_tabs>
									<_tabsContainer>
										<_active>
											<span>{t('logIn').toUpperCase()}</span>
										</_active>
									</_tabsContainer>
								</_tabs>
								<_gradient>
									<div />
								</_gradient>
								<FormLogicLogin>
									<FormLogin />
								</FormLogicLogin>
							</_wrapper>
						</_section>
					</_action>
				</_container>
			</_login>
		);
	}
};

export default Login;
