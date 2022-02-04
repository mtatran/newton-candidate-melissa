import styled, { css } from 'styled-components';
import { layers, media, sizes } from '../../../../global';

export const _Container = styled.div``;

export const _fixed = styled.div`
	position: sticky;
	top: 0;
	z-index: ${({ layer }) => (layer ? layer + layers.relative.fixed : layers.current + layers.relative.fixed)};
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

export const _gradient = styled.div`
	z-index: ${props =>
		props.layer ? props.layer + layers.relative.gradient : layers.current + layers.relative.gradient};
	position: relative;
	width: 100%;
`;

export const _logo = styled.div`
	position: relative;
	z-index: ${props => (props.layer ? props.layer + layers.relative.logo : layers.current + layers.relative.logo)};
	${media.desktop`
		max-width: ${sizes.maxContainer}px;
		width: calc(100% - 116px);
	`}
	> svg {
		z-index: ${props => (props.layer ? props.layer + layers.relative.logo : layers.current + layers.relative.logo)};
		position: relative;
	}
`;

export const _list = styled.div`
	z-index: ${props =>
		props.layer ? props.layer + layers.relative.container : layers.current + layers.relative.container};
	position: relative;

	${media.desktop`
		max-width: ${sizes.maxContainer}px;
		width: 100%;
	`}
`;

export const _header = styled.div`
	${media.desktop`
		z-index: ${props =>
			props.layer ? props.layer + layers.relative.container : layers.current + layers.relative.container};
		max-width: ${sizes.maxContainer}px;
		width: calc(100% - 116px);
`}
`;

export const _tabs = styled.div`
	${media.desktop`
		max-width: ${sizes.maxContainer}px;
		width: 100%;
	`}
`;

export const _view = styled.div`
	${media.desktop`
		max-width: ${sizes.maxContainer}px;
		width: calc(100% - 116px);
	`}
`;

export const _fill = styled.div`
	z-index: ${props =>
		props.layer ? props.layer + layers.relative.gradient : layers.current + layers.relative.gradient};
`;

export const _icon = styled.div`
	> span {
		background-color: ${props => (props.bg ? props.bg : '#24263b')};
		width: 32px;
		min-width: 32px;
		height: 32px;
		min-height: 32px;

		> svg {
			display: block;
			width: 18px;
			height: 18px;
			fill: #fff;
			transform: scale(${props => (props.coin ? sizes[`logo_${props.coin}`] : 1)});
		}
	}
`;

export const _watermark = styled.div`
	width: 100%;
	min-width: 100%;
	display: none;
	height: 0;
	> div {
		width: 88px;
		height: 88px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		> svg {
			z-index: ${props => (props.layer ? props.layer + layers.relative.logo : layers.current + layers.relative.logo)};
			position: relative;
			width: 24px;
			height: 24px;
		}
	}
	${media.desktop`
		display: flex;
	`}
`;
