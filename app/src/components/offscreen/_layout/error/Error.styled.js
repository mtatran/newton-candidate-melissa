import styled, { css } from 'styled-components';
import { layers, media } from '../../../../../global';

export const _error = styled.div`
	z-index: ${layers.offscreen.dialog};
	position: fixed;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	top: 0;
	left: 0;
	overflow: hidden;
	${({ $solid, $noBlock }) => [
		$solid &&
			css`
				background-color: ${({ theme }) => theme.background[1]};
			`,
		$noBlock &&
			css`
				position: absolute;
				display: block;
				left: 50%;
				top: auto;
				width: auto;
				height: auto;
				overflow: visible;
				> div {
					position: relative;
					left: -50%;
					margin-top: 50px;
				}
			`
	]}
	${media.desktop`
		position: absolute;
	`}
	> div {
		position: relative;
	}
`;

export const _container = styled.div`
	animation: squeeze-up 0.15s ease-out;
	background-color: ${({ theme }) => theme.background[27]};
	width: 100%;
	max-width: 280px;
	border-radius: 10px;
	margin: 16px;
	z-index: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-shadow: ${({ theme }) => theme.shadow[13]};
	${({ $stopAnimation, $modal }) => [
		$stopAnimation &&
			css`
				animation: none;
			`,
		$modal &&
			css`
				box-shadow: ${({ theme }) => theme.shadow[14]};
			`
	]}
	${media.desktop`
		box-shadow: ${({ theme }) => theme.shadow[15]};
		position: relative;
	`}
`;

export const _semantics = styled.div`
	padding: 32px 26px;
`;

export const _commands = styled.div`
	display: flex;
	border-top: 1px solid ${({ theme }) => theme.border[10]};
`;

export const _header = styled.div`
	color: ${({ theme }) => theme.secondary[0]};
	padding-bottom: 16px;
	display: flex;
	justify-content: center;
	text-align: center;
`;

export const _description = styled.div`
	color: ${({ theme }) => theme.text[0]};
	font-size: 0.8em;
	display: flex;
	justify-content: center;
	text-align: center;
	flex-direction: column;

	> div {
		display: flex;
		justify-content: center;
		text-align: center;
		flex-direction: column;
		padding: 0 22px;
		&:nth-child(2) {
			padding-top: 16px;
		}
		> p {
			color: ${({ theme }) => theme.secondary[4]};
		}
		> span {
			word-break: break-all;
		}
	}
`;

export const _confirm = styled.div`
	color: ${({ theme }) => theme.primary[0]};
	flex: 1 1 50%;
	display: flex;
	justify-content: center;
	border-left: 1px solid ${({ theme }) => theme.border[6]};
	padding: 16px 24px;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.background[28]};
	}

	${({ $submit }) =>
		$submit &&
		css`
			background-color: ${({ theme }) => theme.background[28]};
		`}
`;
