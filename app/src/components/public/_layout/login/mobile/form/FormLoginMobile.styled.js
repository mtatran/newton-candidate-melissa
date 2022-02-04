import styled, { css } from 'styled-components';
import { media } from '../../../../../../../global';
import { __basic_error, __header_error } from '../../../../../shared/forms/Common.styled';

export const _form = styled.form`
	flex: 1 1 auto;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
`;

export const _title = styled.h1`
	color: ${({ theme }) => theme.text[0]};
`;

export const _section = styled.div`
	display: block;
	width: 100%;
	padding: 16px 0;
	position: relative;
`;

export const _headers = styled.div`
	transition: transform 0.25s ease-out;
	display: flex;
	justify-content: space-between;
	width: 100%;
	opacity: 0;
	pointer-events: none;
	transform: translateY(15px);

	${({ $focus }) => [
		$focus &&
			css`
				opacity: 1;
				transform: translateY(0);
			`
	]}

	> span {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		min-height: 21px;
		color: ${({ theme }) => theme.secondary[4]};
	}
`;

export const _input = styled.div`
	width: 100%;
	&:hover {
		&::after {
			background-color: ${({ theme }) => theme.primary[2]};
			height: 1px;
		}
	}
	&::after {
		content: '';
		position: absolute;
		bottom: 13px;
		display: block;
		width: 100%;
		height: 1px;
		background-color: ${({ theme }) => theme.background[4]};
		transition: 0.25s;
		${media.desktop`
				background-color: ${({ theme }) => theme.background[2]};
			`}
	}

	${({ theme, $light, $focus, $error }) => [
		$light &&
			css`
				&::after {
					transition: 0.25s;
					${media.desktop`
					background-color: ${theme.background[8]};
				`}
				}
				&:hover {
					&::after {
						background-color: ${theme.primary[2]};
						height: 1px;
					}
				}
			`,
		$focus &&
			css`
				&::after {
					animation: stretch-in-full 0.25s ease-out;
					background-color: ${theme.primary[0]};
					height: 2px;
				}
				&:hover {
					&::after {
						background-color: ${theme.primary[0]};
						height: 2px;
					}
					${$focus &&
						$error &&
						css`
							&::after {
								background-color: ${theme.error[0]};
							}
						`}
				}
			`,
		$error &&
			css`
				&::after {
					animation: stretch-in-full 0.25s ease-out;
					background-color: ${theme.error[0]};
					height: 2px;
				}
				&:hover {
					&::after {
						background-color: ${theme.error[0]};
						height: 2px;
					}
				}
			`
	]}

	> input {
		background-color: transparent;
		border: none;
		width: 100%;
		padding: 8px 0 8px 0;
		color: ${({ theme }) => theme.text[0]};
		font-size: 18px;
		line-height: 21px;

		&::placeholder,
		&::-webkit-input-placeholder {
			color: ${({ theme }) => theme.text[0]};
			opacity: 1;
			font-size: 14px;
			cursor: text;
		}
		&[type='password'] {
			font-size: 16px;
		}
	}
`;

export const _forgot = styled.div`
	color: ${({ theme }) => theme.text[2]};
	font-size: 16px;
	font-weight: lighter;
	padding: 16px 0;
`;

export const _buttons = styled.div`
	${({ theme }) => theme.styles.forms.buttons[0]};
`;

export const _button = styled.button`
	${({ theme }) => theme.styles.buttons[0]}
`;

export const _error_paragraph = styled(__basic_error)`
	min-height: 38px;
	margin-bottom: 0;
`;

export const _error_header = styled(__header_error)``;
