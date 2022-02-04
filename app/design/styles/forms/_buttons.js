import { css } from 'styled-components';
import { is, media } from '../../../global';

export const _buttons = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 32px;
	margin-top: auto;
	font-size: 14px;
	font-weight: 700;
	letter-spacing: 1.5px;
	padding-left: 0;
	${({ $left, $center, $bottom, $desktopOnly, $hideDesktop, $top }) => [
		$top &&
			css`
				margin-top: 0;
				padding-top: 0;
			`,
		$left &&
			css`
				${media.desktop`
				padding-left: 16px;
			`}
			`,
		$center &&
			css`
				align-items: center;
			`,
		$bottom &&
			css`
				flex-direction: column;
				align-items: center;
				margin-bottom: 16px;
				padding-bottom: 16px;
				padding-left: 0;
			`,
		$desktopOnly &&
			css`
				display: none;
				> p {
					text-align: center;
					display: block;
				}
				${media.desktop`
					display: block;
				`}
			`,
		$hideDesktop &&
			css`
				display: flex;
				justify-content: center;
				${media.desktop`
				display: none;
			`}
			`
	]}
	> p {
		${({ theme, $error }) =>
			$error &&
			css`
				color: ${theme.error[1]};
				text-align: center;
				background-color: rgb(218, 65, 103, 0.2);
				margin: 0 16px 16px;
				padding: 12px 16px;
				border-radius: 4px;
				font-size: 14px;
				letter-spacing: 0;
			`}
	}
	${media.desktop`
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	`}
`;
