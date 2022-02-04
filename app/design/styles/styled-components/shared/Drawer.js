import styled from 'styled-components';
import { colors, layers, media } from '../../../../global';
import { motion } from 'framer-motion';

const tabletHeight = 'calc(100vh - 64px)';

export const _drawer = styled.div`
	z-index: ${props =>
		props.layer ? props.layer + layers.offscreen.sidebar : layers.current + layers.offscreen.sidebar};
`;

export const _icon = styled(motion.div)`
	z-index: ${props =>
		props.layer ? props.layer + layers.offscreen.drawer_icons : layers.current + layers.offscreen.drawer_icons};

	${media.desktop`
		background-color: ${props => (props.drawer ? colors.bg : props.active ? colors.bgLight : 'transparent')};
		transition: background-color ${props => (props.drawer ? '0ms ease-out' : '150ms ease-out 250ms')};
	`};
`;

export const _fill = styled.div`
	position: relative;
	display: block;
	width: 100%;
	height: ${props => (props.height ? props.height : '100%')};
	pointer-events: none;
	z-index: ${props =>
		props.layer ? props.layer + layers.offscreen.drawer_icons : layers.current + layers.offscreen.drawer_icons};

	${media.desktop`
		background-color: ${props => (props.drawer ? colors.bg : 'transparent')};
		transition: background-color ${props => (props.drawer ? '0ms ease-out' : '150ms ease-out 250ms')};
	`};
`;

export const _open = styled.div`
	position: absolute;
	height: 100%;

	${media.tablet`
		height: ${tabletHeight};
	`};

	${media.desktop`
		height: 100%;
	`};
`;
