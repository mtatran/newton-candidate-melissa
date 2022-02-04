import styled from 'styled-components';
import { layers, media } from '../../../../global';
import { Timings } from '../../../../global/utils/timings';

export const _loading = styled.div`
	top: 0;
	left: 0;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: ${layers.loading};
	width: 100%;
	height: 100%;
	min-height: 100vh;
	min-width: 100vw;
	transition: opacity ${Timings.loadingExit}ms ease-out;
	opacity: ${props => (props.fadeOut ? '0' : '1')};
	background-color: #141a2e;

	& > svg {
		animation: fade-in-down ${Timings.loadingExit}ms ease-out;
		transition: transform ${Timings.loadingExit}ms ease-out;
		transform: ${props => (props.fadeOut ? 'translateY(-15px)' : 'translateY(0)')};
		width: 60px;
		height: 60px;

		${media.mini`
			width: 80px;
			height: 80px;
		`}

		${media.tablet`
			width: 60px;
			height: 60px;
		`}
	}
`;
