import styled, { css } from 'styled-components';
import { media } from '../../../../global';

export const _button = styled.button`
	width: 275px;
	height: 64px;
	background-color: ${props => (props.disabled ? '#63ab9c' : '#2fe1b9')};
	border-radius: 50px;
	border: none;
	color: #1f2039;
	cursor: ${props => (props.disabled || props.released ? 'default' : 'pointer')};
	letter-spacing: 1.5px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	text-transform: uppercase;
	box-shadow: ${props =>
		props.enter
			? 'inset 0 0 20px rgb(0, 0, 0, 0.25), 0px 0px 0px 8px #193f4a'
			: 'inset 0 0 0 rgb(0, 0, 0, 0), 0px 0px 0px 0px #193f4a;'};
	border: ${props => (props.enter ? '2px solid #2fe1b9' : '0px solid #c0f3e8;')};
	transition: 0.15s ease-out;
	transform: scale(1);
	${props => (props.released ? 'animation: pulse 1s ease-out' : '')};
	border: ${props => (props.enter ? '2px solid #2fe1b9' : '0px solid #c0f3e8;')};
	margin-top: ${props => (props.margin ? '16px' : '0px')};

	> svg {
		margin-left: 4px;
	}

	&:hover {
		box-shadow: ${props =>
			props.disabled || props.released ? 'none' : 'inset 0 0 20px rgb(0, 0, 0, 0.25), 0px 0px 0px 8px #193f4a'};
		border: ${props => (props.disabled || props.released ? 'none' : '2px solid #2fe1b9')};
	}

	&:active {
		transform: ${props => (props.disabled ? 'none' : 'scale(0.98)')};
		box-shadow: inset 0 0 0 rgb(0, 0, 0, 0), 0px 0px 0px 0px #193f4a;
		border: 0px solid #c0f3e8;
	}

	${media.mini`
		width: 325px;
	`}

	${({ $bottom }) => {
		if ($bottom)
			return css`
				margin-bottom: 16px;
			`;
	}}
`;

export const _button_warning = styled.button`
	width: 275px;
	height: 64px;
	background-color: #da4167;
	border-radius: 50px;
	border: none;
	color: #1f2039;
	cursor: ${props => (props.released ? 'default' : 'pointer')};
	letter-spacing: 1.5px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	text-transform: uppercase;
	box-shadow: ${props =>
		props.enter
			? 'inset 0 0 20px rgb(0, 0, 0, 0.25), 0px 0px 0px 8px rgba(160, 29, 29, 0.24)'
			: 'inset 0 0 0 rgb(0, 0, 0, 0), 0px 0px 0px 0px rgba(160, 29, 29, 0.24);'};
	border: 2px solid #da4167;
	transition: 0.15s ease-out;
	transform: scale(1);
	${props => (props.released ? 'animation: pulse-red 1s ease-out' : '')};
	border: 2px solid #da4167;
	margin-top: 0px;

	> svg {
		margin-left: 4px;
	}

	&:hover {
		box-shadow: ${props =>
			props.released ? 'none' : 'inset 0 0 20px rgb(0, 0, 0, 0.25), 0px 0px 0px 8px rgba(160, 29, 29, 0.24)'};
		border: ${props => (props.released ? 'none' : '2px solid #da4167')};
	}

	&:active {
		transform: scale(0.98);
		box-shadow: inset 0 0 0 rgb(0, 0, 0, 0), 0px 0px 0px 0px #5c1a2b;
		border: 0px solid #da4167;
	}

	${media.mini`
		width: 325px;
	`}
`;
