import { css } from 'styled-components';
import { media } from '../../../global';

export const _half = css`
	height: 100%;
	${media.tablet`
		height: auto;
	`}
	${media.desktop`
		z-index: 4;
		width: 50vw;
		height: 100vh;
		max-width: none;
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: ${({theme}) => theme.background[4]};
		box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.14);
	`}
`;
