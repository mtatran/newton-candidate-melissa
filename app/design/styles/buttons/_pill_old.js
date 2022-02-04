import { css } from 'styled-components';
import { media } from '../../../global';

export const _pill_old = css`
	width: 100%;
	max-width: 325px;
	height: 64px;
	background-color: ${({ theme }) => theme.primary[0]};
	border-radius: 50px;
	border: none;
	color: ${({ theme }) => theme.background[1]};
	cursor: pointer;
	letter-spacing: 1.5px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background-color 0.15s ease-out;
	&:hover {
		background-color: ${({ theme }) => theme.primary[3]};
	}
	&:active {
		background-color: ${({ theme }) => theme.primary[3]};
		box-shadow: 0 0 8px ${({ theme }) => theme.primary[3]}, 0 0 16px ${({ theme }) => theme.primary[0]};
	}
	${({ $disabled, $enter, $active, $big, $refer }) => [
		$enter &&
			css`
				box-shadow: ${({ theme }) => theme.shadow[2]};
			`,
		$active &&
			css`
				background-color: ${({ theme }) => theme.background[7]};
			`,
		$big &&
			css`
				${media.desktop`
					width: 325px;
					height: 64px;
				`}
			`,
		$refer &&
			css`
				width: 100%;
				max-width: none;
				height: 60px; 

				${$refer &&
					$disabled &&
					css`
						&:hover {
							background-color: ${({ theme }) => theme.primary[2]};
							box-shadow: none;
						}

						background-color: ${({ theme }) => theme.primary[2]};
						cursor: default;
						box-shadow: none;
					`}

				${$refer &&
					$enter &&
					css`
						box-shadow: 0 0 8px ${({ theme }) => theme.primary[0]}, 0 0 16px ${({ theme }) => theme.primary[0]};
					`}

				${$refer &&
					$active &&
					css`
						background-color: ${({ theme }) => theme.primary[0]};
					`}

				&:hover {
					background-color: ${({ theme }) => theme.primary[3]};
				}
				&:active {
					background-color: ${({ theme }) => theme.primary[3]};
					box-shadow: 0 0 8px ${({ theme }) => theme.primary[3]}, 
											0 0 16px ${({ theme }) => theme.primary[0]};
				}
			`,
		$disabled &&
			css`
				&:hover {
					background-color: ${({ theme }) => theme.primary[2]};
					box-shadow: none;
				}

				background-color: ${({ theme }) => theme.primary[2]};
				cursor: default;
				box-shadow: none;
			`
	]}

	${media.desktop`
		height: 48px;
		width: 180px;
	`}

	> div {
		height: auto !important;
	}
`;
