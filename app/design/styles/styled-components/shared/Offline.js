import styled from 'styled-components';
import { layers } from '../../../../global';

export const _offline = styled.div`
	z-index: ${layers.offline};
	transition: transform 0.25s ease-out, opacity 0.25s ease-out;
	transform: scale(${props => (props.exit ? '0.9' : '1')}) translateY(${props => (props.exit ? '-10px' : '0')});
	opacity: ${props => (props.exit ? '0' : '1')};
`;
