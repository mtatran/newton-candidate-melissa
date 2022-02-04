import { useState } from 'react';

export const useCheckmark = (handlers, options) => {
	const [checked, setChecked] = useState(options?.initial_checked || false);
	const [focus, setFocus] = useState(options?.initial_focus || false);
	const [touched, setTouched] = useState(options?.initial_touched || false);
	const [errorMessage, setErrorMessage] = useState(options?.initial_error || '');
	const [submit, setSubmit] = useState(false);
	const { onFocus, onBlur, onKeyUp, onKeyDown, onChange, onClick } = handlers;

	const state = {
		checked,
		setChecked,
		focus,
		setFocus,
		touched,
		setTouched,
		errorMessage,
		setErrorMessage,
		submit,
		setSubmit
	};

	const handleFocus = () => {
		if (onFocus) {
			onFocus(state);
		} else {
			setFocus(true);
		}
	};

	const handleClick = () => {
		const setDefault = errorMessage => {
			setErrorMessage(errorMessage || '');
			setChecked(!state.checked);
		};
		if (onClick) {
			onClick({ ...state, setDefault });
		} else {
			setDefault();
		}
	};

	const handleBlur = () => {
		const setDefault = () => {
			setFocus(false);
			setTouched(true);
		};
		if (onBlur) {
			onBlur({ ...state, setDefault });
		} else {
			setDefault();
		}
	};

	const handleKeyUp = e => {
		if (onKeyUp) {
			onKeyUp(e);
		}
	};

	const handleKeyDown = e => {
		const setDefault = errorMessage => {
			setChecked(!state.checked);
			setErrorMessage(errorMessage || '');
		};
		if (onKeyDown) {
			onKeyDown(e, { ...state, setDefault });
		}
	};

	const handleChange = e => {
		const next_value = e.target.checked;
		const setDefault = errorMessage => {
			setChecked(next_value);
			setErrorMessage(errorMessage || '');
		};
		if (onChange) {
			onChange({ ...state, checked: next_value, setDefault });
		} else {
			setDefault();
		}
	};

	return {
		checked,
		setChecked,
		focus,
		setFocus,
		touched,
		setTouched,
		errorMessage,
		setErrorMessage,
		submit,
		setSubmit,
		onClick: handleClick,
		props: {
			onFocus: handleFocus,
			onBlur: handleBlur,
			onKeyUp: handleKeyUp,
			onKeyDown: handleKeyDown,
			onChange: handleChange
		}
	};
};
