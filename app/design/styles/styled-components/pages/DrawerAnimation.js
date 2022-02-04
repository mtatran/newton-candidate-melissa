import styled, { css } from 'styled-components';
import { layers, media } from '../../../../global';

export const _Container = styled.div`
	position: relative;
	background-color: #1f2039;
	width: 100%;
	flex: 0 0 auto;
	box-shadow: none;
	display: flex;
	flex-direction: column;
	z-index: ${props => {
		let multiplier = props.closing ? 2 : 1;
		return multiplier * (layers.current + layers.offscreen.settings);
	}};
	pointer-events: ${props => (props.closing ? 'none' : 'all')};
	transform: translateX(${props => (props.closing ? '150%' : '0')});
	opacity: ${props => (props.closing ? '0' : '1')};
	transition: transform 400ms ease-out, opacity 0ms ease-out 250ms;
	animation: ${props =>
		props.tabGroup || props.closing ? 'none' : 'full-left-abs 400ms cubic-bezier(0.64, 0.28, 0.4, 0.8)'};

	${media.desktop`
		border-radius: 0;
		min-height: 0;
		box-shadow: none;
	`}
`;
