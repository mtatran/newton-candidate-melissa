import styled from 'styled-components';
import { layers } from '../../../../global';

export const _branch = styled.div`
	position: absolute;
	bottom: 16px;
	padding-right: 16px;
	margin-top: auto;
	color: ${({ theme }) => theme.text[8]};
	z-index: ${() => layers.branch};
	text-align: left;
`;
