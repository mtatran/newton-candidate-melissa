import { PRIVATE_MARKET } from '../../../actions/state/routes';
import { forEach } from 'lodash';

export const match = path => {
	const matching = [PRIVATE_MARKET];
	let found = path;

	forEach(matching, route => {
		if (String(path).includes(route)) found = route;
	});

	return found;
};
