import { css } from 'styled-components';
import { media } from '../../../global';

export const _pill_section = css`
	border: none;
	width: 100%;
	background-color: transparent;
	color: ${({ theme }) => theme.text[4]};
	padding: 22px 0;
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;

	&:hover {
		${media.desktop`
			background-color: ${({ theme }) => theme.background[21]};
		`}
	}

	&:active {
		background-color: ${({ theme }) => theme.background[3]};

		${media.desktop`
			background-color: ${({ theme }) => theme.background[21]};
			        box-shadow: ${({ theme }) => theme.shadow[10]};
		`}
	}

	${media.desktop`
		border: 0;
		width: 180px;
		height: 48px;
		padding: 8px;
		border-radius: 50px;
		min-height: 0;
		color: ${({ theme }) => theme.text[3]};
		background-color: ${({ theme }) => theme.background[7]};
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		font-size: 14px;
		border: none;
		cursor: pointer;
		transition: background-color 0.15s ease-out;
		text-transform: uppercase;
	`}

	${({ $disabled, $enter, $active }) => [
		$disabled &&
			css`
				${media.desktop`
                    background-color: ${({ theme }) => theme.background[20]};
                    cursor: default;
                    box-shadow: none;
		        `}

				&:hover {
					${media.desktop`
				        background-color: ${({ theme }) => theme.background[20]};
				        box-shadow: none;
			        `}
				}
			`,
		$enter &&
			css`
				${media.desktop`
			        box-shadow: ${({ theme }) => theme.shadow[2]};
		        `}
			`,
		$active &&
			css`
				${media.desktop`
			        background-color: ${({ theme }) => theme.background[7]};
		        `}
			`
	]}

	> div {
		display: flex;
		justify-content: center;
		align-items: center;
		max-height: 18px;
		overflow: hidden;

		${media.desktop`
			min-width: 96px;
			width: 96px;
			height: 36px;
		`}

		&.mobile {
			${media.desktop`
				display: none;
			`}
		}

		&.desktop {
			display: none;
			${media.desktop`
				display: flex;
			`}
		}

		> svg {
			width: 80px;
			height: 36px;
		}
	}
`;
