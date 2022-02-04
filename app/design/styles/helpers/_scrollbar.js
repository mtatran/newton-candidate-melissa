import { css } from 'styled-components';

export const _scrollbar = css`
    scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE 10+ */
	&::-webkit-scrollbar {
		display: none;
	}
`