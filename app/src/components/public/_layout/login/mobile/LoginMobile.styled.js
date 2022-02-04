import styled from 'styled-components';
import { media } from '../../../../../../global';

export const _loginMobile = styled.div`
	width: 100%;
	height: 100%;
`;

export const _container = styled.div`
	padding: 32px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;
`;

export const _return = styled.div`
	display: flex;
	justify-content: flex-start;
	padding-top: 20px;
	padding-bottom: 16px;
	width: 100%;

	${media.tablet`
        padding-top: 32px;
        padding-bottom: 16px;
    `}

	> a {
		display: flex;
		align-items: center;
		cursor: pointer;
		height: 30px;
		width: 30px;
		position: relative;
		border-radius: 5px;
		padding-top: 8px;
		background-color: transparent;
		> svg {
			width: 26px;
			height: 18px;
		}
	}
`;
