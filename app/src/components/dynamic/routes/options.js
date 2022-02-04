import publicOptions from './public';
import privateOptions from './private';
import { mapKeys } from 'lodash';

const options = () => {
	let opts = {};
	mapKeys(publicOptions, (value, key) => {
		opts[key] = value;
	});
	mapKeys(privateOptions, (value, key) => {
		opts[key] = value;
	});
	return opts;
};

export default options;
