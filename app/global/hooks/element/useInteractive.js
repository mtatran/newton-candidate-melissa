import { useState } from 'react';
import { useEventListener } from './useEventListener';

export const useInteractive = element => {
	const [interacted, setInteractive] = useState(false);

	const setActive = () => {
		if (!interacted) setInteractive(true);
	};

	useEventListener('mousedown', () => setActive(), element);
	useEventListener('click', () => setActive(), element);
	useEventListener('mousewheel', () => setActive(), element);
	useEventListener('touchstart', () => setActive(), element);
	useEventListener('touchmove', () => setActive(), element);
	useEventListener('keydown', () => setActive(), element);
	useEventListener('keypress', () => setActive(), element);
	useEventListener('scroll', () => setActive(), element);
	useEventListener('resize', () => setActive(), element);

	return interacted;
};
