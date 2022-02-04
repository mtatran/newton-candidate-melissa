import { css } from 'styled-components';
import theme from 'styled-theming';
import { forEach } from 'lodash';
import color from '../design/styles/theme/colors';
import shadow from '../design/styles/theme/shadows';
import breakpoints from '../design/styles/theme/breakpoints';
import layer from './utils/layers';
import size from '../design/styles/theme/sizes';
import animationTypes from '../design/animations/transitions/transitions';

const themize = (config, name) => {
	const obj = {};
	let modes = [];
	forEach(config, (_theme, mode) => {
		modes.push(mode);
	});
	forEach(config[modes[0]], (value, key) => {
		const t = {};
		forEach(modes, mode => {
			const val = config[mode][key];
			t[mode] = val ? val : config[modes[0]][key];
		});
		obj[key] = theme(name, t);
	});
	return obj;
};

export const colors = themize(color, 'mode');
export const shadows = themize(shadow, 'mode');
export const layers = layer;
export const br = breakpoints;
export const sizes = size;
export const animations = animationTypes;
export const media = Object.keys(breakpoints).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (min-width: ${breakpoints[label]}px) {
			${css(...args)}
		}
	`;
	return acc;
}, {});

export const is = (...props) => {
	let isBool = false;
	if (props.every(Boolean)) {
		isBool = true;
	}
	return (...args) => {
		if (isBool) {
			return css`
				${css(...args)}
			`;
		}
	};
};
