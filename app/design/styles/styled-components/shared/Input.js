import styled, { css } from 'styled-components';
import { media } from '../../../../global';

export const _section = styled.div`
	position: relative;
	padding: 16px 24px;
	margin: 32px 0 16px;
	border-radius: 8px;
	border: 1px solid #707180;
	transition: border 150ms ease-out;
	${media.desktop`
		margin: 24px 0;
	`}
	${({ topBorder }) => {
		if (topBorder)
			return css`
				border-top: 1px solid #1f203a;
			`;
	}}
	border: ${({ active, disabled, error }) => {
		if (active && !disabled) {
			if (error) {
				return '1px solid #da4167';
			}
			return '1px solid #2fe1b9';
		} else {
			if (error) {
				return '1px solid #da4167';
			}
			return '1px solid #707180';
		}
	}};
	&:hover {
		border: ${({ disabled, error }) => {
			if (error && !disabled) {
				return '1px solid #da4167';
			} else if (disabled) {
				return '1px solid #707180';
			} else {
				return '1px solid #2fe1b9';
			}
		}};
	}
`;

export const _header_input = styled.div`
	display: block;
	padding-left: 16px;
	pointer-events: none;
	position: absolute;
	top: -3px;
	left: 16px;
	background-color: ${({ lightLine }) => (lightLine ? '#1f2039' : '#141a2e')};
	padding: 0px 10px;
	line-height: 0.3;
	> span {
		font-size: 12px;
		font-weight: 400;
		color: #707180;
		letter-spacing: 1px;
		text-transform: uppercase;
	}
	${media.desktop`
        background-color: #1f2039;
	`}
`;

export const _sub_header_input = styled.div`
	display: block;
	padding-left: 16px;
	pointer-events: none;
	position: absolute;
	bottom: -16px;
	left: 16px;
	background-color: #1f2039;
	padding: 4px 10px;
	> span {
		font-size: 13px;
		font-weight: 400;
		line-height: 21px;
		color: ${({ error }) => (error ? '#da4167' : '#707180')};
		cursor: pointer;
		> span {
			letter-spacing: 1px;
		}
	}

	${({ clickable }) => {
		if (clickable)
			return css`
				pointer-events: initial;
			`;
	}}

	${media.desktop`
         background-color: #1f2039;
	`}
`;

export const _input = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
	width: 100%;
	position: relative;
	top: 0;
	left: 0;
	${({ prefixPadding }) => {
		if (prefixPadding)
			return css`
				padding-left: 16px;
			`;
	}}
	> input {
		background-color: transparent;
		border: none;
		width: 100%;
		color: white;
		font-size: 34px;
		font-weight: 400;
		height: 40px;

		::-webkit-input-placeholder {
			color: #fff;
		}

		:-ms-input-placeholder {
			color: #fff;
		}

		::placeholder {
			color: #fff;
		}
	}
`;

export const _select = styled.span`
	display: inline-flex;
	justify-content: flex-end;
	position: absolute;
	top: -4px;
	min-width: 0;
	width: 0;
	height: auto;
	white-space: nowrap;
	> span {
		position: relative;
		top: 3px;
		font-size: 18px;
		> div {
			width: auto;
			height: auto;
		}
	}
`;

export const _active = styled.span`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 18px;
	line-height: 21px;
	padding: 4px 5px;
	margin: 8px 0 0 8px;
	transition: 200ms ease-out;
	background-color: transparent;
	${({ selection }) => {
		if (selection)
			return css`
				color: #2fe1b9;
				> svg {
					position: relative;
					top: 1px;
					width: 14px;
					height: 8px;
					stroke: #2fe1b9;
					margin-left: 14px;
					transition: transform 0.15s ease-out;
				}
				&:hover {
					cursor: pointer;
					background-color: #193f4a;
					box-shadow: 0px 0px 0px 3px #193f4a;
					border-radius: 1px;
				}
			`;
	}}
`;

export const _prefix = styled.span`
	display: inline-flex;
	justify-content: flex-end;
	position: absolute;
	top: -3px;
	min-width: 0;
	width: 0;
	left: 16px;
	height: auto;
	white-space: nowrap;
	cursor: pointer;
	> span {
		position: relative;
		top: 3px;
		font-size: 18px;
		> div {
			width: auto;
			height: auto;
		}
	}
`;

export const _prefix_symbol = styled.span`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 32px;
	font-weight: 700;
	height: 40px;
	line-height: 21px;
	transition: 200ms ease-out;
	background-color: transparent;
	${({ focus }) => {
		if (focus)
			return css`
				color: #fff;
			`;
	}}
	&:hover {
		background-color: #193f4a;
		box-shadow: 0px 0px 0px 3px #193f4a;
		border-radius: 1px;
	}
`;
