export const motion_fade_in = custom => {
	const variants = {
		initial: custom => ({ opacity: 0, y: `${custom * 12 + 48}px` }),
		active: custom => ({
			opacity: 1,
			y: '0px',
			transition: { delay: (custom - 1) * 0.12, duration: 1.2 - custom * 0.12 }
		}),
		exit: { opacity: 0, y: '-32px' }
	};

	return {
		custom,
		initial: 'initial',
		animate: 'active',
		exit: 'exit',
		variants
	};
};
