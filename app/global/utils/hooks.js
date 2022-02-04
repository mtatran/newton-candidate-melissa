import { useMemo } from 'react';

const memoReduce = (array, initialValue = [], callbackParameter) =>
	array.reduce((prev, [key, value]) => {
		if (callbackParameter && typeof value === 'function') {
			prev.push(useMemo(() => ({ [key]: value(callbackParameter) }), [value(callbackParameter)]));
		} else {
			prev.push(useMemo(() => ({ [key]: value }), [value]));
		}
		return prev;
	}, initialValue);

export const memoizeObject = (object, initialValue = [], callbackParameter) =>
	memoReduce(Object.entries(object), initialValue, callbackParameter);

export const memoizeArray = (array, initialValue = [], callbackParameter) =>
	memoReduce(array, initialValue, callbackParameter);
