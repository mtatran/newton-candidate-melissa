import styled, { css } from 'styled-components';
import { layers, media } from '../../../../../global';
import { Link } from 'react-router-dom';

export const _login = styled.div`
	width: 100%;
	background-color: ${({ theme }) => theme.background[2]};
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	min-height: 100vh;
	${media.desktop`
		height: 100vh;
		justify-content: center;
		margin-top: 0;
	`}
`;

export const _container = styled.div`
	padding: 48px 0 32px 0;
	width: 100%;
	min-height: 100%;
	height: 100vh;
	background-color: ${({ theme }) => theme.background[2]};
	max-width: 600px;
	display: flex;
	flex-direction: column;
	${media.tablet`
		display: block;
		min-height: 100vh;
		height: auto;
		overflow: visible;
	`}
	${media.desktop`
		overflow: hidden;
		height: 100vh;
		max-width: 800px;
		min-height: 0;
		margin-bottom: 0;
		box-shadow: none;
		border-radius: 0;
		padding: 0;
		display: flex;
		flex-direction: row;
		background-color: ${({ theme }) => theme.background[2]};
	`}
`;

export const _gradient = styled.div`
	display: block;
	width: 100vw;
	height: 0;
	> div {
		position: relative;
		top: 2px;
		left: -100%;
		width: 200vw;
		height: 60px;
		background-image: linear-gradient(
			to bottom,
			${({ theme }) => theme.background[3]},
			${({ theme }) => theme.background[2]}
		);
		${media.desktop`
			display: none;
		`}
	}
`;

export const _info = styled.div`
	padding: 0 24px;
	margin-bottom: 32px;
	${media.desktop`
		margin-bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 440px;
		flex: 1 1 auto;
		padding: 0;
	`}
`;

export const _main = styled.div`
	z-index: ${({ layer }) => (layer ? layer + layers.offscreen.main : layers.current + layers.offscreen.main)};
	display: block;
	${media.desktop`
		position: relative;
			bottom: 48px;
			max-width: 400px;
			padding: 32px;
			border-radius: 10px;
			background-color: ${({ theme }) => theme.background[2]};
	`}
`;

export const _title = styled.div`
	font-size: 28px;
	font-weight: bold;
	color: ${({ theme }) => theme.text[0]};
	line-height: 30px;
	letter-spacing: -0.5px;
	padding-left: 16px;
	margin-bottom: 8px;
`;

export const _description = styled.div`
	display: none;
	padding-left: 16px;
	margin-bottom: 32px;
	color: ${({ theme }) => theme.secondary[0]};
	${media.desktop`
		display: block;
		font-size: 28px;
		font-weight: bold;
	`}
`;

export const _tag = styled.div`
	padding-left: 16px;
	padding-right: 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	> span {
		display: block;
		font-size: 18px;
		font-weight: 400;
		color: ${({ theme }) => theme.primary[0]};
		line-height: 24px;
		${media.desktop`
			color: ${({ theme }) => theme.text[0]};
		`}
	}
	div {
		display: none;
		transform: ${({ active }) => (active ? 'rotate(180deg)' : 'none')};
		${media.desktop`
			display: block;
		`}
	}
	svg {
		path {
			stroke: ${({ theme }) => theme.primary[0]};
		}
	}
`;

export const _action = styled.div`
	z-index: ${({ layer }) => (layer ? layer + layers.offscreen.half : layers.current + layers.offscreen.half)};
	height: 100%;
	${media.tablet`
		height: auto;
	`}
	${media.desktop`
		width: 440px;
		flex: 1 1 auto;
		display: ${({ active }) => (active ? 'block' : 'none')};
	`}
`;

export const _section = styled.div`
	${({ theme }) => theme.styles.containers[0]};
`;

export const _wrapper = styled.div`
	height: 100%;
	${media.tablet`
		height: auto;
	`}
	${media.desktop`
		width: 50%;
		min-width: 420px;
		max-width: 420px;
		margin-left: 16px;
		min-height: 420px;
	`}
`;

export const _tabs = styled.div`
	display: block;
	width: 100%;
	height: auto;
	padding: 0 8px;
`;

export const _tabsContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	height: auto;
	padding-left: 24px;
`;

const link = css`
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	align-items: center;
	width: auto;
	padding: 8px;
	cursor: pointer;
	text-decoration: none;
	> span {
		font-size: 16px;
		line-height: 1;
		font-weight: 300;
		color: ${({ theme }) => theme.text[0]};
		white-space: nowrap;
		letter-spacing: 0.5px;
	}
`;

export const _link = styled(Link)`
	${link};
`;

export const _active = styled.div`
	${link};
	cursor: default;
	&::after {
		content: '';
		position: relative;
		top: 10px;
		bottom: 0;
		display: block;
		width: calc(100% + 16px);
		min-height: 2px;
		height: 2px;
		border-radius: 5px;
		background-color: ${({ theme }) => theme.secondary[0]};
		transform: translateX(0);
	}
`;
