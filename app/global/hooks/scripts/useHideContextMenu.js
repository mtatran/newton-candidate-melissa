import { useEventListener } from '../element/useEventListener';

export const useHideContextMenu = () => {
	useEventListener('contextmenu', e => {
		if (
			screen.width < 900 &&
			e.path[1] &&
			!e.path[1].className.includes('contextmenu') &&
			!e.path[1].className.includes('form-input') &&
			!e.path[1].className.includes('form-copy') &&
			!e.path[1].className.includes('form-numbers-input')
		) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
};
