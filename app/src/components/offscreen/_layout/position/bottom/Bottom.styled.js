import styled from 'styled-components';
import { media } from '../../../../../../global';

export const _bottom = styled.div`
  display: block;
  width: 100%;
  height: 0;
`;

export const _float = styled.div`
  display: block;
  width: 100%;
  height: 0;
`;

export const _view = styled.div`
	height: 100vh;
	width: 100%;
	${media.tablet`
		height: calc(100vh - 64px);
	`}
	${media.desktop`
		height: 100vh;
	`}
`;
