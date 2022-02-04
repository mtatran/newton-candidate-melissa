import styled from 'styled-components';
import { media } from '../../../../global';
import { motion } from 'framer-motion';

const tabletWidth = 560;

export const _offscreen = styled.section`
	position: relative;
	${media.desktop`
		min-width: 100%;
		width: 100%;
		height: 100%;
		min-height: 100vh;
	`};
`;

export const _scroll = styled(motion.div)``;

export const _topView = styled.div`
	height: 100vh;
	width: 100%;
	${media.tablet`
		height: calc(100vh - 64px)
	`}
	${media.desktop`
		height: 100vh;
	`}
`;

export const _rightView = styled.div`
	height: 0;
	width: 100vw;
	${media.tablet`
		min-width: ${tabletWidth}px;
		width: ${tabletWidth}px;
		height: calc(100vh);
	`}
	${media.desktop`
		height: 100vh;
		width: 100vw;
	`}
`;

export const _horizontal = styled.div``;

export const _bottomView = styled.div`
	height: 100vh;
	width: 100%;
	${media.tablet`
		height: calc(100vh - 64px);
	`}
	${media.desktop`
		height: 100vh;
	`}
`;

export const _leftView = styled.div`
	height: 100%;
	width: 100vw;
	${media.tablet`
	min-width: ${tabletWidth}px;
		width: ${tabletWidth}px;
	`}
	${media.desktop`
		width: 100vw;
	`}
`;
