import styled from 'styled-components';
import { animations, colors, layers, media } from '../../../../global';

export const _exit = styled.div`
	z-index: ${props => (props.layer ? props.layer : layers.exit)};
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	transform: ${props =>
		props.animation ? (animations[props.animation].transform ? animations[props.animation].transform : '') : ''};
	animation-name: ${props => (props.animation ? animations[props.animation].exit : '')};
	animation-duration: ${props => (props.duration ? props.duration : '0')}ms;
	animation-timing-function: ease-in-out;
	background-color: ${colors.bg};
`;

export const _mobile = styled.div`
	z-index: ${layers.current};
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: all;
`;

export const _desktop = styled.section`
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: all;
`;

export const _enter = styled.div`
	z-index: ${props => (props.layer ? props.layer : layers.enter)};
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	background-color: ${colors.bg};
	animation-name: ${props => (props.animation ? animations[props.animation].enter : '')};
	animation-duration: ${props => (props.duration ? props.duration : '0')}ms;
	animation-timing-function: ease-in-out;

	${media.desktop`
		animation: none;
	`}
`;
