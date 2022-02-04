import styled from 'styled-components';
import { media } from '../../../../../../../global';
import {
	__basic_error,
	__header_error,
	__form,
	__headers,
	__input,
	__message,
	__section,
	__terms
} from '../../../../../shared/forms/Common.styled';

export const _form = styled(__form)`
	padding: 16px 24px 32px 24px;
	height: 100%;
	position: static;

	${media.desktop`
		height: auto;
		min-height: 360px;
		padding: 16px 16px 0 16px;
	`}
`;

export const _section = styled(__section)``;

export const _headers = styled(__headers)``;

export const _input = styled(__input)``;

export const _message = styled(__message)``;

export const _terms = styled(__terms)``;

export const _buttons = styled.div`
	${({ theme }) => theme.styles.forms.buttons[0]}
`;

export const _button = styled.button`
	${({ theme }) => theme.styles.buttons[0]}
`;

export const _error_paragraph = styled(__basic_error)`
	min-height: 42px;
	${media.desktop`
		text-align: left;
	`}
`;

export const _error_header = styled(__header_error)``;
