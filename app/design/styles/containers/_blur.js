import { css } from 'styled-components';
import { media } from '../../../global';

export const _blur = css`
  max-height: 100vh;
	${media.desktop`
		opacity: 0.6;
		filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="16" /></filter></svg>#filter');
		filter: blur(16px) saturate(1.2);
		overflow: hidden;
		max-height: none;
	`}
`;
