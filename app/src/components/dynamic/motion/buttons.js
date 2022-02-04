export const _motion_links = () => {
	const variants = {
		initial: { scale: 1 },
		active: {},
		hover: { scale: 1.05 },
		tap: { scale: 0.97 }
	};
	return {
		initial: 'initial',
		whileHover: 'hover',
		whileTap: 'tap',
		variants
	};
};

export const motion_action = () => {
	const variants = {
		initial: { scale: 1 },
		active: {},
		hover: { scale: 1.12 },
		tap: { scale: 0.97 }
	};
	return {
		initial: 'initial',
		whileHover: 'hover',
		whileTap: 'tap',
		variants
	};
};

export const _modal = leave => {
	const variants = {
		hidden: { y: '150%' },
		active: { y: '0%', transition: { duration: 0.5, delay: 0.5 } },
		leave: { translateY: '150%', transition: { duration: 0.5 } }
	};
	return {
		initial: 'hidden',
		animate: leave ? 'leave' : 'active',
		variants
	};
};

export const _tooltip = (enter, shake) => {
	const variants = {
		initial: { x: 0, y: 0, rotate: 0 },
		shake: {
			transition: { duration: 1, times: [0, 0.1, 0.15, 0.22, 0.31, 0.4, 0.49, 0.57, 0.67, 0.75, 0.81, 1] },
			rotate: [-2, 4, -5, 1, -2, 6, -3, 0, -8, 10, -3, 0]
		}
	};

	let value = 'hidden';
	if (enter) {
		value = 'enter';
	}

	if (shake) {
		value = 'shake';
	}

	return {
		initial: 'hidden',
		animate: value,
		variants
	};
};
