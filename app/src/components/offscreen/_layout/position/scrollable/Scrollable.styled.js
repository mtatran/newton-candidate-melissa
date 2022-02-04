import styled from 'styled-components';
import { media } from '../../../../../../global';

export const _scrollable = styled.div`
	${({ theme }) => theme.styles.helpers.scrollbar[0]};
	min-height: 100vh;
	height: 100%;
	width: 100%;
	overflow-y: scroll !important;
	overflow-x: hidden;
	box-sizing: content-box;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	${media.tablet`
		min-height: 100%;
	`};

	div,
	section {
		box-sizing: border-box;
	}
`;
