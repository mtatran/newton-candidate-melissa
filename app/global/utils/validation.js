const isValid = value => {
	let m = '';

	const min = function(min, message) {
		if (!(String(value).length >= Number(min))) {
			if (message) m = message;
		}
		return this;
	};

	const required = function(message) {
		if (value === '') {
			if (message) m = message;
		}
		return this;
	};

	const email = function(message) {
		const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!reg.test(String(value).toLowerCase())) {
			if (message) m = message;
		}
		return this;
	};

	const password = function(message) {
		const reg = /^.{0,}$/;
		if (!reg.test(String(value).toLowerCase())) {
			if (message) m = message;
		}
		return this;
	};

	const number = function(message) {
		const reg = /^[0-9]*$/;
		if (!reg.test(String(value).toLowerCase())) {
			if (message) m = message;
		}
		return this;
	};

	const decimal = function(message) {
		const reg = /^\d*\.?\d*$/;
		if (!reg.test(String(value).toLowerCase())) {
			if (message) m = message;
		}
		return this;
	};

	const match = function(val, message) {
		if (!(value === val)) {
			if (message) m = message;
		}
		return this;
	};

	const print = function() {
		return m;
	};

	return {
		min,
		email,
		required,
		password,
		number,
		match,
		print,
		decimal
	};
};

export default isValid;
