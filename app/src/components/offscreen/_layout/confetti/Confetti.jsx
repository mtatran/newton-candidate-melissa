import React from 'react';
import { _confetti } from './Confetti.styled';
import { useLocation } from 'react-router-dom';
import routeOptions from '../../../dynamic';
import { svgConfettiSignin } from '../../../../../global/assets/vectors/confetti';

const Confetti = () => {
	const { pathname } = useLocation();
	const route = routeOptions(pathname);

	if (!route.confetti) return null;
	return (
		<_confetti>
			{svgConfettiSignin()}
		</_confetti>
	);
};

export default Confetti;
