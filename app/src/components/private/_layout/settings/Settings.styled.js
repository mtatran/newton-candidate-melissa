import styled, { css } from 'styled-components';
import { layers, media } from '../../../../../global';

export const _settings = styled.div`
	z-index: ${layers.current + layers.offscreen.nav};
	display: flex;
`;

export const _icon = styled.span`
	transition: transform 150ms ease-out;
	display: flex;
	position: relative;
	top: 0;
	left: -88px;

	${media.desktop`
	    top: initial;
        left: initial;
    `}

	${({ $singleMenu, $active }) => [
		$singleMenu &&
			css`
				left: calc(100vw - 88px);
			`,
		$active &&
			css`
				background-color: ${({ theme }) => theme.background[1]};
				${$singleMenu &&
					css`
						min-height: 100vh;
						display: none;
						${media.desktop`
							display: flex;
						`}
					`}
			`
	]}
`;

export const _icon_nav = styled.div`
	display: block;
	z-index: ${layers.offscreen.menu_icons};

	${media.desktop`
    	position: relative;
    	flex: 0 0 auto;
    `}

	${({ $active }) => [
		$active &&
			css`
				${media.desktop`
                background-color: ${({ theme }) => theme.background[1]};
            `}
			`
	]}
`;

export const _icon_nav_menu = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row-reverse;
	width: 88px;
	height: 68px;
	flex: 0 0 auto;
	padding: 16px;
	cursor: pointer;
	z-index: ${layers.offscreen.menu_icons};

	> span {
		height: 58px;
		width: 58px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16px;
		position: inherit;
		background-color: ${({ theme }) => theme.background[2]};
		${media.desktop`
            height: auto;
            width: auto;
            background: none;
        `}
		> svg {
			transition: transform 0.15s;
			width: 26px;
			height: 18px;
		}
	}

	&:hover {
		> span {
			> svg {
				transform: scale(1.2);
				transition: transform 0.1s;
			}

			&:hover {
				> svg {
					position: relative;
					transform: scale(1.2);
				}
			}
		}
	}

	${media.desktop`
		height: 88px;
		${({ theme, $drawer, $closing, $singleMenu, $active }) => [
			$active &&
				css`
					background-color: ${theme.background[1]};
					> span {
						> svg {
							transform: scale(1.2);
						}
						&:hover {
							> svg {
								transform: scale(1.2);
							}
						}
					}
				`,
			!$active &&
				($drawer || $closing) &&
				css`
					background-color: ${$singleMenu ? theme.background[1] : theme.background[2]};
				`,

			!($active || $drawer || $closing) &&
				css`
					background-color: transparent;
				`
		]}
	`}

	${({ $active }) => [
		$active &&
			css`
				> span {
					> svg {
						transform: scale(1.2);
					}
					&:hover {
						> svg {
							transform: scale(1.2);
						}
					}
				}
			`
	]}
`;

export const _settings_close = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-bottom: 32px;
	padding-right: 16px;
	padding-left: 48px;
	padding-top: 20px;
	width: 100%;
	flex: 0 0 auto;
	${media.tablet`
		padding-right: 32px;
		padding-top: 32px;
	`}
	${media.desktop`
		justify-content: flex-start;
		padding-right: 0;
		padding-top: 0;
	`}
	> span {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		height: 30px;
		width: 30px;
		position: relative;
		left: -8px;
		border-radius: 5px;
		padding-top: 12px;
		-webkit-transition: 200ms ease-out;
		-moz-transition: 200ms ease-out;
		-o-transition: 200ms ease-out;
		transition: 200ms ease-out;
		background-color: transparent;
		${media.desktop`
			padding-top: 0px;
		`}
		&:hover {
			${media.desktop`
				background-color: ${({ theme }) => theme.background[6]};
				box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.background[6]};
				border-radius: 1px;
			`}
		}
		> svg {
			display: block;
			width: 18px;
			height: 18px;
		}
	}
`;

export const _settings_menu = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	${media.desktop`
	   	top: initial;
		left: initial;
    `}
	> h1 {
		font-size: 28px;
		font-weight: 400;
		padding-left: 32px;
		${media.desktop`
	    	display: none;
       `} {
		}
	}

	${({ $singleMenu }) => [
		$singleMenu &&
			css`
				top: initial;
				left: initial;
			`
	]}
