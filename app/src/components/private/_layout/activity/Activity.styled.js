import styled, { css } from 'styled-components';
import { layers, media, sizes } from '../../../../../global';
import { Link } from 'react-router-dom';

export const _list = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-height: 100%;
	${media.tablet`
		padding-top: 0;
	`}
	${media.desktop`
		align-items: center;
		justify-content: space-between;
		width: 100vw;
		padding: 0;
		padding-bottom: 16px;
		padding-top: 0;
		margin-bottom: 0;
		min-height: 100vh;
	`}
`;

export const _fixed = styled.div`
	position: sticky;
	top: 0;
	z-index: ${props => (props.layer ? props.layer + layers.relative.fixed : layers.current + layers.relative.fixed)};
	width: 100%;
	height: 158px;

	${media.tablet`
		height: 152px;
	`}
	${media.desktop`
		position: static;
		background-color: transparent;
		height: auto;
		width: calc(100% - 116px);
		max-width: ${sizes.maxContainer}px;
	`}

	> div {
		background-color: #141a2e;

		${media.desktop`
			background-color: transparent;
		`}
	}

	${({ welcome }) => {
		if (welcome) {
			return css`
				height: 156px;
				${media.mini`
					height: 108px;
				`};

				${media.tablet`
					height: 155px;
				`}

				${media.desktop`
					height: auto;
				`}
			`;
		}
	}}
`;

export const _container = styled.div`
	display: block;
	width: 100%;
	padding: 0 0 48px;
	min-height: 100%;
	background-color: #141a2e;
	padding-bottom: 96px;

	${media.tablet`
		min-height: 100vh;
		padding-top: 0;
		padding-bottom: 112px;
	`}

	${media.desktop`
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 100%;
		border-radius: 0;
		box-shadow: none;
		background-color: transparent;
		padding: 0;
		margin-bottom: 0;
		min-height: 100%;
		padding-bottom: 16px;
	`} 

	> h1 {
		font-size: 28px;
		font-weight: 700;
		color: white;
		line-height: 30px;
		margin-bottom: 16px;
	}
`;

export const _wrapper = styled.div`
	z-index: ${({ layer }) => (layer ? layer + layers.relative.container : layers.current + layers.relative.container)};
	position: relative;
	min-width: 100%;
	width: 100%;
	flex: 0;
	padding: 32px 28px 0 28px;
	${media.mini`
		padding: 32px 32px 0 32px;
	`}
	${media.tablet`
		padding: 32px 64px 0 72px;
	`}
	${media.desktop`
		min-width: 0;
		width: 100vw;
		width: calc(100% - 116px);
		max-width: 1025px;
		padding: 72px 32px 0 32px;
	`}

	> h3 {
		display: flex;
		justify-content: flex-end;
		color: ${({ theme }) => theme.secondary[0]};
		font-size: 14px;
		line-height: 21px;
		padding: 0 8px;
		cursor: pointer;
		margin: 0 0 0 16px;
		&:hover {
			background-color: transparent;
			color: ${({ theme }) => theme.secondary[3]};
		}
		${media.desktop`
			display: none;
		`}
	}
`;

export const _header = styled.div`
	display: none;
	justify-content: flex-start;
	max-width: 800px;
	${media.desktop`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		padding: 0 32px 0 0;
		max-width: none;
	`}

	${({ mobile }) =>
		mobile
			? `
			display: flex;
			flex-direction: column;
			position: relative;
		${media.desktop`
			display: none;
		`}
	`
			: ''}

	${({ active }) => {
		if (active)
			return css`
				justify-content: center;

				${media.desktop`
					justify-content: flex-start;
				`}
			`;
	}}

	> h1 {
		display: block;
		width: 100%;
		font-size: 28px;
		font-weight: 700;
		color: ${({ theme }) => theme.text[0]};
		line-height: 30px;
		opacity: 1;
		transition: opacity 0.25s ease-in;
		overflow: hidden;
		${media.desktop`
			font-size: 26px;
			margin-bottom: 0;
			display: none;
		`}
		> span {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			line-height: 1.2;
			${media.tablet`
				display: inline;
			`}
		}
	}
	> h2 {
		font-size: 26px;
		color: ${({ theme }) => theme.text[0]};
		${media.tablet`
			font-size: 32px;
		`}
	}
	> h3 {
		color: ${({ theme }) => theme.secondary[0]};
		font-size: 14px;
		line-height: 21px;
		padding: 0 8px;
		cursor: pointer;
		&:hover {
			background-color: transparent;
			color: ${({ theme }) => theme.secondary[3]};
		}
	}
	> h4 {
		color: ${({ theme }) => theme.text[0]};
		position: absolute;
		left: 0;
		right: 0;
		font-size: 21px;
		text-align: center;
		opacity: 0;
		transition: none;
		font-size: 16px;
		font-weight: 400;
		max-width: 68%;
		margin: 0 auto;
		line-height: 20px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		> span {
			width: 100%;
			display: inline;
			overflow: hidden;
			line-height: 1.2;
			&:nth-child(2) {
				padding-top: 0;
				display: inline;
			}
		}

		${media.desktop`
			display: none;
		`}
	}
	> p {
		color: ${({ theme }) => theme.text[0]};
		font-size: 16px;
		line-height: 21px;
	}

	${({ active }) => {
		if (active) {
			return css`
				> h1 {
					opacity: 0;
					transition: none;

					> span {
						white-space: nowrap;
						&:nth-child(2) {
							display: none;
						}
					}
				}

				> h4 {
					transition: opacity 0.25s ease-in;
					opacity: 1;

					> span {
						&:nth-child(2) {
							display: inline;
						}
					}

					${media.desktop`
						display: none;
					`}
				}
			`;
		}
	}}
