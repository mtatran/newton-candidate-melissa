import styled from 'styled-components';
import { media } from '../../../../../../global';

export const _right = styled.div`
  width: 0;
	height: 100%;
	display: inline-flex;
	justify-content: flex-start;
	align-items: flex-start;
`;

export const _float = styled.div`
  width: 0;
  height: 100%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const _view = styled.div`
  height: 0;
	width: 100vw;
	${media.tablet`
		min-width: 560px;
		width: 560px;
		height: calc(100vh);
	`}
	${media.desktop`
		height: 100vh;
		width: 100vw;
	`}
`;