`;

export const _settings_container = styled.div`
	box-shadow: -10px 0 10px 6px rgba(0, 0, 0, 0.08), -10px 0 10px 0.5px rgba(0, 0, 0, 0.16);
	position: relative;
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.background[2]};
	pointer-events: all;
	transform: translateX(-100%);
	opacity: 1;
	transition: transform 400ms ease-out, opacity 0ms ease-out 250ms;
	animation: full-left 400ms cubic-bezier(0.64, 0.28, 0.4, 0.8);
	z-index: ${({ $closing }) => {
		let multiplier = $closing ? 2 : 1;
		return multiplier * (layers.current + layers.offscreen.settings);
	}};	
	
    ${({ theme, $hidden, $closing, $tabGroup }) => [
			theme && theme.styles.helpers.scrollbar[0],
			$hidden &&
				css`
					overflow: hidden;
				`,
			$closing &&
				css`
					opacity: 0;
					pointer-events: none;
					transform: translateX(50%);
				`,
			($tabGroup || $closing) &&
				css`
					animation: none;
				`
		]}	
    
    ${media.tablet`
  		box-shadow: none;
    `}
    
    ${media.desktop`
		width: 420px;
		height: 100vh;
		background-color: ${({ theme }) => theme.background[1]};
    `}
`;

export const _list = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	width: auto;
	height: 100%;
	overflow-y: auto;
	${({ theme }) => theme.styles.helpers.scrollbar[0]};

	${media.tablet`
		align-items: stretch;
		justify-content: flex-start;
	`}

	${media.desktop`
	    padding-top: 64px;
    `}
`;

export const _list_container = styled.div`
	width: 100%;
	height: 100%;
	${media.desktop`
	    padding: 0 48px 8px 48px;
    `}

	${({ $unverified }) =>
		$unverified &&
		css`
			height: auto;

			${media.tablet`
				flex: 1 1 auto;
			`}
		`}
`;

export const _list_header = styled.div`
    font-size: 28px;
    font-weight: bold;
    letter-spacing: -0.5px;
    color: ${({ theme }) => theme.text[0]};
    padding-bottom: 32px;
    line-height: 1;
    padding-left: 32px;
    
    ${media.tablet`
       padding-left: 64px;
    `}
    
    ${media.desktop`
        padding-left: 0;
    `}

	${({ $unverified }) => [
		$unverified &&
			css`
				${media.tablet`
					flex: 0 0 auto;
					padding-bottom: 16px;
				`}
			`
	]}
`;

export const _list_item = styled.span`
	margin: 32px 32px 48px 32px;
	font-size: 14px;
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: opacity 100ms ease-out, transform 150ms ease-out;
	color: ${({ theme }) => theme.error[1]};

	${({ $tabGroup, $closing }) => [
		$tabGroup &&
			css`
				animation: fade-in-delay 300ms ease-out;
			`,
		$closing &&
			css`
				opacity: 0;
				${media.desktop`
				transform: translateX(30px);
			`}
			`
	]}

    ${media.tablet`
		margin: 32px 48px 48px 64px;
    `}
    
	${media.desktop`
		margin: 16px 48px 48px 48px;
		transform: ${({ $closing }) => ($closing ? 'translateX(30px)' : 'translateX(0)')};

    `}
    
	> span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		margin-left: 5px;
		> svg {
			width: 12px;
			height: 12px;
			transition: transform 0.25s ease-out;
		}
	}
	&:hover {
		color: ${({ theme }) => theme.error[2]};
		> span {
			> svg {
				transform: translateX(4px);
				g {
					stroke: ${({ theme }) => theme.error[2]};
				}
			}
		}
	}
	&:active {
		transform: scale(0.95);
		> span {
			> svg {
				transform: scale(0.95);
			}
		}
	}
`;

export const _info = styled.div`
	width: 100%;
`;

