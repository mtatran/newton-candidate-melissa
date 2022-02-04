import styled from 'styled-components';
import { layers } from '../../../../global';

export const _settings = styled.div`
	z-index: ${props => (props.layer ? props.layer + layers.offscreen.nav : layers.current + layers.offscreen.nav)};
`;
