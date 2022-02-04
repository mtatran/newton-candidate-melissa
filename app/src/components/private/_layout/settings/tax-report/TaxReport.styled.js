import styled, { css } from 'styled-components';
import { media } from '../../../../../../global';

export const _container = styled.div`
	${({ theme, $ios }) => !$ios && theme.styles.helpers.menu_sub[0]}

	width: 100%;
	height: 100%;
	position: absolute;
	background-color: ${({ theme }) => theme.background[2]};
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	${({ theme }) => theme.styles.helpers.scrollbar[0]}

	${media.desktop`
		padding-top: 64px;
		background-color: ${({ theme }) => theme.background[1]};
	`}
`;

export const _wrapper = styled.div`
	padding: 0 32px;
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;

	${media.tablet`
		padding: 0 64px;
    `}

	${media.desktop`
		padding: 0 48px;
	`}

	${({ $ios }) => [
		$ios &&
			css`
				padding-top: 16px;
			`
	]}
`;

export const _return = styled.div`
	${({ theme }) => theme.styles.helpers.return[0]}
`;

export const _return_container = styled.div`
	${({ theme }) => theme.styles.helpers.return[1]}
`;

export const _header = styled.div`
	font-size: 28px;
	color: ${({ theme }) => theme.text[0]};
	line-height: 30px;
	letter-spacing: -0.5px;
`;

export const _desc = styled.div`
	font-size: 14px;
	color: ${({ theme }) => theme.text[1]};
	line-height: 21px;
	padding: 16px 0;
	> p:nth-child(1) {
		padding-bottom: 16px;
	}
	> a {
		color: ${({ theme }) => theme.text[2]};
		cursor: pointer;
	}
`;

export const _info = styled.div``;

export const _report = styled.div`
	padding: 18px 0;
	display: flex;
	justify-content: space-between;
	color: ${({ theme }) => theme.text[0]};
	align-items: center;
	> span {
		font-size: 14px;
		color: ${({ theme }) => theme.text[2]};
		cursor: pointer;
		&:hover {
			color: ${({ theme }) => theme.text[7]};
		}
	}
`;

export const _actions = styled.div`
	width: 100%;
	transition: background-color 0.2s;
	&::after {
		content: '';
		display: block;
		margin: 0 auto;
		width: 100%;
		border-bottom: 1px solid ${({ theme }) => theme.border[3]};
	}
`;

export const _actions_inline = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	padding: 16px 0;

	> span {
		color: ${({ theme }) => theme.text[1]};
		font-size: 16px;
		transition: 0.25s ease-out;
	}
	> svg {
		width: 12px;
		height: 12px;
		transform: rotate(45deg);
		transition: transform 0.25s ease-out;
	}

	&:hover {
		> span {
			color: ${({ theme }) => theme.text[0]};
		}
		> svg {
			transform: scale(1.1) rotate(45deg);
		}
	}

	${({ $generated, $fetching, $bottomless }) => [
		$fetching &&
			css`
				&:hover {
					cursor: wait;
					> span {
						color: ${({ theme }) => theme.text[1]};
					}
				}
			`,
		$generated &&
			css`
				cursor: default;
				> span {
					color: ${({ theme }) => theme.text[0]};
				}
				> svg {
					display: none;
				}
			`,
		$bottomless &&
			css`
				> span {
					padding-bottom: 0;
				}
			`
	]}
`;
