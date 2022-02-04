import styled from 'styled-components';
import { layers, media } from '../../../../global';
import { Link } from 'react-router-dom';

export const _nav = styled.div`
	z-index: ${props => (props.layer ? props.layer + layers.offscreen.nav : layers.current + layers.offscreen.nav)};
`;

export const _logo = styled.div`
	z-index: ${props => (props.layer ? props.layer + layers.offscreen.logo : layers.current + layers.offscreen.logo)};
`;

export const _close = styled(Link)`
	z-index: ${props => (props.layer ? props.layer + layers.offscreen.close : layers.current + layers.offscreen.close)};
	animation: fade-in 0.5s ease-out;
	transition: 0.25s ease-out;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	height: 36px;
	width: 36px;
	position: relative;
	border-radius: 5px;
	transition: 200ms ease-out;
	background-color: transparent;

	${media.desktop`
		left: -24px;
	`}

	> svg {
		display: block;
		width: 18px;
		height: 18px;
		${media.desktop`
			width: 24px;
			height: 24px;
		`}
	}

	&:hover {
		${media.desktop`
			background-color: #193f4a;
			box-shadow: 0px 0px 0px 2px #193f4a;
			border-radius: 1px;
		`}
	}
`;

export const _overlay = styled.div`
	z-index: ${props =>
		props.layer ? props.layer + layers.offscreen.settings : layers.current + layers.offscreen.settings};
`;