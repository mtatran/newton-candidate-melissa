import styled, { css } from 'styled-components';
import { layers, media, sizes } from '../../../../global';

export const _Container = styled.div``;

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
		max-width: ${sizes.maxContainer}px;
		width: calc(100% - 116px);
		position: static;
		background-color: transparent;
		height: auto;
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

export const _wrapper = styled.div`
	z-index: ${props =>
		props.layer ? props.layer + layers.relative.container : layers.current + layers.relative.container};
	position: relative;

	${media.desktop`
		max-width: ${sizes.maxContainer}px;
		width: calc(100% - 116px);
	`}
`;

export const _welcome = styled.div`
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

export const _fill = styled.div`
	z-index: ${props =>
		props.layer ? props.layer + layers.relative.gradient : layers.current + layers.relative.gradient};
`;

export const _slider = styled.div`
	${media.desktop`
		max-width: ${sizes.maxContainer}px;
		width: calc(100% - 116px);
	`}
`;

export const _shadow = styled.div`
	display: ${props => (props.hide ? 'none' : 'block')};
`;

export const _display = styled.div`
	${media.desktop`
		max-width: ${sizes.maxContainer}px;
		width: calc(100% - 116px);
	`}
`;

export const _stepWrapper = styled.div`
	${media.desktop`
		max-width: ${sizes.maxContainer}px;
		width: calc(100% - 116px);
		display: flex;
		justify-content: flex-start;
	`}
`;

export const _step = styled.div``;

export const _coin = styled.span`
	> svg {
		width: 18px;
		height: 18px;
		transform: scale(${props => (props.coin ? sizes[`logo_${props.coin}`] : 1)});

		${media.desktop`
			width: 24px;
			height: 24px;
		`}
	}
`;
