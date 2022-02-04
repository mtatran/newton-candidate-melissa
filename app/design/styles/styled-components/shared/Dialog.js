import styled from 'styled-components';
import { layers } from '../../../../global';

export const _dialog = styled.div`
	z-index: ${props => (props.layer ? props.layer + layers.offscreen.dialog : layers.current + layers.offscreen.dialog)};
`;
