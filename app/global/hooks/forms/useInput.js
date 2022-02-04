import { useState, useEffect, useRef, useMemo } from 'react';
import usePrevious from '../../../global/hooks/helpers/usePrevious';
import { memoizeArray } from '../../utils/hooks';

export const useInput = (
	handlers = {
		onFocus: null,
		onBlur: null,
		onKeyUp: null,
		onKeyDown: null,
		onChange: null,
		onCopy: null,
		onPaste: null
	},
	options = {
		initialValue: '',
		initialFocus: false,
		initialTouched: false,
		initialError: '',
		tabIndex: 0,
		maxLength: undefined,
		field: null,
		defaultValue: '',
		validator: null,
		validateEmptyValue: false,
		validateNotTouched: false
	},
	styleOptions = {
		focusOnError: true
	}
) => {
	const { onFocus, onBlur, onKeyUp, onKeyDown, onChange, onCopy, onPaste } = handlers;
	const [value, setValue] = useState(options.initialValue ?? '');
	const previousValue = usePrevious(value);
	const [focus, setFocus] = useState(options.initialFocus ?? false);
	const [touched, setTouched] = useState(options.initialValue ? true : options.initialTouched);
	const [errorMessage, setErrorMessage] = useState(options.initialError ?? '');
	const [shouldDisplayError, setShouldDisplayError] = useState(options.initialError && options.initialTouched);
	const [submit, setSubmit] = useState(false);
	const inputRef = useRef(null);

	const state = {
		value,
		setValue,
		focus,
		setFocus,
		touched,
		setTouched,
		errorMessage,
		setErrorMessage,
		submit,
		setSubmit,
		shouldDisplayError,
		previousValue,
		validator: options.validator,
		inputRef
	};
	const styles = memoizeArray(
		Object.entries(styleOptions).filter(k => /^\$.*/.test(k)),
		[
			useMemo(() => ({ $focus: focus || (styleOptions.focusOnError === undefined && shouldDisplayError) }), [
				focus,
				shouldDisplayError
			]),
			useMemo(() => ({ $error: shouldDisplayError }), [shouldDisplayError])
		],
		state
	);

	useEffect(() => {
		const errorTouched = errorMessage && touched;
		const errorNotTouched = options.validateNotTouched && errorMessage;
		setShouldDisplayError(errorTouched || errorNotTouched);
	}, [errorMessage, touched]);

	useEffect(() => {
		if (inputRef.current) {
			if (focus) {
				inputRef.current?.focus();
			} else {
				inputRef.current?.blur();
			}
		}
	}, [focus, inputRef, shouldDisplayError]);

	const validate = (incomingValue = '') => {
		const isFunction = typeof options.validator === 'function';
		let message = '';
		if (options.validator && isFunction) {
			if (options.validateEmptyValue || incomingValue !== '') message = options.validator(incomingValue);
		}
		return message;
	};

	const handleKeyUp = e => {
		if (onKeyUp) {
			onKeyUp(e, state);
		}
	};

	const handleKeyDown = e => {
		if (onKeyDown) {
			onKeyDown(e, state);
		}
	};

	const handleFocus = e => {
		if (onFocus) {
			onFocus(e, state);
		} else {
			setFocus(true);
		}
	};

	const handleBlur = e => {
		const setDefault = (message, modifiedValue) => {
			setFocus(false);
			setTouched(value !== '');
			if (modifiedValue) setValue(modifiedValue);
			const newError = message ?? validate(value);
			if (newError !== errorMessage) {
				setErrorMessage(newError ?? '');
			}
		};
		if (onBlur) {
			onBlur(e, { ...state, setDefault });
		} else {
			setDefault();
		}
	};

	const handleChange = e => {
		const incomingValue = e.target.value;
		const setDefault = (message, modifiedValue = incomingValue) => {
			setValue(modifiedValue);
			const newError = message ?? validate(modifiedValue);
			if (newError !== errorMessage) {
				setErrorMessage(newError ?? '');
			}
		};
		if (onChange) {
			onChange(e, { ...state, currentValue: state.value, value: incomingValue, setDefault });
		} else {
			setDefault();
		}
	};

	const handleCopy = e => {
		if (onCopy) {
			onCopy(e, state);
		}
	};

	const handlePaste = e => {
		if (onPaste) {
			onPaste(e, state);
		}
	};
	return {
		value,
		setValue,
		previousValue,
		focus,
		setFocus,
		touched,
		setTouched,
		errorMessage,
		setErrorMessage,
		submit,
		setSubmit,
		shouldDisplayError,
		setShouldDisplayError,
		props: {
			onFocus: handleFocus,
			onBlur: handleBlur,
			onKeyUp: handleKeyUp,
			onKeyDown: handleKeyDown,
			onChange: handleChange,
			onPaste: handlePaste,
			onCopy: handleCopy,
			value: value || '',
			maxLength: options.maxLength,
			tabIndex: options.tabIndex,
			ref: inputRef
		},
		styleProps: styles.reduce((prev, current) => ({ ...prev, ...current }))
	};
};
