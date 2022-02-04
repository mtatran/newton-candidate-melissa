import styled, { css } from 'styled-components';
import { is, media } from '../../../../global';

export const __form = styled.form`
	padding: 16px 0;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: flex-start;
	position: relative;
	width: 100%;
	z-index: 55;
	${({ $left, $align, $compact, $fade, $center, $fill, $phone, $code }) => [
		is($left)`
			flex-direction: row;
		`,
		is($align)`
			padding: 0 16px;
			min-height: 420px;
			${media.desktop`
				padding: 0 16px;
			`}
		`,
		is($compact)`
			padding: 0 32px;
			${media.tablet`
				padding: 16px 64px;
			`}
			${media.desktop`
				padding: 0;
			`}
		`,
		is($fade)`
			transition: opacity 0.1s ease-out;
			opacity: 0;
		`,
		is($center)`
			justify-content: center;
		`,
		is($fill)`
			height: 100%;
			padding: 0;
			${media.tablet`
				padding: 0 16px;
			`}
		`,
		is($phone, $code)`
			padding: 0 !important;
			${media.desktop`
				align-items: flex-start;
				padding-top: 32px !important;
				padding-left: 48px !important;
			`}
		`
	]}
	button {
		font-size: 14px;
		font-weight: 700;
	}
`;

export const __titles = styled.div`
	${media.desktop`
			width: 100%;
	`}

	${({ $large, $sides, $fixed }) => [
		$large &&
			css`
				> h1 {
					${media.desktop`
						max-width: 415px;
					`}
				}
			`,
		$sides &&
			css`
				> h4 {
					padding: 0 8px;
					${media.desktop`
						padding: 0;
					`}
				}
			`,
		$fixed &&
			css`
				height: 120px;
			`
	]}

	> h4 {
		display: block;
		width: 100%;
		text-align: center;
		font-size: 18px;
		font-weight: 400;
		line-height: 24px;
		color: ${({ theme }) => theme.text[0]};
		padding-bottom: 8px;

		${media.desktop`
			text-align: left;
		`}
	}

	> h5 {
		display: block;
		width: 100%;
		text-align: center;
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		color: ${({ theme }) => theme.text[1]};
		padding: 0 16px 8px 16px;

		${media.mini`
			padding: 0 32px 8px 32px;
		`}

		${media.tablet`
			padding: 0 48px 8px 48px;	
		`}

		${media.desktop`
			width: 70%;
			max-width: 370px;
			text-align: left;
			padding: 0 0 8px 0;
		`}
	}

	> h6 {
		text-align: center;
		padding-top: 8px;
		${media.desktop`
			text-align: left;
			padding-bottom: 8px;
		`}
	}
`;

export const __suggestions = styled.div`
	height: 0;
	width: 100%;
	padding: 0;
`;

export const __sections = styled.div`
	display: flex;
	justify-content: space-between;

	> div {
		padding-top: 0;
		margin: 0 5px;

		&:last-child {
			margin-right: 0;
		}

		&:first-child {
			margin-left: 0;
		}
	}
`;

export const __section = styled.div`
	display: block;
	width: 100%;
	padding: 16px 0;
	position: relative;
	${({ $title, $bottom, $compact, $bottomless, $topless, $left, $margin, $refer, $inline, $numbers, $sides }) => [
		is($title)`
			padding: 0;
			height: 4px;
		`,
		is($sides)`
			padding: 16px;
		`,
		is($bottom)`
			${media.desktop`
				padding: 0 0 16px 0;
				position: relative;
			`}
		`,
		is($compact)`
			padding: 8px 0;
		`,
		is($bottomless)`
			padding: 16px 0 0 0;
		`,
		is($topless)`
			padding-top: 0;
		`,
		is($left)`
			padding-left: 16px;
		`,
		is($margin)`
			width: 100%;
			padding: 16px 32px;
			${media.tablet`
				padding: 16px 48px;
			`}
			${media.desktop`
				width: auto;
				margin: 0;
				padding: 16px 32px;
			`}
		`,
		is($refer)`
			width: 60%;
			${media.desktop`
				width: 100%;
			`}
			> div {
				padding: 0;
				${media.desktop`
					padding-right: 16px;
				`}
			}
		`,
		is($inline)`
			width: 100%;
			padding-top: 16px;
			position: relative;
			${media.desktop`
				padding-right: 16px;
			`}
			${is($numbers)`
				padding-bottom: 16px;
				${media.desktop`
					padding-left: 24px;
				`}
			`}
		`
	]}
	> p {
		${({ theme, $comment, $max, $error }) => [
			is($comment)`
				text-align: right;
				margin-top: 12px;
				margin-right: 16px;
				font-size: 12px;
				font-weight: 400;
				color: ${theme.secondary[4]};
				${media.tablet`
					margin-right: 32px;
				`}
				${media.desktop`
					margin-right: 16px;
				`}
				${is($max)`
					color: ${theme.error[1]};
				`}
			`,
			is($error)`
				color: ${theme.error[1]};
				text-align: center;
				background-color: rgb(218, 65, 103, 0.2);
				margin: 16px;
				padding: 12px 16px;
				border-radius: 4px;
				font-size: 14px;
				letter-spacing: 0;
			`
		]}
	}
`;

