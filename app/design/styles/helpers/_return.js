import { css } from 'styled-components';
import { media } from '../../../global';

export const _return = css`
    display: flex;
	justify-content: flex-start;
	padding: 32px 0 32px 32px;
	padding-bottom: 32px;
	padding-top: 32px;
    flex: 0 0 auto;
    
	${({ $hideDesktop }) => 
		$hideDesktop && media.desktop`
			display: none;
		`
	}

	${media.tablet`
		padding-left: 64px;
		padding-top: 32px;
	`}

	${media.desktop`
		padding-left: 48px;
		padding-top: 0;
    `}
`;

export const _return_container = css`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	height: 30px;
	width: 30px;
	&:hover {
		> svg {
			transform: translateX(-4px);
		}
	}
	&:active {
		> svg {
			opacity: 0.5;
		}
	}
	> svg {
		width: 26px;
		height: 18px;
		transition: transform 0.25s ease-out;
	}
`;