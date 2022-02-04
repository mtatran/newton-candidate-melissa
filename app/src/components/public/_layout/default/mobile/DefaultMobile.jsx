import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { svgWavyConfetti } from '../../../../../../global/assets/vectors/confetti';
import { PUBLIC_LOGIN } from '../../../../../actions/state/routes';
import {
	_confetti,
	_container,
	_defaultMobile,
	_title,
	_bottom,
	_subTitle,
	_button,
	_down,
	_up
} from './DefaultMobile.styled';

const DefaultHome = () => {
	const { t } = useTranslation();

	return (
		<_defaultMobile>
			<_container>
				<_confetti>{svgWavyConfetti()}</_confetti>
				<_bottom>
					<_up>
						<_title>{t('welcomeTitle')}.</_title>
						<_subTitle>{t('canadaNoFee')}</_subTitle>
					</_up>
					<_down>
						<Link to={PUBLIC_LOGIN}>
							<_button>{t('loginHere')}</_button>
						</Link>
					</_down>
				</_bottom>
			</_container>
		</_defaultMobile>
	);
};

export default DefaultHome;
