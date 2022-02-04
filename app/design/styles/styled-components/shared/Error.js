import styled from 'styled-components';
import { is } from '../../../../global';

export const _error = styled.div`
	color: #da4167;
	text-align: center;
	background-color: rgb(218, 65, 103, 0.2);
	margin: 16px;
	padding: 12px 16px;
	border-radius: 4px;
	font-size: 14px;
	letter-spacing: 0;
	word-break: break-word;

	${({ $side }) => [
		is($side)`
			height: 100%;
			margin: 0 16px;
		`
	]};
`;