export const _section = styled.div`
    width: 100%;
    padding: 16px 32px 0;
	transition: background-color 0.2s;

    ${({ $mobile, $bottomless }) => [
			$mobile &&
				css`
					${media.desktop`
                display:none;
            `}
				`,
			$bottomless &&
				css`
					&::after {
						content: '';
						display: block;
						margin: 0 auto;
						width: 100%;
						padding: 8px 0;
						border-bottom: none;
					}
				`
		]}

	${media.tablet`
		padding: 16px 64px 0;
	`}

	${media.desktop`
		padding: 8px 0;
	`}

	&::after {
		content: '';
		display: block;
		margin: 0 auto;
		width: 100%;
		padding: 8px 0;
		border-bottom: 1px solid ${({ theme }) => theme.border[3]};
	}

	&:hover,
	&:active {
		background-color: ${({ theme }) => theme.border[3]};

		${media.desktop`
			background-color: transparent;
		`}
	}
`;

export const _section_divided = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const _section_row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const _section_inline = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	padding: 8px 0;

	> span {
		color: ${({ theme }) => theme.text[1]};
		font-size: 14px;
		line-height: 21px;
		transition: 0.25s ease-out;
		${({ $bottomless }) => [
			$bottomless &&
				css`
					padding-bottom: 0;
				`
		]}
	}
	> svg {
		margin-left: 8px;
		width: 14px;
		height: 14px;
		transition: transform 0.25s ease-out;
		transform: rotate(-90deg);
	}
	&:hover {
		> span {
			color: ${({ theme }) => theme.text[0]};
		}
		> svg {
			transform: translateX(4px) rotate(-90deg);
		}
	}
	${({ $disabled, $logout }) => [
		$disabled &&
			css`
				cursor: auto;
				&:hover {
					> span {
						color: ${({ theme }) => theme.text[1]};
					}

					> svg {
						transform: rotate(-90deg);
					}
				}

				> svg {
					transition: none;
					> g > g {
						stroke: ${({ theme }) => theme.text[1]};
					}
				}
			`,
		$logout &&
			css`
				> span {
					color: ${({ theme }) => theme.error[1]};
				}

				&:hover {
					> span {
						color: ${({ theme }) => theme.error[3]};
					}

					> svg {
						transform: translateX(4px);
						g {
							stroke: ${({ theme }) => theme.error[3]};
						}
					}
				}

				> svg {
					transform: none;
				}
			`
	]}
`;

export const _section_label = styled.div`
	color: ${({ theme }) => theme.text[1]};
	font-size: 14px;
	line-height: 21px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	> span {
		color: ${({ theme }) => theme.text[1]};
		font-size: 14px;
		line-height: 21px;
		transition: 0.25s ease-out;
	}
	&:hover {
		> span {
			color: ${({ theme }) => theme.text[0]};
		}
		> svg {
			transform: translateX(4px) rotate(-90deg);
		}
	}

	> svg {
		margin-left: 8px;
		width: 14px;
		height: 14px;
		transition: transform 0.25s ease-out;
		transform: rotate(-90deg);
	}

	${({ $bottomless }) => [
		$bottomless &&
			css`
				padding-bottom: 0;
			`
	]}
`;

export const _section_value = styled.div`
	color: ${({ theme }) => theme.text[0]};
	font-size: 18px;
	line-height: 21px;
`;

export const _action = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const _action_value = styled.div`
	color: ${({ theme }) => theme.text[0]};
	font-size: 18px;
	line-height: 21px;
	${({ $spaced }) => [
		$spaced &&
			css`
				letter-spacing: 1px;
			`
	]}
`;

export const _action_edit = styled.div`
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	${media.desktop`
    	width: 16px;
	    height: 16px;
    `}
	> svg {
		width: 18px;
		height: 18px;
		transition: transform 0.25s ease-out;
		transform: rotate(-90deg);
		${media.desktop`
            width: 18px;
            height: 14px;
            &:hover {
            	transform: translateY(-2px) rotate(-90deg);
            }
        `}
	}
`;

export const _action_copy = styled.div`
	width: 18px;
	height: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	> span {
		display: flex;
		align-items: center;
		justify-content: center;
		> svg {
			display: inline-block;
			width: 18px;
			height: 18px;
			transition: 0.25s;
		}
	}
`;
