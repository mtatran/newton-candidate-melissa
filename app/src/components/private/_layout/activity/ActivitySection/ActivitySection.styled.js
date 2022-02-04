import styled, { css } from 'styled-components';
import { media } from '../../../../../../global';

export const _section = styled.div`
	display: block;
	width: 100%;
	${media.desktop`
		padding-left: ${({ $padding }) => ($padding ? '16px' : '0')};
		overflow: ${({ $scroll }) => ($scroll ? 'scroll' : 'initial')};
		${({ theme }) => theme.styles.helpers.scrollbar[0]}
	`}
`;

export const _container = styled.div`
	display: block;
	width: 100%;
`;

export const _center = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	> div {
		margin-bottom: 128px;
	}

	${({ $margin }) => [
		$margin &&
			css`
				> div {
					margin-bottom: 0;
				}
			`
	]}
`;

export const _item_container = styled.div`
	width: 100%;
	padding-bottom: 16px;
	border-bottom: 1px solid ${({ theme }) => theme.border[3]};

	${media.desktop`
		padding-right: 32px;`}
`;

export const _icon = styled.div`
	display: inline-block;
	width: 32px;
	height: 32px;
`;

export const _main = styled.span`
	display: block;
	width: 32px;
	height: 32px;
	position: relative;
	right: 50%;

	> svg {
		width: 32px;
		height: 32px;
	}

	${({ $activityTrade, $adjustment }) => [
		$activityTrade &&
			css`
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				background-color: ${({ theme }) => theme.background[7]};

				> svg {
					width: 14px;
					height: 12px;
					stroke: ${({ theme }) => theme.stroke[2]};
				}
			`,
		$adjustment &&
			css`
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				background-color: ${({ theme }) => theme.background[4]};

				> svg {
					width: 18px;
					height: 18px;
				}
			`
	]}
`;

export const _secondary = styled.span`
	display: block;
	position: relative;
	bottom: 11px;
	left: 3px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.background[2]};
	font-size: 20px;

	> svg {
		display: block;
		width: 20px;
		height: 20px;
	}

	${({ $small, $activityTrade }) => [
		$small &&
			css`
				display: flex;
				justify-content: center;
				align-items: center;
				color: ${({ theme }) => theme.text[0]};
				font-size: 14px;

				> svg {
					width: 9px;
					height: 9px;
				}
			`,
		$activityTrade &&
			css`
				display: flex;
				justify-content: center;
				align-items: center;

				> svg {
					width: 12px;
					height: 12px;
					fill: ${({ theme }) => theme.fill[0]};
				}
			`
	]}
`;

export const _title = styled.span`
	font-size: 14px;
	line-height: 21px;
	color: ${({ theme }) => theme.text[0]};
	display: flex;
	align-items: center;
	padding-bottom: 4px;
	line-height: 1;
	position: relative;

	${media.tablet`
				justify-content: flex-start;`}

	> span {
		letter-spacing: 0.5px;
		line-height: 1;
		padding-right: 4px;

		display: flex;
	}
`;

export const _title_link = styled.span`
	display: inline-block;
	position: absolute;
	right: -6px;
	top: -7px;

	${media.tablet`
		top: -6px;`}

	&:hover {
		> a {
			color: ${({ theme }) => theme.text[9]};
			> svg {
				transform: translateY(-1px) translateX(1px);
				> g {
					> g {
						stroke: ${({ theme }) => theme.stroke[3]};
					}
				}
			}
		}
	}

	> a {
		color: ${({ theme }) => theme.text[4]};
		cursor: pointer;
		font-size: 14px;
		display: flex;
		align-items: center;
		transition: 250ms;
		padding: 6px;

		> svg {
			display: none;
			${media.tiny`
				display: inline-block;
				margin-left: 2px;
				width: 16px;
				height: 16px;
				transition: 250ms;
				`}

			> g {
				> g {
					transition: 250ms;
					stroke: ${({ theme }) => theme.stroke[3]};
				}
			}
		}
	}
`;

export const _link_mini = styled.span`
	display: none;

	${media.tiny`
		display: inline;`}
`;

export const _link_mobile = styled.span`
	display: none;
	${media.mobile`
		display: inline;`}
`;

export const _warning = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	margin-left: 8px;
	cursor: pointer;

	&:hover {
		> div {
			z-index: 10;
			> p {
				opacity: 1;
			}
		}
	}

	> svg {
		width: 16px;
		height: 16px;

		${media.desktop`
			width: 14px;
			height: 14px;`}
	}
`;

export const _tooltip = styled.div`
	z-index: -1;
	position: absolute;
	width: 0;
	top: -40px;
	right: 24px;
	min-width: 250px;
	width: 100%;

	${media.tablet`
		top: -40px;
		left: 24px;`}

	> p {
		font-size: 12px;
		opacity: 0;
		padding: 16px 24px;
		border-radius: 4px;
		transition: opacity 0.25s ease-in;
		background-color: ${({ theme }) => theme.background[1]};
		box-shadow: ${({ theme }) => theme.shadow[7]};
	}

	${({ $dark }) => [
		$dark &&
			css`
				> p {
					background-color: ${({ theme }) => theme.background[2]};
				}
			`
	]}
`;

export const _description = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export const _date = styled.span`
	font-size: 14px;
	line-height: 18px;
	color: ${({ theme }) => theme.secondary[4]};
`;

export const _detail = styled(_date)`
	display: none;
`;

export const _amount = styled.span`
	font-size: 14px;
	line-height: 18px;
	color: ${({ theme }) => theme.secondary[4]};
`;

export const _empty = styled.span`
	display: flex;
	flex-direction: column;
	padding: 0;
	font-size: 14px;
	line-height: 21px;
	color: ${({ theme }) => theme.secondary[4]};

	${({ $center }) => [
		$center &&
			css`
				${media.desktop`
					align-items: center;
					padding: 24px 0;
				`}
			`
	]}

	> button {
		display: none;

		${media.desktop`
			height: 54px;
			width: 220px;
			background-color: ${({ theme }) => theme.background[7]};
			border-radius: 50px;
			border: none;
			color: ${({ theme }) => theme.text[3]};
			cursor: pointer;
			letter-spacing: 1.5px;
			font-weight: 700;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 16px;
			transition: background-color 0.15s ease-out;`}

		&:hover {
			background-color: ${({ theme }) => theme.background[16]};

			> svg {
				transform: translateX(3px) rotate(-90deg);
			}
		}

		> span {
			text-transform: uppercase;
		}

		> svg {
			margin-left: 8px;
			width: 14px;
			height: 14px;
			transform: rotate(-90deg);
			transition: transform 0.15s;
		}
	}
`;

export const _header = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 8px;
	border-bottom: 1px solid ${({ theme }) => theme.border[3]};

	> p {
		color: ${({ theme }) => theme.text[0]};
		font-size: 15px;
		line-height: 21px;
		text-transform: uppercase;
	}

	> h3 {
		color: ${({ theme }) => theme.secondary[0]};
		font-size: 14px;
		line-height: 21px;
		cursor: pointer;
		&:hover {
			background-color: transparent;
			color: ${({ theme }) => theme.secondary[3]};
		}

		${media.desktop`
			display: none;
		`}
	}
`;

export const _item = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding-top: 16px;
	height: 69px;

	&:last-child {
		> div:last-child {
			border-bottom: none;
		}
	}

	&:hover {
		${_date} {
			display: none;
		}

		${_detail} {
			display: inline;
		}
	}
`;
