import styled from 'styled-components';
import { layers } from '../../../../global';

export const _logo = styled.div`
	z-index: ${props => (props.layer ? props.layer + layers.offscreen.logo : layers.current + layers.offscreen.logo)}};
`;
