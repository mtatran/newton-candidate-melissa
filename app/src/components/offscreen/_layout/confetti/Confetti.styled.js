import styled from 'styled-components';
import { layers, media } from '../../../../../global';

export const _confetti = styled.div`
	display: none;
	pointer-events: none;
	transition: transform 0.15s ease-out;
	z-index: ${({ layer }) => (layer ? layer + layers.offscreen.confetti : layers.current + layers.offscreen.confetti)};

	${media.desktop`
		display: block;
		position: relative;
		transform: translate(calc(-64px), calc(-64px));
		width: 759px;
		height: 715px;
	`};
	${media.wide`
		transform: scale(1.15) translate(64px, -64px);
	`}

	> svg {
		width: 100%;
		height: 100%;
	}
`;