export const __headers = styled.div`
	transition: transform 0.25s ease-out;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding-left: 16px;
	opacity: 0;
	pointer-events: none;
	transform: translateY(15px);
	${({ $reset, $compact, $focus, $comfy, $pointer, $simple, $input, $full }) => [
		is($reset)`
			padding-left: 40px;
			${media.desktop`
				padding-left: 0;
			`}
		`,
		is($compact)`
			padding-left: 0;
		`,
		is($focus)`
			opacity: 1;
			transform: translateY(0);
		`,
		is($comfy)`
			padding: 0 48px;
			${media.desktop`
				padding: 0;
			
			`}
		`,
		is($pointer)`
			pointer-events: auto;
			padding-bottom: 8px;
			padding-left: 0;
		`,
		is($simple)`
		opacity: 1;
		position: relative;
		top: 5px;
		> span {
			color: ${({ theme }) => theme.secondary[4]};
		}
	`,
		is($input)`
		opacity: 0;
		pointer-events: none;
		top: 9px;
		transform: translateY(15px);
		> span {
			color: ${({ theme }) => theme.secondary[4]};
		}
	`,
		is($full)`
		color: ${({ theme }) => theme.secondary[4]};
		opacity: 1;
		top: -9px;
	`
	]}

	> span {
		font-size: 14px;
		font-weight: 400;
		line-height: 21px;
		min-height: 21px;
		color: ${({ theme }) => theme.secondary[4]};
		> span {
			position: absolute;
			left: 0;
			display: inline-block;
			font-size: 12px;
			font-weight: 400;
			transform: translateX(90px);
		}
	}
	> a {
		font-size: 14px;
		line-height: 21px;
		color: ${({ theme }) => theme.secondary[0]};
		cursor: pointer;
		&:hover {
			color: ${({ theme }) => theme.secondary[5]};
		}
	}
`;

