import styled from 'styled-components';
import { layers } from '../../../../global';

export const _menu_sub = styled.div`
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
`;

export const _menu_sub_sub = styled.div`
	z-index: ${props => {
		let multiplier = props.closing ? 2 : 1;
		return multiplier * (layers.current + layers.offscreen.settingsSub);
	}};

	pointer-events: ${props => (props.closing ? 'none' : 'all')};
	transform: translateX(${props => (props.closing ? '150%' : '0')});
	opacity: ${props => (props.closing ? '0' : '1')};
	transition: transform 400ms ease-out, opacity 0ms ease-out 250ms;
	animation: ${props =>
		props.tabGroup || props.closing ? 'none' : 'full-left-abs 400ms cubic-bezier(0.64, 0.28, 0.4, 0.8)'};
`;
