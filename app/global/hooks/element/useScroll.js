import { useLayoutEffect, useState } from 'react';
import { useEventListener } from './useEventListener';

export const useScroll = (ref) => {
	if (ref) {
		const isClient = typeof window === 'object';

		const getScroll = scrollTop => {
			return scrollTop};

		const [elementScroll, setElementScroll] = useState(0);

		useLayoutEffect(() => {
			if (!isClient) {
				return false;
			}

			const handleScroll = (event) => {
				setElementScroll(getScroll(event.target.scrollTop));
			};

			useEventListener('scroll', handleScroll);

			return () => useEventListener('scroll', handleScroll);
		}, []);
		return elementScroll;
	} else {
		return 0;
	}
};
