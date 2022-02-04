import React from 'react';
import {
	_button,
	_buttons,
	_error_paragraph,
	_error_header,
	_form,
	_headers,
	_input,
	_section
} from './FormLogin.styled';
import { withTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Loading from '../../../../../../../design/animations/lottie/loading/Loading';

const FormLogin = ({ email_input, password_input, serverMessage, canSubmit, enterSubmit, fetching, handleSubmit }) => {
	const { t } = useTranslation();
	const header = (input, title) => {
		return input.errorMessage && input.touched ? (
			<_error_header>{input.errorMessage}</_error_header>
		) : (
			<span>{title}</span>
		);
	};

	const server = () => {
		return serverMessage ? <_error_paragraph $error>{serverMessage}</_error_paragraph> : <_error_paragraph />;
	};

	return (
		<_form onSubmit={({ preventDefault }) => preventDefault()}>
			<_section>
				<_headers $focus={email_input.focus || email_input.value}>{header(email_input, t('emailAddress'))}</_headers>
				<_input className="contextmenu" {...email_input.styleProps}>
					<input
						{...email_input.props}
						aria-label="Email"
						name="email"
						type="email"
						placeholder={!email_input.focus ? t('emailAddress') : ''}
					/>
				</_input>
			</_section>
			<_section>
				<_headers $focus={password_input.focus || password_input.value}>
					{header(password_input, t('enterPassword'))}
				</_headers>
				<_input className="contextmenu" {...password_input.styleProps}>
					<input
						{...password_input.props}
						aria-label="Password"
						name="password"
						type="password"
						placeholder={!password_input.focus ? t('enterPassword') : ''}
					/>
				</_input>
			</_section>
			<_buttons $left>
				{server()}
				<_button
					type="button"
					$disabled={!canSubmit}
					$enter={enterSubmit}
					$active={fetching}
					title={email_input.errorMessage || password_input.errorMessage}
					onClick={() => handleSubmit()}>
					{fetching ? <Loading.DotsDark /> : t('logIn').toUpperCase()}
				</_button>
			</_buttons>
		</_form>
	);
};

export default withTheme(FormLogin);
