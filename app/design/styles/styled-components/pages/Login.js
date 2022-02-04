import styled from 'styled-components';
import { layers, media } from '../../../../global';

export const _Container = styled.div``;

export const _main = styled.div`
	z-index: ${props => (props.layer ? props.layer + layers.offscreen.main : layers.current + layers.offscreen.main)};
`;

export const _form = styled.form`
	padding: 16px 24px 32px 24px;
	width: 100%;
	height: 100%;
	position: static;

	${media.desktop`
		height: auto;
		min-height: 360px;
		padding: 16px 16px 0 16px;
	`};
`;

export const _action = styled.div`
	z-index: ${props => (props.layer ? props.layer + layers.offscreen.half : layers.current + layers.offscreen.half)};
`;
