
import { css } from 'styled-components';
import { layers } from '../../../global';

export const _menu_sub = css`
	z-index: ${({ $closing, $sub }) => {
		const multiplier = $closing ? 2 : 1;
		const layerSum = layers.current + ($sub ? layers.offscreen.settingsSub : layers.offscreen.settings);
		return multiplier * layerSum;
	}};

	pointer-events: ${({ $closing }) => $closing ? 'none' : 'all'};
	transform: translateX(${({ $closing }) => $closing ? '150%' : '0'});
	opacity: ${({ $closing }) => $closing ? '0' : '1'};
	transition: transform 400ms ease-out, opacity 0ms ease-out 250ms;
	animation: ${({ $closing, $tabGroup }) =>
		$closing || $tabGroup ? 'none' : 'full-left-abs 400ms cubic-bezier(0.64, 0.28, 0.4, 0.8)'};
`;