`;

export const _greetings = styled.span`
	display: inline;

	${({ greet }) => {
		if (greet)
			return css`
				width: calc(100% - 64px);
			`;
	}}

	${media.mini`
		width: calc(100% - 32px);
	`}
	${media.tablet`
		padding: 16px 0 16px 0;
		width: 100%;
	`}
`;

export const _username = styled.span`
	display: inline;
	padding-top: 8px;
	${media.tablet`
		padding: 16px 8px 16px 0;
	`}
`;

export const _welcome = styled.div`
	padding-top: 32px;
	padding-bottom: 32px;

	${media.tablet`
		padding-top: 48px;
		padding-bottom: 48px;
	`}
	${media.desktop`    
		z-index: ${({ layer }) => (layer ? layer + layers.relative.container : layers.current + layers.relative.container)};
		
		width: 100vw;
		position: relative;
		height: 80px;
		padding-bottom: 0;
		padding-top: 0px;

		display: flex;
		flex-direction: row;
		align-items: center;

	`}

	${({ active }) => {
		if (active)
			return css`
				padding-top: 18px;
				padding-bottom: 16px;

				${media.tablet`
					padding-top: 18px;
					padding-bottom: 16px;
				`}

				${media.desktop`    
					padding-top: 0;
					padding-bottom: 0;
				`}
			`;
	}}
`;

export const _welcome_wrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 0 32px;

	${media.tablet`
		padding: 0 64px;
	`}

	${media.desktop`
		flex-direction: row;
		align-items: center;
		max-width: 1100px;
		width: 100%;
		padding: 16px 32px 16px 0px;
	`}

	${({ active }) => {
		if (active)
			return css`
				justify-content: center;

				${media.desktop`
					justify-content: flex-start;
				`}
			`;
	}}
	> p {
		color: ${({ theme }) => theme.secondary[0]};
		display: none;
		${media.desktop`
			display: block;
		`}
	}
`;

export const _history = styled.span`
	color: ${({ theme, noClick }) => (noClick ? theme.secondary[3] : theme.secondary[0])};
	font-size: 14px;
	line-height: 21px;
	padding: 0 8px;
	cursor: pointer;
	&:hover {
		background-color: transparent;
		color: ${({ theme, noClick }) => (noClick ? theme.secondary[3] : theme.secondary[1])};
	}
`;

export const _item = styled.div`
	padding: 0 0 0 8px;
	${media.tablet`
		/* padding: 16px 0 0; */
	`}
	${media.desktop`
		padding: 16px 32px 32px 0;
	`}
`;

export const _tabs = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	padding: 0 16px 8px 16px;

	${media.mini`
			justify-content: flex-start;
			padding: 0 40px 8px 40px;
	`}
	${media.tablet`
			padding: 0 72px 8px 72px;
	`}
	${media.desktop`
			display: none;
			padding: 0 32px 8px 8px;
	`}
`;

const _tab = css`
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	align-items: center;
	margin-right: 0;
	cursor: pointer;
	${media.mini`
		margin-right: 24px;
	`}
	&:first-child::after {
		transition: transform 0.25s ease-out;
		transform: translateX(45px);
	}
	&:last-child::after {
		transition: transform 0.25s ease-out;
		transform: translateX(-45px);
	}
	&:active {
		> span {
			color: ${({ theme }) => theme.secondary[4]};
		}
	}
	> span {
		font-size: 12px;
		line-height: 16px;
		font-weight: 400;
		color: white;
		letter-spacing: 1px;
		padding: 0 8px;
		${media.tablet`
			font-size: 16px;
		`}
	}
`;

export const _tab_link = styled(Link)`
	${_tab}
`;

export const _tab_active = styled.div`
	${_tab};
	color: white;
	pointer-events: none;
	${media.mini`
		margin-right: 0;
	`}

	&:first-child::after {
		animation: slide-left 0.1s ease-in-out;
		transform: translateX(0);
	}

	&:last-child::after {
		animation: slide-right 0.1s ease-in-out;
		transform: translateX(0);
	}

	&::after {
		content: '';
		position: relative;
		top: 8px;
		bottom: 0;
		display: block;
		width: calc(100% + 16px);
		min-height: 2px;
		height: 2px;
		border-radius: 5px;
		background-color: ${({ theme }) => theme.secondary[2]};
		transform: translateX(0);
	}
`;

export const _gradient = styled.div`
	z-index: ${({ layer }) => (layer ? layer + layers.relative.gradient : layers.current + layers.relative.gradient)};
	position: relative;
	display: block;
	width: 100%;
	height: 0;
`;

export const _gradient_fill = styled.div`
	display: block;
	position: relative;
	width: 100%;
	height: 80px;
	z-index: 10;
	background-image: linear-gradient(
		to bottom,
		${({ theme }) => theme.background[3]},
		${({ theme }) => theme.background[2]}
	);

	${media.desktop`
		top: 8px;
	`}
`;

export const _logo = styled.div`
	display: none;
	position: relative;
	z-index: ${({ layer }) => (layer ? layer + layers.relative.logo : layers.current + layers.relative.logo)};
	${media.desktop`
		position: relative;
		right: 32px;
		top: 18px;
		display: flex;
		justify-content: flex-end;
		margin: 0 auto;
		height: 0;    
		max-width: 1025px;
    	width: calc(100% - 116px);
		> svg {
			display: inline-block;
			width: 400px;
			height: 90px;
			transform: translateY(-100%);
		}
	`}

	> svg {
		z-index: ${props => (props.layer ? props.layer + layers.relative.logo : layers.current + layers.relative.logo)};
		position: relative;
	}
`;
