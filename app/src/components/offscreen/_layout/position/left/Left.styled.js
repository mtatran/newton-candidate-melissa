import styled from 'styled-components';
import { media } from '../../../../../../global';

export const _left = styled.div`
  width: 0;
  height: 100%;
`;

export const _float = styled.div`
  width: 0;
  height: 100%;
`;

export const _view = styled.div`
  height: 100%;
	width: 100vw;
	${media.tablet`
		min-width: 560px;
		width: 560px;
	`}
	${media.desktop`
		width: 100vw;
	`}
`;
