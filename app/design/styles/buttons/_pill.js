import { css } from 'styled-components';
import { media } from '../../../global';

export const _pill = css`
	width: 275px;
	height: 64px;
	background-color: ${({ theme, $disabled }) => ($disabled ? theme.action[1] : theme.action[0])};
	border-radius: 50px;
	color: ${({ theme }) => theme.text[3]};
	cursor: ${({ $disabled, $released }) => ($disabled || $released ? 'default' : 'pointer')};
	letter-spacing: 1.5px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	text-transform: uppercase;
	box-shadow: ${({ theme, $enter }) => ($enter ? theme.shadow[0] : theme.shadow[1])};
	transition: 0.15s ease-out;
	transform: scale(1);
	${({ $released }) => ($released ? 'animation: pulse 1s ease-out' : '')};
	margin-top: ${({ $margin }) => ($margin ? '16px' : '0px')};

	${({ $enter }) =>
		$enter
			? css`
					border: 2px solid ${({ theme }) => theme.border[1]};
			  `
			: css`
					border: 0px solid ${({ theme }) => theme.border[2]};
			  `};

	> svg {
		margin-left: 4px;
	}

	&:hover {
		box-shadow: ${({ theme, $disabled, $released }) => ($disabled || $released ? 'none' : theme.shadow[0])};

		${({ $disabled, $released }) =>
			$disabled || $released
				? css`
						border: none;
				  `
				: css`
						border: 2px solid ${({ theme }) => theme.border[1]};
				  `};
	}

	&:active {
		transform: ${({ $disabled }) => ($disabled ? 'none' : 'scale(0.98)')};
		box-shadow: ${({ theme }) => theme.shadow[1]};
		border: 0px solid ${({ theme }) => theme.border[2]};
	}

	${media.mini`
		width: 325px;
	`}

	${({ $bottom }) => [
		$bottom &&
			css`
				margin-bottom: 16px;
			`
	]}
`;
