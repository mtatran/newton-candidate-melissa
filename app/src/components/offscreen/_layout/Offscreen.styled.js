import styled from 'styled-components';
import { media } from '../../../../global';

export const _offscreen = styled.div`
	display: flex;
	position: relative;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;
	height: 100%;
	overflow: hidden;
	${media.desktop`
		min-height: 100vh;
		border-radius: 0;
		margin-top: 0;
		box-shadow: none;
		background-color: transparent;
	`}
`;

export const _center = styled.div`
	display: block;
	width: 100%;
	overflow: hidden;
	min-height: 100vh;
	height: 100%;
	padding: 0;
	box-sizing: border-box;
	${media.tablet`
		min-height: 100%;
	`}
	${media.desktop`
		width: 100vw;
		min-height: 100vh;
	`}
`;

export const _horizontal = styled.div`
	${({ theme, $error }) => $error && theme.styles.containers[1]};
	width: 100%;
	min-height: 100vh;
	height: 100%;
	display: flex;
	justify-content: center;
	position: relative;
	flex-direction: row;
	${media.tablet`
		min-height: 100%;
	`}
	${media.desktop`
		min-height: 100vh;
	`}
`;
