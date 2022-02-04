import React, { useState } from 'react';
import { _error, _container, _semantics, _commands, _header, _description, _confirm } from './Error.styled';
import { useEventListener } from '../../../../../global/hooks/element/useEventListener';
import { useDispatch, useSelector } from 'react-redux';
import { toggleServerError } from '../../../../actions/state/forms';
import { useHistory } from 'react-router-dom';
import { PRIVATE_DASHBOARD, PUBLIC_DEFAULT } from '../../../../actions/state/routes';
import { Timings } from '../../../../../global/utils/timings';
import { useTranslation } from 'react-i18next';

const Error = () => {
	const { t } = useTranslation();
	const [closing, setClosing] = useState(false);
	const [submit, setSubmit] = useState(false);
	const errorOpen = useSelector(({ activeForm }) => activeForm.errorOpen);
	const authenticated = useSelector(({ permissions }) => permissions.authenticated);
	const history = useHistory();
	const dispatch = useDispatch();

	const closeMenu = () => {
		setClosing(true);
		setSubmit(false);
		setTimeout(() => {
			setClosing(false);
			dispatch(toggleServerError(false));
			if (localStorage.getItem('isLoggedIn') && authenticated) history.push(PRIVATE_DASHBOARD);
			else history.push(PUBLIC_DEFAULT);
		}, Timings.closeErrorDialog);
	};

	useEventListener('keydown', e => e.key === 'Enter' && errorOpen && setSubmit(true), document);
	useEventListener('keyup', e => e.key === 'Enter' && errorOpen && closeMenu(), document);

	if (!errorOpen && !closing) return null;
	return (
		<_error $closing={closing}>
			<_container>
				<_semantics>
					<_header>{t('oops')}</_header>
					<_description>{t('supportIssue')}</_description>
				</_semantics>
				<_commands>
					<_confirm $submit={submit} onClick={() => closeMenu()}>
						{t('backToSafety')}
					</_confirm>
				</_commands>
			</_container>
		</_error>
	);
};

export default Error;
