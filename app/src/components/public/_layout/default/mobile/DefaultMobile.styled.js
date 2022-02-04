import styled from 'styled-components';
import { media } from '../../../../../../global';

export const _defaultMobile = styled.div`
	height: 100%;
	width: 100%;
`;

export const _container = styled.div`
	height: 100%;
	width: 100%;
`;

export const _confetti = styled.div`
	z-index: -1;
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: hidden;

	> svg {
		position: relative;
		top: -24%;
		right: 468.75px;
		transform: rotate(52deg);

		${media.tablet`
			transform: rotate(32deg);
		`}
	}
`;

export const _bottom = styled.div`
	position: relative;
	top: 50vh;
	padding: 32px;
	margin: 0 auto;
	max-width: 375px;
	background-color: ${({ theme }) => theme.background[2]};
	height: 50vh;
	display: flex;
	flex-direction: column;
	justify-content: stretch;

	${media.mini`
		top: 35vh;
		height: 65vh;
		margin: auto;
	`};
`;

export const _up = styled.div``;

export const _down = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	flex: 1 1 auto;

	${media.tablet`
		justify-content: flex-start;
	`}
`;

export const _title = styled.div`
	font-size: 28px;
	color: ${({ theme }) => theme.text[0]};
`;

export const _subTitle = styled.div`
	font-size: 28px;
	color: ${({ theme }) => theme.text[2]};
`;

export const _button = styled.div`
	${({ theme }) => theme.styles.buttons[1]}
	width: 100%;
	margin-top: 16px;
`;

export const _secondary_action = styled.p`
	text-align: center;
	padding-top: 16px;
	color: ${({ theme }) => theme.text[0]};
	font-size: 14px;

	> a {
		cursor: pointer;
		color: ${({ theme }) => theme.text[2]};
	}
`;
