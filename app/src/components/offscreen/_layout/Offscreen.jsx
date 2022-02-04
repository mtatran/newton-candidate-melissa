import React from 'react';
import { _offscreen, _center, _horizontal } from './Offscreen.styled';
import { useSelector } from 'react-redux';
import Top from './position/top/Top';
import Confetti from './confetti/Confetti';
import Nav from '../Nav';
import Offline from '../Offline';
import Logo from '../Logo';
import Left from './position/left/Left';
import Scrollable from './position/scrollable/Scrollable';
import Right from './position/right/Right';
import Drawer from '../Drawer';
import Bottom from './position/bottom/Bottom';
import Error from './error/Error';

const Offscreen = ({ children }) => {
	const errorOpen = useSelector(({ activeForm }) => activeForm.errorOpen);

	return (
		<_offscreen>
			<Top error={errorOpen}>
				<Confetti />
				<Nav />
				<Offline />
				<Logo />
			</Top>
			<_horizontal $error={errorOpen}>
				<Left>{/* Even if Empty for now <Left> must remain here */}</Left>
				<_center>
					<Scrollable>{children}</Scrollable>
				</_center>
				<Right>
					<Drawer />
				</Right>
			</_horizontal>
			<Bottom>
				<Error />
			</Bottom>
		</_offscreen>
	);
};

export default Offscreen;
