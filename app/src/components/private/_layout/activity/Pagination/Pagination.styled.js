import styled, { css } from 'styled-components';
import { media } from '../../../../../../global';

export const _pagination = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	margin-top: 16px;
	margin-bottom: 32px;
`;

export const _pages = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 16px;
	font-size: 14px;
	color: ${({ theme }) => theme.text[1]};
	background-color: ${({ theme }) => theme.background[17]};
	width: 36px;
	height: 36px;
	border-radius: 50%;
	transition: background-color 0.1s ease-in-out;

	&:hover {
		cursor: pointer;
		background-color: ${({ theme }) => theme.background[18]};
	}

	${({ $active }) => [
		$active &&
			css`
				color: ${({ theme }) => theme.text[4]};
				background-color: ${({ theme }) => theme.background[19]};

				&:hover {
					cursor: default;
					background-color: ${({ theme }) => theme.background[19]};
				}
			`
	]}
`;

export const _arrow = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 16px;
	font-size: 12px;
	color: ${({ theme }) => theme.text[0]};
	border: 2px solid ${({ theme }) => theme.border[1]};
	height: 36px;
	width: 36px;
	border-radius: 50%;
	cursor: pointer;

	transition: background-color 0.1s ease-in-out;

	${({ $hide, $last }) => [
		$hide &&
			css`
				opacity: 0;
				cursor: default;
				pointer-events: none;
			`,
		$last &&
			css`
				transform: rotate(180deg);
				${media.desktop`
					margin-right: 0;
				`}
			`
	]}

	&:hover {
		${media.desktop`
			background-color: ${({ theme }) => theme.background[7]};

			> svg {
				> g {
					> g {
						stroke: ${({ theme }) => theme.stroke[4]};
					}
				}
			}
		`}
	}

	> svg {
		width: 36px;
		height: 36px;
	}
`;

export const _skip_arrow = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 16px;
	font-size: 12px;
	border: 2px solid ${({ theme }) => theme.border[7]};
	width: 36px;
	height: 36px;
	border-radius: 50%;
	cursor: pointer;

	transition: background-color 0.1s ease-in-out;

	${({ $hide, $last }) => [
		$hide &&
			css`
				opacity: 0;
				cursor: default;
				pointer-events: none;
			`,
		$last &&
			css`
				transform: rotate(180deg);
				margin-right: 0;
			`
	]}

	${media.desktop`
		display: none;
	`}

	> svg {
		width: 36px;
		height: 36px;
	}
`;