export const __input = styled.div`
	width: 100%;
	padding: 0 16px;
	${css`
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
			width: calc(100% - 24px);
			height: 1px;
			background-color: ${({ theme }) => theme.background[4]};
			transition: 0.25s;
			${media.desktop`
				background-color: ${({ theme }) => theme.background[2]};
			`}
		}
	`}

	${({ theme, $compact, $reset, $phone, $refer, $fixed, $pale, $light, $focus, $error }) => [
		$compact &&
			css`
				padding: 0;
			`,
		$reset &&
			css`
				padding: 0 40px;
				&::after {
					width: calc(100% - 80px);
					background-color: ${theme.background[2]};
				}
				${media.desktop`
					padding: 0;
					&::after {
						width: 100%;
					}
				`}
			`,
		$phone &&
			css`
				padding: 0;
				&::after {
					width: 100%;
				}
			`,
		$refer &&
			css`
				&::after {
					background-color: ${theme.background[2]};
				}
			`,
		$fixed &&
			css`
				position: relative;
				&::after {
					position: absolute;
					bottom: -5px;
					top: auto;
				}
			`,
		$pale &&
			css`
				&::after {
					transition: 0.25s;
					background-color: ${theme.background[2]};
				}
				&:hover {
					&::after {
						background-color: ${theme.primary[2]};
						height: 1px;
					}
				}
			`,
		$light &&
			css`
				&::after {
					transition: 0.25s;
					${media.desktop`
					background-color: rgb(13, 19, 43);
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
					${is($focus, $error)`
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
	> input,
		textarea {
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
	> textarea {
		resize: none;
		height: 31px;
		scrollbar-width: none;
		-ms-overflow-style: none;
		&::-webkit-scrollbar {
			display: none;
		}
		background-color: transparent;
		border: none;
		width: 100%;
		line-height: 21px;
	}
`;

export const __message = styled.p`
	font-size: 12px;
	line-height: 18px;
	color: ${({ theme }) => theme.text[0]};
	${({ theme, $long, $desktopOnly, $light }) => [
		is($long)`
				max-width: 400px;
			`,
		is($desktopOnly)`
				margin-left: 0;
				max-width: 280px;
			`,
		is($light)`
				> a {
					color: ${theme.secondary[5]};
				}
			`
	]}
	${media.desktop`
		max-width: 300px;
	`}
	> a {
		color: ${({ theme }) => theme.secondary[6]};
		text-decoration: none;
		cursor: pointer;
		&:hover {
			background-color: transparent;
			color: ${({ theme }) => theme.secondary[0]};
		}
	}
	> span {
		${({ $dot, $desktop }) => [
			is($dot)`
				display: inline;
				${media.desktop`
					display: none;
				`}
			`,
			is($desktop)`
				display: none;
				${media.desktop`
					display: inline;
				`}
			`
		]}
	}
`;

export const __terms = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding-top: 32px;
	padding-left: 32px;
	padding-right: 16px;
	${media.desktop`
		flex: 1 1 auto;
	`}
	${({ $mini, $hideDesktop, $desktopOnly }) => [
		is($mini)`
			padding-left: 16px;
		`,
		is($hideDesktop)`
			${media.desktop`
				display: none;
			`}
		`,
		is($desktopOnly)`
			display: none;
			${media.desktop`
				display: flex;
				padding-left: 0;
				width: 100%;
			`}
		`
	]}
`;

export const __info = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 22px;
	width: 22px;
	min-height: 22px;
	height: 22px;
	border-radius: 50px;
	border: 2px solid ${({ theme }) => theme.border[1]};
	color: ${({ theme }) => theme.text[4]};
	font-size: 12px;
	font-weight: 900;
	margin-right: 0;
	cursor: pointer;
	position: relative;
	right: 16px;
	top: 8px;
`;

export const __basic_error = styled.p`
	color: ${({ theme }) => theme.error[1]};
	text-align: center;

	${({ $error, $top }) => [
		$error &&
			css`
				background-color: ${({ theme }) => theme.background[22]};
				margin: 0 16px 16px 16px;
				padding: 12px 16px;
				border-radius: 4px;
				font-size: 14px;
				letter-spacing: 0;

				${media.desktop`
					margin: 0 0 16px 0;
				`}
			`,
		$top &&
			css`
				margin-top: 16px;
			`
	]}
`;

export const __header_normal = styled.span``;

export const __header_error = styled.span`
	color: ${({ theme }) => theme.error[0]} !important;
`;

export const __error_prompt = styled.div`
	animation: ${({ $animate }) => (!$animate ? 'fade-up-popup 400ms cubic-bezier(0.64, 0.28, 0.4, 0.8)' : 'none')};
	max-width: 100%;
	box-shadow: ${({ theme }) => theme.shadow[7]};
	background-color: ${({ theme }) => theme.background[1]};
	padding: 24px 32px 24px 40px;
	margin: 0;
	border-radius: 10px;
	box-sizing: border-box;
	position: relative;
	margin-bottom: 16px;
	width: 100%;

	> span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 100px;
		background-color: ${({ theme }) => theme.background[14]};
		position: absolute;
		left: -16px;
		top: 16px;

		> svg {
			width: 16px;
			height: 16px;
		}
	}

	> p {
		color: ${({ theme }) => theme.text[0]};
		letter-spacing: 0px;

		> span {
			cursor: pointer;
			letter-spacing: 0px;
			color: ${({ theme }) => theme.text[2]};

			&:hover {
				color: ${({ theme }) => theme.text[6]};
			}
		}
	}

	> div {
		color: ${({ theme }) => theme.text[2]};
		cursor: pointer;
		padding-top: 8px;
		letter-spacing: 0px;

		&:hover {
			color: ${({ theme }) => theme.text[6]};
		}
	}

	${media.desktop`
	    background-color: ${({ theme }) => theme.background[2]};
	`}
`;
