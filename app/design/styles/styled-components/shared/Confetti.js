import styled from 'styled-components';
import { layers, media } from '../../../../global';

export const _confetti = styled.div`
	display: none;
	z-index: ${props =>
		props.layer ? props.layer + layers.offscreen.confetti : layers.current + layers.offscreen.confetti};
	position: relative;
	${media.desktop`
		display: block;
	`}
`;
