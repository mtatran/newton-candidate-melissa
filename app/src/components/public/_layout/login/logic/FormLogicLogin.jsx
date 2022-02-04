import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { withTheme } from 'styled-components';
import { useInput } from '../../../../../../global/hooks/forms/useInput';
import isValid from '../../../../../../global/utils/validation';
import { siftInit } from '../../../../../../global/vendor/siftClient';
import { postLoginUser } from '../../../../../actions/fetch/auth';
import { STEP_CODE } from '../../../../../actions/state/state';
import { PRIVATE_DASHBOARD, PRIVATE_TWO_FACTOR } from '../../../../../actions/state/routes';
import { parseError } from '../../../../../../global/utils/helpers';
import { childrenWithProps } from '../../../../../../global/utils/mapChildren';
import { setEmail, toggleServerError } from '../../../../../actions/state/forms';
import { labelNextStep } from '../../../../../redux/reducers/permissionsReducer';

const FormLogicLogin = ({ children }) => {
	const { t } = useTranslation();
	const [fetching, setFetching] = useState();
	const [serverMessage, setServerMessage] = useState();
	const [enterSubmit, setEnterSubmit] = useState();

	const dispatch = useDispatch();
	const history = useHistory();

	const onKeyDown = e => {
		if (e.key === 'Enter') setEnterSubmit(true);
	};

	const onKeyUp = e => {
		if (e.key === 'Enter') {
			e.target.blur();
			handleSubmit();
		}
	};

	const email_input = useInput(
		{
			onKeyDown,
			onKeyUp
		},
		{
			validator: val =>
				isValid(val)
					.email(t('emailInvalid'))
					.required(t('emailRequired'))
					.print()
		},
		{
			$light: true,
			$blur: state => state.touched
		}
	);

	const password_input = useInput(
		{
			onKeyDown,
			onKeyUp,
			onChange(e, state) {
				state.setDefault();
				setServerMessage('');
			}
		},
		{
			validator: val =>
				isValid(val)
					.password(t('passwordInvalid'))
					.required(t('passwordRequired'))
					.print()
		},
		{
			$light: true,
			$blur: state => state.touched
		}
	);

	const isNotFetching = !fetching;
	const isNotError = !email_input.errorMessage && !password_input.errorMessage;
	const isValue = email_input.value && password_input.value;
	const canSubmit = isNotFetching && isNotError && isValue;

	const handleSuccess = success => {
		const nextStep = labelNextStep(success);
		localStorage.setItem('login', 'true');
		setEmail(email_input.value);
		localStorage.setItem('isLoggedIn', 'true');
		if (nextStep === STEP_CODE) {
			history.push(PRIVATE_TWO_FACTOR);
		} else {
			history.push(PRIVATE_DASHBOARD);
		}
	};

	const handleSubmit = () => {
		if (canSubmit) {
			setFetching(true);
			siftInit(email_input.value);
			dispatch(
				postLoginUser(
					email_input.value,
					password_input.value,
					success => handleSuccess(success),
					(data, status) => {
						setEnterSubmit(false);
						setFetching(false);
						if (parseFloat(status) >= 500 && parseFloat(status) < 600) {
							dispatch(toggleServerError(true));
						} else {
							setServerMessage(parseError(data, status));
						}
					}
				)
			);
		}
	};

	const emailValue = useRef();

	useEffect(() => {
		emailValue.current = email_input.value;
	}, [email_input.value]);

	useEffect(() => {
		return () => {
			dispatch(setEmail(emailValue.current));
		};
	}, []);

	return (
		<>
			{childrenWithProps(children, {
				email_input,
				password_input,
				serverMessage,
				enterSubmit,
				canSubmit,
				fetching,
				handleSubmit
			})}
		</>
	);
};

export default withTheme(FormLogicLogin);
