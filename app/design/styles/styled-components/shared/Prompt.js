import styled, { css } from 'styled-components';
import { media } from '../../../../global';
import { motion } from 'framer-motion';

export const _prompt = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;

	${({ $short, $open, $bottom, $active, $visible }) => [
		$active &&
			css`
				height: 100%;
				display: flex;
				align-items: flex-end;

				${media.desktop`
                height: 100vh;
            `}
			`,
		$short &&
			css`
				height: auto !important;
			`,
		$open &&
			css`
				z-index: 2;
				position: relative;
				bottom: auto;
				left: auto;
			`,
		$bottom &&
			css`
				bottom: 0;
				left: 0;
			`,
		$visible === undefined || $visible
			? css`
					visibility: visible;
			  `
			: css`
					visibility: hidden;
					display: none;
			  `
	]}
`;

export const _container = styled(motion.div)`
	background-color: ${({ theme }) => theme.background[15]};
	width: 100%;
	border-radius: 20px 20px 0 0;
	padding: 32px 16px 52px;
	top: 20px;
	position: relative;
	box-shadow: ${({ theme }) => theme.shadow[12]};

    ${({ $referral, $top }) => [
			$referral &&
				css`
					box-shadow: ${({ theme }) => theme.shadow[11]};
					padding-bottom: 16px;
				`,
			$top &&
				css`
					top: 0;
				`
		]}
		${media.mini`
			padding: 32px 32px 52px;
		`}

		${media.tablet`
			padding: 24px 16px 52px;
		`}

		${media.desktop`
			background-color: ${({ theme }) => theme.background[4]};
		`}
`;

export const _close = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;

	${media.tablet`
		padding-right: 32px;
		padding-bottom: 16px;
	`}

	${media.desktop`
		padding-bottom: 0;
		padding-right: 0;
	`}

	> span {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		height: 24px;
		width: 24px;
		position: relative;
		left: -8px;
		border-radius: 5px;
		transition: 200ms ease-out;
		background-color: transparent;

		${media.desktop`
			padding-top: 0px;
		`}

		&:hover {
			${media.desktop`
				background-color: ${({ theme }) => theme.background[6]};
				box-shadow: ${({ theme }) => theme.shadow[6]};
				border-radius: 1px;
			`}
		}
		> svg {
			display: block;
			width: 14px;
			height: 14px;
		}
	}
`;

export const _comment = styled.div`
	display: flex;
	flex-direction: column;
	letter-spacing: 0.5px;
	padding: 32px 0 0;

    ${media.tablet`
		padding: 32px 64px 0 64px;    
    `}

    ${media.desktop`
    	padding: 32px 32px 0 32px;
    `}

    ${({ $center, $bottom, $topless }) => [
			$center &&
				css`
					align-items: center;
				`,
			$bottom &&
				css`
					padding-bottom: 32px;
					${media.tablet`
	        	padding-bottom: 32px;
	        `}

					${media.desktop`
                padding-bottom: 32px;
            `}
				`,
			$topless &&
				css`
					padding-top: 16px;
				`
		]}
`;

export const _icon = styled.div`
	> svg {
		width: 68px;
		height: 68px;
	}
`;

export const _header = styled.div`
	font-size: 21px;
	letter-spacing: -0.2px;
	font-weight: 700;
	color: ${({ theme }) => theme.text[0]};
	padding-top: 8px;
	padding-bottom: 16px;
	text-align: center;

	${({ $left, $failed }) => [
		$left &&
			css`
				padding-left: 0;
			`,
		$failed &&
			css`
				padding-bottom: 0;
			`
	]}
`;

export const _sub_header = styled.div`
	color: ${({ theme }) => theme.text[1]};
	font-size: 14px;
	line-height: 21px;
	text-align: center;
	padding: 0 8px;

	> span {
		cursor: pointer;
		color: ${({ theme }) => theme.text[2]};
	}

	${({ $successful, $failed }) => [
		$successful ||
			($failed &&
				css`
					padding-bottom: 32px;
					padding-left: 0;
					padding-top: 8px;
				`)
	]}
`;

export const _desc = styled.div`
	font-size: 14px;
	line-height: 21px;
	font-weight: 400;
	color: ${({ theme }) => theme.text[1]};
	text-align: center;
	padding: 16px 16px;

	${({ $failed }) => [
		$failed &&
			css`
				padding-bottom: 32px;
			`
	]}
`;

export const _link = styled.div`
	color: ${({ theme }) => theme.text[2]};
	text-decoration: none;
	cursor: pointer;
	text-align: center;
	padding-top: 8px;

	&:hover {
		background-color: transparent;
		color: ${({ theme }) => theme.text[6]};
	}
`;

export const _actions = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 32px;
	margin-bottom: 32px;
`;
